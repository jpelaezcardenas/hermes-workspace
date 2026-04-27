#!/usr/bin/env python3
"""
Debug Tracer for SettleMint Office Agents

Provides real-time technical tracing to Slack when debug mode is enabled.
Usage: Import and use in agent scripts, or call directly for manual traces.

Debug triggers (natural language):
- "debug", "trace", "verbose", "tracing"
- "show me what you're doing"
- "explain your reasoning"
- "how did you arrive at this"
- "what steps are you taking"
"""

import json
import os
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional, List

# Natural language debug triggers
DEBUG_TRIGGERS = [
    # Direct debug/trace keywords
    r"\bdebug\b",
    r"\btrac(?:e|ing)\b",
    r"\bverbose\b",
    r"\bverbosity\b",
    r"\bdebug mode\b",
    r"\btrace mode\b",
    # How/what questions about reasoning
    r"show me what you're doing",
    r"explain your reasoning",
    r"how did you (arrive|decide|choose)",
    r"what steps are you (taking|doing)",
    r"walk me through",
    r"explain step by step",
    r"detailed reasoning",
    r"break down your.*approach",
    # Technical inspection
    r"what files? (did you|are you) (use|read|write)",
    r"what (model|prompt) (are you|did you) use",
]


def detect_debug_triggers(user_message: str) -> bool:
    """Detect if user message contains debug/tracing trigger words.
    
    Args:
        user_message: The user's input message to check
        
    Returns:
        True if any debug trigger is detected, False otherwise
    """
    if not user_message:
        return False
    
    message_lower = user_message.lower()
    
    for trigger in DEBUG_TRIGGERS:
        if re.search(trigger, message_lower, re.IGNORECASE):
            return True
    
    return False


def get_detected_triggers(user_message: str) -> List[str]:
    """Get list of which triggers were detected in the user message.
    
    Args:
        user_message: The user's input message to check
        
    Returns:
        List of matched trigger patterns
    """
    if not user_message:
        return []
    
    message_lower = user_message.lower()
    matched = []
    
    for trigger in DEBUG_TRIGGERS:
        if re.search(trigger, message_lower, re.IGNORECASE):
            # Clean up trigger pattern for display
            display = trigger.replace(r"\b", "").replace(r"\s+", " ")
            matched.append(display)
    
    return matched

# Slack webhook or API integration will use environment variables
DEBUG_CONFIG_PATH = Path(__file__).resolve().parents[2] / ".debug-config.json"
AGENT_STATE_DIR = Path(__file__).resolve().parents[2] / ".agent-state"


