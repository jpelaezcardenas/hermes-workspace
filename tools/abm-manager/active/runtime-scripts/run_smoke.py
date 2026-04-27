#!/usr/bin/env python3
from pathlib import Path
import json, sys, subprocess
ROOT = Path(__file__).resolve().parents[2]
LEGACY = ROOT / 'legacy' / 'abm-manager'
files = [LEGACY/'scripts'/'run_pipeline.py', LEGACY/'scripts'/'abm_for_rep.py', LEGACY/'scripts'/'research_account.py', LEGACY/'scripts'/'generate_sequences.py', LEGACY/'scripts'/'credentials.py']
proc = subprocess.run([sys.executable, '-m', 'py_compile', *map(str, [p for p in files if p.exists()])], cwd=str(ROOT), text=True, capture_output=True)
print(json.dumps({'agent':'abm-manager','compiled':proc.returncode==0,'stdout':proc.stdout,'stderr':proc.stderr}, indent=2))
raise SystemExit(proc.returncode)
