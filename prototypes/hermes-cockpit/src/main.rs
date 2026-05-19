use std::{
    env, fs, io,
    path::{Path, PathBuf},
    process::Command,
    time::{Duration, SystemTime, UNIX_EPOCH},
};

use anyhow::{Context, Result};
use crossterm::{
    event::{self, Event, KeyCode, KeyEvent, KeyEventKind},
    execute,
    terminal::{disable_raw_mode, enable_raw_mode, EnterAlternateScreen, LeaveAlternateScreen},
};
use ratatui::{
    backend::{CrosstermBackend, TestBackend},
    layout::{Constraint, Direction, Layout, Rect},
    style::{Color, Modifier, Style},
    text::{Line, Span},
    widgets::{Block, Borders, List, ListItem, Paragraph, Wrap},
    Frame, Terminal,
};
use serde_json::Value;

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
struct ProjectionSource {
    key: char,
    name: &'static str,
    path: &'static str,
}

const APPROVAL_ACTION_SCHEMA: &str = "hermes-cockpit.approval-action.v1";
const APPROVAL_PILOT_OPERATION: &str = "cockpit.audit_note_append";
const APPROVAL_SAFETY_LABEL: &str = "RO: no GSD/Kanban/Hermes mutation";
const APPROVAL_SAFETY_SHORT_LABEL: &str = "RO no GSD/Kanban/Hermes mutation";
const APPROVAL_QUEUE_SCHEMA: &str = "hermes-cockpit.approval-queue.v1";
const APPROVAL_QUEUE_CONTRACT: &str = "m015.s01.approval-queue.v1";

const PROJECTION_SOURCES: &[ProjectionSource] = &[
    ProjectionSource {
        key: '1',
        name: "cards",
        path: "docs/hermes-cockpit/live-kanban-projection.json",
    },
    ProjectionSource {
        key: '2',
        name: "events",
        path: "target/hermes-cockpit-m010/hermes-projection.json",
    },
    ProjectionSource {
        key: '3',
        name: "control",
        path: "target/hermes-cockpit-m012/control-plane-projection.json",
    },
    ProjectionSource {
        key: '4',
        name: "watchers",
        path: "target/hermes-cockpit-m013/watcher-projection.json",
    },
    ProjectionSource {
        key: '5',
        name: "approval-queue",
        path: "target/hermes-cockpit-m015/approval-queue-surface-projection.json",
    },
    ProjectionSource {
        key: '6',
        name: "claude-sessions",
        path: "target/hermes-cockpit-m018/claude-sessions-projection.json",
    },
    ProjectionSource {
        key: '7',
        name: "claude-lifecycle",
        path: "target/hermes-cockpit-m021/claude-lifecycle-projection.json",
    },
];

fn projection_source_catalog() -> &'static [ProjectionSource] {
    PROJECTION_SOURCES
}

fn source_name_for_path(path: &str) -> String {
    projection_source_catalog()
        .iter()
        .find(|source| source.path == path)
        .map(|source| source.name.to_string())
        .unwrap_or_else(|| "custom".to_string())
}

