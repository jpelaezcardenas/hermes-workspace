/**
 * Shared Zod schemas for request validation across API endpoints.
 * Centralizing schemas here ensures consistent validation and reduces
 * duplication across route handlers.
 */
import { z } from 'zod'

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export const AuthSchema = z.object({
  password: z.string().max(1000),
})

// ---------------------------------------------------------------------------
// OAuth
// ---------------------------------------------------------------------------

export const OAuthDeviceCodeSchema = z.object({
  provider: z.string().min(1).max(64),
})

export const OAuthPollTokenSchema = z.object({
  provider: z.string().min(1).max(64),
  deviceCode: z.string().min(1).max(256),
})

// ---------------------------------------------------------------------------
// Chat / Messaging
// ---------------------------------------------------------------------------

export const SendMessageSchema = z.object({
  sessionKey: z.string().max(256).optional(),
  friendlyId: z.string().max(256).optional(),
  message: z.string().max(100_000),
  idempotencyKey: z.string().max(128).optional(),
})

export const SendStreamSchema = z.object({
  sessionKey: z.string().max(256).optional(),
  friendlyId: z.string().max(256).optional(),
  message: z.string().max(100_000),
  thinking: z.string().max(10_000).optional(),
  model: z.string().max(128).optional(),
  // Attachments are validated separately (file content can be large)
  attachments: z.unknown().optional(),
})

// ---------------------------------------------------------------------------
// Terminal
// ---------------------------------------------------------------------------

export const TerminalInputSchema = z.object({
  sessionId: z.string().min(1).max(256),
  data: z.string().max(10_000),
})

export const TerminalResizeSchema = z.object({
  sessionId: z.string().min(1).max(256),
  cols: z.number().int().min(1).max(500),
  rows: z.number().int().min(1).max(200),
})

// ---------------------------------------------------------------------------
// Files
// ---------------------------------------------------------------------------

export const ReadFileSchema = z.object({
  path: z.string().max(4096),
})

export const WriteFileSchema = z.object({
  path: z.string().max(4096),
  content: z.string(), // No size limit here — handled at HTTP layer
})

export const DeleteFileSchema = z.object({
  path: z.string().max(4096),
})

// ---------------------------------------------------------------------------
// Memory
// ---------------------------------------------------------------------------

export const MemoryReadSchema = z.object({
  query: z.string().max(1000),
  limit: z.coerce.number().int().min(1).max(100).default(10),
})

export const MemoryWriteSchema = z.object({
  content: z.string().max(50_000),
  metadata: z.record(z.string(), z.unknown()).optional(),
})

export const MemorySearchSchema = z.object({
  query: z.string().max(1000),
  limit: z.coerce.number().int().min(1).max(100).default(10),
})

// ---------------------------------------------------------------------------
// Sessions
// ---------------------------------------------------------------------------

export const SessionStatusSchema = z.object({
  sessionKey: z.string().max(256).optional(),
})