class DebugTracer:
    """Real-time debug tracer that sends technical traces to Slack when enabled."""
    
    def __init__(self, agent_name: str, run_id: Optional[str] = None, user_message: Optional[str] = None):
        self.agent_name = agent_name
        self.run_id = run_id or datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
        
        # Check for natural language debug triggers in user message
        self.trigger_detected = False
        self.matched_triggers = []
        if user_message:
            self.trigger_detected = detect_debug_triggers(user_message)
            if self.trigger_detected:
                self.matched_triggers = get_detected_triggers(user_message)
        
        # Check debug enabled (env var, config, or triggered by user message)
        self.enabled = self._check_debug_enabled()
        self.traces = []
        self.start_time = time.time()
        
        # Ensure state directory exists
        AGENT_STATE_DIR.mkdir(parents=True, exist_ok=True)
        
        if self.enabled:
            trigger_msg = ""
            if self.trigger_detected:
                trigger_msg = f" | Triggered by: {', '.join(self.matched_triggers)}"
            self._log_to_file(f"[{self.run_id}] DEBUG MODE ENABLED for {agent_name}{trigger_msg}")
            self._send_slack_notification(f"🐛 *Debug Mode ON* | `{agent_name}` | Run: `{self.run_id}`{trigger_msg}")
    
    def _check_debug_enabled(self) -> bool:
        """Check if debug mode is enabled via config file or environment variable."""
        # Check environment variable first
        env_debug = os.environ.get(f"{self.agent_name.upper().replace('-', '_')}_DEBUG", "")
        if env_debug.lower() in ("1", "true", "yes", "on"):
            return True
        
        # Check shared debug config
        if DEBUG_CONFIG_PATH.exists():
            try:
                config = json.loads(DEBUG_CONFIG_PATH.read_text())
                # Check global debug
                if config.get("global", {}).get("enabled", False):
                    return True
                # Check agent-specific debug
                agent_config = config.get("agents", {}).get(self.agent_name, {})
                if agent_config.get("enabled", False):
                    return True
                # Check specific run ID
                if self.run_id in config.get("runs", {}):
                    return config["runs"][self.run_id].get("enabled", False)
            except (json.JSONDecodeError, KeyError):
                pass
        
        return False
    
    def _log_to_file(self, message: str):
        """Write trace to local log file."""
        log_file = AGENT_STATE_DIR / f"{self.agent_name}-{self.run_id}.debug.log"
        timestamp = datetime.now(timezone.utc).isoformat()
        with open(log_file, "a") as f:
            f.write(f"[{timestamp}] {message}\n")
    
    def _send_slack_notification(self, message: str, channel: Optional[str] = None):
        """Send notification to Slack (via OpenClaw gateway or webhook)."""
        # This will be called via the message tool when running in OpenClaw context
        # For now, we write to a notification queue file
        notify_file = AGENT_STATE_DIR / f"{self.agent_name}-{self.run_id}.slack.queue"
        notification = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "agent": self.agent_name,
            "run_id": self.run_id,
            "message": message,
            "channel": channel or "debug",
        }
        with open(notify_file, "a") as f:
            f.write(json.dumps(notification) + "\n")
    
    def trace(self, step: str, details: dict, level: str = "info"):
        """Record a debug trace event.
        
        Args:
            step: Name of the step/operation being traced
            details: Dict of technical details to log
            level: "debug", "info", "warning", "error"
        """
        if not self.enabled and level not in ("error",):
            return
        
        elapsed = time.time() - self.start_time
        trace_entry = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "elapsed_ms": round(elapsed * 1000, 2),
            "agent": self.agent_name,
            "run_id": self.run_id,
            "step": step,
            "level": level,
            "details": details,
        }
        self.traces.append(trace_entry)
        
        # Log to file
        detail_str = json.dumps(details, default=str)[:500]  # Truncate long details
        log_msg = f"[{level.upper()}] Step: {step} | Elapsed: {elapsed:.2f}s | Details: {detail_str}"
        self._log_to_file(log_msg)
        
        # For important steps or errors, also queue for Slack
        if level in ("error",) or step in self._get_critical_steps():
            slack_msg = self._format_slack_message(trace_entry)
            self._send_slack_notification(slack_msg)
    
    def _get_critical_steps(self) -> list:
        """Steps that should always be sent to Slack in debug mode."""
        return [
            "startup",
            "model_selection",
            "file_read",
            "file_write",
            "conversion_start",
            "conversion_complete",
            "validation_start",
            "validation_result",
            "error",
            "completion",
        ]
    
    def _format_slack_message(self, trace: dict) -> str:
        """Format a trace entry for Slack display."""
        level_emoji = {
            "debug": "🔍",
            "info": "ℹ️",
            "warning": "⚠️",
            "error": "❌",
        }.get(trace["level"], "•")
        
        msg = f"{level_emoji} *`{trace['agent']}`* | `{trace['step']}` | {trace['elapsed_ms']}ms"
        
        # Add key details
        details = trace.get("details", {})
        if details:
            key_info = []
            for k, v in list(details.items())[:3]:  # Limit to first 3 keys
                val_str = str(v)[:50]  # Truncate long values
                key_info.append(f"{k}={val_str}")
            if key_info:
                msg += f"\n   ```{' | '.join(key_info)}```"
        
        return msg
    
    def summary(self) -> dict:
        """Generate a summary of the debug session."""
        elapsed = time.time() - self.start_time
        levels = {}
        steps = set()
        for t in self.traces:
            levels[t["level"]] = levels.get(t["level"], 0) + 1
            steps.add(t["step"])
        
        return {
            "agent": self.agent_name,
            "run_id": self.run_id,
            "debug_enabled": self.enabled,
            "total_traces": len(self.traces),
            "total_time_sec": round(elapsed, 2),
            "levels": levels,
            "steps": list(steps),
        }
    
    def finalize(self):
        """Finalize the debug session and send summary."""
        if not self.enabled:
            return
        
        summary = self.summary()
        summary_msg = (
            f"🏁 *Debug Complete* | `{self.agent_name}` | Run: `{self.run_id}`\n"
            f"   Traces: {summary['total_traces']} | "
            f"Time: {summary['total_time_sec']}s | "
            f"Levels: {json.dumps(summary['levels'])}"
        )
        self._send_slack_notification(summary_msg)
        
        # Write full trace log
        trace_file = AGENT_STATE_DIR / f"{self.agent_name}-{self.run_id}.traces.json"
        trace_file.write_text(json.dumps({
            "summary": summary,
            "traces": self.traces,
        }, indent=2, default=str))


