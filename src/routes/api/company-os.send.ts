import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { homedir } from 'node:os'
import { isAuthenticated } from '../../server/auth-middleware'
import { requireJsonContentType } from '../../server/rate-limit'

type CompanyOsSendBody = {
  to?: string | Array<string>
  cc?: string | Array<string>
  subject?: string
  body?: string
  threadId?: string | null
  attachPdf?: boolean
}

type GmailTokenFile = {
  refresh_token?: string
  client_id?: string
  client_secret?: string
  account?: string
}

type MimeAttachment = {
  filename: string
  mimeType: string
  data: Buffer
}

const ASHER_GMAIL_TOKEN_PATH =
  process.env.ASHER_GMAIL_TOKEN_PATH ||
  path.join(homedir(), '.config/google-credentials/gmail-token.json')

const PARTNERSHIP_PACKAGES_PATH =
  process.env.UNALIGNED_PARTNERSHIP_PACKAGES_PATH ||
  path.join(homedir(), 'Desktop/MASTER FILES/docs/Unaligned_Partnership_Packages.pdf')

let cachedAccessToken: { token: string; expiry: number } | null = null

export const Route = createFileRoute('/api/company-os/send')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }

        const csrfCheck = requireJsonContentType(request)
        if (csrfCheck) return csrfCheck

        try {
          const body = (await request.json()) as CompanyOsSendBody
          const to = normalizeEmailList(body.to)
          const cc = normalizeEmailList(body.cc)
          const subject = String(body.subject || '').trim()
          const messageBody = String(body.body || '').trim()

          if (!to.length || !subject || !messageBody) {
            return json(
              { ok: false, error: 'Missing to, subject, or body' },
              { status: 400 },
            )
          }

          const accessToken = await getAsherAccessToken()
          const attachments = body.attachPdf ? await getPricingAttachments() : []
          const rawMime = buildRawMime({
            to,
            cc,
            subject,
            body: messageBody,
            attachments,
          })

          const gmailResponse = await fetch(
            'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                raw: rawMime,
                threadId: body.threadId || undefined,
              }),
            },
          )

          const data = (await gmailResponse.json()) as {
            id?: string
            error?: { message?: string }
          }

          if (!gmailResponse.ok || data.error) {
            throw new Error(data.error?.message || `Gmail send failed (${gmailResponse.status})`)
          }

          return json({ ok: true, messageId: data.id || 'sent' })
        } catch (error) {
          return json(
            {
              ok: false,
              error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 },
          )
        }
      },
    },
  },
})

function normalizeEmailList(value: string | Array<string> | undefined): Array<string> {
  if (!value) return []
  const list = Array.isArray(value) ? value : value.split(/[,\s;]+/)
  return Array.from(
    new Set(
      list
        .map((item) => extractEmail(item))
        .filter((item) => item.length > 0),
    ),
  )
}

function extractEmail(value: string): string {
  const match = String(value || '').match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)
  return match?.[0]?.toLowerCase() || ''
}

function encodeBase64Url(value: string): string {
  return Buffer.from(value, 'utf8').toString('base64url')
}

function buildRawMime({
  to,
  cc,
  subject,
  body,
  attachments = [],
}: {
  to: Array<string>
  cc: Array<string>
  subject: string
  body: string
  attachments?: Array<MimeAttachment>
}): string {
  if (attachments.length) {
    const boundary = `company-os-${Date.now().toString(36)}`
    const headers = [
      `To: ${to.join(', ')}`,
      cc.length ? `Cc: ${cc.join(', ')}` : null,
      `From: Asher Weisberger <asherunaligned@gmail.com>`,
      `Subject: ${subject}`,
      'MIME-Version: 1.0',
      `Content-Type: multipart/mixed; boundary="${boundary}"`,
    ].filter((line): line is string => Boolean(line))
    const lines = [
      ...headers,
      '',
      `--${boundary}`,
      'Content-Type: text/plain; charset="UTF-8"',
      'Content-Transfer-Encoding: 7bit',
      '',
      body,
      ...attachments.flatMap((attachment) => [
        '',
        `--${boundary}`,
        `Content-Type: ${attachment.mimeType}; name="${attachment.filename}"`,
        'Content-Transfer-Encoding: base64',
        `Content-Disposition: attachment; filename="${attachment.filename}"`,
        '',
        chunkBase64(attachment.data.toString('base64')).join('\r\n'),
      ]),
      '',
      `--${boundary}--`,
    ]

    return encodeBase64Url(lines.join('\r\n'))
  }

  const lines = [
    `To: ${to.join(', ')}`,
    cc.length ? `Cc: ${cc.join(', ')}` : '',
    `From: Asher Weisberger <asherunaligned@gmail.com>`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset="UTF-8"',
    '',
    body,
  ].filter(Boolean)

  return encodeBase64Url(lines.join('\r\n'))
}

async function getPricingAttachments(): Promise<Array<MimeAttachment>> {
  try {
    const data = await readFile(PARTNERSHIP_PACKAGES_PATH)
    return [
      {
        filename: 'Unaligned_Partnership_Packages.pdf',
        mimeType: 'application/pdf',
        data,
      },
    ]
  } catch {
    return []
  }
}

function chunkBase64(value: string): Array<string> {
  const chunks: Array<string> = []
  for (let index = 0; index < value.length; index += 76) {
    chunks.push(value.slice(index, index + 76))
  }
  return chunks
}

async function getAsherAccessToken(): Promise<string> {
  const now = Date.now()
  if (cachedAccessToken && cachedAccessToken.expiry - now > 60_000) {
    return cachedAccessToken.token
  }

  const raw = await readFile(ASHER_GMAIL_TOKEN_PATH, 'utf8')
  const tokenFile = JSON.parse(raw) as GmailTokenFile
  if (!tokenFile.refresh_token || !tokenFile.client_id || !tokenFile.client_secret) {
    throw new Error('Asher Gmail credentials are incomplete')
  }

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: tokenFile.client_id,
      client_secret: tokenFile.client_secret,
      refresh_token: tokenFile.refresh_token,
      grant_type: 'refresh_token',
    }).toString(),
  })

  const data = (await response.json()) as {
    access_token?: string
    expires_in?: number
    error?: string
    error_description?: string
  }

  if (!response.ok || data.error || !data.access_token) {
    throw new Error(data.error_description || data.error || 'Failed to refresh Asher Gmail token')
  }

  cachedAccessToken = {
    token: data.access_token,
    expiry: now + Math.max((data.expires_in || 3600) * 1000, 60_000),
  }

  return cachedAccessToken.token
}