fn resolve_projection_path(path: &str) -> PathBuf {
    let candidate = Path::new(path);
    if candidate.is_absolute() || candidate.exists() {
        return candidate.to_path_buf();
    }

    let manifest_dir = Path::new(env!("CARGO_MANIFEST_DIR"));
    let repo_root = manifest_dir
        .parent()
        .and_then(Path::parent)
        .unwrap_or(manifest_dir);
    let repo_candidate = repo_root.join(path);
    if repo_candidate.exists() {
        repo_candidate
    } else {
        candidate.to_path_buf()
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
struct FileFingerprint {
    modified: Option<SystemTime>,
    len: u64,
}

#[derive(Clone, Debug, Default)]
struct ReloadState {
    last_loaded_at: Option<SystemTime>,
    last_changed_at: Option<SystemTime>,
    last_error: Option<String>,
    fingerprint: Option<FileFingerprint>,
}

struct AppState {
    projection: Value,
    selected_card: usize,
    current_source_name: String,
    trust_filter: bool,
    help_visible: bool,
    reload: ReloadState,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
enum AgentKind {
    ClaudeBackground,
    ClaudeTmux,
    ClaudePty,
    ClaudePrint,
    Hermes,
    Codex,
}

impl AgentKind {
    fn from_projection(value: &str) -> Self {
        match value {
            "ClaudeBackground" | "ClaudeBG" | "claude_background" | "claude_bg" => {
                AgentKind::ClaudeBackground
            }
            "ClaudeTmux" | "claude_tmux" | "tmux" => AgentKind::ClaudeTmux,
            "ClaudePty" | "ClaudePTY" | "claude_pty" | "pty" => AgentKind::ClaudePty,
            "ClaudePrint" | "claude_print" | "print" => AgentKind::ClaudePrint,
            "Hermes" | "hermes" => AgentKind::Hermes,
            "Codex" | "codex" => AgentKind::Codex,
            _ => AgentKind::ClaudeBackground,
        }
    }

    fn label(self) -> &'static str {
        match self {
            AgentKind::ClaudeBackground => "Claude BG",
            AgentKind::ClaudeTmux => "Claude tmux",
            AgentKind::ClaudePty => "Claude PTY",
            AgentKind::ClaudePrint => "Claude print",
            AgentKind::Hermes => "Hermes",
            AgentKind::Codex => "Codex",
        }
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
enum SessionStatus {
    Idle,
    Starting,
    Running,
    WaitingForInput,
    Done,
    Error,
    Stopped,
    StopAttentionRequired,
}

impl SessionStatus {
    fn from_projection(value: &str) -> Self {
        match value {
            "idle" | "Idle" => SessionStatus::Idle,
            "starting" | "Starting" => SessionStatus::Starting,
            "running" | "Running" => SessionStatus::Running,
            "waiting" | "waiting_for_input" | "WaitingForInput" | "needs_input" => {
                SessionStatus::WaitingForInput
            }
            "done" | "Done" | "complete" | "completed" => SessionStatus::Done,
            "error" | "errored" | "Error" => SessionStatus::Error,
            "stopped" | "Stopped" => SessionStatus::Stopped,
            "stop_attention_required" | "needs_attention" | "cleanup_required" => {
                SessionStatus::StopAttentionRequired
            }
            _ => SessionStatus::Idle,
        }
    }

    fn label(self) -> &'static str {
        match self {
            SessionStatus::Idle => "idle",
            SessionStatus::Starting => "starting",
            SessionStatus::Running => "running",
            SessionStatus::WaitingForInput => "waiting",
            SessionStatus::Done => "done",
            SessionStatus::Error => "errored",
            SessionStatus::Stopped => "stopped",
            SessionStatus::StopAttentionRequired => "cleanup-required",
        }
    }

    fn cleanup_required(self) -> bool {
        matches!(self, SessionStatus::StopAttentionRequired)
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
enum PermissionMode {
    ReadOnly,
    AcceptEdits,
    BypassPermissions,
}

impl PermissionMode {
    fn from_projection(value: &str) -> Self {
        match value {
            "read_only" | "readonly" | "ReadOnly" | "Read-only" => PermissionMode::ReadOnly,
            "accept_edits" | "AcceptEdits" | "write_capable" | "Write-capable" => {
                PermissionMode::AcceptEdits
            }
            "bypass_permissions" | "BypassPermissions" => PermissionMode::BypassPermissions,
            _ => PermissionMode::ReadOnly,
        }
    }

    fn label(self) -> &'static str {
        match self {
            PermissionMode::ReadOnly => "Read-only",
            PermissionMode::AcceptEdits => "Write-capable",
            PermissionMode::BypassPermissions => "Bypass permissions",
        }
    }

    fn is_write_capable(self) -> bool {
        !matches!(self, PermissionMode::ReadOnly)
    }
}

#[derive(Clone, Debug, PartialEq, Eq)]
struct AgentSession {
    id: String,
    operation_id: Option<String>,
    display_name: String,
    kind: AgentKind,
    status: SessionStatus,
    host: String,
    repo_path: PathBuf,
    worktree_path: Option<PathBuf>,
    permission_mode: PermissionMode,
    command: String,
    started_at: String,
    captured_at: Option<String>,
    last_sent_at: Option<String>,
    stopped_at: Option<String>,
    last_output_preview: String,
    log_path: Option<PathBuf>,
    tmux_session_name: Option<String>,
    attach_command: Option<String>,
    send_command_template: Option<String>,
    stop_command: Option<String>,
    safety_labels: Vec<String>,
}

#[derive(Clone, Debug, PartialEq, Eq)]
struct ClaudeLifecycleRequest {
    id: String,
    operation_id: String,
    lane_id: Option<String>,
    delegation_role: Option<String>,
    priority: Option<String>,
    depends_on: Vec<String>,
    action: String,
    status: String,
    display_name: String,
    session_id: Option<String>,
    registry_path: String,
    request_path: Option<String>,
    evidence_path: Option<String>,
    grant_path: Option<String>,
    result_path: Option<String>,
    next_cli_command: String,
    updated_at: String,
    safety_labels: Vec<String>,
}

impl AgentSession {
    fn verifier_required(&self) -> bool {
        matches!(
            self.kind,
            AgentKind::ClaudeBackground
                | AgentKind::ClaudeTmux
                | AgentKind::ClaudePty
                | AgentKind::ClaudePrint
        ) && !matches!(self.status, SessionStatus::Idle | SessionStatus::Stopped)
    }
}

#[derive(Clone, Debug, PartialEq, Eq)]
#[allow(dead_code)]
struct ClaudeCommand {
    program: PathBuf,
    args: Vec<String>,
}

#[allow(dead_code)]
impl ClaudeCommand {
    fn new(program: PathBuf, args: impl IntoIterator<Item = impl Into<String>>) -> Self {
        Self {
            program,
            args: args.into_iter().map(Into::into).collect(),
        }
    }

    fn display_string(&self) -> String {
        std::iter::once(self.program.display().to_string())
            .chain(self.args.iter().map(|arg| {
                if arg.contains(char::is_whitespace) {
                    format!("\"{}\"", arg.replace('"', "\\\""))
                } else {
                    arg.clone()
                }
            }))
            .collect::<Vec<_>>()
            .join(" ")
    }
}

#[derive(Clone, Debug)]
#[allow(dead_code)]
struct ClaudeBackgroundAdapter {
    claude_bin: PathBuf,
}

#[allow(dead_code)]
impl ClaudeBackgroundAdapter {
    fn new(path: impl Into<PathBuf>) -> Self {
        Self {
            claude_bin: path.into(),
        }
    }

    fn start_command(&self, task: &str) -> ClaudeCommand {
        ClaudeCommand::new(self.claude_bin.clone(), ["--bg", task])
    }

    fn logs_command(&self, session_id: &str) -> ClaudeCommand {
        ClaudeCommand::new(self.claude_bin.clone(), ["logs", session_id])
    }

    fn stop_command(&self, session_id: &str) -> ClaudeCommand {
        ClaudeCommand::new(self.claude_bin.clone(), ["stop", session_id])
    }

    fn attach_command(&self, session_id: &str) -> ClaudeCommand {
        ClaudeCommand::new(self.claude_bin.clone(), ["attach", session_id])
    }

    fn launch_background(&self, task: &str) -> Result<String> {
        let output = self.run(self.start_command(task))?;
        parse_claude_background_session_id(&output).ok_or_else(|| {
            anyhow::anyhow!(
                "claude --bg did not return a recognizable session id; output: {}",
                output.trim()
            )
        })
    }

    fn logs(&self, session_id: &str) -> Result<String> {
        self.run(self.logs_command(session_id))
    }

    fn stop(&self, session_id: &str) -> Result<String> {
        self.run(self.stop_command(session_id))
    }

    fn run(&self, command: ClaudeCommand) -> Result<String> {
        let output = Command::new(&command.program)
            .args(&command.args)
            .output()
            .with_context(|| format!("running {}", command.display_string()))?;
        if !output.status.success() {
            anyhow::bail!(
                "{} failed with status {}: {}",
                command.display_string(),
                output.status,
                String::from_utf8_lossy(&output.stderr).trim()
            );
        }
        Ok(String::from_utf8_lossy(&output.stdout).to_string())
    }
}

#[allow(dead_code)]
fn parse_claude_background_session_id(output: &str) -> Option<String> {
    let trimmed = output.trim();
    if trimmed.is_empty() {
        return None;
    }

    if let Ok(value) = serde_json::from_str::<Value>(trimmed) {
        if let Some(id) = value.get("session_id").and_then(Value::as_str) {
            return Some(id.to_string());
        }
        if let Some(id) = value.get("id").and_then(Value::as_str) {
            return Some(id.to_string());
        }
    }

    for line in trimmed
        .lines()
        .rev()
        .map(str::trim)
        .filter(|line| !line.is_empty())
    {
        for marker in ["session_id:", "session_id=", "Session ID:", "session:"] {
            if let Some((_, rest)) = line.split_once(marker) {
                let candidate = rest.trim().trim_matches('`');
                if !candidate.is_empty() {
                    return Some(candidate.to_string());
                }
            }
        }
    }

    None
}

fn projection_fingerprint(path: &str) -> Result<FileFingerprint> {
    let resolved_path = resolve_projection_path(path);
    let metadata =
        fs::metadata(&resolved_path).with_context(|| format!("reading metadata for {path}"))?;
    Ok(FileFingerprint {
        modified: metadata.modified().ok(),
        len: metadata.len(),
    })
}

fn load_projection(path: &str) -> Result<(Value, FileFingerprint)> {
    let fingerprint = projection_fingerprint(path)?;
    let resolved_path = resolve_projection_path(path);
    let raw = fs::read_to_string(&resolved_path)
        .with_context(|| format!("reading projection file {path}"))?;
    let projection =
        serde_json::from_str(&raw).with_context(|| format!("parsing projection JSON {path}"))?;
    Ok((projection, fingerprint))
}

impl AppState {
    fn from_projection(path: &str) -> Result<Self> {
        let (projection, fingerprint) = load_projection(path)?;
        let now = SystemTime::now();
        Ok(Self {
            projection,
            selected_card: 0,
            current_source_name: source_name_for_path(path),
            trust_filter: false,
            help_visible: false,
            reload: ReloadState {
                last_loaded_at: Some(now),
                last_changed_at: fingerprint.modified,
                last_error: None,
                fingerprint: Some(fingerprint),
            },
        })
    }

    fn reload_projection_from_disk(&mut self, path: &str, force: bool) -> Result<bool> {
        let fingerprint = match projection_fingerprint(path) {
            Ok(fingerprint) => fingerprint,
            Err(error) => {
                self.reload.last_error =
                    Some(format!("reading projection metadata {path}: {error:#}"));
                return Ok(false);
            }
        };

        if !force && self.reload.fingerprint == Some(fingerprint) {
            return Ok(false);
        }

        self.reload.last_changed_at = fingerprint.modified;
        self.reload.fingerprint = Some(fingerprint);

        let raw = match fs::read_to_string(resolve_projection_path(path)) {
            Ok(raw) => raw,
            Err(error) => {
                self.reload.last_error = Some(format!("reading projection file {path}: {error}"));
                return Ok(false);
            }
        };

        match serde_json::from_str(&raw) {
            Ok(projection) => {
                self.projection = projection;
                self.selected_card = self.selected_card.min(self.cards().len().saturating_sub(1));
                self.reload.last_loaded_at = Some(SystemTime::now());
                self.reload.last_error = None;
                Ok(true)
            }
            Err(error) => {
                self.reload.last_error = Some(format!("parsing projection JSON {path}: {error}"));
                Ok(false)
            }
        }
    }

    fn switch_source_by_key(&mut self, key: char, current_path: &mut String) -> bool {
        let Some(source) = projection_source_catalog()
            .iter()
            .find(|source| source.key == key)
        else {
            return false;
        };
        self.switch_to_source(source.name, source.path, current_path)
    }

    fn switch_to_source(&mut self, name: &str, path: &str, current_path: &mut String) -> bool {
        self.current_source_name = name.to_string();

        match load_projection(path) {
            Ok((projection, fingerprint)) => {
                *current_path = path.to_string();
                self.projection = projection;
                self.selected_card = 0;
                self.reload = ReloadState {
                    last_loaded_at: Some(SystemTime::now()),
                    last_changed_at: fingerprint.modified,
                    last_error: None,
                    fingerprint: Some(fingerprint),
                };
                true
            }
            Err(error) => {
                self.reload.last_error =
                    Some(format!("source {name} unavailable at {path}: {error:#}"));
                false
            }
        }
    }

    fn cards(&self) -> Vec<&Value> {
        self.projection
            .get("cards")
            .and_then(Value::as_array)
            .map(|cards| cards.iter().collect())
            .unwrap_or_default()
    }

    fn warnings(&self) -> Vec<&Value> {
        self.projection
            .get("warnings")
            .and_then(Value::as_array)
            .map(|warnings| warnings.iter().collect())
            .unwrap_or_default()
    }

    fn claude_sessions(&self) -> Vec<AgentSession> {
        self.projection
            .get("claude_sessions")
            .and_then(Value::as_array)
            .map(|sessions| sessions.iter().map(agent_session_from_projection).collect())
            .unwrap_or_default()
    }

    fn claude_lifecycle_requests(&self) -> Vec<ClaudeLifecycleRequest> {
        self.projection
            .get("claude_lifecycle_requests")
            .and_then(Value::as_array)
            .map(|requests| {
                requests
                    .iter()
                    .map(claude_lifecycle_request_from_projection)
                    .collect()
            })
            .unwrap_or_default()
    }

    fn selected_task_id(&self) -> Option<String> {
        self.cards()
            .get(self.selected_card)
            .and_then(|card| text(card, "task_id"))
    }
}

fn agent_session_from_projection(value: &Value) -> AgentSession {
    let id = text(value, "id").unwrap_or_else(|| "unknown-session".to_string());
    let kind = text(value, "kind")
        .map(|kind| AgentKind::from_projection(&kind))
        .unwrap_or(AgentKind::ClaudeBackground);
    let status = text(value, "status")
        .map(|status| SessionStatus::from_projection(&status))
        .unwrap_or(SessionStatus::Idle);
    let permission_mode = text(value, "permission_mode")
        .map(|mode| PermissionMode::from_projection(&mode))
        .unwrap_or(PermissionMode::ReadOnly);
    let display_name = text(value, "display_name").unwrap_or_else(|| id.clone());
    let repo_path = text(value, "repo_path")
        .map(PathBuf::from)
        .unwrap_or_else(|| PathBuf::from("."));

    AgentSession {
        id,
        operation_id: text(value, "operation_id"),
        display_name,
        kind,
        status,
        host: text(value, "host").unwrap_or_else(|| "unknown-host".to_string()),
        repo_path,
        worktree_path: text(value, "worktree_path").map(PathBuf::from),
        permission_mode,
        command: text(value, "command").unwrap_or_else(|| kind.label().to_string()),
        started_at: text(value, "started_at").unwrap_or_else(|| "unknown-start".to_string()),
        captured_at: text(value, "captured_at"),
        last_sent_at: text(value, "last_sent_at"),
        stopped_at: text(value, "stopped_at"),
        last_output_preview: text(value, "last_output_preview").unwrap_or_default(),
        log_path: text(value, "log_path").map(PathBuf::from),
        tmux_session_name: text(value, "tmux_session_name"),
        attach_command: text(value, "attach_command"),
        send_command_template: text(value, "send_command_template"),
        stop_command: text(value, "stop_command"),
        safety_labels: string_array(value, "safety_labels"),
    }
}

fn claude_lifecycle_request_from_projection(value: &Value) -> ClaudeLifecycleRequest {
    let id = text(value, "id").unwrap_or_else(|| "unknown-request".to_string());
    ClaudeLifecycleRequest {
        operation_id: text(value, "operation_id").unwrap_or_else(|| id.clone()),
        lane_id: text(value, "lane_id"),
        delegation_role: text(value, "delegation_role"),
        priority: text(value, "priority"),
        depends_on: string_array(value, "depends_on"),
        action: text(value, "action").unwrap_or_else(|| "unknown".to_string()),
        status: text(value, "status").unwrap_or_else(|| "unknown".to_string()),
        display_name: text(value, "display_name").unwrap_or_else(|| id.clone()),
        session_id: text(value, "session_id"),
        registry_path: text(value, "registry_path")
            .unwrap_or_else(|| "unknown-registry".to_string()),
        request_path: text(value, "request_path"),
        evidence_path: text(value, "evidence_path"),
        grant_path: text(value, "grant_path"),
        result_path: text(value, "result_path"),
        next_cli_command: text(value, "next_cli_command")
            .unwrap_or_else(|| "missing CLI guidance".to_string()),
        updated_at: text(value, "updated_at").unwrap_or_else(|| "unknown-update".to_string()),
        safety_labels: string_array(value, "safety_labels"),
        id,
    }
}

fn has_claude_sessions_projection(projection: &Value) -> bool {
    projection
        .get("claude_sessions")
        .and_then(Value::as_array)
        .map(|sessions| !sessions.is_empty())
        .unwrap_or(false)
}

fn has_claude_lifecycle_projection(projection: &Value) -> bool {
    projection
        .get("claude_lifecycle_requests")
        .and_then(Value::as_array)
        .map(|requests| !requests.is_empty())
        .unwrap_or(false)
}

fn main() -> Result<()> {
    let args: Vec<String> = env::args().collect();
    if args.get(1).map(String::as_str) == Some("--smoke") {
        let projection_path = args
            .get(2)
            .map(String::as_str)
            .unwrap_or("../../docs/hermes-cockpit/projection-example.json");
        let width = args
            .get(3)
            .and_then(|value| value.parse::<u16>().ok())
            .unwrap_or(120);
        let height = args
            .get(4)
            .and_then(|value| value.parse::<u16>().ok())
            .unwrap_or(36);
        return smoke_dump(projection_path, width, height);
    }

    let mut projection_path = args
        .get(1)
        .cloned()
        .unwrap_or_else(|| "../../docs/hermes-cockpit/projection-example.json".to_string());
    let mut app = AppState::from_projection(&projection_path)?;

    enable_raw_mode()?;
    let mut stdout = io::stdout();
    execute!(stdout, EnterAlternateScreen)?;
    let backend = CrosstermBackend::new(stdout);
    let mut terminal = Terminal::new(backend)?;

    let result = run_app(&mut terminal, &mut app, &mut projection_path);

    disable_raw_mode()?;
    execute!(terminal.backend_mut(), LeaveAlternateScreen)?;
    terminal.show_cursor()?;

    result
}

fn smoke_dump(projection_path: &str, width: u16, height: u16) -> Result<()> {
    let app = AppState::from_projection(projection_path)?;
    let backend = TestBackend::new(width, height);
    let mut terminal = Terminal::new(backend)?;
    terminal.draw(|frame| render(frame, &app, projection_path))?;
    let screen = terminal
        .backend()
        .buffer()
        .content()
        .iter()
        .map(|cell| cell.symbol())
        .collect::<String>();
    println!("{screen}");
    Ok(())
}

fn handle_key(app: &mut AppState, key: KeyEvent, mut projection_path: Option<&mut String>) -> bool {
    if key.kind != KeyEventKind::Press {
        return false;
    }

    match key.code {
        KeyCode::Char('q') | KeyCode::Esc => true,
        KeyCode::Down | KeyCode::Char('j') => {
            let count = if has_claude_lifecycle_projection(&app.projection) {
                app.claude_lifecycle_requests().len()
            } else {
                app.cards().len()
            };
            if count > 0 {
                app.selected_card = (app.selected_card + 1).min(count - 1);
            }
            false
        }
        KeyCode::Up | KeyCode::Char('k') => {
            app.selected_card = app.selected_card.saturating_sub(1);
            false
        }
        KeyCode::Char('t') => {
            app.trust_filter = !app.trust_filter;
            false
        }
        KeyCode::Char('r') => {
            if let Some(path) = projection_path.as_deref() {
                let _ = app.reload_projection_from_disk(path, true);
            }
            false
        }
        KeyCode::Char('a') => {
            // M014/S02 is display-only: the approval key is intentionally modeled
            // as a read-only no-op. WF3 may add executor wiring after exact gate
            // matching exists, but this reducer must not emit an apply side effect.
            false
        }
        KeyCode::Char('?') => {
            app.help_visible = !app.help_visible;
            false
        }
        KeyCode::Char(key @ '1'..='7') => {
            if let Some(path) = projection_path.as_deref_mut() {
                app.switch_source_by_key(key, path);
            }
            false
        }
        _ => false,
    }
}

fn run_app(
    terminal: &mut Terminal<CrosstermBackend<io::Stdout>>,
    app: &mut AppState,
    projection_path: &mut String,
) -> Result<()> {
    loop {
        let _ = app.reload_projection_from_disk(projection_path.as_str(), false);
        terminal.draw(|frame| render(frame, app, projection_path.as_str()))?;

        if event::poll(Duration::from_millis(150))? {
            if let Event::Key(key) = event::read()? {
                if handle_key(app, key, Some(projection_path)) {
                    return Ok(());
                }
            }
        }
    }
}

fn render(frame: &mut Frame, app: &AppState, projection_path: &str) {
    let root = Layout::default()
        .direction(Direction::Vertical)
        .constraints([
            Constraint::Length(3),
            Constraint::Min(12),
            Constraint::Length(5),
        ])
        .split(frame.area());

    render_header(frame, app, root[0], projection_path);
    render_workspace(frame, app, root[1]);
    render_footer(frame, app, root[2]);
    if app.help_visible {
        render_help_overlay(frame, root[1], app);
    }
}

fn render_help_overlay(frame: &mut Frame, area: Rect, app: &AppState) {
    let help_text = if has_claude_lifecycle_projection(&app.projection) {
        "? help | q/Esc quit\n↑/↓ select lifecycle request | r reload\nClaude lifecycle: REQUEST ONLY / DISPLAY ONLY; CLI required via M019 runner.\nNo TUI apply, no launch/stop/attach key, no source-of-truth mutation.\nRead-only: TUI display never mutates GSD/Kanban/Hermes state."
    } else if has_approval_queue_projection(&app.projection) {
        "? help | q/Esc quit\n↑/↓ or j/k select queue item | r reload\nApproval queue: display-only ledger review; no TUI apply, no executor, no source-of-truth mutation.\nREVIEW ONLY: no apply/action key\nRead-only: TUI display never mutates GSD/Kanban/Hermes state."
    } else {
        "? help | q/Esc quit\n↑/↓ or j/k select card | t trust filter | r reload\n1-7 sources: cards events control watchers approval-queue claude-sessions claude-lifecycle\nApproval pilot: a apply disabled/no-op in S02; WF3 gate required before executor wiring\nRead-only: TUI display never mutates GSD/Kanban/Hermes state."
    };
    let help = Paragraph::new(help_text)
        .style(Style::default().fg(Color::White))
        .wrap(Wrap { trim: false })
        .block(Block::default().borders(Borders::ALL).title("Help"));
    frame.render_widget(help, area);
}

fn render_header(frame: &mut Frame, app: &AppState, area: Rect, projection_path: &str) {
    let card_count = app.cards().len();
    let active_runs = array_len(&app.projection, "active_runs");
    let warnings = app.warnings().len();
    let artifacts = array_len(&app.projection, "artifacts");
    let title = format!(
        " ☤ HERMES COCKPIT | cards: {card_count} | active runs: {active_runs} | warnings: {warnings} | artifacts: {artifacts} "
    );
    let source_label = format!(" | source={}", app.current_source_name);
    let source = source_summary(&app.projection)
        .map(|summary| format!(" | source: {summary}"))
        .unwrap_or_default();
    let header = Paragraph::new(format!(
        "Projection: {projection_path}{source_label}{source}"
    ))
    .style(Style::default().fg(Color::Cyan))
    .block(Block::default().borders(Borders::ALL).title(title));
    frame.render_widget(header, area);
}

fn render_workspace(frame: &mut Frame, app: &AppState, area: Rect) {
    if has_claude_lifecycle_projection(&app.projection) {
        render_claude_lifecycle_workspace(frame, app, area);
        return;
    }

    if has_claude_sessions_projection(&app.projection) {
        render_claude_sessions_workspace(frame, app, area);
        return;
    }

    if has_approval_queue_projection(&app.projection) {
        render_approval_queue_workspace(frame, app, area);
        return;
    }

    if area.width < 130 {
        let rows = Layout::default()
            .direction(Direction::Vertical)
            .constraints([
                Constraint::Percentage(40),
                Constraint::Percentage(18),
                Constraint::Percentage(20),
                Constraint::Percentage(11),
                Constraint::Percentage(11),
            ])
            .split(area);
        render_control_plane(frame, app, rows[0]);
        render_cards(frame, app, rows[1]);
        render_event_stream(frame, app, rows[2]);
        render_artifacts(frame, app, rows[3]);
        render_trust(frame, app, rows[4]);
        return;
    }

    let columns = Layout::default()
        .direction(Direction::Horizontal)
        .constraints([
            Constraint::Percentage(28),
            Constraint::Percentage(42),
            Constraint::Percentage(30),
        ])
        .split(area);

    render_cards(frame, app, columns[0]);
    render_event_stream(frame, app, columns[1]);

    let right = Layout::default()
        .direction(Direction::Vertical)
        .constraints([
            Constraint::Percentage(20),
            Constraint::Percentage(40),
            Constraint::Percentage(20),
            Constraint::Percentage(20),
        ])
        .split(columns[2]);
    render_runs(frame, app, right[0]);
    render_control_plane(frame, app, right[1]);
    render_artifacts(frame, app, right[2]);
    render_trust(frame, app, right[3]);
}

fn render_claude_sessions_workspace(frame: &mut Frame, app: &AppState, area: Rect) {
    if area.width >= 130 {
        let columns = Layout::default()
            .direction(Direction::Horizontal)
            .constraints([
                Constraint::Percentage(28),
                Constraint::Percentage(44),
                Constraint::Percentage(28),
            ])
            .split(area);
        render_claude_roster_panel(frame, app, columns[0]);
        render_claude_detail_panel(frame, app, columns[1]);
        render_claude_safety_panel(frame, app, columns[2]);
        return;
    }

    let rows = Layout::default()
        .direction(Direction::Vertical)
        .constraints([
            Constraint::Percentage(30),
            Constraint::Percentage(45),
            Constraint::Percentage(25),
        ])
        .split(area);
    render_claude_roster_panel(frame, app, rows[0]);
    render_claude_detail_panel(frame, app, rows[1]);
    render_claude_safety_panel(frame, app, rows[2]);
}

fn render_claude_roster_panel(frame: &mut Frame, app: &AppState, area: Rect) {
    let sessions = app.claude_sessions();
    let mut items: Vec<ListItem> = sessions
        .iter()
        .map(|session| {
            ListItem::new(format!(
                "{} {} {} @ {}",
                session.kind.label(),
                session.status.label(),
                session.display_name,
                session.host
            ))
        })
        .collect();

    if items.is_empty() {
        items.push(ListItem::new("No Claude sessions in current projection"));
    }

    frame.render_widget(
        List::new(items).block(Block::default().borders(Borders::ALL).title("Agent Roster")),
        area,
    );
}

fn render_claude_detail_panel(frame: &mut Frame, app: &AppState, area: Rect) {
    let sessions = app.claude_sessions();
    let lines = if let Some(session) = sessions.first() {
        let mut lines = vec![
            Line::from(format!("ID: {}", session.id)),
            Line::from(format!(
                "Operation: {}",
                session.operation_id.as_deref().unwrap_or("projection-only")
            )),
        ];
        if let Some(refresh) = claude_sessions_refresh_line(&app.projection) {
            lines.push(Line::from(refresh));
        }
        if let Some(marker) = session_marker_line(&session.last_output_preview) {
            lines.push(Line::from(marker));
        }
        lines.extend([
            Line::from(format!("Mode: {}", session.kind.label())),
            Line::from(format!("Status: {}", session.status.label())),
            Line::from(format!(
                "Latest: {}",
                sanitize_session_preview(&session.last_output_preview)
            )),
            Line::from(format!("Host: {}", session.host)),
            Line::from(format!("Repo: {}", session.repo_path.display())),
            Line::from(format!(
                "Worktree: {}",
                session
                    .worktree_path
                    .as_ref()
                    .map(|path| path.display().to_string())
                    .unwrap_or_else(|| "none".to_string())
            )),
            Line::from(format!("Command: {}", session.command)),
            Line::from(format!("Started: {}", session.started_at)),
            Line::from(format!(
                "Captured: {}",
                session.captured_at.as_deref().unwrap_or("not captured")
            )),
            Line::from(format!(
                "Last sent: {}",
                session.last_sent_at.as_deref().unwrap_or("not sent")
            )),
            Line::from(format!(
                "Stopped: {}",
                session.stopped_at.as_deref().unwrap_or("not stopped")
            )),
            Line::from(format!(
                "Log: {}",
                session
                    .log_path
                    .as_ref()
                    .map(|path| path.display().to_string())
                    .unwrap_or_else(|| "projection-only".to_string())
            )),
        ]);
        lines
    } else {
        vec![Line::from("No session selected")]
    };

    frame.render_widget(
        Paragraph::new(lines).wrap(Wrap { trim: false }).block(
            Block::default()
                .borders(Borders::ALL)
                .title("Session Detail / Logs"),
        ),
        area,
    );
}

fn render_claude_safety_panel(frame: &mut Frame, app: &AppState, area: Rect) {
    let sessions = app.claude_sessions();
    let lines = if let Some(session) = sessions.first() {
        let stop = session
            .stop_command
            .clone()
            .unwrap_or_else(|| match session.kind {
                AgentKind::ClaudeTmux => format!(
                    "tmux kill-session -t {}",
                    session.tmux_session_name.as_deref().unwrap_or(&session.id)
                ),
                _ => format!("claude stop {}", session.id),
            });
        let attach = session
            .attach_command
            .clone()
            .unwrap_or_else(|| match session.kind {
                AgentKind::ClaudeTmux => format!(
                    "tmux attach -t {}",
                    session.tmux_session_name.as_deref().unwrap_or(&session.id)
                ),
                _ => format!("claude attach {}", session.id),
            });
        let send = session
            .send_command_template
            .clone()
            .unwrap_or_else(|| match session.kind {
                AgentKind::ClaudeTmux => format!(
                    "tmux send-keys -t {} '<prompt>' Enter",
                    session.tmux_session_name.as_deref().unwrap_or(&session.id)
                ),
                _ => "Follow-up: claude attach manually".to_string(),
            });
        vec![
            Line::from("Display-only in Cockpit"),
            Line::from(session.permission_mode.label()),
            Line::from(format!(
                "Write-capable: {}",
                if session.permission_mode.is_write_capable() {
                    "yes"
                } else {
                    "no"
                }
            )),
            Line::from(if session.verifier_required() {
                "Verifier required"
            } else {
                "Verifier already clear"
            }),
            Line::from(if session.status.cleanup_required() {
                "Cleanup required: verify/clear exact Claude processes outside TUI"
            } else {
                "Cleanup required: no"
            }),
            Line::from(format!("Stop: {stop}")),
            Line::from(format!("Attach: {attach}")),
            Line::from(format!("Send: {send}")),
            Line::from(format!(
                "Safety labels: {}",
                if session.safety_labels.is_empty() {
                    "none".to_string()
                } else {
                    session.safety_labels.join(", ")
                }
            )),
            Line::from("No silent commit/push"),
            Line::from("Migi verifies; GSD is truth"),
            Line::from("Display-only in Cockpit"),
        ]
    } else {
        vec![Line::from("No Claude safety state available")]
    };

    frame.render_widget(
        Paragraph::new(lines)
            .style(Style::default().fg(Color::Yellow))
            .wrap(Wrap { trim: false })
            .block(
                Block::default()
                    .borders(Borders::ALL)
                    .title("Safety / Controls"),
            ),
        area,
    );
}

fn render_claude_lifecycle_workspace(frame: &mut Frame, app: &AppState, area: Rect) {
    if area.width >= 130 {
        let columns = Layout::default()
            .direction(Direction::Horizontal)
            .constraints([
                Constraint::Percentage(34),
                Constraint::Percentage(38),
                Constraint::Percentage(28),
            ])
            .split(area);
        render_claude_lifecycle_requests_panel(frame, app, columns[0]);
        render_claude_lifecycle_detail_panel(frame, app, columns[1]);
        render_claude_lifecycle_safety_panel(frame, app, columns[2]);
        return;
    }

    let rows = Layout::default()
        .direction(Direction::Vertical)
        .constraints([
            Constraint::Percentage(34),
            Constraint::Percentage(38),
            Constraint::Percentage(28),
        ])
        .split(area);
    render_claude_lifecycle_requests_panel(frame, app, rows[0]);
    render_claude_lifecycle_detail_panel(frame, app, rows[1]);
    render_claude_lifecycle_safety_panel(frame, app, rows[2]);
}

fn render_claude_lifecycle_requests_panel(frame: &mut Frame, app: &AppState, area: Rect) {
    let requests = app.claude_lifecycle_requests();
    let mut items: Vec<ListItem> = requests
        .iter()
        .map(|request| {
            let session = request
                .session_id
                .as_deref()
                .map(|id| format!(" session={id}"))
                .unwrap_or_default();
            let lane = request
                .lane_id
                .as_deref()
                .map(|id| format!(" lane={id}"))
                .unwrap_or_default();
            let role = request
                .delegation_role
                .as_deref()
                .map(|role| format!(" role={role}"))
                .unwrap_or_default();
            ListItem::new(format!(
                "{} {} {}{}{}{}",
                request.action, request.status, request.display_name, lane, role, session
            ))
        })
        .collect();

    if items.is_empty() {
        items.push(ListItem::new("No Claude lifecycle requests loaded"));
    }

    frame.render_widget(
        List::new(items).block(
            Block::default()
                .borders(Borders::ALL)
                .title("Claude lifecycle [REQUEST ONLY]"),
        ),
        area,
    );
}

fn render_claude_lifecycle_detail_panel(frame: &mut Frame, app: &AppState, area: Rect) {
    let requests = app.claude_lifecycle_requests();
    let lines = if let Some(request) = requests.get(app.selected_card).or_else(|| requests.first())
    {
        vec![
            Line::from("DISPLAY ONLY"),
            Line::from(format!("Request: {}", request.id)),
            Line::from(format!("Operation: {}", request.operation_id)),
            Line::from(format!(
                "Lane: {}",
                request
                    .lane_id
                    .clone()
                    .unwrap_or_else(|| "not specified".to_string())
            )),
            Line::from(format!(
                "Role: {}",
                request
                    .delegation_role
                    .clone()
                    .unwrap_or_else(|| "not specified".to_string())
            )),
            Line::from(format!(
                "Priority: {}",
                request
                    .priority
                    .clone()
                    .unwrap_or_else(|| "normal".to_string())
            )),
            Line::from(format!(
                "Depends: {}",
                if request.depends_on.is_empty() {
                    "none".to_string()
                } else {
                    request.depends_on.join(", ")
                }
            )),
            Line::from(format!(
                "Next CLI action: {}",
                lifecycle_cli_action(&request.next_cli_command)
            )),
            Line::from(format!("Action: {}", request.action)),
            Line::from(format!("Status: {}", request.status)),
            Line::from(format!("Name: {}", request.display_name)),
            Line::from(format!(
                "Session: {}",
                request
                    .session_id
                    .clone()
                    .unwrap_or_else(|| "not assigned".to_string())
            )),
            Line::from(format!("Registry: {}", request.registry_path)),
            Line::from(format!(
                "Request file: {}",
                optional_basename(request.request_path.as_deref())
            )),
            Line::from(format!(
                "Evidence: {}",
                optional_basename(request.evidence_path.as_deref())
            )),
            Line::from(format!(
                "Grant: {}",
                optional_basename(request.grant_path.as_deref())
            )),
            Line::from(format!(
                "Result: {}",
                optional_basename(request.result_path.as_deref())
            )),
            Line::from(format!("Updated: {}", request.updated_at)),
            Line::from(format!(
                "Next CLI: {}",
                compact_label(&request.next_cli_command, 120)
            )),
        ]
    } else {
        vec![Line::from("No request selected")]
    };

    frame.render_widget(
        Paragraph::new(lines).wrap(Wrap { trim: false }).block(
            Block::default()
                .borders(Borders::ALL)
                .title("Lifecycle Evidence [DISPLAY ONLY]"),
        ),
        area,
    );
}

fn render_claude_lifecycle_safety_panel(frame: &mut Frame, app: &AppState, area: Rect) {
    let requests = app.claude_lifecycle_requests();
    let mut lines = vec![
        Line::from("CLI required"),
        Line::from("No TUI apply"),
        Line::from("No TUI launch/stop/attach"),
        Line::from("No real Claude in automated tests"),
        Line::from("No auto-commit/push"),
        Line::from("Migi verifies; GSD is truth"),
    ];
    for request in requests.iter().take(3) {
        if request.lane_id.is_some()
            || request.delegation_role.is_some()
            || !request.depends_on.is_empty()
        {
            let lane = request.lane_id.as_deref().unwrap_or("not specified");
            let role = request
                .delegation_role
                .as_deref()
                .unwrap_or("not specified");
            let priority = request.priority.as_deref().unwrap_or("normal");
            let depends = if request.depends_on.is_empty() {
                "none".to_string()
            } else {
                request.depends_on.join(", ")
            };
            lines.push(Line::from(format!(
                "Lane: {lane} | Role: {role} | Priority: {priority} | Depends: {depends}"
            )));
        }
        lines.push(Line::from(format!(
            "CLI {}: {}",
            request.id,
            compact_label(&request.next_cli_command, 92)
        )));
        if !request.safety_labels.is_empty() {
            lines.push(Line::from(format!(
                "Labels: {}",
                request.safety_labels.join(", ")
            )));
        }
    }

    frame.render_widget(
        Paragraph::new(lines)
            .style(Style::default().fg(Color::Yellow))
            .wrap(Wrap { trim: false })
            .block(
                Block::default()
                    .borders(Borders::ALL)
                    .title("Lifecycle Safety / CLI Guidance"),
            ),
        area,
    );
}

fn optional_basename(path: Option<&str>) -> String {
    path.map(evidence_basename)
        .unwrap_or_else(|| "not available".to_string())
}

fn lifecycle_cli_action(command: &str) -> &'static str {
    if command.contains("prepare-launch") {
        "prepare-launch"
    } else if command.contains("prepare-stop") {
        "prepare-stop"
    } else if command.contains("grant-launch") {
        "grant-launch"
    } else if command.contains("grant-stop") {
        "grant-stop"
    } else {
        "manual CLI"
    }
}

fn render_approval_queue_workspace(frame: &mut Frame, app: &AppState, area: Rect) {
    if area.width >= 130 {
        let columns = Layout::default()
            .direction(Direction::Horizontal)
            .constraints([Constraint::Percentage(50), Constraint::Percentage(50)])
            .split(area);
        let right = Layout::default()
            .direction(Direction::Vertical)
            .constraints([
                Constraint::Percentage(38),
                Constraint::Percentage(27),
                Constraint::Percentage(35),
            ])
            .split(columns[1]);
        render_approval_queue_panel(frame, app, columns[0]);
        render_approval_ledger_panel(frame, app, right[0]);
        render_approval_no_go_panel(frame, app, right[1]);
        render_approval_queue_safety_panel(frame, app, right[2]);
        return;
    }

    let rows = Layout::default()
        .direction(Direction::Vertical)
        .constraints([
            Constraint::Percentage(34),
            Constraint::Percentage(24),
            Constraint::Percentage(17),
            Constraint::Percentage(25),
        ])
        .split(area);
    render_approval_queue_panel(frame, app, rows[0]);
    render_approval_ledger_panel(frame, app, rows[1]);
    render_approval_no_go_panel(frame, app, rows[2]);
    render_approval_queue_safety_panel(frame, app, rows[3]);
}

fn render_approval_queue_panel(frame: &mut Frame, app: &AppState, area: Rect) {
    let panel = Paragraph::new(approval_queue_lines(&app.projection, area.width))
        .wrap(Wrap { trim: false })
        .block(
            Block::default()
                .borders(Borders::ALL)
                .title("Approval Queue [REVIEW ONLY]"),
        );
    frame.render_widget(panel, area);
}

fn render_approval_ledger_panel(frame: &mut Frame, app: &AppState, area: Rect) {
    let panel = Paragraph::new(approval_ledger_lines(&app.projection, area.width))
        .wrap(Wrap { trim: false })
        .block(
            Block::default()
                .borders(Borders::ALL)
                .title("Evidence Ledger [DISPLAY ONLY]"),
        );
    frame.render_widget(panel, area);
}

fn render_approval_no_go_panel(frame: &mut Frame, app: &AppState, area: Rect) {
    let panel = Paragraph::new(approval_no_go_lines(&app.projection, area.width))
        .wrap(Wrap { trim: false })
        .block(
            Block::default()
                .borders(Borders::ALL)
                .title("No-go Records"),
        );
    frame.render_widget(panel, area);
}

fn render_approval_queue_safety_panel(frame: &mut Frame, app: &AppState, area: Rect) {
    let panel = Paragraph::new(approval_queue_safety_lines(&app.projection, area.width))
        .style(Style::default().fg(Color::Yellow))
        .wrap(Wrap { trim: false })
        .block(
            Block::default()
                .borders(Borders::ALL)
                .title("Queue Safety / Non-Claims"),
        );
    frame.render_widget(panel, area);
}

fn render_cards(frame: &mut Frame, app: &AppState, area: Rect) {
    let selected_task = app.selected_task_id();
    let mut items: Vec<ListItem> = app
        .cards()
        .iter()
        .enumerate()
        .map(|(idx, card)| {
            let task = text(card, "task_id").unwrap_or_else(|| "unknown-task".into());
            let title = text(card, "title")
                .or_else(|| text(card, "card_title"))
                .unwrap_or_else(|| "Untitled card".into());
            let warning_count = number(card, "warning_count").unwrap_or(0);
            let style = if Some(task.clone()) == selected_task {
                Style::default()
                    .fg(Color::Black)
                    .bg(Color::Cyan)
                    .add_modifier(Modifier::BOLD)
            } else if warning_count > 0 {
                Style::default().fg(Color::Yellow)
            } else {
                Style::default()
            };
            ListItem::new(vec![Line::from(vec![
                Span::styled(
                    format!("{} ", idx + 1),
                    Style::default().fg(Color::DarkGray),
                ),
                Span::styled(format!("{task} "), Style::default().fg(Color::Magenta)),
                Span::raw(title),
            ])])
            .style(style)
        })
        .collect();

    if items.is_empty() {
        items.push(ListItem::new("No cards in current projection"));
    }

    let list = List::new(items).block(
        Block::default()
            .borders(Borders::ALL)
            .title("GSD / Kanban Cards [focus]"),
    );
    frame.render_widget(list, area);
}

fn render_event_stream(frame: &mut Frame, app: &AppState, area: Rect) {
    let selected_task = app.selected_task_id();
    let replay = app
        .projection
        .get("replay")
        .and_then(Value::as_array)
        .cloned()
        .unwrap_or_default();

    let mut lines = Vec::new();
    for event in replay.iter() {
        if let Some(task) = selected_task.as_deref() {
            if text(event, "task_id").as_deref() != Some(task) {
                continue;
            }
        }
        if app.trust_filter {
            let trust = event
                .get("trust")
                .and_then(|value| text(value, "status"))
                .unwrap_or_else(|| "unknown".into());
            if trust == "verified" || trust == "unknown" {
                continue;
            }
        }
        let ts = text(event, "ts").unwrap_or_else(|| "no-ts".into());
        let kind = text(event, "event_type").unwrap_or_else(|| "event".into());
        let summary = text(event, "summary")
            .or_else(|| {
                event
                    .get("replay")
                    .and_then(|replay| text(replay, "summary"))
            })
            .unwrap_or_else(|| "no summary".into());
        lines.push(Line::from(vec![
            Span::styled(format!("{ts} "), Style::default().fg(Color::DarkGray)),
            Span::styled(format!("{kind:<18} "), Style::default().fg(Color::Green)),
            Span::raw(summary),
        ]));
    }

    if lines.is_empty() {
        lines.push(Line::from("No events for current filter."));
    }

    let panel = Paragraph::new(lines).wrap(Wrap { trim: false }).block(
        Block::default()
            .borders(Borders::ALL)
            .title("Replay / Event Stream"),
    );
    frame.render_widget(panel, area);
}

fn render_runs(frame: &mut Frame, app: &AppState, area: Rect) {
    let runs = app
        .projection
        .get("active_runs")
        .and_then(Value::as_array)
        .into_iter()
        .flatten()
        .chain(
            app.projection
                .get("completed_runs")
                .and_then(Value::as_array)
                .into_iter()
                .flatten(),
        );
    let items: Vec<ListItem> = runs
        .map(|run| {
            let status = text(run, "status").unwrap_or_else(|| "unknown".into());
            let run_id = text(run, "run_id").unwrap_or_else(|| "run?".into());
            let agent = text(run, "agent_id").unwrap_or_else(|| "agent?".into());
            let goal = text(run, "goal").unwrap_or_else(|| "no goal".into());
            ListItem::new(format!("[{status}] {run_id} {agent}: {goal}"))
        })
        .collect();
    frame.render_widget(
        List::new(items).block(
            Block::default()
                .borders(Borders::ALL)
                .title("Active / Completed Runs"),
        ),
        area,
    );
}

fn render_control_plane(frame: &mut Frame, app: &AppState, area: Rect) {
    let pilot_action = find_approval_action(&app.projection);
    let Some(control) = app.projection.get("control_plane") else {
        let (lines, title) = if let Some(action) = pilot_action {
            (
                approval_surface_lines(action, area.width),
                "Approval Pilot [RO]",
            )
        } else {
            (
                vec![Line::from("No control-plane projection loaded.")],
                "Control Plane",
            )
        };
        frame.render_widget(
            Paragraph::new(lines)
                .style(Style::default().fg(Color::DarkGray))
                .wrap(Wrap { trim: false })
                .block(Block::default().borders(Borders::ALL).title(title)),
            area,
        );
        return;
    };

    let summary = control.get("summary").unwrap_or(&Value::Null);
    let dry = number(summary, "dry_run_passed_count").unwrap_or(0);
    let applied = number(summary, "applied_count").unwrap_or(0);
    let rejected = number(summary, "rejected_count").unwrap_or(0);
    let mut lines = vec![Line::from(Span::styled(
        format!("dry={dry} apply={applied} reject={rejected}"),
        Style::default()
            .fg(Color::Cyan)
            .add_modifier(Modifier::BOLD),
    ))];

    if let Some(action) = pilot_action {
        lines.extend(approval_surface_lines(action, area.width));
        let panel = Paragraph::new(lines).wrap(Wrap { trim: false }).block(
            Block::default()
                .borders(Borders::ALL)
                .title("Approval Pilot [RO]"),
        );
        frame.render_widget(panel, area);
        return;
    }

    if let Some(disabled) = control
        .get("unsafe_actions_disabled")
        .and_then(Value::as_array)
    {
        for action in disabled.iter().take(1).filter_map(Value::as_str) {
            lines.push(Line::from(Span::styled(
                format!("{action} disabled"),
                Style::default().fg(Color::Yellow),
            )));
        }
    }

    let operations = control
        .get("operations")
        .and_then(Value::as_array)
        .cloned()
        .unwrap_or_default();
    let mut selected_operations = Vec::new();
    for operation in operations.iter() {
        if operation
            .get("requires_approval_before_apply")
            .and_then(Value::as_bool)
            .unwrap_or(false)
        {
            selected_operations.push(operation);
            break;
        }
    }
    for operation in operations.iter() {
        let is_applied = text(operation, "status").as_deref() == Some("applied");
        let has_windows_label = operation
            .get("host_labels")
            .and_then(|labels| text(labels, "windows_gpc"))
            .as_deref()
            == Some("bounded_worker");
        if is_applied && has_windows_label {
            selected_operations.push(operation);
            break;
        }
    }
    if selected_operations.is_empty() {
        selected_operations.extend(operations.iter().take(3));
    }

    for operation in selected_operations {
        let id = text(operation, "operation_id").unwrap_or_else(|| "operation?".into());
        let mode = text(operation, "mode").unwrap_or_else(|| "mode?".into());
        let status = text(operation, "status").unwrap_or_else(|| "status?".into());
        lines.push(Line::from(id));
        lines.push(Line::from(format!("state={mode}/{status}")));
        if operation
            .get("requires_approval_before_apply")
            .and_then(Value::as_bool)
            .unwrap_or(false)
        {
            lines.push(Line::from(Span::styled(
                "approval required",
                Style::default()
                    .fg(Color::Magenta)
                    .add_modifier(Modifier::BOLD),
            )));
        }
        if let Some(host_labels) = operation.get("host_labels") {
            if let Some(label) = text(host_labels, "windows_gpc") {
                lines.push(Line::from(format!("windows_gpc={label}")));
            }
        }
        if let Some(evidence) = text(operation, "evidence_path") {
            let evidence_name = evidence_basename(&evidence);
            lines.push(Line::from(format!("evidence={evidence_name}")));
        }
    }

    if lines.len() == 1 {
        lines.push(Line::from("No control operations."));
    }

    let panel = Paragraph::new(lines).wrap(Wrap { trim: false }).block(
        Block::default()
            .borders(Borders::ALL)
            .title("Control Plane"),
    );
    frame.render_widget(panel, area);
}

fn render_artifacts(frame: &mut Frame, app: &AppState, area: Rect) {
    let items: Vec<ListItem> = app
        .projection
        .get("artifacts")
        .and_then(Value::as_array)
        .into_iter()
        .flatten()
        .map(|artifact| {
            let name = text(artifact, "name").unwrap_or_else(|| "artifact".into());
            let trust = text(artifact, "trust_status").unwrap_or_else(|| "unknown".into());
            let approval = text(artifact, "approval_state").unwrap_or_else(|| "none".into());
            ListItem::new(format!("{name} | trust={trust} | approval={approval}"))
        })
        .collect();
    frame.render_widget(
        List::new(items).block(Block::default().borders(Borders::ALL).title("Artifacts")),
        area,
    );
}

fn render_trust(frame: &mut Frame, app: &AppState, area: Rect) {
    let items: Vec<ListItem> = app
        .warnings()
        .iter()
        .map(|warning| {
            let severity = text(warning, "severity").unwrap_or_else(|| "warning".into());
            let summary = text(warning, "message")
                .or_else(|| text(warning, "summary"))
                .or_else(|| text(warning, "action"))
                .unwrap_or_else(|| "No warning summary".into());
            ListItem::new(format!("⚠ {severity}: {summary}"))
        })
        .collect();
    frame.render_widget(
        List::new(items).block(
            Block::default()
                .borders(Borders::ALL)
                .title("Trust / Approval Warnings"),
        ),
        area,
    );
}

fn render_footer(frame: &mut Frame, app: &AppState, area: Rect) {
    let filter = if app.trust_filter { "ON" } else { "OFF" };
    let approvals_required = app
        .projection
        .get("approvals")
        .and_then(|approvals| approvals.get("required"))
        .and_then(Value::as_array)
        .map(Vec::len)
        .unwrap_or(0);
    let reload_status = reload_status_line(&app.reload);
    let footer_text = if has_claude_lifecycle_projection(&app.projection) {
        format!(
            "q/Esc quit | ↑/↓ select lifecycle request | r reload | source=claude-lifecycle\nREQUEST ONLY / DISPLAY ONLY: CLI required, No TUI apply | {reload_status}\nno launch/stop/attach key; Migi verifies; GSD is truth."
        )
    } else if has_approval_queue_projection(&app.projection) {
        format!(
            "q/Esc quit | ↑/↓ select queue item | r reload | source=approval-queue\nREVIEW ONLY: no apply/action key | {reload_status}\nno source-of-truth mutation: no GSD/Kanban/Hermes; display only."
        )
    } else {
        let apply_status = approval_footer_apply_label(&app.projection);
        format!(
            "q/Esc quit | ↑/↓ select card | t trust filter: {filter} | r reload | focus=cards | approvals required: {approvals_required}\n{apply_status} | {reload_status}\nRead-only demo: no GSD/Kanban/Hermes state is mutated."
        )
    };
    let footer = Paragraph::new(footer_text)
        .style(Style::default().fg(Color::DarkGray))
        .block(
            Block::default()
                .borders(Borders::ALL)
                .title("Controls / Safety"),
        );
    frame.render_widget(footer, area);
}

fn reload_status_line(reload: &ReloadState) -> String {
    let loaded = time_status_label(reload.last_loaded_at);
    let changed = time_status_label(reload.last_changed_at);
    let status = reload
        .last_error
        .as_deref()
        .map(|error| format!("reload error: {}", compact_label(error, 92)))
        .unwrap_or_else(|| "reload=ok".to_string());
    format!("loaded={loaded} changed={changed} {status}")
}

fn time_status_label(time: Option<SystemTime>) -> String {
    time.and_then(|time| time.duration_since(UNIX_EPOCH).ok())
        .map(|duration| format!("{}s", duration.as_secs()))
        .unwrap_or_else(|| "n/a".to_string())
}

fn compact_label(value: &str, max_chars: usize) -> String {
    if value.chars().count() <= max_chars {
        return value.to_string();
    }
    let mut compacted: String = value.chars().take(max_chars.saturating_sub(1)).collect();
    compacted.push('…');
    compacted
}

fn claude_sessions_refresh_line(root: &Value) -> Option<String> {
    let generated_at = text(root, "generated_at")?;
    let sessions = root
        .get("source")
        .and_then(|source| number(source, "session_count"))
        .or_else(|| {
            root.get("claude_sessions")
                .and_then(Value::as_array)
                .map(|items| items.len() as u64)
        });
    Some(match sessions {
        Some(count) => format!("Refresh: generated={generated_at} sessions={count}"),
        None => format!("Refresh: generated={generated_at}"),
    })
}

fn session_marker_line(preview: &str) -> Option<String> {
    preview
        .split_whitespace()
        .map(|token| {
            token.trim_matches(|c: char| {
                matches!(c, ',' | ';' | ':' | ')' | '(' | '[' | ']' | '{' | '}')
            })
        })
        .find(|token| token.contains("_SMOKE_READY") || token.ends_with("_READY"))
        .map(|marker| format!("Marker: {marker}"))
}

fn source_summary(root: &Value) -> Option<String> {
    let Some(source) = root.get("source") else {
        return text(root, "source_file");
    };
    let mode = text(source, "mode");
    let board = text(source, "board");
    let kind = text(source, "kind");
    let name = text(source, "name");
    let session_count = number(source, "session_count");
    let generated_at = text(root, "generated_at").or_else(|| text(source, "generated_at"));

    if name.as_deref() == Some("claude-sessions") {
        let mut parts = vec![name.expect("name checked")];
        if let Some(count) = session_count {
            parts.push(format!("sessions={count}"));
        }
        if let Some(generated_at) = generated_at {
            parts.push(format!("generated={generated_at}"));
        }
        if parts.len() == 1 {
            if let Some(mode) = mode {
                parts.push(mode);
            }
        }
        return Some(parts.join(" "));
    }

    match (mode, board, kind) {
        (Some(mode), Some(board), _) => Some(format!("{mode} {board}")),
        (Some(mode), None, Some(kind)) => Some(format!("{mode} {kind}")),
        (None, Some(board), Some(kind)) => Some(format!("{kind} {board}")),
        (Some(mode), None, None) => Some(mode),
        (None, Some(board), None) => Some(board),
        (None, None, Some(kind)) => Some(kind),
        (None, None, None) => name,
    }
}

fn array_len(root: &Value, key: &str) -> usize {
    root.get(key)
        .and_then(Value::as_array)
        .map(Vec::len)
        .unwrap_or(0)
}

fn text(value: &Value, key: &str) -> Option<String> {
    value
        .get(key)
        .and_then(Value::as_str)
        .map(ToOwned::to_owned)
}

fn sanitize_session_preview(preview: &str) -> String {
    preview
        .split_whitespace()
        .map(|token| {
            let trimmed = token.trim_matches(|c: char| {
                matches!(c, ',' | ';' | ':' | ')' | '(' | '[' | ']' | '{' | '}')
            });
            if trimmed.contains('@') && trimmed.contains('.') {
                "[REDACTED]".to_string()
            } else {
                token.to_string()
            }
        })
        .collect::<Vec<_>>()
        .join(" ")
}

fn number(value: &Value, key: &str) -> Option<u64> {
    value.get(key).and_then(Value::as_u64)
}

fn find_approval_action(root: &Value) -> Option<&Value> {
    root.get("control_plane")
        .and_then(|control| control.get("operations"))
        .and_then(Value::as_array)
        .and_then(|operations| {
            operations.iter().find(|operation| {
                text(operation, "schema_version").as_deref() == Some(APPROVAL_ACTION_SCHEMA)
                    || text(operation, "operation_type").as_deref()
                        == Some(APPROVAL_PILOT_OPERATION)
            })
        })
}

fn evidence_basename(path: &str) -> String {
    path.replace('\\', "/")
        .rsplit('/')
        .next()
        .filter(|value| !value.is_empty())
        .unwrap_or(path)
        .to_string()
}

fn compact_hash(value: &str) -> String {
    if let Some(rest) = value.strip_prefix("sha256:") {
        format!("sha256:{}", rest.chars().take(8).collect::<String>())
    } else {
        compact_label(value, 16)
    }
}

fn has_approval_queue_projection(root: &Value) -> bool {
    root.get("approval_queue").is_some()
        || root.get("approval_ledger").is_some()
        || root.get("no_go_records").is_some()
        || root
            .get("source")
            .and_then(|source| text(source, "contract_id"))
            .as_deref()
            == Some(APPROVAL_QUEUE_CONTRACT)
        || text(root, "schema_version").as_deref() == Some(APPROVAL_QUEUE_SCHEMA)
}

fn approval_queue_entries(root: &Value) -> Vec<&Value> {
    root.get("approval_queue")
        .and_then(|queue| queue.get("entries"))
        .and_then(Value::as_array)
        .map(|entries| entries.iter().collect())
        .unwrap_or_default()
}

fn approval_grants(root: &Value) -> Vec<&Value> {
    root.get("approval_grants")
        .and_then(Value::as_array)
        .map(|grants| grants.iter().collect())
        .unwrap_or_default()
}

fn approval_ledger_rows(root: &Value) -> Vec<&Value> {
    root.get("approval_ledger")
        .and_then(|ledger| ledger.get("rows"))
        .and_then(Value::as_array)
        .map(|rows| rows.iter().collect())
        .unwrap_or_default()
}

fn approval_no_go_records(root: &Value) -> Vec<&Value> {
    root.get("no_go_records")
        .and_then(Value::as_array)
        .map(|records| records.iter().collect())
        .unwrap_or_default()
}

fn nested_text(value: &Value, parent: &str, key: &str) -> Option<String> {
    value.get(parent).and_then(|nested| text(nested, key))
}

fn bool_label(value: &Value, key: &str) -> String {
    value
        .get(key)
        .and_then(Value::as_bool)
        .map(|flag| flag.to_string())
        .unwrap_or_else(|| "unknown".to_string())
}

fn string_array(value: &Value, key: &str) -> Vec<String> {
    value
        .get(key)
        .and_then(Value::as_array)
        .map(|items| {
            items
                .iter()
                .filter_map(Value::as_str)
                .map(ToOwned::to_owned)
                .collect()
        })
        .unwrap_or_default()
}

fn approval_queue_lines(root: &Value, width: u16) -> Vec<Line<'static>> {
    let Some(entry) = approval_queue_entries(root).into_iter().next() else {
        return vec![Line::from("No approval queue entries loaded.")];
    };

    let target = entry
        .get("target")
        .and_then(|target| text(target, "path"))
        .unwrap_or_else(|| "unknown target".to_string());
    let evidence = entry
        .get("dry_run")
        .and_then(|dry_run| text(dry_run, "evidence_path"))
        .map(|path| evidence_basename(&path))
        .unwrap_or_else(|| "missing evidence".to_string());
    let payload = text(entry, "payload_hash")
        .map(|hash| compact_hash(&hash))
        .unwrap_or_else(|| "unknown".to_string());

    let mut lines = vec![
        Line::from(if width <= 64 {
            "M015 queue review only".to_string()
        } else {
            "M015 approval queue review — display only".to_string()
        }),
        Line::from(format!(
            "Queue: {}",
            text(entry, "queue_id").unwrap_or_else(|| "queue?".to_string())
        )),
        Line::from(format!(
            "Operation: {}",
            text(entry, "operation_type").unwrap_or_else(|| "operation?".to_string())
        )),
        Line::from(format!(
            "State: {}",
            text(entry, "state").unwrap_or_else(|| "state?".to_string())
        )),
        Line::from(format!(
            "Approval: {}",
            nested_text(entry, "approval", "status").unwrap_or_else(|| "unknown".to_string())
        )),
        Line::from(format!(
            "Dry-run: {}",
            nested_text(entry, "dry_run", "status").unwrap_or_else(|| "unknown".to_string())
        )),
    ];

    if width <= 64 {
        lines.push(Line::from(format!(
            "Target: {}",
            compact_label(&target, 45)
        )));
    } else {
        lines.push(Line::from(format!("Target: {target}")));
    }
    lines.push(Line::from(format!("Payload: {payload}")));
    lines.push(Line::from(format!("Evidence: {evidence}")));
    lines.push(Line::from("REVIEW ONLY — no TUI apply"));
    lines
}

fn approval_ledger_lines(root: &Value, _width: u16) -> Vec<Line<'static>> {
    let Some(row) = approval_ledger_rows(root).into_iter().next() else {
        return vec![Line::from("No approval ledger rows loaded.")];
    };
    let row_approval_id = text(row, "approval_id");
    let grant = approval_grants(root)
        .into_iter()
        .find(|grant| text(grant, "approval_id") == row_approval_id)
        .or_else(|| approval_grants(root).into_iter().next());
    let decider = grant
        .and_then(|grant| grant.get("decider"))
        .and_then(|decider| text(decider, "id"))
        .unwrap_or_else(|| "unknown".to_string());
    let approval_id = row_approval_id.unwrap_or_else(|| "approval?".to_string());
    let row_hash = text(row, "row_hash")
        .map(|hash| compact_hash(&hash))
        .unwrap_or_else(|| "unknown".to_string());

    vec![
        Line::from(format!(
            "Ledger: {}",
            text(row, "event_type").unwrap_or_else(|| "event?".to_string())
        )),
        Line::from(format!(
            "Row: {}",
            text(row, "ledger_id").unwrap_or_else(|| "row?".to_string())
        )),
        Line::from(format!("Approval grant: {approval_id}")),
        Line::from(format!("Decider: {decider}")),
        Line::from(format!("Row hash: {row_hash}")),
        Line::from(format!(
            "Mutated: source={} target={} db={}",
            bool_label(row, "source_mutated"),
            bool_label(row, "target_mutated"),
            bool_label(row, "direct_db_edit")
        )),
        Line::from("DISPLAY ONLY — no executor"),
    ]
}

fn approval_no_go_lines(root: &Value, width: u16) -> Vec<Line<'static>> {
    let Some(record) = approval_no_go_records(root).into_iter().next() else {
        return vec![Line::from("No no-go records loaded.")];
    };
    let reasons = string_array(record, "rejection_reasons").join("; ");
    let reason_label = if width <= 64 {
        compact_label(&reasons, 54)
    } else {
        reasons
    };

    vec![
        Line::from(format!(
            "No-go record: {}",
            text(record, "status").unwrap_or_else(|| "status?".to_string())
        )),
        Line::from(format!(
            "No-go operation: {}",
            text(record, "operation_type").unwrap_or_else(|| "operation?".to_string())
        )),
        Line::from(format!("No-go keys: {}", no_go_keys_label(record))),
        Line::from(format!("Reasons: {reason_label}")),
    ]
}

