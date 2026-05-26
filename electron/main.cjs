const { app, BrowserWindow, dialog, ipcMain, shell } = require('electron')
const { join } = require('path')
const { existsSync } = require('fs')
const { spawn, execSync } = require('child_process')
const http = require('http')
let autoUpdater = null
try {
  ;({ autoUpdater } = require('electron-updater'))
} catch (error) {
  console.warn(
    '[hermes-workspace] electron-updater unavailable, disabling built-in updater:',
    error?.message || error,
  )
}

const APP_PORT = 3847
const DEFAULT_HERMES_API_URL = 'http://127.0.0.1:8642'
const DEFAULT_HERMES_DASHBOARD_URL = 'http://127.0.0.1:9119'
const HERMES_INSTALL_SCRIPT =
  'curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash -s -- --skip-setup'

let mainWindow = null
let localServer = null
let localServerPort = APP_PORT
let localServerReady = false
let installProcess = null

function normalizeBaseUrl(value, fallback) {
  const raw = String(value || fallback || '').trim()
  return raw.replace(/\/+$/, '')
}

function joinUrl(baseUrl, path) {
  const base = normalizeBaseUrl(baseUrl, '')
  const suffix = String(path || '').replace(/^\/+/, '')
  return `${base}/${suffix}`
}

function desktopBrowserHost(value) {
  const raw = String(value || '').trim()
  if (!raw || raw === '0.0.0.0' || raw === '::') return '127.0.0.1'
  return raw
}

function getHermesApiBaseUrl() {
  return normalizeBaseUrl(
    process.env.HERMES_API_URL || process.env.CLAUDE_API_URL,
    DEFAULT_HERMES_API_URL,
  )
}

function getHermesDashboardBaseUrl() {
  return normalizeBaseUrl(
    process.env.HERMES_DASHBOARD_URL || process.env.CLAUDE_DASHBOARD_URL,
    DEFAULT_HERMES_DASHBOARD_URL,
  )
}

function getHermesGatewayHealthUrl() {
  return (
    process.env.HERMES_GATEWAY_HEALTH_URL ||
    process.env.CLAUDE_GATEWAY_HEALTH_URL ||
    joinUrl(getHermesApiBaseUrl(), '/health')
  )
}

function getHermesDashboardStatusUrl() {
  return (
    process.env.HERMES_DASHBOARD_STATUS_URL ||
    process.env.CLAUDE_DASHBOARD_STATUS_URL ||
    joinUrl(getHermesDashboardBaseUrl(), '/api/status')
  )
}

const gotLock = app.requestSingleInstanceLock()
if (!gotLock) app.quit()

let updateState = {
  checking: false,
  available: false,
  downloaded: false,
  error: null,
  version: app.getVersion(),
}

function broadcastUpdateState() {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('desktop:update-state', updateState)
  }
}

function configureAutoUpdater() {
  if (!autoUpdater) {
    updateState = {
      ...updateState,
      checking: false,
      available: false,
      downloaded: false,
      error: 'built-in updater unavailable in this build',
    }
    broadcastUpdateState()
    return
  }

  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = true

  autoUpdater.on('checking-for-update', () => {
    updateState = { ...updateState, checking: true, error: null }
    broadcastUpdateState()
  })
  autoUpdater.on('update-available', async (info) => {
    updateState = {
      ...updateState,
      checking: false,
      available: true,
      downloaded: false,
      error: null,
      latestVersion: info?.version || null,
    }
    broadcastUpdateState()
    const result = await dialog.showMessageBox({
      type: 'info',
      buttons: ['Download update', 'Later'],
      defaultId: 0,
      cancelId: 1,
      title: 'Update available',
      message: `A new hermes-workspace version (${info?.version || 'latest'}) is available.`,
      detail: 'Download and install it from inside the app?',
    })
    if (result.response === 0) {
      await autoUpdater.downloadUpdate()
    }
  })
  autoUpdater.on('update-not-available', () => {
    updateState = {
      ...updateState,
      checking: false,
      available: false,
      downloaded: false,
      error: null,
    }
    broadcastUpdateState()
  })
  autoUpdater.on('update-downloaded', async (info) => {
    updateState = {
      ...updateState,
      checking: false,
      available: true,
      downloaded: true,
      error: null,
      latestVersion: info?.version || null,
    }
    broadcastUpdateState()
    const result = await dialog.showMessageBox({
      type: 'info',
      buttons: ['Install and restart', 'Later'],
      defaultId: 0,
      cancelId: 1,
      title: 'Update ready',
      message: `hermes-workspace ${info?.version || ''} is ready to install.`,
      detail: 'The app will restart to finish the update.',
    })
    if (result.response === 0) {
      autoUpdater.quitAndInstall()
    }
  })
  autoUpdater.on('error', (error) => {
    updateState = {
      ...updateState,
      checking: false,
      error: error?.message || String(error),
    }
    broadcastUpdateState()
  })
}

