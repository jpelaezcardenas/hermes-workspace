import { createFileRoute } from '@tanstack/react-router'
import { Conversation } from '@elevenlabs/client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor
    webkitSpeechRecognition?: SpeechRecognitionConstructor
  }
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike

type SpeechRecognitionLike = {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  abort: () => void
  onstart: (() => void) | null
  onend: (() => void) | null
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null
  onresult: ((event: SpeechRecognitionEventLike) => void) | null
}

type SpeechRecognitionErrorEventLike = {
  error?: string
  message?: string
}

type SpeechRecognitionEventLike = {
  resultIndex: number
  results: ArrayLike<{
    isFinal: boolean
    0: { transcript: string }
  }>
}

type VoiceTurn = {
  id: string
  role: 'tim' | 'executive' | 'system'
  text: string
  timestamp: string
}

type VoiceLedgerResponse = {
  ok?: boolean
  conversationId?: string
  filePath?: string
  turnCount?: number
  summary?: string
  decisions?: Array<string>
  followUpActions?: Array<string>
  review?: VoiceReview
  delegation?: DelegationHandoff
  queueItem?: ExecutiveQueueResponse['item'] | null
  error?: string
}

type VoiceReview = {
  summary: string
  decisions: Array<string>
  followUpActions: Array<string>
  openQuestions: Array<string>
  needsApproval: Array<string>
}

type ExecutiveQueueResponse = {
  ok?: boolean
  item?: {
    id: string
    title: string
    status: string
    priority: string
    owner: string
    localPath: string
  }
  error?: string
}

type DelegationHandoff = {
  outcome: string
  owner: string
  context: string
  constraints: Array<string>
  nextAction: string
  approvalRequired: boolean
}

type StreamEvent = {
  event: string
  data: Record<string, unknown>
}

type ElevenLabsConversationSession = {
  endSession: () => Promise<void>
}

type ElevenLabsTokenResponse = {
  ok?: boolean
  token?: string
  error?: string
}

const EXECUTIVE_DELEGATION_SYSTEM_PROMPT = [
  'You are Executive, Tim Walker\'s cross-domain chief of staff.',
  'This is a browser voice prototype for AI ops agent delegation while Tim may be driving.',
  'Keep responses short, spoken-first, and safe for audio.',
  'Ask one question at a time unless Tim clearly asks you to summarize or decide.',
  'Push toward a clear delegated next action.',
  'For every work request, classify the right workflow or agent, state why, and name the next action.',
  'Do not execute side effects unless Tim explicitly confirms. Draft or queue by default.',
  'Current prototype test case: prepare Tim\'s May 28 Travel Multiplier webinar.',
].join('\n')

function getSpeechRecognitionConstructor(): SpeechRecognitionConstructor | null {
  if (typeof window === 'undefined') return null
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}

function parseSseEvents(buffer: string): { events: Array<StreamEvent>; rest: string } {
  const parts = buffer.split('\n\n')
  const rest = parts.pop() ?? ''
  const events: Array<StreamEvent> = []

  for (const part of parts) {
    const lines = part.split('\n')
    const eventLine = lines.find((line) => line.startsWith('event:'))
    const dataLines = lines.filter((line) => line.startsWith('data:'))
    const event = eventLine?.replace(/^event:\s*/, '').trim() || 'message'
    const dataRaw = dataLines.map((line) => line.replace(/^data:\s*/, '')).join('\n')
    if (!dataRaw) continue
    try {
      const data = JSON.parse(dataRaw) as Record<string, unknown>
      events.push({ event, data })
    } catch {
      events.push({ event, data: { text: dataRaw } })
    }
  }

  return { events, rest }
}

function getStreamText(event: StreamEvent): string {
  if (event.event !== 'chunk') return ''
  const text = event.data.text
  return typeof text === 'string' ? text : ''
}