fn approval_queue_safety_lines(root: &Value, width: u16) -> Vec<Line<'static>> {
    let non_claims = approval_queue_entries(root)
        .into_iter()
        .next()
        .and_then(|entry| entry.get("audit"))
        .and_then(|audit| audit.get("non_claims"));
    let artifact_only = non_claims
        .and_then(|claims| claims.get("artifact_only"))
        .and_then(Value::as_bool)
        .unwrap_or(true);

    if width <= 64 {
        return vec![
            Line::from("RO no apply"),
            Line::from("no TUI apply"),
            Line::from("No GSD/Kanban/Hermes mutation"),
            Line::from("No executor/worker/watcher/cron/Discord"),
        ];
    }

    vec![
        Line::from("REVIEW ONLY — no TUI apply"),
        Line::from(
            "DISPLAY ONLY — no executor, no worker dispatch, no watcher, no cron, no Discord",
        ),
        Line::from(format!(
            "No GSD/Kanban/Hermes mutation; artifact-only under target/hermes-cockpit-m015/{}",
            if artifact_only { "" } else { " (not asserted)" }
        )),
        Line::from("Manual runner only after a later gate; this surface does not apply"),
    ]
}

fn no_go_keys_label(record: &Value) -> String {
    let Some(no_go) = record.get("no_go").and_then(Value::as_object) else {
        return "none".to_string();
    };
    let preferred = [
        "unsupported_operation",
        "direct_gsd_target",
        "direct_kanban_target",
        "direct_hermes_target",
        "path_traversal",
        "secret_detected",
        "broad_mutation",
        "stale_evidence",
        "unsafe_root",
        "dry_run_evidence_hash_mismatch",
        "payload_hash_mismatch",
        "target_mismatch",
        "ledger_mismatch",
    ];
    let mut keys: Vec<String> = preferred
        .iter()
        .filter(|key| no_go.get(**key).map(no_go_value_active).unwrap_or(false))
        .map(|key| (*key).to_string())
        .collect();

    for (key, value) in no_go {
        if no_go_value_active(value) && !keys.iter().any(|known| known == key) {
            keys.push(key.clone());
        }
    }

    if keys.is_empty() {
        "none".to_string()
    } else {
        keys.join(", ")
    }
}

