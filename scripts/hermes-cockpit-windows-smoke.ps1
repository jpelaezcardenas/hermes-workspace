param(
    [string]$SourceRoot = "\\TOWER\The Goods\Serena-Projects\hermes-workspace",
    [string]$MirrorRoot = "D:\projects\hermes-workspace-m011-win",
    [switch]$SkipSync
)

# M012 Windows/GPC verification runner with M014 approval-action verification-prep extension.
# Tux runs on Windows/WSL. Migi/Pi remains the canonical Pi runtime.
# This runner verifies a local Windows mirror; it does not claim production readiness.
# Required M014 summary path: target\hermes-cockpit-m014\windows-verify-summary.json
# Legacy M012 summary path retained for existing M012/M013 runner readers: target\hermes-cockpit-m012\windows-verify-summary.json
# Gates: python -m unittest discover tests/hermes_cockpit -v; cargo fmt --check; cargo check; cargo test.
# M014 static prep syncs scripts\hermes-cockpit-approval-action.py, docs\hermes-cockpit\m014-approval-action-contract.md,
# tests\fixtures\hermes_cockpit\approval-action\approval-pilot-ops.jsonl, and tests\hermes_cockpit\test_approval_contract.py.
# S02/S03 closeout-only gates are recorded but not required during runner prep: approval-surface-smoke-summary.json and safe-executor-pilot-smoke-summary.json.

$ErrorActionPreference = "Stop"

function Get-ResolvedPathOrNull {
    param([string]$Path)
    if (Test-Path -LiteralPath $Path) {
        return (Resolve-Path -LiteralPath $Path).Path
    }
    return $null
}

function Test-SamePath {
    param([string]$A, [string]$B)
    $resolvedA = Get-ResolvedPathOrNull -Path $A
    $resolvedB = Get-ResolvedPathOrNull -Path $B
    return ($null -ne $resolvedA -and $null -ne $resolvedB -and $resolvedA.Equals($resolvedB, [System.StringComparison]::OrdinalIgnoreCase))
}

function Invoke-RobocopyAllowSuccess {
    param(
        [string]$From,
        [string]$To,
        [string[]]$Arguments
    )
    if (-not (Test-Path -LiteralPath $From)) {
        throw "robocopy source missing: $From"
    }
    New-Item -ItemType Directory -Force -Path $To | Out-Null
    $common = @("/NFL", "/NDL", "/NJH", "/NJS", "/NP")
    & robocopy @($From, $To) @Arguments @common | Out-Null
    $code = $LASTEXITCODE
    if ($code -gt 7) {
        throw "robocopy failed rc=$code from '$From' to '$To'"
    }
    return [ordered]@{
        from = $From
        to = $To
        exit_code = $code
    }
}

function Copy-RequiredFile {
    param([string]$From, [string]$To)
    if (-not (Test-Path -LiteralPath $From)) {
        throw "required file missing: $From"
    }
    New-Item -ItemType Directory -Force -Path (Split-Path -Parent $To) | Out-Null
    Copy-Item -LiteralPath $From -Destination $To -Force
    return [ordered]@{
        from = $From
        to = $To
        exit_code = 0
    }
}

function Copy-OptionalEvidenceFile {
    param([string]$From, [string]$To, [string]$RelativePath)
    if (Test-Path -LiteralPath $From) {
        New-Item -ItemType Directory -Force -Path (Split-Path -Parent $To) | Out-Null
        Copy-Item -LiteralPath $From -Destination $To -Force
        return [ordered]@{
            path = $RelativePath
            from = $From
            to = $To
            exists = $true
            copied = $true
            required_for_closeout = $true
            closeout_only = $true
            exit_code = 0
        }
    }
    return [ordered]@{
        path = $RelativePath
        from = $From
        to = $To
        exists = $false
        copied = $false
        required_for_closeout = $true
        closeout_only = $true
        status = "pending"
        exit_code = 0
    }
}

