import { resources } from '../src/lib/i18n/resources.ts'

function flatten(obj, prefix = '') {
  const output = []
  for (const [key, value] of Object.entries(obj)) {
    const next = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      output.push(...flatten(value, next))
    } else {
      output.push(next)
    }
  }
  return output
}

const enResources = resources.en
const zhResources = resources['zh-CN']

const missingInZh = []
for (const namespace of Object.keys(enResources)) {
  const enKeys = new Set(flatten(enResources[namespace]))
  const zhKeys = new Set(flatten(zhResources[namespace] || {}))
  for (const key of enKeys) {
    if (!zhKeys.has(key)) missingInZh.push(`${namespace}.${key}`)
  }
}

const extraInZh = []
for (const namespace of Object.keys(zhResources)) {
  const zhKeys = new Set(flatten(zhResources[namespace]))
  const enKeys = new Set(flatten(enResources[namespace] || {}))
  for (const key of zhKeys) {
    if (!enKeys.has(key)) extraInZh.push(`${namespace}.${key}`)
  }
}

if (missingInZh.length === 0 && extraInZh.length === 0) {
  console.log('i18n parity check passed (en <-> zh-CN)')
  process.exit(0)
}

if (missingInZh.length > 0) {
  console.error('Missing zh-CN keys:')
  for (const key of missingInZh) console.error(`  - ${key}`)
}
if (extraInZh.length > 0) {
  console.error('Extra zh-CN keys not in en:')
  for (const key of extraInZh) console.error(`  - ${key}`)
}
process.exit(1)
