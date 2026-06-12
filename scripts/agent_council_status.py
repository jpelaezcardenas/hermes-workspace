#!/usr/bin/env python3
from pathlib import Path
import subprocess
agents = {'Hermes':'agent-hermes','Faust':'faust','Kiki':'kiki','Juju':'juju','Socrates':'socrates'}
workspace=Path('/home/carme/hermes-workspace')
palace_root=Path('/home/carme/.mempalace')
profiles=Path('/home/carme/.hermes/profiles')
wrappers={'Hermes':'agent-hermes:council','Faust':'faust:council','Kiki':'kiki:council','Juju':'juju:council','Socrates':'socrates:council'}
print('Agent Council Status')
print('workspace_git=', (workspace/'.git').exists())
try:
    out=subprocess.check_output(['git','status','--short'], cwd=str(workspace), text=True, stderr=subprocess.STDOUT)
    print('workspace_git_status_lines=', len([l for l in out.splitlines() if l.strip()]))
except Exception as e:
    print('workspace_git_status_error=', e)
for display, profile in agents.items():
    aid='hermes' if display=='Hermes' else display.lower()
    wrapper=Path('/home/carme/.local/bin')/wrappers[display]
    checks={
      'profile': (profiles/profile).exists(),
      'profile_memory': (profiles/profile/'memory'/'MEMORY.md').exists(),
      'agent_path': (workspace/'agents'/aid/'AGENT.md').exists(),
      'mempalace_wing': (palace_root/'palaces'/aid/'wings'/aid/'README.md').exists(),
      'wrapper': wrapper.exists() and wrapper.stat().st_mode & 0o111 != 0,
      'mcp_profile_config': (profiles/profile/'config.yaml').exists() and f'mempalace-{aid}' in (profiles/profile/'config.yaml').read_text(errors='ignore'),
    }
    print(f"{display}: " + ', '.join(f"{k}={'OK' if v else 'MISSING'}" for k,v in checks.items()))
