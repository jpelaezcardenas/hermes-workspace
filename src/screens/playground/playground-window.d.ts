/**
 * Global `window` augmentations for the playground.
 *
 * The 3D world (`playground-world-3d.tsx`) publishes a handful of runtime
 * values and imperative callbacks onto `window` so sibling UI surfaces (HUD,
 * chat panel, minimap, screen shell) can read them without prop-drilling
 * through the heavy Three.js subtree. They are all optional because the world
 * may not be mounted yet (or at all, e.g. SSR / non-playground routes).
 *
 * The `__HERMES_PLAYGROUND_*_URL` entries are optional runtime overrides that a
 * reverse proxy or inline `<script>` can set before the bundle executes to
 * redirect the multiplayer transport without a rebuild.
 */

/** Live online stats pushed by the multiplayer hub. */
interface PlaygroundLiveCount {
  online: number
  byWorld?: Record<string, number>
  peakToday?: number
}

/** Snapshot of the local multiplayer session, exposed for HUD/debug surfaces. */
interface PlaygroundMpInfo {
  online: boolean
  transport: string
  myName: string
  myColor: string
  selfId: string
  remoteCount: number
  serverCount: PlaygroundLiveCount | null
}

declare global {
  interface Window {
    /** Opens the NPC dialog for the given id; installed by the screen shell. */
    __hermesPlaygroundOpenDialog?: (id: string) => void
    /** Sends a chat line through the active multiplayer transport. */
    __hermesPlaygroundSendChat?: (text: string) => void
    /** Latest sampled local player position in world coordinates. */
    __hermesPlaygroundPlayerPos?: { x: number; y: number; z: number }
    /** Latest live online count pushed by the multiplayer hub. */
    __hermesPlaygroundLiveCount?: PlaygroundLiveCount
    /** Current transport state string (e.g. 'ws' | 'broadcast' | 'offline'). */
    __hermesPlaygroundLiveTransport?: string
    /** Returns a snapshot of the local multiplayer session. */
    __hermesPlaygroundMpInfo?: () => PlaygroundMpInfo
    /** Runtime override for the multiplayer WebSocket URL. */
    __HERMES_PLAYGROUND_WS_URL?: string
    /** Runtime override for the multiplayer HTTP base URL. */
    __HERMES_PLAYGROUND_HTTP_URL?: string
  }
}

export {}
