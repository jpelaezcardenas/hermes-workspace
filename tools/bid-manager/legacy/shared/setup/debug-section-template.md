## Debug Mode

This agent supports real-time debug tracing. When enabled, detailed technical traces are sent to Slack for monitoring and troubleshooting.

### Enabling Debug Mode

**For a specific run:**
```bash
python3 ../shared/scripts/debug-tracer.py enable <agent-name> <run-id> [--channel <slack-channel>]
```

**Via environment variable:**
```bash
export <AGENT_NAME>_DEBUG=1
```

**Via configuration file:**
Edit `../.debug-config.json` to enable agent-specific or global debug mode.

See `../shared/setup/DEBUG-MODE.md` for complete documentation.

### Using Debug Tracer in Code

```python
import sys
sys.path.insert(0, "../shared/scripts")
from debug_tracer import DebugTracer

# Initialize at agent startup
tracer = DebugTracer(agent_name="ppt-maker", run_id=request_id)

# Trace key operations
tracer.trace("startup", {"input": brief_data})
tracer.trace("model_selection", {"model": "codex"})
tracer.trace("file_write", {"path": output_path, "size": file_size})
tracer.trace("validation", {"passed": True}, level="info")

# Finalize at completion
tracer.finalize()
```

### Debug Output

- **Slack**: Real-time traces for critical steps
- **Log file**: `.agent-state/<agent>-<run>.debug.log`
- **Trace JSON**: `.agent-state/<agent>-<run>.traces.json`