function Test-OptionalEvidenceFile {
    param([string]$Path, [string]$RelativePath)
    $exists = Test-Path -LiteralPath $Path
    $status = "pending"
    if ($exists) {
        $status = "present"
    }
    return [ordered]@{
        path = $RelativePath
        mirror_path = $Path
        exists = $exists
        copied = $false
        required_for_closeout = $true
        closeout_only = $true
        status = $status
    }
}

function Get-LogTail {
    param([string]$Text, [int]$Limit = 4000)
    if ($null -eq $Text) { return "" }
    if ($Text.Length -le $Limit) { return $Text }
    return $Text.Substring($Text.Length - $Limit)
}

function Invoke-Gate {
    param(
        [string]$Key,
        [string]$Label,
        [string]$WorkingDirectory,
        [string[]]$Command,
        [string]$OutputDirectory
    )
    $started = Get-Date
    $outputText = ""
    $exitCode = 0
    Push-Location -LiteralPath $WorkingDirectory
    $previousErrorActionPreference = $ErrorActionPreference
    try {
        try {
            $ErrorActionPreference = "Continue"
            $argsForCommand = @()
            if ($Command.Count -gt 1) {
                $argsForCommand = $Command[1..($Command.Count - 1)]
            }
            # Native tools such as python/cargo legitimately write progress to stderr.
            # Keep collecting stderr, but do not let PowerShell promote those records to
            # terminating NativeCommandError exceptions under the script-level Stop mode.
            $output = & $Command[0] @argsForCommand 2>&1
            $outputText = ($output | Out-String)
            if ($null -eq $LASTEXITCODE) {
                $exitCode = 0
            } else {
                $exitCode = [int]$LASTEXITCODE
            }
        } catch {
            $outputText = ($_ | Out-String)
            $exitCode = 1
        }
    } finally {
        $ErrorActionPreference = $previousErrorActionPreference
        Pop-Location
    }
    $durationMs = [int]((Get-Date) - $started).TotalMilliseconds
    $logPath = Join-Path $OutputDirectory ("windows-verify-$Key.log")
    Set-Content -LiteralPath $logPath -Value $outputText -Encoding utf8
    $mirrorPrefix = $MirrorRoot.TrimEnd("\\") + "\\"
    if ($logPath.StartsWith($mirrorPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
        $relativeLog = $logPath.Substring($mirrorPrefix.Length)
    } else {
        $relativeLog = $logPath
    }
    return [ordered]@{
        key = $Key
        label = $Label
        argv = $Command
        cwd = $WorkingDirectory
        exit_code = $exitCode
        duration_ms = $durationMs
        log_path = $relativeLog
        log_tail = (Get-LogTail -Text $outputText)
    }
}

# Prefer the canonical UNC source, but fall back to the repository containing this script if UNC is unavailable.
if (-not (Test-Path -LiteralPath $SourceRoot)) {
    $scriptRoot = Split-Path -Parent $PSCommandPath
    $SourceRoot = Split-Path -Parent $scriptRoot
}

$M014RequiredFiles = @(
    "scripts\hermes-cockpit-approval-action.py",
    "docs\hermes-cockpit\m014-approval-action-contract.md",
    "tests\fixtures\hermes_cockpit\approval-action\approval-pilot-ops.jsonl",
    "tests\hermes_cockpit\test_approval_contract.py"
)
$M014CloseoutGatePaths = @(
    "target\hermes-cockpit-m014\approval-surface-smoke-summary.json",
    "target\hermes-cockpit-m014\safe-executor-pilot-smoke-summary.json",
    "target\hermes-cockpit-m014\approval-action-evidence\op_m014_audit_note_001-dry-run.json",
    "target\hermes-cockpit-m014\apply-blocked-smoke-summary.json"
)

New-Item -ItemType Directory -Force -Path $MirrorRoot | Out-Null
$OutDir = Join-Path $MirrorRoot "target\hermes-cockpit-m014"
$LegacyOutDir = Join-Path $MirrorRoot "target\hermes-cockpit-m012"
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
New-Item -ItemType Directory -Force -Path $LegacyOutDir | Out-Null

$syncEvidence = @()
$skipReason = $null
if ($SkipSync) {
    $skipReason = "SkipSync requested"
} elseif (Test-SamePath -A $SourceRoot -B $MirrorRoot) {
    $skipReason = "SourceRoot and MirrorRoot are the same path"
} else {
    # Sync allowlist only. Do not mirror unrelated repo families or Windows-local smoke state.
    $syncEvidence += Invoke-RobocopyAllowSuccess -From (Join-Path $SourceRoot "scripts") -To (Join-Path $MirrorRoot "scripts") -Arguments @("hermes-cockpit-*", "start-hermes-cockpit.*", "/XF", "*.pyc", "/XD", "__pycache__")
    $syncEvidence += Invoke-RobocopyAllowSuccess -From (Join-Path $SourceRoot "tests\hermes_cockpit") -To (Join-Path $MirrorRoot "tests\hermes_cockpit") -Arguments @("/E", "/XF", "*.pyc", "/XD", "__pycache__")
    $syncEvidence += Invoke-RobocopyAllowSuccess -From (Join-Path $SourceRoot "tests\fixtures\hermes_cockpit") -To (Join-Path $MirrorRoot "tests\fixtures\hermes_cockpit") -Arguments @("/E", "/XF", "*.pyc", "/XD", "__pycache__")
    $syncEvidence += Invoke-RobocopyAllowSuccess -From (Join-Path $SourceRoot "prototypes\hermes-cockpit") -To (Join-Path $MirrorRoot "prototypes\hermes-cockpit") -Arguments @("/E", "/XD", "target", "/XF", "*.tmp")
    $syncEvidence += Invoke-RobocopyAllowSuccess -From (Join-Path $SourceRoot "docs\hermes-cockpit") -To (Join-Path $MirrorRoot "docs\hermes-cockpit") -Arguments @("/E")
    foreach ($relative in $M014RequiredFiles) {
        $syncEvidence += Copy-RequiredFile -From (Join-Path $SourceRoot $relative) -To (Join-Path $MirrorRoot $relative)
    }
    $syncEvidence += Copy-RequiredFile -From (Join-Path $SourceRoot "target\hermes-cockpit-m010\hermes-projection.json") -To (Join-Path $MirrorRoot "target\hermes-cockpit-m010\hermes-projection.json")
    $syncEvidence += Copy-RequiredFile -From (Join-Path $SourceRoot "target\hermes-cockpit-m012\control-registry.jsonl") -To (Join-Path $MirrorRoot "target\hermes-cockpit-m012\control-registry.jsonl")
    $syncEvidence += Copy-RequiredFile -From (Join-Path $SourceRoot "target\hermes-cockpit-m012\windows-worker-registry.jsonl") -To (Join-Path $MirrorRoot "target\hermes-cockpit-m012\windows-worker-registry.jsonl")
    $syncEvidence += Copy-RequiredFile -From (Join-Path $SourceRoot "target\hermes-cockpit-m012\windows-worker-smoke-summary.json") -To (Join-Path $MirrorRoot "target\hermes-cockpit-m012\windows-worker-smoke-summary.json")
    $syncEvidence += Copy-RequiredFile -From (Join-Path $SourceRoot "target\hermes-cockpit-m012\control-plane-projection.json") -To (Join-Path $MirrorRoot "target\hermes-cockpit-m012\control-plane-projection.json")
    $syncEvidence += Copy-RequiredFile -From (Join-Path $SourceRoot "target\hermes-cockpit-m013\watcher-projection.json") -To (Join-Path $MirrorRoot "target\hermes-cockpit-m013\watcher-projection.json")
}

$m014CloseoutGateEvidence = @()
foreach ($relative in $M014CloseoutGatePaths) {
    $sourcePath = Join-Path $SourceRoot $relative
    $mirrorPath = Join-Path $MirrorRoot $relative
    if (-not $SkipSync -and -not (Test-SamePath -A $SourceRoot -B $MirrorRoot)) {
        $m014CloseoutGateEvidence += Copy-OptionalEvidenceFile -From $sourcePath -To $mirrorPath -RelativePath $relative
    } else {
        $m014CloseoutGateEvidence += Test-OptionalEvidenceFile -Path $mirrorPath -RelativePath $relative
    }
}

$RequiredFixture = Join-Path $MirrorRoot "target\hermes-cockpit-m010\hermes-projection.json"
$RequiredM012ControlRegistry = Join-Path $MirrorRoot "target\hermes-cockpit-m012\control-registry.jsonl"
$RequiredM012WindowsRegistry = Join-Path $MirrorRoot "target\hermes-cockpit-m012\windows-worker-registry.jsonl"
$RequiredM012WindowsSmoke = Join-Path $MirrorRoot "target\hermes-cockpit-m012\windows-worker-smoke-summary.json"
$RequiredM012Projection = Join-Path $MirrorRoot "target\hermes-cockpit-m012\control-plane-projection.json"
$RequiredM013WatcherProjection = Join-Path $MirrorRoot "target\hermes-cockpit-m013\watcher-projection.json"
$RequiredM014ApprovalFiles = @()
foreach ($relative in $M014RequiredFiles) {
    $RequiredM014ApprovalFiles += (Join-Path $MirrorRoot $relative)
}
if (-not (Test-Path -LiteralPath $RequiredFixture)) {
    throw "required Rust render fixture missing from mirror: $RequiredFixture"
}
foreach ($required in @($RequiredM012ControlRegistry, $RequiredM012WindowsRegistry, $RequiredM012WindowsSmoke, $RequiredM012Projection, $RequiredM013WatcherProjection)) {
    if (-not (Test-Path -LiteralPath $required)) {
        throw "required cockpit fixture missing from mirror: $required"
    }
}
foreach ($required in $RequiredM014ApprovalFiles) {
    if (-not (Test-Path -LiteralPath $required)) {
        throw "required M014 approval-action file missing from mirror: $required"
    }
}

if (-not $env:CARGO_TARGET_DIR) {
    $env:CARGO_TARGET_DIR = Join-Path $env:TEMP "hermes-cockpit-target"
}

$summary = [ordered]@{
    schema_version = "hermes-cockpit.m014.windows-verify-summary.v1"
    created_at = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    source_root = $SourceRoot
    mirror_root = $MirrorRoot
    host = $env:COMPUTERNAME
    user = $env:USERNAME
    cargo_target_dir = $env:CARGO_TARGET_DIR
    required_fixture = $RequiredFixture
    required_m014_files = $M014RequiredFiles
    required_m014_paths = $RequiredM014ApprovalFiles
    closeout_gates = $m014CloseoutGateEvidence
    skip_sync_reason = $skipReason
    sync = $syncEvidence
    boundaries = [ordered]@{
        tux = "Tux runs on Windows/WSL; do not translate Tux work to Pi service paths."
        migi = "Migi/Pi remains the canonical runtime authority for Pi-hosted Hermes state."
        windows = "Windows/GPC mirror is a bounded worker and verification lane, not canonical project truth."
        m014 = "M014 approval-action pilot is artifact-only under target/hermes-cockpit-m014; closeout gates are recorded without claiming final closeout."
    }
    m014_approval_action = [ordered]@{
        contract = "docs\hermes-cockpit\m014-approval-action-contract.md"
        runner = "scripts\hermes-cockpit-approval-action.py"
        fixture = "tests\fixtures\hermes_cockpit\approval-action\approval-pilot-ops.jsonl"
        tests = "tests\hermes_cockpit\test_approval_contract.py"
        artifact_only_target = "target/hermes-cockpit-m014"
        dry_run_apply_safety = "dry-run writes evidence only; apply remains gated by WF3 exact evidence/approval matching"
        closeout_gate_note = "S02/S03 evidence is expected for closeout but optional during verification-prep runner execution."
    }
    non_claims = [ordered]@{
        no_production_readiness = $true
        no_gsd_kanban_hermes_mutation = $true
        no_worker_dispatch = $true
        no_watcher_install = $true
        no_cron_schedule = $true
        no_final_closeout_claim = $true
    }
    commands = @()
    summary_path = "target\hermes-cockpit-m014\windows-verify-summary.json"
    legacy_m012_summary_path = "target\hermes-cockpit-m012\windows-verify-summary.json"
    production_readiness_claim = $false
}

$pythonGate = Invoke-Gate -Key "python" -Label "python -m unittest discover tests/hermes_cockpit -v" -WorkingDirectory $MirrorRoot -Command @("python", "-m", "unittest", "discover", "tests/hermes_cockpit", "-v") -OutputDirectory $OutDir
$cargoFmtGate = Invoke-Gate -Key "cargo_fmt" -Label "cargo fmt --check" -WorkingDirectory (Join-Path $MirrorRoot "prototypes\hermes-cockpit") -Command @("cargo", "fmt", "--check") -OutputDirectory $OutDir
$cargoCheckGate = Invoke-Gate -Key "cargo_check" -Label "cargo check" -WorkingDirectory (Join-Path $MirrorRoot "prototypes\hermes-cockpit") -Command @("cargo", "check") -OutputDirectory $OutDir
$cargoTestGate = Invoke-Gate -Key "cargo_test" -Label "cargo test" -WorkingDirectory (Join-Path $MirrorRoot "prototypes\hermes-cockpit") -Command @("cargo", "test") -OutputDirectory $OutDir

$summary.python = $pythonGate
$summary.cargo_fmt = $cargoFmtGate
$summary.cargo_check = $cargoCheckGate
$summary.cargo_test = $cargoTestGate
$summary.commands = @($pythonGate, $cargoFmtGate, $cargoCheckGate, $cargoTestGate)

$overall = 0
foreach ($gate in $summary.commands) {
    Write-Output ("{0}: exit={1} duration_ms={2} log={3}" -f $gate.key, $gate.exit_code, $gate.duration_ms, $gate.log_path)
    if ($gate.exit_code -ne 0 -and $overall -eq 0) {
        $overall = [int]$gate.exit_code
    }
}
$summary.overall_exit_code = $overall

$SummaryPath = Join-Path $OutDir "windows-verify-summary.json"
$summary | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $SummaryPath -Encoding utf8

# Preserve the legacy M012/M013 summary location as a compatibility pointer while M014 uses its own scoped summary.
$LegacySummaryPath = Join-Path $LegacyOutDir "windows-verify-summary.json"
$legacySummary = [ordered]@{}
foreach ($key in $summary.Keys) {
    $legacySummary[$key] = $summary[$key]
}
$legacySummary["schema_version"] = "hermes-cockpit.m012.windows-verify-summary.v1"
$legacySummary["summary_path"] = "target\hermes-cockpit-m012\windows-verify-summary.json"
$legacySummary["m014_summary_path"] = "target\hermes-cockpit-m014\windows-verify-summary.json"
$legacySummary | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $LegacySummaryPath -Encoding utf8

# Copy the compact summaries back to the source workspace when SourceRoot is distinct and writable.
try {
    if (-not (Test-SamePath -A $SourceRoot -B $MirrorRoot) -and (Test-Path -LiteralPath $SourceRoot)) {
        $sourceOutDir = Join-Path $SourceRoot "target\hermes-cockpit-m014"
        New-Item -ItemType Directory -Force -Path $sourceOutDir | Out-Null
        Copy-Item -LiteralPath $SummaryPath -Destination (Join-Path $sourceOutDir "windows-verify-summary.json") -Force
        $sourceLegacyOutDir = Join-Path $SourceRoot "target\hermes-cockpit-m012"
        New-Item -ItemType Directory -Force -Path $sourceLegacyOutDir | Out-Null
        Copy-Item -LiteralPath $LegacySummaryPath -Destination (Join-Path $sourceLegacyOutDir "windows-verify-summary.json") -Force
    }
} catch {
    Write-Warning "Could not copy summary back to SourceRoot: $_"
}

Write-Output "summary=$SummaryPath"
exit $overall