fn no_go_value_active(value: &Value) -> bool {
    match value {
        Value::Bool(flag) => *flag,
        Value::String(reason) => !reason.is_empty(),
        Value::Array(items) => !items.is_empty(),
        Value::Object(map) => !map.is_empty(),
        Value::Number(number) => number.as_i64().unwrap_or_default() != 0,
        Value::Null => false,
    }
}

fn approval_state(action: &Value) -> String {
    text(action, "approval_state")
        .or_else(|| text(action, "status"))
        .unwrap_or_else(|| "unknown".to_string())
}

fn no_go_reason(action: &Value) -> Option<String> {
    let no_go = action.get("no_go")?.as_object()?;
    no_go.iter().find_map(|(key, value)| match value {
        Value::Bool(true) => Some(key.clone()),
        Value::String(reason) if !reason.is_empty() => Some(format!("{key}: {reason}")),
        Value::Array(items) if !items.is_empty() => Some(key.clone()),
        Value::Object(map) if !map.is_empty() => Some(key.clone()),
        _ => None,
    })
}

fn approval_display_labels(action: &Value) -> (String, String) {
    if no_go_reason(action).is_some() {
        return (
            "No-go blocked".to_string(),
            "Apply disabled: no-go".to_string(),
        );
    }

    match approval_state(action).as_str() {
        "drafted" => (
            "Draft action".to_string(),
            "Apply disabled: not validated".to_string(),
        ),
        "dry_run_required" => (
            "Dry-run required".to_string(),
            "Apply disabled: run dry-run first".to_string(),
        ),
        "dry_run_passed" => (
            "Dry-run passed".to_string(),
            "Apply disabled: approval required".to_string(),
        ),
        "approval_pending" => (
            "Approval pending".to_string(),
            "Apply disabled: waiting approval".to_string(),
        ),
        "approved" => (
            "Approved".to_string(),
            "Apply disabled: executor not wired".to_string(),
        ),
        "denied" => ("Denied".to_string(), "Apply disabled: denied".to_string()),
        "rejected" => (
            "Rejected".to_string(),
            "Apply disabled: contract/no-go failure".to_string(),
        ),
        "apply_blocked" => (
            "Apply blocked".to_string(),
            "Apply disabled: guard mismatch".to_string(),
        ),
        "applied" => (
            "Applied".to_string(),
            "Apply disabled: already applied".to_string(),
        ),
        "verified" => (
            "Verified".to_string(),
            "Apply disabled: verified terminal".to_string(),
        ),
        "compensation_recorded" => (
            "Compensation recorded".to_string(),
            "Apply disabled: follow-up recorded".to_string(),
        ),
        _ => (
            "Unknown approval state".to_string(),
            "Apply disabled: unknown state".to_string(),
        ),
    }
}