async function checkForAppUpdates() {
  if (!autoUpdater) {
    return { ok: false, error: 'built-in updater unavailable in this build' }
  }
  try {
    await autoUpdater.checkForUpdates()
    return { ok: true }
  } catch (error) {
    updateState = {
      ...updateState,
      checking: false,
      error: error?.message || String(error),
    }
    broadcastUpdateState()
    return { ok: false, error: updateState.error }
  }
}

function checkHttp(url, timeoutMs = 2500) {
  return new Promise((resolve) => {
    const request = http.get(url, { timeout: timeoutMs }, (response) => {
      resolve((response.statusCode || 500) < 500)
      response.resume()
    })
    request.on('error', () => resolve(false))
    request.on('timeout', () => {
      request.destroy()
      resolve(false)
    })
  })
}

function isHermesInstalled() {
  try {
    execSync(process.platform === 'win32' ? 'where hermes' : 'which hermes', {
      timeout: 5000,
      stdio: 'ignore',
      shell: true,
    })
    return true
  } catch {
    return false
  }
}

function resolveHermesExecutable() {
  const candidates = [
    process.env.HERMES_CLI_BIN,
    process.platform === 'win32'
      ? join(__dirname, '..', '.venv-hermes', 'Scripts', 'hermes.exe')
      : join(__dirname, '..', '.venv-hermes', 'bin', 'hermes'),
    'hermes',
  ].filter(Boolean)

  for (const candidate of candidates) {
    if (candidate === 'hermes' || existsSync(candidate)) return candidate
  }
  return 'hermes'
}

async function getBootstrapStatus() {
  return {
    hermesInstalled: isHermesInstalled(),
    gatewayReachable: await checkHttp(getHermesGatewayHealthUrl()),
    dashboardReachable: await checkHttp(getHermesDashboardStatusUrl()),
    installerRunning: Boolean(installProcess && !installProcess.killed),
    localServerReady,
    localServerPort,
  }
}

function spawnHermesDetached(args, logName) {
  const hermesBin = resolveHermesExecutable()
  const logPath =
    process.platform === 'win32'
      ? join(app.getPath('userData'), `${logName}.log`)
      : `/tmp/${logName}.log`
  const child = spawn(hermesBin, args, {
    detached: true,
    stdio: 'ignore',
    env: {
      ...process.env,
      PATH:
        process.platform === 'win32'
          ? `${join(__dirname, '..', '.venv-hermes', 'Scripts')};${process.env.PATH || ''}`
          : `${join(__dirname, '..', '.venv-hermes', 'bin')}:${process.env.PATH || ''}`,
      HERMES_WORKSPACE_DESKTOP: '1',
      API_SERVER_ENABLED: process.env.API_SERVER_ENABLED || 'true',
      HERMES_AUTH_MODE: process.env.HERMES_AUTH_MODE || 'none',
      P99_AUTH_MODE: process.env.P99_AUTH_MODE || 'none',
      AGENTIC_OS_PORTAL_URL:
        process.env.AGENTIC_OS_PORTAL_URL || 'https://app.99pages.uk',
      AGENTIC_OS_HOST_HOME:
        process.env.AGENTIC_OS_HOST_HOME ||
        join(app.getPath('home'), '.agentic-os'),
      COOKIE_SECURE: process.env.COOKIE_SECURE || '0',
      HERMES_LOG_FILE: process.env.HERMES_LOG_FILE || logPath,
    },
    windowsHide: true,
  })
  child.unref()
  return child
}

async function installHermesInBackground() {
  if (installProcess) {
    return { started: false, reason: 'already-running' }
  }
  installProcess = spawn('bash', ['-lc', HERMES_INSTALL_SCRIPT], {
    detached: false,
    stdio: 'ignore',
    env: { ...process.env },
  })
  installProcess.on('exit', () => {
    installProcess = null
    void ensureHermesBackend()
  })
  return { started: true }
}

async function ensureHermesBackend() {
  const gatewayReachable = await checkHttp(getHermesGatewayHealthUrl())
  const dashboardReachable = await checkHttp(getHermesDashboardStatusUrl())

  if (!isHermesInstalled()) {
    await installHermesInBackground()
    return { installed: false, gatewayReachable, dashboardReachable }
  }

  if (!gatewayReachable) {
    spawnHermesDetached(
      ['gateway', 'run', '--replace', '--accept-hooks'],
      'hermes-workspace-gateway',
    )
  }
  if (!dashboardReachable) {
    spawnHermesDetached(
      ['dashboard', '--no-open', '--skip-build'],
      'hermes-workspace-dashboard',
    )
  }

  return {
    installed: true,
    gatewayReachable: await checkHttp(getHermesGatewayHealthUrl(), 4000),
    dashboardReachable: await checkHttp(getHermesDashboardStatusUrl(), 4000),
  }
}

