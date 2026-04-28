import fs from 'node:fs/promises'
import path from 'node:path'

const TARGETS = [
  'src/routes/settings/index.tsx',
  'src/components/settings-dialog/settings-dialog.tsx',
  'src/screens/chat/components/chat-sidebar.tsx',
  'src/screens/gateway/conductor.tsx',
]

const TEXT_PATTERN = />\s*([A-Za-z][^<{]{1,80})\s*</g

function shouldIgnore(text) {
  const value = text.trim()
  if (!value) return true
  if (value.startsWith('{') || value.endsWith('}')) return true
  if (value.includes('http://') || value.includes('https://')) return true
  if (value.length < 3) return true
  return false
}

async function run() {
  let total = 0
  for (const rel of TARGETS) {
    const abs = path.resolve(process.cwd(), rel)
    let content = ''
    try {
      content = await fs.readFile(abs, 'utf8')
    } catch {
      continue
    }
    const findings = []
    for (const match of content.matchAll(TEXT_PATTERN)) {
      const raw = match[1] || ''
      const text = raw.replace(/\s+/g, ' ').trim()
      if (shouldIgnore(text)) continue
      findings.push(text)
    }
    if (findings.length > 0) {
      total += findings.length
      const preview = findings.slice(0, 5)
      console.log(`\n${rel}`)
      preview.forEach((item) => console.log(`  - ${item}`))
      if (findings.length > preview.length) {
        console.log(`  ... and ${findings.length - preview.length} more`)
      }
    }
  }

  console.log(`\nHardcoded text audit finished. Detected ${total} potential literals.`)
  console.log('Use this report as a migration checklist; this script is non-blocking.')
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