fn approval_surface_lines(action: &Value, width: u16) -> Vec<Line<'static>> {
    let (state_label, apply_label) = approval_display_labels(action);
    let mut lines = Vec::new();

    if width <= 64 {
        lines.push(Line::from("Action[RO] audit_note_append"));
        lines.push(Line::from(format!("State {state_label}")));
        lines.push(Line::from(apply_label.clone()));
        if let Some(reason) = no_go_reason(action) {
            lines.push(Line::from(compact_label(&reason, 58)));
        }
        lines.push(Line::from(APPROVAL_SAFETY_SHORT_LABEL.to_string()));
        return lines;
    }

    lines.push(Line::from(format!(
        "Pilot action: {}",
        text(action, "operation_type").unwrap_or_else(|| APPROVAL_PILOT_OPERATION.to_string())
    )));
    lines.push(Line::from(state_label));
    if let Some(reason) = no_go_reason(action) {
        lines.push(Line::from(reason));
    }
    lines.push(Line::from(apply_label));

    if let Some(evidence) = text(action, "evidence_path") {
        lines.push(Line::from(format!(
            "Evidence: {}",
            evidence_basename(&evidence)
        )));
    }
    if let Some(hash) = action
        .get("dry_run")
        .and_then(|dry_run| {
            text(dry_run, "expected_row_hash").or_else(|| text(dry_run, "evidence_hash"))
        })
        .or_else(|| text(action, "payload_hash"))
    {
        lines.push(Line::from(format!("Hash: {}", compact_hash(&hash))));
    }
    if let Some(target) = action.get("target").and_then(|target| text(target, "path")) {
        lines.push(Line::from(format!(
            "Target: {}",
            compact_label(&target, 70)
        )));
    }
    lines.push(Line::from(APPROVAL_SAFETY_LABEL.to_string()));
    lines
}

