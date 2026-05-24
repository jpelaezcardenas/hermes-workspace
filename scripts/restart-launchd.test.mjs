import { readFileSync } from 'node:fs'
import { strict as assert } from 'node:assert'

const src = readFileSync(new URL('./restart-launchd.sh', import.meta.url), 'utf8')

assert.match(src, /LAUNCHD_LABEL:-com\.cderamos\.cael-workspace/)
assert.match(src, /PORT:-3077/)
assert.match(src, /HEALTH_URL:-http:\/\/100\.97\.216\.111:\$PORT\/cael-home/)
assert.match(src, /launchctl bootout/)
assert.match(src, /lsof -tiTCP:\"\$PORT\" -sTCP:LISTEN/)
assert.match(src, /launchctl enable/)
assert.match(src, /launchctl bootstrap/)
assert.match(src, /curl -fsS \"\$HEALTH_URL\"/)

console.log('restart-launchd contract ok')
