const DEFAULT_APP_PORT = 3847
const DEFAULT_DEV_SERVER_PORT = 3000

function parsePort(value, fallback) {
  const parsed = Number.parseInt(String(value || ''), 10)
  if (!Number.isFinite(parsed) || parsed <= 0 || parsed > 65535) return fallback
  return parsed
}

function getDevServerPort(env = process.env) {
  return parsePort(env.HERMES_ELECTRON_DEV_SERVER_PORT || env.PORT, DEFAULT_DEV_SERVER_PORT)
}

function getSmokeMode(env = process.env) {
  return env.HERMES_ELECTRON_SMOKE === '1'
}

function getAppUrl(env = process.env, localServerPort = DEFAULT_APP_PORT) {
  if (env.NODE_ENV === 'development') {
    return `http://127.0.0.1:${getDevServerPort(env)}/?desktop=1`
  }
  return `http://127.0.0.1:${localServerPort}/?desktop=1`
}

module.exports = {
  DEFAULT_APP_PORT,
  DEFAULT_DEV_SERVER_PORT,
  getAppUrl,
  getDevServerPort,
  getSmokeMode,
}