fn approval_footer_apply_label(root: &Value) -> String {
    find_approval_action(root)
        .map(|action| {
            let (_, apply_label) = approval_display_labels(action);
            format!("a apply: {}", apply_label.trim_start_matches("Apply "))
        })
        .unwrap_or_else(|| "a apply: disabled (no approval action)".to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn claude_background_command_construction_uses_official_bg_logs_stop_attach() {
        let adapter = ClaudeBackgroundAdapter::new("claude");

        assert_eq!(
            adapter.start_command("summarize the repo").args,
            vec!["--bg", "summarize the repo"]
        );
        assert_eq!(
            adapter.logs_command("bg_fake_123").args,
            vec!["logs", "bg_fake_123"]
        );
        assert_eq!(
            adapter.stop_command("bg_fake_123").args,
            vec!["stop", "bg_fake_123"]
        );
        assert_eq!(
            adapter.attach_command("bg_fake_123").args,
            vec!["attach", "bg_fake_123"]
        );
        assert!(
            !adapter
                .start_command("summarize the repo")
                .args
                .contains(&"-p".to_string()),
            "default Claude background path must not use claude -p"
        );
    }

    #[test]
    fn claude_background_adapter_smokes_against_fake_claude_binary() {
        let fixture = FakeClaudeFixture::new("claude-bg-smoke");
        let adapter = ClaudeBackgroundAdapter::new(fixture.binary_path.clone());

        let session_id = adapter
            .launch_background("write a harmless note")
            .expect("fake claude --bg should launch");
        assert_eq!(session_id, "bg_fake_123");

        let logs = adapter
            .logs("bg_fake_123")
            .expect("fake claude logs should return output");
        assert!(
            logs.contains("fake log line for bg_fake_123"),
            "logs should include fake output: {logs}"
        );

        let stop = adapter
            .stop("bg_fake_123")
            .expect("fake claude stop should return output");
        assert!(stop.contains("stopped bg_fake_123"));

        let attach = adapter.attach_command("bg_fake_123").display_string();
        assert!(
            attach.contains("attach bg_fake_123"),
            "attach command should be visible for manual operator use: {attach}"
        );

        let calls = fs::read_to_string(&fixture.call_log).expect("fake call log should be written");
        assert!(
            calls.contains("--bg write a harmless note"),
            "calls={calls}"
        );
        assert!(calls.contains("logs bg_fake_123"), "calls={calls}");
        assert!(calls.contains("stop bg_fake_123"), "calls={calls}");
    }

    struct FakeClaudeFixture {
        binary_path: PathBuf,
        call_log: PathBuf,
    }

    impl FakeClaudeFixture {
        fn new(name: &str) -> Self {
            let dir = env::temp_dir().join(format!(
                "{name}-{}",
                SystemTime::now()
                    .duration_since(UNIX_EPOCH)
                    .expect("test clock should be after epoch")
                    .as_nanos()
            ));
            fs::create_dir_all(&dir).expect("fake claude fixture dir should be created");
            let call_log = dir.join("fake-claude-calls.log");

            #[cfg(unix)]
            let binary_path = {
                use std::os::unix::fs::PermissionsExt;
                let path = dir.join("claude");
                fs::write(
                    &path,
                    r#"#!/usr/bin/env bash
set -euo pipefail
printf '%s\n' "$*" >> "$(dirname "$0")/fake-claude-calls.log"
case "${1:-}" in
  --bg)
    printf 'session_id: bg_fake_123\n'
    ;;
  logs)
    printf 'fake log line for %s\n' "${2:-missing}"
    ;;
  stop)
    printf 'stopped %s\n' "${2:-missing}"
    ;;
  attach)
    printf 'claude attach %s\n' "${2:-missing}"
    ;;
  *)
    printf 'unexpected command: %s\n' "$*" >&2
    exit 2
    ;;
esac
"#,
                )
                .expect("fake claude script should be written");
                let mut permissions = fs::metadata(&path)
                    .expect("fake claude script metadata should exist")
                    .permissions();
                permissions.set_mode(0o755);
                fs::set_permissions(&path, permissions)
                    .expect("fake claude script should be executable");
                path
            };

            #[cfg(windows)]
            let binary_path = {
                let path = dir.join("claude.cmd");
                fs::write(
                    &path,
                    r#"@echo off
>> "%~dp0fake-claude-calls.log" echo %*
if "%1"=="--bg" (
  echo session_id: bg_fake_123
  exit /b 0
)
if "%1"=="logs" (
  echo fake log line for %2
  exit /b 0
)
if "%1"=="stop" (
  echo stopped %2
  exit /b 0
)
if "%1"=="attach" (
  echo claude attach %2
  exit /b 0
)
echo unexpected command: %* 1>&2
exit /b 2
"#,
                )
                .expect("fake claude cmd should be written");
                path
            };

            Self {
                binary_path,
                call_log,
            }
        }
    }

    #[test]
    fn claude_background_surface_renders_roster_detail_and_safety_labels() {
        let projection = serde_json::json!({
            "claude_sessions": [
                {
                    "id": "bg_fake_123",
                    "display_name": "Docs scout",
                    "kind": "ClaudeBackground",
                    "status": "running",
                    "host": "pi",
                    "repo_path": "/home/joe/hermes-workspace",
                    "worktree_path": "/home/joe/hermes-workspace/.worktrees/bg_fake_123",
                    "permission_mode": "read_only",
                    "command": "claude --bg \"write a harmless note\"",
                    "started_at": "2026-05-18T11:30:00Z",
                    "last_output_preview": "fake log line for bg_fake_123",
                    "log_path": "target/hermes-cockpit-m016/bg_fake_123.log"
                }
            ],
            "cards": [],
            "warnings": [],
            "artifacts": []
        });

        let screen = render_projection(projection, "docs/hermes-cockpit/claude-sessions.json");

        for expected in [
            "Claude BG",
            "Docs scout",
            "running",
            "bg_fake_123",
            "pi",
            "/home/joe/hermes-workspace",
            "Read-only",
            "Verifier required",
            "claude stop bg_fake_123",
            "claude attach bg_fake_123",
            "fake log line for bg_fake_123",
        ] {
            assert!(
                screen.contains(expected),
                "missing {expected:?} in screen:\n{screen}"
            );
        }
    }

    #[test]
    fn claude_lifecycle_request_surface_renders_request_only_cli_guidance() {
        let projection = serde_json::json!({
            "schema_version": "hermes-cockpit.claude-lifecycle-projection.v1",
            "source": {"name": "claude-lifecycle", "mode": "request-only"},
            "claude_lifecycle_requests": [
                {
                    "id": "req_launch_docs",
                    "operation_id": "launch-docs-scout",
                    "action": "launch",
                    "status": "approval_pending",
                    "display_name": "Docs scout launch",
                    "registry_path": "target/hermes-cockpit-m020/registry.json",
                    "request_path": "target/hermes-cockpit-m020/launch-request.json",
                    "evidence_path": "target/hermes-cockpit-m020/launch-dry-run.json",
                    "grant_path": "target/hermes-cockpit-m020/launch-grant.json",
                    "result_path": "target/hermes-cockpit-m020/launch-result.json",
                    "next_cli_command": "python3 scripts/hermes-cockpit-claude-bg-lifecycle.py grant-launch --evidence target/hermes-cockpit-m020/launch-dry-run.json --grant target/hermes-cockpit-m020/launch-grant.json --decider joe --ttl-seconds 300",
                    "updated_at": "2026-05-18T23:00:00Z",
                    "safety_labels": ["fake-only", "manual", "no-tui-apply"]
                },
                {
                    "id": "req_stop_docs",
                    "operation_id": "stop-bg_m020_fake",
                    "action": "stop",
                    "status": "granted",
                    "display_name": "Docs scout stop",
                    "session_id": "bg_m020_fake",
                    "registry_path": "target/hermes-cockpit-m020/registry.json",
                    "evidence_path": "target/hermes-cockpit-m020/stop-dry-run.json",
                    "grant_path": "target/hermes-cockpit-m020/stop-grant.json",
                    "result_path": "target/hermes-cockpit-m020/stop-result.json",
                    "next_cli_command": "python3 scripts/hermes-cockpit-claude-bg-lifecycle.py apply-stop --evidence target/hermes-cockpit-m020/stop-dry-run.json --grant target/hermes-cockpit-m020/stop-grant.json --registry target/hermes-cockpit-m020/registry.json --result target/hermes-cockpit-m020/stop-result.json --claude-bin /tmp/m020-fake-claude",
                    "updated_at": "2026-05-18T23:01:00Z",
                    "safety_labels": ["manual", "no-tui-apply"]
                }
            ],
            "cards": [],
            "warnings": [],
            "artifacts": []
        });

        let screen = render_projection(
            projection,
            "target/hermes-cockpit-m021/claude-lifecycle-projection.json",
        );

        for expected in [
            "Claude lifecycle",
            "REQUEST ONLY",
            "DISPLAY ONLY",
            "CLI required",
            "No TUI apply",
            "Docs scout launch",
            "approval_pending",
            "launch-docs-scout",
            "launch-dry-run.json",
            "grant-launch",
            "Docs scout stop",
            "bg_m020_fake",
            "apply-stop",
            "Migi verifies; GSD is truth",
        ] {
            assert!(
                screen.contains(expected),
                "missing {expected:?} in lifecycle request screen:\n{screen}"
            );
        }
        assert!(
            !screen.contains("a apply"),
            "TUI must not advertise an apply key for lifecycle requests: {screen}"
        );
    }

    #[test]
    fn claude_lifecycle_request_surface_renders_parallel_lane_metadata() {
        let projection = serde_json::json!({
            "schema_version": "hermes-cockpit.claude-lifecycle-projection.v1",
            "source": {"name": "claude-lifecycle", "mode": "request-only"},
            "claude_lifecycle_requests": [
                {
                    "id": "draft_wf1_docs",
                    "operation_id": "m021_parallel_smoke-wf1_docs-launch",
                    "lane_id": "wf1_docs",
                    "delegation_role": "docs-scout",
                    "priority": "high",
                    "depends_on": [],
                    "action": "launch",
                    "status": "drafted",
                    "display_name": "Docs scout",
                    "registry_path": "target/hermes-cockpit-m021/registry.json",
                    "request_path": "target/hermes-cockpit-m021/requests/wf1_docs-launch-request.json",
                    "evidence_path": "target/hermes-cockpit-m021/evidence/wf1_docs-dry-run.json",
                    "grant_path": "target/hermes-cockpit-m021/grants/wf1_docs-grant.json",
                    "result_path": "target/hermes-cockpit-m021/results/wf1_docs-result.json",
                    "next_cli_command": "python3 scripts/hermes-cockpit-claude-bg-lifecycle.py prepare-launch --request target/hermes-cockpit-m021/requests/wf1_docs-launch-request.json --registry target/hermes-cockpit-m021/registry.json --evidence target/hermes-cockpit-m021/evidence/wf1_docs-dry-run.json",
                    "updated_at": "2026-05-18T23:30:00Z",
                    "safety_labels": ["REQUEST ONLY", "No TUI apply"]
                },
                {
                    "id": "draft_wf2_review",
                    "operation_id": "m021_parallel_smoke-wf2_review-launch",
                    "lane_id": "wf2_review",
                    "delegation_role": "reviewer",
                    "priority": "normal",
                    "depends_on": ["wf1_docs"],
                    "action": "launch",
                    "status": "drafted",
                    "display_name": "Implementation reviewer",
                    "registry_path": "target/hermes-cockpit-m021/registry.json",
                    "request_path": "target/hermes-cockpit-m021/requests/wf2_review-launch-request.json",
                    "evidence_path": "target/hermes-cockpit-m021/evidence/wf2_review-dry-run.json",
                    "grant_path": "target/hermes-cockpit-m021/grants/wf2_review-grant.json",
                    "result_path": "target/hermes-cockpit-m021/results/wf2_review-result.json",
                    "next_cli_command": "python3 scripts/hermes-cockpit-claude-bg-lifecycle.py prepare-launch --request target/hermes-cockpit-m021/requests/wf2_review-launch-request.json --registry target/hermes-cockpit-m021/registry.json --evidence target/hermes-cockpit-m021/evidence/wf2_review-dry-run.json",
                    "updated_at": "2026-05-18T23:31:00Z",
                    "safety_labels": ["REQUEST ONLY", "parallel"]
                }
            ],
            "cards": [],
            "warnings": [],
            "artifacts": []
        });

        let screen = render_projection(
            projection,
            "target/hermes-cockpit-m021/claude-lifecycle-projection.json",
        );

        for expected in [
            "Lane: wf1_docs",
            "Role: docs-scout",
            "Priority: high",
            "Depends: none",
            "Lane: wf2_review",
            "Role: reviewer",
            "Depends: wf1_docs",
            "prepare-launch",
            "No TUI apply",
        ] {
            assert!(
                screen.contains(expected),
                "missing {expected:?} in parallel lifecycle screen:\n{screen}"
            );
        }
    }

    #[test]
    fn claude_lifecycle_request_surface_arrows_select_parallel_lane_detail() {
        use crossterm::event::{KeyEvent, KeyEventKind, KeyEventState, KeyModifiers};

        let projection = serde_json::json!({
            "schema_version": "hermes-cockpit.claude-lifecycle-projection.v1",
            "source": {"name": "claude-lifecycle", "mode": "request-only"},
            "claude_lifecycle_requests": [
                {
                    "id": "draft_wf1_docs",
                    "operation_id": "m021_parallel_smoke-wf1_docs-launch",
                    "lane_id": "wf1_docs",
                    "delegation_role": "docs-scout",
                    "priority": "high",
                    "depends_on": [],
                    "action": "launch",
                    "status": "drafted",
                    "display_name": "Docs scout",
                    "registry_path": "target/hermes-cockpit-m021/registry.json",
                    "next_cli_command": "python3 scripts/hermes-cockpit-claude-bg-lifecycle.py prepare-launch --request target/hermes-cockpit-m021/requests/wf1_docs-launch-request.json",
                    "updated_at": "2026-05-18T23:30:00Z",
                    "safety_labels": ["REQUEST ONLY", "No TUI apply"]
                },
                {
                    "id": "draft_wf2_review",
                    "operation_id": "m021_parallel_smoke-wf2_review-launch",
                    "lane_id": "wf2_review",
                    "delegation_role": "reviewer",
                    "priority": "normal",
                    "depends_on": ["wf1_docs"],
                    "action": "launch",
                    "status": "drafted",
                    "display_name": "Implementation reviewer",
                    "registry_path": "target/hermes-cockpit-m021/registry.json",
                    "next_cli_command": "python3 scripts/hermes-cockpit-claude-bg-lifecycle.py prepare-launch --request target/hermes-cockpit-m021/requests/wf2_review-launch-request.json",
                    "updated_at": "2026-05-18T23:31:00Z",
                    "safety_labels": ["REQUEST ONLY", "No TUI apply"]
                }
            ],
            "cards": [],
            "warnings": [],
            "artifacts": []
        });
        let mut app = AppState {
            projection,
            selected_card: 0,
            current_source_name: "claude-lifecycle".to_string(),
            trust_filter: false,
            help_visible: false,
            reload: ReloadState::default(),
        };
        let key = KeyEvent {
            code: KeyCode::Down,
            modifiers: KeyModifiers::NONE,
            kind: KeyEventKind::Press,
            state: KeyEventState::NONE,
        };

        assert!(!handle_key(&mut app, key, None));
        let screen = render_app_with_size(
            &app,
            "target/hermes-cockpit-m021/claude-lifecycle-projection.json",
            220,
            40,
        );

        assert!(
            screen.contains("Lane: wf2_review"),
            "selected lane should render: {screen}"
        );
        assert!(
            screen.contains("Depends: wf1_docs"),
            "selected dependency should render: {screen}"
        );
    }

    fn render_app_with_size(
        app: &AppState,
        projection_path: &str,
        width: u16,
        height: u16,
    ) -> String {
        let backend = TestBackend::new(width, height);
        let mut terminal = Terminal::new(backend).expect("test backend should initialize");

        terminal
            .draw(|frame| render(frame, app, projection_path))
            .expect("render should succeed");

        terminal
            .backend()
            .buffer()
            .content()
            .iter()
            .map(|cell| cell.symbol())
            .collect::<String>()
    }

    fn render_projection(projection: Value, projection_path: &str) -> String {
        let app = AppState {
            projection,
            selected_card: 0,
            current_source_name: source_name_for_path(projection_path),
            trust_filter: false,
            help_visible: false,
            reload: ReloadState::default(),
        };
        render_app_with_size(&app, projection_path, 220, 40)
    }

    fn render_sample() -> String {
        let projection: Value = serde_json::from_str(include_str!(
            "../../../docs/hermes-cockpit/projection-example.json"
        ))
        .expect("sample projection should be valid JSON");
        render_projection(projection, "projection-example.json")
    }

    #[test]
    fn claude_sessions_render_stop_attention_required_state() {
        let projection = serde_json::json!({
            "schema_version": "hermes-cockpit.claude-sessions-projection.v1",
            "read_only": true,
            "source": {"name": "claude-sessions", "mode": "read-only"},
            "claude_sessions": [
                {
                    "id": "bg_attention_001",
                    "display_name": "Cleanup Smoke",
                    "kind": "ClaudeBackground",
                    "status": "stop_attention_required",
                    "host": "pi",
                    "repo_path": "/home/joe/hermes-workspace",
                    "worktree_path": null,
                    "permission_mode": "read_only",
                    "command": "claude --bg harmless smoke",
                    "started_at": "2026-05-19T00:00:00Z",
                    "last_output_preview": "Stopped but cleanup required",
                    "log_path": "target/hermes-cockpit-m024/attention.log",
                    "safety_labels": ["cleanup_required", "verifier_required"]
                }
            ]
        });
        let screen = render_projection(
            projection,
            "target/hermes-cockpit-m024/stop-attention-projection.json",
        );

        assert!(
            screen.contains("Claude BG cleanup-required"),
            "roster should label stop-attention sessions distinctly: {screen}"
        );
        assert!(
            screen.contains("Status: cleanup-required"),
            "detail pane should not collapse stop_attention_required to idle: {screen}"
        );
        assert!(
            screen.contains("Cleanup required"),
            "safety panel should call out cleanup requirement: {screen}"
        );
        assert!(
            screen.contains("Verifier required"),
            "attention state must require Migi verification: {screen}"
        );
        assert!(
            screen.contains("Display-only"),
            "TUI must remain display-only, not a lifecycle executor: {screen}"
        );
    }

    #[test]
    fn claude_sessions_render_tmux_manual_guidance() {
        let projection = serde_json::json!({
            "schema_version": "hermes-cockpit.claude-sessions-projection.v1",
            "read_only": true,
            "source": {"name": "claude-sessions", "mode": "read-only"},
            "claude_sessions": [
                {
                    "id": "claude-task-1",
                    "display_name": "Tmux Docs Scout",
                    "kind": "ClaudeTmux",
                    "status": "running",
                    "host": "pi",
                    "repo_path": "/home/joe/hermes-workspace",
                    "worktree_path": null,
                    "permission_mode": "read_only",
                    "command": "cd /home/joe/hermes-workspace && claude",
                    "started_at": "2026-05-19T00:00:00Z",
                    "last_output_preview": "M025 tmux projection ready",
                    "tmux_session_name": "claude-task-1",
                    "attach_command": "tmux attach -t claude-task-1",
                    "send_command_template": "tmux send-keys -t claude-task-1 '<prompt>' Enter",
                    "stop_command": "tmux kill-session -t claude-task-1",
                    "safety_labels": ["interactive", "display_only", "verifier_required"]
                }
            ]
        });
        let screen = render_projection(
            projection,
            "target/hermes-cockpit-m025/tmux-projection.json",
        );
        let smoke_path = std::path::Path::new(env!("CARGO_MANIFEST_DIR"))
            .parent()
            .and_then(std::path::Path::parent)
            .expect("workspace root")
            .join("target/hermes-cockpit-m025/tmux-tui-smoke.txt");
        std::fs::create_dir_all(smoke_path.parent().expect("smoke parent")).ok();
        std::fs::write(smoke_path, &screen).ok();

        assert!(
            screen.contains("Claude tmux running"),
            "roster should label tmux sessions distinctly: {screen}"
        );
        assert!(
            screen.contains("tmux attach -t claude-task-1"),
            "safety panel should show manual tmux attach guidance: {screen}"
        );
        assert!(
            screen.contains("tmux send-keys -t claude-task-1"),
            "safety panel should show manual tmux send guidance: {screen}"
        );
        assert!(
            screen.contains("tmux kill-session -t claude-task-1"),
            "safety panel should show manual tmux kill guidance: {screen}"
        );
        assert!(
            screen.contains("Display-only"),
            "tmux lane must stay display-only: {screen}"
        );
        assert!(
            screen.contains("No silent commit/push"),
            "tmux lane must retain safety guardrail: {screen}"
        );
        assert!(
            screen.contains("Migi verifies"),
            "tmux lane must keep Migi verifier wording: {screen}"
        );
    }

    #[test]
    fn claude_sessions_render_real_tmux_evidence_without_account_identity() {
        let projection = serde_json::json!({
            "schema_version": "hermes-cockpit.claude-sessions-projection.v1",
            "read_only": true,
            "generated_at": "2026-05-19T12:40:00Z",
            "source": {"name": "claude-sessions", "mode": "read-only", "session_count": 1},
            "claude_sessions": [
                {
                    "id": "claude-m026-tmux-dogfood",
                    "operation_id": "m026-real-tmux-dogfood-20260519",
                    "display_name": "M026 real Claude tmux dogfood",
                    "kind": "ClaudeTmux",
                    "status": "stopped",
                    "host": "pi-hermes",
                    "repo_path": "/home/joe/hermes-workspace",
                    "worktree_path": null,
                    "permission_mode": "read_only",
                    "command": "cd /home/joe/hermes-workspace && claude",
                    "started_at": "2026-05-19T10:49:25Z",
                    "captured_at": "2026-05-19T10:51:39Z",
                    "last_sent_at": "2026-05-19T10:50:20Z",
                    "stopped_at": "2026-05-19T10:52:03Z",
                    "last_output_preview": "Welcome back Joe! joe@example.com M026_TMUX_READONLY_SMOKE_READY",
                    "tmux_session_name": "claude-m026-tmux-dogfood",
                    "attach_command": "tmux attach -t claude-m026-tmux-dogfood",
                    "send_command_template": "tmux send-keys -t claude-m026-tmux-dogfood '<prompt>' Enter",
                    "stop_command": "tmux kill-session -t claude-m026-tmux-dogfood",
                    "safety_labels": ["interactive", "display_only", "verifier_required"]
                }
            ]
        });
        let screen = render_projection(
            projection,
            "target/hermes-cockpit-m026-real-tmux-dogfood/registry.json",
        );

        for expected in [
            "claude-sessions sessions=1 generated=2026-05-19T12:40:00Z",
            "M026 real Claude tmux dogfood",
            "Operation: m026-real-tmux-dogfood-20260519",
            "Captured: 2026-05-19T10:51:39Z",
            "Last sent: 2026-05-19T10:50:20Z",
            "Stopped: 2026-05-19T10:52:03Z",
            "M026_TMUX_READONLY_SMOKE_READY",
            "[REDACTED]",
            "interactive, display_only, verifier_required",
        ] {
            assert!(
                screen.contains(expected),
                "missing {expected:?} in real tmux evidence screen:\n{screen}"
            );
        }
        assert!(
            !screen.contains("joe@example.com"),
            "account identity from raw Claude capture must not be rendered: {screen}"
        );
        assert!(
            screen.contains("Display-only"),
            "real tmux evidence lane must stay display-only: {screen}"
        );
    }

    #[test]
    fn claude_sessions_default_smoke_width_keeps_refresh_marker_and_display_only_visible() {
        let projection = serde_json::json!({
            "schema_version": "hermes-cockpit.claude-sessions-projection.v1",
            "read_only": true,
            "generated_at": "2026-05-19T12:40:00Z",
            "source": {"name": "claude-sessions", "session_count": 1},
            "claude_sessions": [
                {
                    "id": "claude-m026-tmux-dogfood",
                    "operation_id": "m026-real-tmux-dogfood-20260519",
                    "display_name": "M026 real Claude tmux dogfood",
                    "kind": "ClaudeTmux",
                    "status": "stopped",
                    "host": "pi-hermes",
                    "repo_path": "/home/joe/hermes-workspace",
                    "worktree_path": null,
                    "permission_mode": "read_only",
                    "command": "cd /home/joe/hermes-workspace && claude",
                    "started_at": "2026-05-19T10:49:25Z",
                    "captured_at": "2026-05-19T10:51:39Z",
                    "last_sent_at": "2026-05-19T10:50:20Z",
                    "stopped_at": "2026-05-19T10:52:03Z",
                    "last_output_preview": "M026_TMUX_READONLY_SMOKE_READY [REDACTED]",
                    "tmux_session_name": "claude-m026-tmux-dogfood",
                    "attach_command": "tmux attach -t claude-m026-tmux-dogfood",
                    "send_command_template": "tmux send-keys -t claude-m026-tmux-dogfood '<prompt>' Enter",
                    "stop_command": "tmux kill-session -t claude-m026-tmux-dogfood",
                    "safety_labels": ["interactive", "display_only", "verifier_required"]
                }
            ]
        });
        let app = AppState {
            projection,
            selected_card: 0,
            current_source_name: "claude-sessions".to_string(),
            trust_filter: false,
            help_visible: false,
            reload: ReloadState::default(),
        };
        let screen = render_app_with_size(
            &app,
            "target/hermes-cockpit-m018/claude-sessions-projection.json",
            120,
            36,
        );

        for expected in [
            "Refresh: generated=2026-05-19T12:40:00Z sessions=1",
            "M026_TMUX_READONLY_SMOKE_READY",
            "Display-only in Cockpit",
        ] {
            assert!(
                screen.contains(expected),
                "default smoke viewport must keep {expected:?} visible:\n{screen}"
            );
        }
    }

    #[test]
    fn operator_ux_help_overlay_toggles_once_and_documents_keys() {
        use crossterm::event::{KeyEvent, KeyEventKind, KeyEventState, KeyModifiers};

        fn key(code: KeyCode, kind: KeyEventKind) -> KeyEvent {
            KeyEvent {
                code,
                modifiers: KeyModifiers::NONE,
                kind,
                state: KeyEventState::NONE,
            }
        }

        let mut app = AppState {
            projection: serde_json::json!({"cards": [], "warnings": [], "artifacts": []}),
            selected_card: 0,
            current_source_name: "custom".to_string(),
            trust_filter: false,
            help_visible: false,
            reload: ReloadState::default(),
        };

        assert!(!handle_key(
            &mut app,
            key(KeyCode::Char('?'), KeyEventKind::Press),
            None
        ));
        assert!(app.help_visible, "? should show the help overlay");

        assert!(!handle_key(
            &mut app,
            key(KeyCode::Char('?'), KeyEventKind::Repeat),
            None
        ));
        assert!(
            app.help_visible,
            "held ? repeat events should not toggle help back off"
        );

        let screen = render_app_with_size(&app, "operator-ux.json", 120, 36);
        assert!(
            screen.contains("Help"),
            "help overlay should render: {screen}"
        );
        assert!(
            screen.contains("r reload"),
            "help should document reload: {screen}"
        );
        assert!(
            screen.contains("t trust filter"),
            "help should document trust filter: {screen}"
        );
        assert!(
            screen.contains("1-7 sources"),
            "help should reserve source switching docs: {screen}"
        );
    }

    #[test]
    fn operator_ux_empty_state_focus_and_filter_are_visible_at_default_width() {
        let app = AppState {
            projection: serde_json::json!({"cards": [], "warnings": [], "artifacts": []}),
            selected_card: 0,
            current_source_name: "custom".to_string(),
            trust_filter: false,
            help_visible: false,
            reload: ReloadState::default(),
        };
        let screen = render_app_with_size(&app, "empty-projection.json", 120, 36);

        assert!(
            screen.contains("No cards in current projection"),
            "cards=0 should be an explicit empty state: {screen}"
        );
        assert!(
            screen.contains("focus=cards"),
            "operator should see the focused region: {screen}"
        );
        assert!(
            screen.contains("trust filter: OFF"),
            "filter state should be explicit at default width: {screen}"
        );
        assert!(
            screen.contains("r reload"),
            "reload key should remain visible: {screen}"
        );
        assert!(
            screen.contains("Read-only demo: no GSD/Kanban/Hermes state is mutated."),
            "read-only safety footer should remain visible: {screen}"
        );
    }

    #[test]
    fn source_switch_catalog_contains_cards_events_control_watchers_and_approval_queue() {
        let sources: Vec<_> = projection_source_catalog()
            .iter()
            .map(|source| (source.key, source.name, source.path))
            .collect();

        assert!(sources.contains(&(
            '1',
            "cards",
            "docs/hermes-cockpit/live-kanban-projection.json"
        )));
        assert!(sources.contains(&(
            '2',
            "events",
            "target/hermes-cockpit-m010/hermes-projection.json"
        )));
        assert!(sources.contains(&(
            '3',
            "control",
            "target/hermes-cockpit-m012/control-plane-projection.json"
        )));
        assert!(sources.contains(&(
            '4',
            "watchers",
            "target/hermes-cockpit-m013/watcher-projection.json"
        )));
        assert!(sources.contains(&(
            '5',
            "approval-queue",
            "target/hermes-cockpit-m015/approval-queue-surface-projection.json"
        )));
        assert!(sources.contains(&(
            '6',
            "claude-sessions",
            "target/hermes-cockpit-m018/claude-sessions-projection.json"
        )));
        assert!(sources.contains(&(
            '7',
            "claude-lifecycle",
            "target/hermes-cockpit-m021/claude-lifecycle-projection.json"
        )));
    }

    #[test]
    fn source_switch_numeric_keys_load_sources_and_missing_preserves_last_good() {
        let mut projection_path =
            "target/hermes-cockpit-m012/control-plane-projection.json".to_string();
        let mut app =
            AppState::from_projection(&projection_path).expect("control source should load");

        assert!(app.switch_source_by_key('1', &mut projection_path));
        assert_eq!(app.current_source_name, "cards");
        assert!(projection_path.ends_with("live-kanban-projection.json"));
        let screen = render_app_with_size(&app, &projection_path, 120, 36);
        assert!(
            screen.contains("source=cards"),
            "current source should render: {screen}"
        );

        let last_good = source_summary(&app.projection);
        let missing_path = temp_projection_path("missing-source");
        assert!(!app.switch_to_source(
            "missing-test",
            missing_path.to_str().expect("temp path should be utf8"),
            &mut projection_path,
        ));
        assert_eq!(source_summary(&app.projection), last_good);
        assert_eq!(app.current_source_name, "missing-test");
        assert!(
            app.reload
                .last_error
                .as_deref()
                .unwrap_or_default()
                .contains("missing-test"),
            "missing source should be visible in reload error: {:?}",
            app.reload.last_error
        );
    }

    #[test]
    fn source_switch_numeric_keys_load_all_known_projection_sources() {
        let mut projection_path = "docs/hermes-cockpit/live-kanban-projection.json".to_string();
        let mut app =
            AppState::from_projection(&projection_path).expect("cards source should load");

        for (key, expected_name, expected_path) in [
            (
                '2',
                "events",
                "target/hermes-cockpit-m010/hermes-projection.json",
            ),
            (
                '3',
                "control",
                "target/hermes-cockpit-m012/control-plane-projection.json",
            ),
            (
                '4',
                "watchers",
                "target/hermes-cockpit-m013/watcher-projection.json",
            ),
            (
                '5',
                "approval-queue",
                "target/hermes-cockpit-m015/approval-queue-surface-projection.json",
            ),
            (
                '6',
                "claude-sessions",
                "target/hermes-cockpit-m018/claude-sessions-projection.json",
            ),
            (
                '7',
                "claude-lifecycle",
                "target/hermes-cockpit-m021/claude-lifecycle-projection.json",
            ),
            (
                '1',
                "cards",
                "docs/hermes-cockpit/live-kanban-projection.json",
            ),
        ] {
            assert!(
                app.switch_source_by_key(key, &mut projection_path),
                "source key {key} should load {expected_name}"
            );
            assert_eq!(app.current_source_name, expected_name);
            assert_eq!(projection_path, expected_path);
            let screen = render_app_with_size(&app, &projection_path, 120, 36);
            assert!(
                screen.contains(&format!("source={expected_name}")),
                "current source should render after switching {key}: {screen}"
            );
        }
    }

    #[test]
    fn source_switch_handle_key_accepts_approval_queue_and_claude_sessions_keys() {
        use crossterm::event::{KeyEvent, KeyEventKind, KeyEventState, KeyModifiers};

        let mut projection_path = "docs/hermes-cockpit/live-kanban-projection.json".to_string();
        let mut app =
            AppState::from_projection(&projection_path).expect("cards source should load");
        let key = KeyEvent {
            code: KeyCode::Char('5'),
            modifiers: KeyModifiers::NONE,
            kind: KeyEventKind::Press,
            state: KeyEventState::NONE,
        };

        assert!(!handle_key(&mut app, key, Some(&mut projection_path)));
        assert_eq!(app.current_source_name, "approval-queue");
        assert_eq!(
            projection_path,
            "target/hermes-cockpit-m015/approval-queue-surface-projection.json"
        );

        let key = KeyEvent {
            code: KeyCode::Char('6'),
            modifiers: KeyModifiers::NONE,
            kind: KeyEventKind::Press,
            state: KeyEventState::NONE,
        };
        assert!(!handle_key(&mut app, key, Some(&mut projection_path)));
        assert_eq!(app.current_source_name, "claude-sessions");
        assert_eq!(
            projection_path,
            "target/hermes-cockpit-m018/claude-sessions-projection.json"
        );

        let key = KeyEvent {
            code: KeyCode::Char('7'),
            modifiers: KeyModifiers::NONE,
            kind: KeyEventKind::Press,
            state: KeyEventState::NONE,
        };
        assert!(!handle_key(&mut app, key, Some(&mut projection_path)));
        assert_eq!(app.current_source_name, "claude-lifecycle");
        assert_eq!(
            projection_path,
            "target/hermes-cockpit-m021/claude-lifecycle-projection.json"
        );
    }

    #[test]
    fn render_shows_projection_titles_and_warning_message() {
        let screen = render_sample();

        assert!(
            screen.contains("Dogfood one Kanban-backed pitch evaluation run"),
            "screen should render card title from projection: {screen}"
        );
        assert!(
            screen.contains("Do not cite hermes-hud"),
            "screen should render warning message from projection: {screen}"
        );
        assert!(
            screen.contains("approvals required: 1"),
            "screen should render approval count from projection: {screen}"
        );
    }

    #[test]
    fn render_shows_live_kanban_projection_and_event_spacing() {
        let projection: Value = serde_json::from_str(include_str!(
            "../../../docs/hermes-cockpit/live-kanban-projection.json"
        ))
        .expect("live projection should be valid JSON");
        let screen = render_projection(projection, "live-kanban-projection.json");

        assert!(
            screen.contains("source: read-only hermes-cockpit-trial"),
            "screen should expose live read-only board source: {screen}"
        );
        assert!(
            screen.contains("ADR: define Hermes Cockpit MVP"),
            "screen should render a live board card title: {screen}"
        );
        assert!(
            screen.contains("kanban_card_observed Observed triage Kanban card"),
            "screen should keep long event types separated from summaries: {screen}"
        );
        assert!(
            screen.contains("Read-only demo: no GSD/Kanban/Hermes state is mutated."),
            "screen should retain the read-only safety footer: {screen}"
        );
    }

    #[test]
    fn render_shows_live_hermes_event_projection() {
        let projection: Value = serde_json::from_str(include_str!(
            "../../../target/hermes-cockpit-m010/hermes-projection.json"
        ))
        .expect("Hermes event projection should be valid JSON");
        let screen = render_projection(
            projection,
            "target/hermes-cockpit-m010/hermes-projection.json",
        );

        assert!(
            screen.contains("source: target/hermes-cockpit-m010/hermes-events.ndjson"),
            "screen should expose the read-only Hermes projection source: {screen}"
        );
        assert!(
            screen.contains("M010 read-only Hermes ingestion fixture"),
            "screen should render the Hermes-ingested card title: {screen}"
        );
        assert!(
            screen.contains("Dogfood a read-only Hermes ingestion fixture"),
            "screen should render at least one Hermes event summary: {screen}"
        );
        assert!(
            screen.contains("run_hermes_hermes-fixture"),
            "screen should render the Hermes run/session identifier: {screen}"
        );
        assert!(
            screen.contains("Read-only demo: no GSD/Kanban/Hermes state is mutated."),
            "screen should retain the read-only safety footer: {screen}"
        );
    }

    #[test]
    fn render_shows_control_plane_projection_status_and_safety() {
        let projection: Value = serde_json::from_str(include_str!(
            "../../../target/hermes-cockpit-m012/control-plane-projection.json"
        ))
        .expect("M012 control-plane projection should be valid JSON");
        let screen = render_projection(
            projection,
            "target/hermes-cockpit-m012/control-plane-projection.json",
        );

        assert!(
            screen.contains("Control Plane"),
            "screen should include a control-plane panel: {screen}"
        );
        assert!(
            screen.contains("dry=4 apply=1 reject=1"),
            "screen should expose dry-run/apply/rejected counts: {screen}"
        );
        assert!(
            screen.contains("op_m012_control_wb_001"),
            "screen should render a control operation id: {screen}"
        );
        assert!(
            screen.contains("approval required"),
            "screen should render required approval state: {screen}"
        );
        assert!(
            screen.contains("direct_db_edit disabled"),
            "screen should show unsafe actions disabled: {screen}"
        );
        assert!(
            screen.contains("m012_s03_windows_worker_smoke"),
            "screen should render Windows/GPC worker operation: {screen}"
        );
        assert!(
            screen.contains("windows_gpc=bounded_worker"),
            "screen should show host boundary labels: {screen}"
        );
    }

    #[test]
    fn trust_filter_ignores_key_repeat_events() {
        use crossterm::event::{KeyEvent, KeyEventKind, KeyEventState, KeyModifiers};

        fn key(code: KeyCode, kind: KeyEventKind) -> KeyEvent {
            KeyEvent {
                code,
                modifiers: KeyModifiers::NONE,
                kind,
                state: KeyEventState::NONE,
            }
        }

        let mut app = AppState {
            projection: serde_json::json!({"cards": []}),
            selected_card: 0,
            current_source_name: "custom".to_string(),
            trust_filter: false,
            help_visible: false,
            reload: ReloadState::default(),
        };

        assert!(!handle_key(
            &mut app,
            key(KeyCode::Char('t'), KeyEventKind::Press),
            None
        ));
        assert!(
            app.trust_filter,
            "initial t press should enable the trust filter"
        );

        assert!(!handle_key(
            &mut app,
            key(KeyCode::Char('t'), KeyEventKind::Repeat),
            None
        ));
        assert!(
            app.trust_filter,
            "held-key repeat events should not immediately toggle the trust filter back off"
        );
    }

    fn approval_action_with_overrides(state: &str, overrides: Value) -> Value {
        let mut action = serde_json::json!({
            "schema_version": "hermes-cockpit.approval-action.v1",
            "contract_id": "m014.s01.approval-action.v1",
            "operation_id": "op_m014_audit_note_001",
            "operation_type": "cockpit.audit_note_append",
            "mode": if state == "approved" { "apply" } else { "dry-run" },
            "status": state,
            "approval_state": state,
            "reason": "approval surface fixture reason",
            "requires_approval_before_apply": true,
            "payload_hash": "sha256:feedfacecafebeef00112233445566778899aabbccddeeff0011223344556677",
            "dry_run": {
                "status": "dry_run_passed",
                "expected_row_hash": "sha256:abcdef1234567890fedcba0987654321abcdef1234567890fedcba0987654321",
                "source_mutated": false,
                "target_mutated": false
            },
            "evidence_path": "target/hermes-cockpit-m014/approval-action-evidence/op_m014_audit_note_001-dry-run.json",
            "target": {
                "system": "artifact",
                "id": "pilot-audit-log",
                "path": "target/hermes-cockpit-m014/pilot-audit-log.jsonl",
                "scope": "m014_sandbox"
            },
            "no_go": {},
            "rejection_reasons": [],
            "source_mutated": false,
            "target_mutated": false
        });

        if let (Some(action), Some(overrides)) = (action.as_object_mut(), overrides.as_object()) {
            for (key, value) in overrides {
                action.insert(key.clone(), value.clone());
            }
        }
        action
    }

    fn approval_projection_with_action(action: Value) -> Value {
        serde_json::json!({
            "active_runs": [],
            "approvals": {
                "required": [{
                    "approval_id": "approval_op_m014_audit_note_001",
                    "operation_id": "op_m014_audit_note_001",
                    "operation_type": "cockpit.audit_note_append",
                    "reason": "explicit approval required before apply",
                    "evidence_path": "target/hermes-cockpit-m014/approval-action-evidence/op_m014_audit_note_001-dry-run.json"
                }]
            },
            "artifacts": [],
            "cards": [],
            "completed_runs": [],
            "control_plane": {
                "summary": {
                    "dry_run_passed_count": 1,
                    "applied_count": 0,
                    "rejected_count": 0
                },
                "operations": [action],
                "unsafe_actions_disabled": ["gsd_kanban_hermes_mutation"]
            },
            "projection_version": "hermes-cockpit.approval-surface-test.v1",
            "replay": [],
            "source": {"kind": "approval-surface-test", "mode": "read-only"},
            "warnings": []
        })
    }

    fn approval_app(state: &str, overrides: Value) -> AppState {
        AppState {
            projection: approval_projection_with_action(approval_action_with_overrides(
                state, overrides,
            )),
            selected_card: 0,
            current_source_name: "control".to_string(),
            trust_filter: false,
            help_visible: false,
            reload: ReloadState::default(),
        }
    }

    fn approval_screen(state: &str, overrides: Value, width: u16) -> String {
        let app = approval_app(state, overrides);
        render_app_with_size(&app, "approval-surface-test.json", width, 36)
    }

    fn test_key(code: KeyCode, kind: KeyEventKind) -> KeyEvent {
        use crossterm::event::{KeyEventState, KeyModifiers};

        KeyEvent {
            code,
            modifiers: KeyModifiers::NONE,
            kind,
            state: KeyEventState::NONE,
        }
    }

    #[test]
    fn approval_surface_renders_disabled_dry_run_required_state() {
        let screen = approval_screen("dry_run_required", serde_json::json!({}), 120);

        assert!(
            screen.contains("Pilot action: cockpit.audit_note_append"),
            "pilot action label should be explicit: {screen}"
        );
        assert!(
            screen.contains("Dry-run required"),
            "dry_run_required should render as an operator label: {screen}"
        );
        assert!(
            screen.contains("Apply disabled: run dry-run first"),
            "dry_run_required must explain why apply is disabled: {screen}"
        );
        assert!(
            screen.contains("RO") && screen.contains("no GSD/Kanban/Hermes mutation"),
            "approval surface must carry the read-only no-mutation boundary: {screen}"
        );
    }

    #[test]
    fn approval_surface_renders_pending_approval_with_evidence() {
        let screen = approval_screen("approval_pending", serde_json::json!({}), 220);

        assert!(
            screen.contains("Approval pending"),
            "pending approval should be title-cased for operators: {screen}"
        );
        assert!(
            screen.contains("Apply disabled: waiting approval"),
            "pending approval must not look executable: {screen}"
        );
        assert!(
            screen.contains("op_m014_audit_note_001-dry-run.json"),
            "evidence filename should be visible without full path noise: {screen}"
        );
        assert!(
            screen.contains("sha256:abcdef12"),
            "compact dry-run hash should be visible: {screen}"
        );
    }

    #[test]
    fn approval_surface_never_marks_unknown_state_as_ready() {
        let screen = approval_screen("surprise_ready", serde_json::json!({}), 120);

        assert!(
            screen.contains("Unknown approval state"),
            "unknown states must be called out: {screen}"
        );
        assert!(
            screen.contains("Apply disabled: unknown state"),
            "unknown states must render disabled: {screen}"
        );
        assert!(
            !screen.contains("Apply pilot"),
            "unknown states must never render an executable apply label: {screen}"
        );
    }

    #[test]
    fn approval_surface_no_go_overrides_approved_label() {
        let screen = approval_screen(
            "approved",
            serde_json::json!({
                "no_go": {"forbidden_target": "GSD/Kanban/Hermes mutation is forbidden"}
            }),
            160,
        );

        assert!(
            screen.contains("No-go blocked"),
            "no-go must override positive approval labels: {screen}"
        );
        assert!(
            screen.contains("forbidden_target")
                || screen.contains("GSD/Kanban/Hermes mutation is forbidden"),
            "first no-go reason should be visible: {screen}"
        );
        assert!(
            screen.contains("Apply disabled: no-go"),
            "no-go states must disable apply: {screen}"
        );
        assert!(
            !screen.contains("Apply pilot"),
            "no-go overrides must never show an executable apply label: {screen}"
        );
    }

    #[test]
    fn approval_surface_approved_still_disabled_without_executor_gate_in_s02() {
        let screen = approval_screen("approved", serde_json::json!({}), 140);

        assert!(
            screen.contains("Approved"),
            "approved state should render: {screen}"
        );
        assert!(
            screen.contains("Apply disabled: executor not wired")
                || screen.contains("Apply available after WF3 gate"),
            "S02 must keep approved actions display-only until WF3: {screen}"
        );
        assert!(
            !screen.contains("Apply pilot"),
            "S02 must not expose executable apply copy: {screen}"
        );
    }

    #[test]
    fn approval_surface_safety_visible_at_80_and_60_columns() {
        let action = approval_action_with_overrides("approval_pending", serde_json::json!({}));
        for width in [80_u16, 60_u16] {
            let projection = approval_projection_with_action(action.clone());
            let app = AppState {
                projection,
                selected_card: 0,
                current_source_name: "control".to_string(),
                trust_filter: false,
                help_visible: false,
                reload: ReloadState::default(),
            };
            let screen = render_app_with_size(&app, "approval-surface-test.json", width, 36);
            assert!(
                screen.contains("Apply DISABLED") || screen.contains("Apply disabled"),
                "width {width} should keep apply-disabled visible: {screen}"
            );
            assert!(
                screen.contains("RO") && screen.contains("no GSD"),
                "width {width} should keep read-only safety visible: {screen}"
            );
        }
    }

    #[test]
    fn approval_surface_help_documents_apply_disabled_and_read_only_boundary() {
        let mut app = approval_app("approval_pending", serde_json::json!({}));
        app.help_visible = true;
        let screen = render_app_with_size(&app, "approval-surface-test.json", 120, 36);

        assert!(
            screen.contains("a apply"),
            "help should document a apply: {screen}"
        );
        assert!(
            screen.contains("disabled"),
            "help should document disabled states: {screen}"
        );
        assert!(
            screen.contains("Read-only") && screen.contains("no GSD/Kanban/Hermes"),
            "help should document the display-only boundary: {screen}"
        );
    }

    #[test]
    fn approval_apply_key_disabled_path_has_no_side_effects() {
        let mut app = approval_app("approved", serde_json::json!({}));
        let before_projection = app.projection.clone();

        assert!(!handle_key(
            &mut app,
            test_key(KeyCode::Char('a'), KeyEventKind::Press),
            None
        ));

        assert_eq!(
            app.projection, before_projection,
            "pressing a in S02 must not mutate the projection"
        );
        let screen = render_app_with_size(&app, "approval-surface-test.json", 120, 36);
        assert!(
            screen.contains("a apply") && screen.contains("disabled"),
            "a key should only surface a disabled/read-only status: {screen}"
        );
    }

    #[test]
    fn approval_apply_key_ignores_repeat_and_release_events() {
        let mut app = approval_app("dry_run_required", serde_json::json!({}));
        let before_projection = app.projection.clone();

        assert!(!handle_key(
            &mut app,
            test_key(KeyCode::Char('a'), KeyEventKind::Repeat),
            None
        ));
        assert!(!handle_key(
            &mut app,
            test_key(KeyCode::Char('a'), KeyEventKind::Release),
            None
        ));

        assert_eq!(
            app.projection, before_projection,
            "repeat/release a events must be ignored without projection mutation"
        );
        let screen = render_app_with_size(&app, "approval-surface-test.json", 120, 36);
        assert!(
            screen.contains("Apply disabled: run dry-run first"),
            "repeat/release events should leave only the display-derived disabled reason: {screen}"
        );
    }

    fn approval_queue_projection_fixture() -> Value {
        let queue_entry: Value = serde_json::from_str(include_str!(
            "../../../tests/fixtures/hermes_cockpit/approval-queue/m015-queue-entry.json"
        ))
        .expect("M015 queue entry fixture should be valid JSON");
        let dry_run_evidence: Value = serde_json::from_str(include_str!(
            "../../../tests/fixtures/hermes_cockpit/approval-queue/m015-dry-run-evidence.json"
        ))
        .expect("M015 dry-run evidence fixture should be valid JSON");
        let approval_grant: Value = serde_json::from_str(include_str!(
            "../../../tests/fixtures/hermes_cockpit/approval-queue/m015-approval-grant.json"
        ))
        .expect("M015 approval grant fixture should be valid JSON");
        let ledger_row: Value = serde_json::from_str(include_str!(
            "../../../tests/fixtures/hermes_cockpit/approval-queue/m015-ledger-row.json"
        ))
        .expect("M015 ledger row fixture should be valid JSON");
        let no_go_record: Value = serde_json::from_str(include_str!(
            "../../../tests/fixtures/hermes_cockpit/approval-queue/m015-no-go-record.json"
        ))
        .expect("M015 no-go fixture should be valid JSON");

        serde_json::json!({
            "projection_version": "hermes-cockpit.approval-queue-surface.v1",
            "source": {
                "kind": "approval-queue",
                "mode": "read-only",
                "contract_id": "m015.s01.approval-queue.v1"
            },
            "cards": [],
            "replay": [],
            "warnings": [],
            "artifacts": [],
            "approval_queue": {"entries": [queue_entry]},
            "dry_run_evidence": [dry_run_evidence],
            "approval_grants": [approval_grant],
            "approval_ledger": {"rows": [ledger_row]},
            "no_go_records": [no_go_record]
        })
    }

    fn approval_queue_app() -> AppState {
        AppState {
            projection: approval_queue_projection_fixture(),
            selected_card: 0,
            current_source_name: "approval-queue".to_string(),
            trust_filter: false,
            help_visible: false,
            reload: ReloadState::default(),
        }
    }

    fn approval_queue_screen(width: u16) -> String {
        let app = approval_queue_app();
        render_app_with_size(
            &app,
            "target/hermes-cockpit-m015/approval-queue-surface-projection.json",
            width,
            40,
        )
    }

    #[test]
    fn approval_queue_surface_source_path_labels_as_approval_queue() {
        assert_eq!(
            source_name_for_path(
                "target/hermes-cockpit-m015/approval-queue-surface-projection.json"
            ),
            "approval-queue",
            "M015 queue smoke paths should not render as custom sources"
        );
    }

    #[test]
    fn approval_queue_surface_renders_pending_queue_entry_as_review_only() {
        let screen = approval_queue_screen(160);

        assert!(
            screen.contains("Approval Queue [REVIEW ONLY]"),
            "queue panel title should be explicit: {screen}"
        );
        assert!(
            screen.contains("M015 approval queue review"),
            "queue surface should identify M015 review mode: {screen}"
        );
        assert!(
            screen.contains("Queue: queue-m015-s01-001"),
            "queue id should render: {screen}"
        );
        assert!(
            screen.contains("Operation: cockpit.audit_note_append"),
            "operation type should render: {screen}"
        );
        assert!(
            screen.contains("State: approval_pending"),
            "queue state should render: {screen}"
        );
        assert!(
            screen.contains("Approval: pending"),
            "approval state should render: {screen}"
        );
        assert!(
            screen.contains("Dry-run: passed"),
            "dry-run state should render: {screen}"
        );
        assert!(
            screen.contains("Target: target/hermes-cockpit-m015/pilot-audit-log.jsonl"),
            "artifact target should render: {screen}"
        );
        assert!(
            screen.contains("Payload: sha256:3a048866"),
            "payload hash should render compactly: {screen}"
        );
        assert!(
            screen.contains("Evidence: op_m015_s01_audit_note_append_001-dry-run.json"),
            "dry-run evidence basename should render: {screen}"
        );
        assert!(
            screen.contains("REVIEW ONLY") && screen.contains("no TUI apply"),
            "queue surface must carry no-apply safety copy: {screen}"
        );
        assert!(
            !screen.contains("a apply"),
            "M015 queue must not advertise an apply key: {screen}"
        );
        assert!(
            !screen.contains("Apply pilot"),
            "M015 queue must not expose executable apply copy: {screen}"
        );
    }

    #[test]
    fn approval_queue_surface_renders_ledger_row_and_approval_grant_without_mutation_copy() {
        let screen = approval_queue_screen(180);

        assert!(
            screen.contains("Evidence Ledger [DISPLAY ONLY]"),
            "ledger panel title should be explicit: {screen}"
        );
        assert!(
            screen.contains("Ledger: approval_granted"),
            "ledger event type should render: {screen}"
        );
        assert!(
            screen.contains("Row: ledger-m015-s01-001"),
            "ledger row id should render: {screen}"
        );
        assert!(
            screen.contains("Approval grant: approval-m015-s01-001"),
            "approval grant id should render: {screen}"
        );
        assert!(
            screen.contains("Decider: joe"),
            "manual decider should render without implying actor authority: {screen}"
        );
        assert!(
            screen.contains("Row hash: sha256:921576e9"),
            "ledger row hash should render compactly: {screen}"
        );
        assert!(
            screen.contains("Mutated: source=false target=false db=false"),
            "non-mutation flags should render: {screen}"
        );
        assert!(
            screen.contains("DISPLAY ONLY") && screen.contains("no executor"),
            "ledger surface must remain display-only: {screen}"
        );
    }

    #[test]
    fn approval_queue_surface_renders_no_go_record_as_blocked_review_item() {
        let screen = approval_queue_screen(180);

        assert!(
            screen.contains("No-go record: rejected"),
            "no-go status should render: {screen}"
        );
        assert!(
            screen.contains("No-go operation: dispatch.worker_start"),
            "rejected operation should render: {screen}"
        );
        assert!(
            screen.contains("No-go keys: unsupported_operation, direct_hermes_target"),
            "machine-readable no-go keys should render: {screen}"
        );
        assert!(
            screen.contains(
                "Reasons: unsupported operation; direct Hermes runtime target is prohibited"
            ),
            "operator-readable no-go reasons should render: {screen}"
        );
        assert!(
            !screen.contains("Ready to apply"),
            "no-go must not imply readiness: {screen}"
        );
        assert!(
            !screen.contains("Apply available"),
            "no-go must not imply executable apply: {screen}"
        );
    }

    #[test]
    fn approval_queue_surface_safety_visible_at_80_and_60_columns() {
        for width in [80_u16, 60_u16] {
            let screen = approval_queue_screen(width);
            assert!(
                screen.contains("REVIEW ONLY") || screen.contains("RO no apply"),
                "width {width} should keep review-only copy visible: {screen}"
            );
            assert!(
                screen.contains("no TUI apply") || screen.contains("no apply"),
                "width {width} should keep no-apply copy visible: {screen}"
            );
            assert!(
                screen.contains("no GSD") || screen.contains("No GSD"),
                "width {width} should keep no-GSD safety visible: {screen}"
            );
            assert!(
                !screen.contains("a apply"),
                "width {width} should not advertise an apply key: {screen}"
            );
        }
    }

    #[test]
    fn approval_queue_surface_help_and_footer_never_expose_apply_key_for_queue_source() {
        let mut app = approval_queue_app();
        app.help_visible = true;
        let screen = render_app_with_size(
            &app,
            "target/hermes-cockpit-m015/approval-queue-surface-projection.json",
            120,
            40,
        );

        assert!(
            screen.contains("Approval queue: display-only ledger review"),
            "help should describe display-only queue review: {screen}"
        );
        assert!(
            screen.contains("REVIEW ONLY: no apply/action key"),
            "footer should say there is no queue action key: {screen}"
        );
        assert!(
            screen.contains("no source-of-truth mutation"),
            "help should carry source-of-truth non-mutation boundary: {screen}"
        );
        assert!(
            !screen.contains("a apply"),
            "queue help/footer must not advertise an apply key: {screen}"
        );
    }

    fn temp_projection_path(name: &str) -> std::path::PathBuf {
        let mut path = std::env::temp_dir();
        path.push(format!(
            "hermes-cockpit-{name}-{}-{}.json",
            std::process::id(),
            std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .expect("clock should be after epoch")
                .as_nanos()
        ));
        path
    }

    #[test]
    fn reload_preserves_last_good_projection_when_json_is_invalid() {
        let path = temp_projection_path("reload-preserves-last-good");
        std::fs::write(
            &path,
            r#"{"source":{"kind":"first good projection"},"cards":[]}"#,
        )
        .expect("fixture should be writable");

        let mut app = AppState::from_projection(path.to_str().expect("temp path should be utf8"))
            .expect("initial projection should load");
        assert_eq!(
            source_summary(&app.projection).as_deref(),
            Some("first good projection")
        );

        std::fs::write(
            &path,
            r#"{"source":{"kind":"second good projection"},"cards":[]}"#,
        )
        .expect("fixture should be writable");
        assert!(app
            .reload_projection_from_disk(path.to_str().expect("temp path should be utf8"), true)
            .expect("valid reload should not error"));
        assert_eq!(
            source_summary(&app.projection).as_deref(),
            Some("second good projection")
        );
        assert!(app.reload.last_error.is_none());

        std::fs::write(&path, r#"{"source":"partial""#).expect("fixture should be writable");
        assert!(!app
            .reload_projection_from_disk(path.to_str().expect("temp path should be utf8"), true)
            .expect("invalid reload should be captured, not crash"));

        assert_eq!(
            source_summary(&app.projection).as_deref(),
            Some("second good projection"),
            "invalid JSON should preserve the last good projection"
        );
        assert!(
            app.reload
                .last_error
                .as_deref()
                .unwrap_or_default()
                .contains("parsing projection JSON"),
            "reload error should be renderable and specific: {:?}",
            app.reload.last_error
        );
    }
}
