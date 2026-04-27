# Debug Mode Integration for Office Agents

This document describes how to enable and use debug mode across all SettleMint office agents.

## Quick Start

### Natural Language Triggers (Automatic)

Debug mode automatically enables when users include debug/tracing keywords in their requests:

**Trigger phrases:**
- `debug`, `trace`, `tracing`, `verbose`
- `show me what you're doing`
- `explain your reasoning`
- `how did you arrive at this`
- `what steps are you taking`
- `walk me through`
- `explain step by step`
- `what files did you use`
- `what model are you using`

**Example:**
```
User: "Write a proposal for Acme Corp - trace what you're doing so I can follow along"
→ Debug mode automatically enabled for this run
```

### Enable Debug for a Specific Run

```bash
# Enable debug mode for a specific agent run
python3 settlemint-office-agents/shared/scripts/debug-tracer.py enable <agent-name> <run-id> [--channel <slack-channel>]

# Example:
python3 settlemint-office-agents/shared/scripts/debug-tracer.py enable bid-manager enbd-20260315-001 --channel quark-agents
```

### Disable Debug for a Run

```bash
python3 settlemint-office-agents/shared/scripts/debug-tracer.py disable <run-id>
```

### Check Debug Status

```bash
python3 settlemint-office-agents/shared/scripts/debug-tracer.py status
```

## How It Works

When debug mode is enabled for an agent run:

1. **Real-time traces** are sent to the configured Slack channel
2. **Detailed technical logs** are written to `.agent-state/<agent>-<run-id>.debug.log`
3. **Full trace JSON** is saved to `.agent-state/<agent>-<run-id>.traces.json`
4. **Critical steps** (startup, model selection, file operations, errors) trigger immediate Slack notifications

## Configuration File

Debug configuration is stored in `settlemint-office-agents/.debug-config.json`:

```json
{
  "global": {
    "enabled": false
  },
  "agents": {
    "bid-manager": {
      "enabled": false,
      "default_channel": "quark-agents"
    },
    "ppt-maker": {
      "enabled": false,
      "default_channel": "quark-agents"
    }
  },
  "runs": {
    "enbd-20260315-001": {
      "enabled": true,
      "agent": "bid-manager",
      "channel": "quark-agents",
      "started_at": "2026-03-15T10:30:00Z"
    }
  }
}
```

## Environment Variables

You can also enable debug via environment variables:

```bash
# Enable debug for specific agent
export BID_MANAGER_DEBUG=1
export PPT_MAKER_DEBUG=1
export PPT_CHECKER_DEBUG=1
export BID_CHECKER_DEBUG=1
export RFP_FORGE_DEBUG=1
export PRESS_MANAGER_DEBUG=1
export WORD_WRITER_DEBUG=1
```

## Integration in Agent Code

Agents can integrate debug tracing by importing and using the DebugTracer class:

```python
import sys
sys.path.insert(0, "../shared/scripts")
from debug_tracer import DebugTracer, check_and_enable_debug

# OPTION 1: Automatic trigger detection (recommended)
# Call at start of agent execution with the user's message
debug_enabled = check_and_enable_debug(
    agent_name="bid-manager",
    run_id="enbd-20260315-001",
    user_message="Write a proposal - trace what you're doing",
    slack_channel="quark-agents"
)

# Then initialize tracer (will auto-enable if triggers detected)
tracer = DebugTracer(
    agent_name="bid-manager", 
    run_id="enbd-20260315-001",
    user_message="Write a proposal - trace what you're doing"  # Pass for auto-detection
)

# Trace steps
tracer.trace("startup", {"input_file": "rfp.docx", "output_type": "proposal"})
tracer.trace("model_selection", {"primary": "opus", "fallback": "sonnet"})
tracer.trace("file_read", {"path": "input/rfp.docx", "size_bytes": 45000})

# Trace with different levels
tracer.trace("validation_start", {}, level="info")
tracer.trace("validation_result", {"passed": True, "issues": []}, level="info")
tracer.trace("conversion_complete", {"output_path": "output/proposal.docx"}, level="info")

# Finalize
tracer.finalize()

# OPTION 2: Manual enable (legacy)
tracer = DebugTracer(agent_name="bid-manager", run_id="enbd-20260315-001")
```

## Critical Steps That Auto-Notify Slack

The following steps automatically trigger Slack notifications when debug is enabled:

- `startup` - Agent initialization
- `model_selection` - AI model selection and fallbacks
- `file_read` - Reading input files
- `file_write` - Writing output files
- `conversion_start` - Starting format conversions
- `conversion_complete` - Conversion completion
- `validation_start` - Starting validation
- `validation_result` - Validation results
- `error` - Any errors
- `completion` - Run completion

## Debug Output Format

### Slack Messages

Debug messages in Slack appear as:

```
🔍 *`bid-manager`* | `file_read` | 245ms
   ```path=input/rfp.docx | size_bytes=45000```
```

### Log File Format

```
[2026-03-15T10:30:15.123456+00:00] [INFO] Step: file_read | Elapsed: 0.25s | Details: {"path": "input/rfp.docx", "size_bytes": 45000}
```

## Per-Run Debug Mode

The most common use case is enabling debug for a specific run:

1. **Before starting the agent**, enable debug:
   ```bash
   python3 shared/scripts/debug-tracer.py enable bid-manager run-abc123 --channel quark-agents
   ```

2. **Run the agent** with the same run-id

3. **Watch real-time traces** in the Slack channel

4. **After completion**, debug logs are available in `.agent-state/`

## Global Debug Mode

Enable debug for all runs of all agents (use with caution):

```bash
# Edit .debug-config.json
{
  "global": {
    "enabled": true,
    "channel": "quark-agents"
  }
}
```

## Agent-Specific Debug Mode

Enable debug for all runs of a specific agent:

```bash
# Edit .debug-config.json
{
  "agents": {
    "bid-manager": {
      "enabled": true,
      "default_channel": "quark-agents"
    }
  }
}
```

## Best Practices

1. **Use per-run debug** rather than global debug to avoid noise
2. **Clean up old debug configs** periodically to prevent file bloat
3. **Use dedicated debug channels** in Slack for high-volume tracing
4. **Disable debug after troubleshooting** is complete
5. **Check `.agent-state/` logs** for detailed post-run analysis