function getAppUrl() {
  const host = desktopBrowserHost(
    process.env.HERMES_WORKSPACE_BROWSER_HOST ||
      process.env.HERMES_WORKSPACE_BIND_HOST ||
      process.env.HOST,
  )
  if (process.env.NODE_ENV === 'development') {
    return `http://${host}:${process.env.PORT || '3000'}/chat?desktop=1`
  }
  return `http://${host}:${localServerPort}/chat?desktop=1`
}

function startLocalServer() {
  return new Promise((resolve, reject) => {
    let resolved = false
    if (process.env.NODE_ENV === 'development') {
      localServerReady = true
      resolve()
      return
    }

    localServer = spawn(
      process.execPath,
      [join(__dirname, 'prod-server.cjs'), '--port', String(APP_PORT)],
      {
        cwd: join(__dirname, '..'),
        env: {
          ...process.env,
          ELECTRON_RUN_AS_NODE: '1',
          NODE_ENV: 'production',
          PORT: String(APP_PORT),
          HERMES_WORKSPACE_DESKTOP: '1',
          HERMES_API_URL: getHermesApiBaseUrl(),
          HERMES_DASHBOARD_URL: getHermesDashboardBaseUrl(),
          HERMES_GATEWAY_HEALTH_URL: getHermesGatewayHealthUrl(),
          HERMES_DASHBOARD_STATUS_URL: getHermesDashboardStatusUrl(),
          HERMES_WORKSPACE_BIND_HOST:
            process.env.HERMES_WORKSPACE_BIND_HOST ||
            process.env.HOST ||
            '127.0.0.1',
          HERMES_WORKSPACE_BROWSER_HOST:
            process.env.HERMES_WORKSPACE_BROWSER_HOST ||
            desktopBrowserHost(
              process.env.HERMES_WORKSPACE_BIND_HOST || process.env.HOST,
            ),
          HERMES_AUTH_MODE: process.env.HERMES_AUTH_MODE || 'none',
          P99_AUTH_MODE: process.env.P99_AUTH_MODE || 'none',
          AGENTIC_OS_PORTAL_URL:
            process.env.AGENTIC_OS_PORTAL_URL || 'https://app.99pages.uk',
          AGENTIC_OS_HOST_HOME:
            process.env.AGENTIC_OS_HOST_HOME ||
            join(app.getPath('home'), '.agentic-os'),
          COOKIE_SECURE: process.env.COOKIE_SECURE || '0',
        },
        stdio: ['ignore', 'pipe', 'pipe', 'ipc'],
      },
    )

    const onReady = (message) => {
      if (message && message.type === 'ready') {
        localServerReady = true
        localServerPort = message.port || APP_PORT
        resolved = true
        cleanup()
        resolve()
      }
    }
    const onExit = (code) => {
      cleanup()
      if (!resolved) {
        reject(new Error(`desktop server exited early (${code})`))
      }
    }
    const cleanup = () => {
      localServer?.off('message', onReady)
      localServer?.off('exit', onExit)
    }

    localServer.on('message', onReady)
    localServer.on('exit', onExit)
    localServer.stdout?.on('data', (data) => console.log(String(data).trim()))
    localServer.stderr?.on('data', (data) => console.error(String(data).trim()))

    setTimeout(() => {
      if (!resolved) {
        cleanup()
        reject(new Error('desktop server startup timed out after 20s'))
      }
    }, 20_000)
  })
}

async function createWindow() {
  await startLocalServer()

  mainWindow = new BrowserWindow({
    width: 1480,
    height: 940,
    minWidth: 980,
    minHeight: 680,
    title: 'hermes-workspace',
    icon: existsSync(join(__dirname, '..', 'assets', 'icon.png'))
      ? join(__dirname, '..', 'assets', 'icon.png')
      : undefined,
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 16, y: 16 },
    backgroundColor: '#0A0E1A',
    show: false,
    webPreferences: {
      preload: join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show()
    mainWindow?.focus()
  })

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) shell.openExternal(url)
    return { action: 'deny' }
  })

  await mainWindow.loadURL(getAppUrl())
  void ensureHermesBackend()
  setTimeout(() => {
    void checkForAppUpdates()
  }, 15000)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

ipcMain.handle('desktop:status', async () => getBootstrapStatus())
ipcMain.handle('desktop:install-hermes', async () =>
  installHermesInBackground(),
)
ipcMain.handle('desktop:start-backend', async () => ensureHermesBackend())
ipcMain.handle('desktop:open-logs', async () => {
  shell.openPath('/tmp')
  return { ok: true }
})
ipcMain.handle('desktop:update-check', async () => checkForAppUpdates())
ipcMain.handle('desktop:update-state', async () => updateState)

app.whenReady().then(async () => {
  configureAutoUpdater()
  await createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) void createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('before-quit', () => {
  localServer?.kill()
})

app.setName('hermes-workspace')