def check_and_enable_debug(agent_name: str, run_id: str, user_message: str, slack_channel: Optional[str] = None) -> bool:
    """Check user message for debug triggers and enable debug if detected.
    
    This is the main integration point for office agents. Call this at the
    start of agent execution to automatically enable debug mode when users
    use natural language like "trace what you're doing" or "explain your reasoning".
    
    Args:
        agent_name: Name of the agent (e.g., "bid-manager")
        run_id: Unique identifier for this run
        user_message: The original user message that triggered the agent
        slack_channel: Optional Slack channel to send traces to
        
    Returns:
        True if debug was enabled due to trigger detection, False otherwise
    """
    if detect_debug_triggers(user_message):
        triggers = get_detected_triggers(user_message)
        enable_debug_for_run(agent_name, run_id, slack_channel, triggered_by=triggers)
        return True
    return False


def enable_debug_for_run(agent_name: str, run_id: str, slack_channel: Optional[str] = None, triggered_by: Optional[List[str]] = None):
    """Enable debug mode for a specific agent run.
    
    Args:
        agent_name: Name of the agent (e.g., "bid-manager")
        run_id: Unique identifier for this run
        slack_channel: Optional Slack channel to send traces to
        triggered_by: List of triggers that caused debug mode activation
        
    Usage:
        python3 debug-tracer.py enable <agent-name> <run-id> [--channel <channel>]
    """
    config = {}
    if DEBUG_CONFIG_PATH.exists():
        config = json.loads(DEBUG_CONFIG_PATH.read_text())
    
    if "runs" not in config:
        config["runs"] = {}
    
    config["runs"][run_id] = {
        "enabled": True,
        "agent": agent_name,
        "channel": slack_channel,
        "started_at": datetime.now(timezone.utc).isoformat(),
    }
    
    if triggered_by:
        config["runs"][run_id]["triggered_by"] = triggered_by
    
    DEBUG_CONFIG_PATH.write_text(json.dumps(config, indent=2))
    print(f"Debug mode enabled for {agent_name} run {run_id}")


def disable_debug_for_run(run_id: str):
    """Disable debug mode for a specific run."""
    if not DEBUG_CONFIG_PATH.exists():
        return
    
    config = json.loads(DEBUG_CONFIG_PATH.read_text())
    if "runs" in config and run_id in config["runs"]:
        config["runs"][run_id]["enabled"] = False
        DEBUG_CONFIG_PATH.write_text(json.dumps(config, indent=2))
        print(f"Debug mode disabled for run {run_id}")


def main():
    """CLI interface for debug tracer management."""
    if len(sys.argv) < 2:
        print("Usage:")
        print("  debug-tracer.py enable <agent-name> <run-id> [--channel <channel>]")
        print("  debug-tracer.py disable <run-id>")
        print("  debug-tracer.py status [<agent-name>]")
        sys.exit(1)
    
    cmd = sys.argv[1]
    
    if cmd == "enable" and len(sys.argv) >= 4:
        agent = sys.argv[2]
        run_id = sys.argv[3]
        channel = None
        if "--channel" in sys.argv:
            idx = sys.argv.index("--channel")
            if idx + 1 < len(sys.argv):
                channel = sys.argv[idx + 1]
        enable_debug_for_run(agent, run_id, channel)
    
    elif cmd == "disable" and len(sys.argv) >= 3:
        run_id = sys.argv[2]
        disable_debug_for_run(run_id)
    
    elif cmd == "status":
        if DEBUG_CONFIG_PATH.exists():
            config = json.loads(DEBUG_CONFIG_PATH.read_text())
            print(json.dumps(config, indent=2))
        else:
            print("No debug config found")
    
    else:
        print(f"Unknown command: {cmd}")
        sys.exit(1)


if __name__ == "__main__":
    main()