function stopSpeaking() {
  if (typeof window === 'undefined') return
  window.speechSynthesis.cancel()
}

function speak(text: string) {
  if (typeof window === 'undefined') return
  if (!('speechSynthesis' in window)) return
  stopSpeaking()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = 1.02
  utterance.pitch = 0.95
  utterance.volume = 1
  window.speechSynthesis.speak(utterance)
}

async function getElevenLabsToken(): Promise<string> {
  const response = await fetch('/api/elevenlabs-token', { cache: 'no-store' })
  const data = (await response.json().catch(() => ({}))) as ElevenLabsTokenResponse
  if (!response.ok || !data.token) {
    throw new Error(data.error || `ElevenLabs token request failed: ${response.status}`)
  }
  return data.token
}

async function saveVoiceLedger(payload: {
  conversationId: string
  sessionKey: string
  status: 'active' | 'ended'
  turns: Array<VoiceTurn>
  elevenLabsLog: Array<string>
  createQueueItem?: boolean
}): Promise<VoiceLedgerResponse> {
  const response = await fetch('/api/voice-lab-ledger', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = (await response.json().catch(() => ({}))) as VoiceLedgerResponse
  if (!response.ok || data.ok === false) {
    throw new Error(data.error || `Voice ledger save failed: ${response.status}`)
  }
  return data
}

function readElevenLabsTranscript(message: unknown): { role: 'tim' | 'executive' | 'system'; text: string } | null {
  if (!message || typeof message !== 'object') return null
  const record = message as Record<string, unknown>
  const rawText = record.message ?? record.text ?? record.transcript
  const text = typeof rawText === 'string' ? rawText.trim() : ''
  if (!text) return null

  const rawSource = String(record.source ?? record.role ?? record.type ?? '').toLowerCase()
  if (rawSource.includes('user') || rawSource.includes('human')) return { role: 'tim', text }
  if (rawSource.includes('agent') || rawSource.includes('assistant')) return { role: 'executive', text }
  return { role: 'system', text }
}

function buildEndOfSessionWrapUp(result: VoiceLedgerResponse, reason: string): string {
  const lines = [reason, 'Transcript saved.']
  if (result.summary) lines.push(`Wrap-up: ${result.summary}`)
  if (result.followUpActions?.length) {
    lines.push(`Next action: ${result.followUpActions[result.followUpActions.length - 1]}`)
  }
  return lines.join('\n')
}

export const Route = createFileRoute('/voice-lab')({
  ssr: false,
  component: VoiceLabRoute,
})

function VoiceLabRoute() {
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const elevenLabsConversationRef = useRef<ElevenLabsConversationSession | null>(null)
  const turnsRef = useRef<Array<VoiceTurn>>([])
  const sessionKeyRef = useRef('new')
  const elevenLabsLogRef = useRef<Array<string>>([])
  const finalizedRef = useRef(false)
  const [turns, setTurns] = useState<Array<VoiceTurn>>(() => [
    {
      id: 'intro',
      role: 'system',
      text: 'Prototype goal: talk to Executive in the browser, interrupt naturally, and leave with a delegated next action.',
      timestamp: new Date().toISOString(),
    },
  ])
  const [isListening, setIsListening] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [interimTranscript, setInterimTranscript] = useState('')
  const [draftText, setDraftText] = useState('')
  const [error, setError] = useState('')
  const [sessionKey, setSessionKey] = useState('new')
  const [conversationId] = useState(() => `voice-${Date.now()}-${Math.random().toString(16).slice(2)}`)
  const [ledgerStatus, setLedgerStatus] = useState('Not saved yet')
  const [ledgerPath, setLedgerPath] = useState('')
  const [latestLedgerReview, setLatestLedgerReview] = useState<VoiceLedgerResponse | null>(null)
  const [queueStatus, setQueueStatus] = useState('Not queued yet')
  const [elevenLabsStatus, setElevenLabsStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle')
  const [elevenLabsError, setElevenLabsError] = useState('')
  const [elevenLabsLog, setElevenLabsLog] = useState<Array<string>>([])

  const supportsSpeechRecognition = useMemo(
    () => typeof window !== 'undefined' && Boolean(getSpeechRecognitionConstructor()),
    [],
  )

  useEffect(() => {
    turnsRef.current = turns
  }, [turns])

  useEffect(() => {
    sessionKeyRef.current = sessionKey
  }, [sessionKey])

  useEffect(() => {
    elevenLabsLogRef.current = elevenLabsLog
  }, [elevenLabsLog])

  const appendTurn = useCallback((turn: Omit<VoiceTurn, 'id' | 'timestamp'>) => {
    setTurns((current) => [
      ...current,
      {
        ...turn,
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        timestamp: new Date().toISOString(),
      },
    ])
  }, [])

  const appendElevenLabsLog = useCallback((message: string) => {
    setElevenLabsLog((current) => [
      ...current.slice(-8),
      `${new Date().toLocaleTimeString()} ${message}`,
    ])
  }, [])

  const updateStreamingExecutiveTurn = useCallback((text: string) => {
    setTurns((current) => {
      const last = current[current.length - 1]
      if (last.role === 'executive' && last.id === 'streaming') {
        return [...current.slice(0, -1), { ...last, text }]
      }
      return [...current, { id: 'streaming', role: 'executive', text, timestamp: new Date().toISOString() }]
    })
  }, [])

  const finalizeStreamingExecutiveTurn = useCallback(() => {
    setTurns((current) => {
      const last = current[current.length - 1]
      if (last.id !== 'streaming') return current
      return [
        ...current.slice(0, -1),
        { ...last, id: `${Date.now()}-${Math.random().toString(16).slice(2)}` },
      ]
    })
  }, [])

  const sendToExecutive = useCallback(
    async (message: string) => {
      const cleanMessage = message.trim()
      if (!cleanMessage || isThinking) return
      setError('')
      setDraftText('')
      setInterimTranscript('')
      appendTurn({ role: 'tim', text: cleanMessage })
      setIsThinking(true)

      const controller = new AbortController()
      abortRef.current = controller
      let assistantText = ''

      try {
        const response = await fetch('/api/send-stream', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            sessionKey,
            message: cleanMessage,
            thinking: EXECUTIVE_DELEGATION_SYSTEM_PROMPT,
          }),
        })

        if (!response.ok) {
          throw new Error(await response.text())
        }
        if (!response.body) throw new Error('No response stream returned')

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        for (;;) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          const parsed = parseSseEvents(buffer)
          buffer = parsed.rest

          for (const event of parsed.events) {
            if (event.event === 'started') {
              const nextSessionKey = event.data.sessionKey
              if (typeof nextSessionKey === 'string' && nextSessionKey.trim()) {
                setSessionKey(nextSessionKey)
              }
            }
            if (event.event === 'error') {
              const streamErrorMessage = event.data.message
              throw new Error(typeof streamErrorMessage === 'string' ? streamErrorMessage : 'Stream error')
            }
            const nextText = getStreamText(event)
            if (nextText) {
              const fullReplace = event.data.fullReplace === true
              assistantText = fullReplace ? nextText : `${assistantText}${nextText}`
              updateStreamingExecutiveTurn(assistantText)
            }
          }
        }

        finalizeStreamingExecutiveTurn()
        if (assistantText.trim()) speak(assistantText.trim())
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          appendTurn({ role: 'system', text: 'Interrupted.' })
        } else {
          setError(getErrorMessage(err))
        }
      } finally {
        setIsThinking(false)
        abortRef.current = null
      }
    },
    [appendTurn, finalizeStreamingExecutiveTurn, isThinking, sessionKey, updateStreamingExecutiveTurn],
  )

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }, [])

  const startListening = useCallback(() => {
    setError('')
    stopSpeaking()
    abortRef.current?.abort()

    const Recognition = getSpeechRecognitionConstructor()
    if (!Recognition) {
      setError('This browser does not support SpeechRecognition. Use Chrome or Edge for this prototype.')
      return
    }

    const recognition = new Recognition()
    recognitionRef.current = recognition
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'en-US'

    let finalTranscript = ''
    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => {
      setIsListening(false)
      setInterimTranscript('')
      const transcript = finalTranscript.trim()
      if (transcript) void sendToExecutive(transcript)
    }
    recognition.onerror = (event) => {
      setIsListening(false)
      setError(event.message || event.error || 'Speech recognition failed')
    }
    recognition.onresult = (event) => {
      let interim = ''
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index]
        const transcript = result[0].transcript
        if (result.isFinal) finalTranscript += transcript
        else interim += transcript
      }
      setInterimTranscript(interim.trim())
    }

    recognition.start()
  }, [sendToExecutive])

  const finalizeVoiceSession = useCallback(
    async (reason: string) => {
      if (finalizedRef.current) return
      finalizedRef.current = true
      setLedgerStatus('Saving final transcript...')
      try {
        const result = await saveVoiceLedger({
          conversationId,
          sessionKey: sessionKeyRef.current,
          status: 'ended',
          turns: turnsRef.current,
          elevenLabsLog: elevenLabsLogRef.current,
        })
        setLedgerStatus(`Session ended. Transcript saved (${result.turnCount ?? turnsRef.current.length} turns)`)
        if (result.filePath) setLedgerPath(result.filePath)
        setLatestLedgerReview(result)
        appendTurn({ role: 'system', text: buildEndOfSessionWrapUp(result, reason) })
      } catch (nextError) {
        const message = getErrorMessage(nextError)
        setLedgerStatus(`Final save failed: ${message}`)
        appendTurn({ role: 'system', text: `${reason}\nTranscript save failed: ${message}` })
      }
    },
    [appendTurn, conversationId],
  )

  const stopElevenLabsLive = useCallback(async () => {
    const conversation = elevenLabsConversationRef.current
    elevenLabsConversationRef.current = null
    if (conversation) {
      await conversation.endSession()
    }
    setElevenLabsStatus('idle')
    appendElevenLabsLog('ElevenLabs live session stopped.')
    await finalizeVoiceSession('Session ended by Tim.')
  }, [appendElevenLabsLog, finalizeVoiceSession])

  const startElevenLabsLive = useCallback(async () => {
    finalizedRef.current = false
    setElevenLabsError('')
    setLedgerStatus('Live session active. Saving transcript...')
    setElevenLabsStatus('connecting')
    stopSpeaking()
    abortRef.current?.abort()
    recognitionRef.current?.abort()
    setIsListening(false)
    setIsThinking(false)

    try {
      appendElevenLabsLog('Requesting microphone permission...')
      await navigator.mediaDevices.getUserMedia({ audio: true })
      appendElevenLabsLog('Requesting ElevenLabs token...')
      const token = await getElevenLabsToken()
      appendElevenLabsLog('Starting Speech Engine session...')
      const conversation = (await Conversation.startSession({
        conversationToken: token,
        onConnect: () => {
          setElevenLabsStatus('connected')
          appendElevenLabsLog('Connected. Start talking naturally.')
        },
        onDisconnect: () => {
          elevenLabsConversationRef.current = null
          setElevenLabsStatus('idle')
          appendElevenLabsLog('Disconnected.')
          void finalizeVoiceSession('ElevenLabs live session ended.')
        },
        onError: (nextError: Error | string) => {
          const message = nextError instanceof Error ? nextError.message : String(nextError)
          setElevenLabsStatus('error')
          setElevenLabsError(message)
          appendElevenLabsLog(`Error: ${message}`)
        },
        onModeChange: (mode: unknown) => appendElevenLabsLog(`Mode: ${JSON.stringify(mode)}`),
        onMessage: (message: unknown) => {
          appendElevenLabsLog(`Event: ${JSON.stringify(message)}`)
          const transcript = readElevenLabsTranscript(message)
          if (transcript) appendTurn(transcript)
        },
      })) as ElevenLabsConversationSession
      elevenLabsConversationRef.current = conversation
    } catch (nextError) {
      const message = getErrorMessage(nextError)
      setElevenLabsStatus('error')
      setElevenLabsError(message)
      appendElevenLabsLog(`Failed: ${message}`)
    }
  }, [appendElevenLabsLog, appendTurn, finalizeVoiceSession])

  const interrupt = useCallback(() => {
    stopSpeaking()
    void stopElevenLabsLive()
    abortRef.current?.abort()
    recognitionRef.current?.abort()
    setIsListening(false)
    setIsThinking(false)
    appendTurn({ role: 'system', text: 'Interrupted. Start speaking again when ready.' })
  }, [appendTurn, stopElevenLabsLive])

  useEffect(() => {
    if (finalizedRef.current) return undefined
    const timeout = window.setTimeout(() => {
      void saveVoiceLedger({
        conversationId,
        sessionKey,
        status: elevenLabsStatus === 'connected' || isListening || isThinking ? 'active' : 'ended',
        turns,
        elevenLabsLog,
      })
        .then((result) => {
          setLedgerStatus(`Saved ${result.turnCount ?? turns.length} turns`)
          if (result.filePath) setLedgerPath(result.filePath)
          setLatestLedgerReview(result)
        })
        .catch((nextError) => setLedgerStatus(`Save failed: ${getErrorMessage(nextError)}`))
    }, 700)

    return () => window.clearTimeout(timeout)
  }, [conversationId, elevenLabsLog, elevenLabsStatus, isListening, isThinking, sessionKey, turns])

  const queueDelegation = useCallback(async () => {
    setQueueStatus('Saving delegation handoff...')
    try {
      const result = await saveVoiceLedger({
        conversationId,
        sessionKey: sessionKeyRef.current,
        status: 'ended',
        turns: turnsRef.current,
        elevenLabsLog: elevenLabsLogRef.current,
        createQueueItem: true,
      })
      setLatestLedgerReview(result)
      const queueItem = result.queueItem
      setQueueStatus(`Queued: ${queueItem?.title ?? 'Executive Queue item'} (${queueItem?.status ?? 'saved'})`)
      if (queueItem?.localPath) setLedgerPath(queueItem.localPath)
    } catch (nextError) {
      setQueueStatus(`Queue failed: ${getErrorMessage(nextError)}`)
    }
  }, [conversationId])

  useEffect(() => {
    return () => {
      stopSpeaking()
      recognitionRef.current?.abort()
      abortRef.current?.abort()
      void elevenLabsConversationRef.current?.endSession()
      elevenLabsConversationRef.current = null
    }
  }, [])

  const statusText = isListening
    ? 'Listening. Stop when done.'
    : isThinking
      ? 'Executive is thinking.'
      : 'Ready.'

  return (
    <main className="min-h-screen bg-primary-950 text-primary-50">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-3xl border border-primary-800 bg-primary-900/80 p-5 shadow-2xl shadow-black/20">
          <p className="text-sm uppercase tracking-[0.28em] text-accent-300">Executive Voice Lab</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Browser voice delegation prototype
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-primary-200">
            Test: talk to Executive, interrupt naturally, and leave with a clear delegated next action.
          </p>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-primary-800 bg-primary-900/70 p-5">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={elevenLabsStatus === 'connected' ? stopElevenLabsLive : startElevenLabsLive}
                disabled={elevenLabsStatus === 'connecting'}
                className="rounded-full bg-accent-400 px-6 py-3 text-base font-semibold text-primary-950 transition hover:bg-accent-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {elevenLabsStatus === 'connected'
                  ? 'Stop ElevenLabs live'
                  : elevenLabsStatus === 'connecting'
                    ? 'Connecting...'
                    : 'Start ElevenLabs live'}
              </button>
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                disabled={isThinking && !isListening}
                className="rounded-full border border-primary-700 px-5 py-3 text-base font-semibold text-primary-100 transition hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isListening ? 'Stop and send browser voice' : 'Browser voice fallback'}
              </button>
              <button
                type="button"
                onClick={interrupt}
                className="rounded-full border border-red-300/50 px-5 py-3 text-base font-semibold text-red-100 transition hover:bg-red-500/10"
              >
                Interrupt
              </button>
              <span className="rounded-full bg-primary-800 px-4 py-2 text-sm text-primary-200">
                ElevenLabs: {elevenLabsStatus}
              </span>
              <span className="rounded-full bg-primary-800 px-4 py-2 text-sm text-primary-200">
                Fallback: {statusText}
              </span>
            </div>

            <div className="mt-4 rounded-2xl border border-accent-300/20 bg-accent-300/10 p-4 text-sm leading-6 text-primary-100">
              <p className="font-semibold text-accent-200">Recommended test mode</p>
              <p className="mt-1">
                Use ElevenLabs live first. It handles real turn-taking, audio output, and natural interruption.
                Browser voice remains here as a fallback baseline.
              </p>
            </div>

            {elevenLabsError ? (
              <div className="mt-4 rounded-2xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-100">
                {elevenLabsError}
              </div>
            ) : null}

            {elevenLabsLog.length ? (
              <div className="mt-4 max-h-48 overflow-y-auto rounded-2xl bg-primary-950 p-4 font-mono text-xs leading-5 text-primary-300">
                {elevenLabsLog.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            ) : null}

            {!supportsSpeechRecognition ? (
              <div className="mt-4 rounded-2xl border border-amber-400/40 bg-amber-400/10 p-4 text-sm text-amber-100">
                Browser speech recognition is unavailable. Use Chrome or Edge for hands-free input.
              </div>
            ) : null}

            {interimTranscript ? (
              <div className="mt-4 rounded-2xl border border-accent-300/30 bg-accent-300/10 p-4 text-primary-100">
                <p className="text-xs uppercase tracking-[0.2em] text-accent-200">Hearing</p>
                <p className="mt-2 text-lg">{interimTranscript}</p>
              </div>
            ) : null}

            <form
              className="mt-5 flex gap-3"
              onSubmit={(event) => {
                event.preventDefault()
                void sendToExecutive(draftText)
              }}
            >
              <input
                value={draftText}
                onChange={(event) => setDraftText(event.target.value)}
                placeholder="Fallback text input"
                className="min-w-0 flex-1 rounded-2xl border border-primary-700 bg-primary-950 px-4 py-3 text-primary-50 outline-none placeholder:text-primary-500 focus:border-accent-300"
              />
              <button
                type="submit"
                disabled={!draftText.trim() || isThinking}
                className="rounded-2xl bg-primary-100 px-5 py-3 font-semibold text-primary-950 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send
              </button>
            </form>

            {error ? (
              <div className="mt-4 rounded-2xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-100">
                {error}
              </div>
            ) : null}
          </div>

          <aside className="rounded-3xl border border-primary-800 bg-primary-900/70 p-5">
            <h2 className="text-lg font-semibold">Prototype rules</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-primary-200">
              <li>• One question at a time.</li>
              <li>• Spoken-first responses.</li>
              <li>• Delegation decision before execution.</li>
              <li>• No side effects without explicit confirmation.</li>
            </ul>
            <div className="mt-5 rounded-2xl bg-primary-950 p-4 text-sm text-primary-300">
              <p>
                Session: <span className="font-mono text-primary-100">{sessionKey}</span>
              </p>
              <p className="mt-2">
                Voice ledger: <span className="text-primary-100">{ledgerStatus}</span>
              </p>
              {ledgerPath ? (
                <p className="mt-2 break-all font-mono text-xs text-primary-400">{ledgerPath}</p>
              ) : null}
            </div>
          </aside>
        </section>

        {latestLedgerReview?.review || latestLedgerReview?.delegation ? (
          <section className="rounded-3xl border border-accent-300/30 bg-primary-900/80 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-accent-300">Post-session review</p>
                <h2 className="mt-2 text-2xl font-semibold">Executive delegation handoff</h2>
              </div>
              <button
                type="button"
                onClick={queueDelegation}
                className="rounded-full bg-accent-400 px-5 py-3 text-sm font-semibold text-primary-950 transition hover:bg-accent-300"
              >
                Send to Executive Queue
              </button>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl bg-primary-950 p-4">
                <h3 className="font-semibold text-primary-50">Review</h3>
                <p className="mt-3 text-sm leading-6 text-primary-200">
                  {latestLedgerReview.review?.summary ?? latestLedgerReview.summary}
                </p>
                <ReviewList label="Decisions" items={latestLedgerReview.review?.decisions ?? []} />
                <ReviewList label="Follow-up actions" items={latestLedgerReview.review?.followUpActions ?? []} />
                <ReviewList label="Open questions" items={latestLedgerReview.review?.openQuestions ?? []} />
                <ReviewList label="Needs approval" items={latestLedgerReview.review?.needsApproval ?? []} />
              </div>

              {latestLedgerReview.delegation ? (
                <div className="rounded-2xl border border-accent-300/20 bg-accent-300/10 p-4">
                  <h3 className="font-semibold text-accent-100">Delegation object</h3>
                  <dl className="mt-3 space-y-3 text-sm leading-6 text-primary-100">
                    <div>
                      <dt className="text-primary-400">Outcome</dt>
                      <dd>{latestLedgerReview.delegation.outcome}</dd>
                    </div>
                    <div>
                      <dt className="text-primary-400">Owner / agent</dt>
                      <dd>{latestLedgerReview.delegation.owner}</dd>
                    </div>
                    <div>
                      <dt className="text-primary-400">Next action</dt>
                      <dd>{latestLedgerReview.delegation.nextAction}</dd>
                    </div>
                    <div>
                      <dt className="text-primary-400">Approval required</dt>
                      <dd>{latestLedgerReview.delegation.approvalRequired ? 'Yes' : 'No'}</dd>
                    </div>
                    <div>
                      <dt className="text-primary-400">Queue status</dt>
                      <dd>{queueStatus}</dd>
                    </div>
                  </dl>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        <section className="flex-1 rounded-3xl border border-primary-800 bg-primary-900/70 p-5">
          <h2 className="text-lg font-semibold">Conversation</h2>
          <div className="mt-4 flex flex-col gap-3">
            {turns.map((turn) => (
              <article
                key={turn.id}
                className={
                  turn.role === 'tim'
                    ? 'ml-auto max-w-[85%] rounded-3xl bg-accent-300 p-4 text-primary-950'
                    : turn.role === 'executive'
                      ? 'mr-auto max-w-[85%] rounded-3xl bg-primary-800 p-4 text-primary-50'
                      : 'mx-auto max-w-[90%] rounded-2xl border border-primary-800 bg-primary-950 p-3 text-sm text-primary-300'
                }
              >
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] opacity-70">
                  {turn.role === 'tim' ? 'Tim' : turn.role === 'executive' ? 'Executive' : 'System'}
                </p>
                <p className="whitespace-pre-wrap leading-7">{turn.text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

function ReviewList({ label, items }: { label: string; items: Array<string> }) {
  if (!items.length) return null
  return (
    <div className="mt-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-400">{label}</p>
      <ul className="mt-2 space-y-2 text-sm leading-6 text-primary-200">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  )
}
