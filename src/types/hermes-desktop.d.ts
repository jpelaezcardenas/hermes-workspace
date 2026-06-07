/**
 * Type declarations for the Electron desktop IPC bridge.
 *
 * `window.hermesDesktop` is exposed by `electron/preload.cjs` via
 * `contextBridge.exposeInMainWorld('hermesDesktop', …)` and is only present in
 * the desktop build (undefined in the browser). Renderer code should
 * feature-detect it: `if (window.hermesDesktop) { … }`.
 *
 * Keep this in sync with the surface in `electron/preload.cjs`.
 */

export interface HermesDesktopUpdateState {
  status?: string
  version?: string
  progress?: number
  [key: string]: unknown
}

export interface HermesDesktopBridge {
  bootstrap: {
    status: () => Promise<unknown>
    installHermes: () => Promise<unknown>
    startBackend: () => Promise<unknown>
    openLogs: () => Promise<unknown>
  }
  updates: {
    check: () => Promise<unknown>
    getState: () => Promise<HermesDesktopUpdateState>
    onStateChange: (callback: (state: HermesDesktopUpdateState) => void) => void
    removeStateListener: (
      callback: (state: HermesDesktopUpdateState) => void,
    ) => void
  }
  app: {
    version: string
    platform: NodeJS.Platform
    isElectron: boolean
  }
}

declare global {
  interface Window {
    /** Present only in the Electron desktop build; undefined in the browser. */
    hermesDesktop?: HermesDesktopBridge
  }
}

export {}
