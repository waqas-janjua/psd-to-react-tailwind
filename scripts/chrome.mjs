// Headless Chrome over the DevTools protocol, using only Node built-ins.

import { spawn } from 'node:child_process'
import { existsSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, 'Google/Chrome/Application/chrome.exe'),
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ]
  const found = candidates.find((path) => path && existsSync(path))
  if (!found) throw new Error('Chrome not found; set CHROME_PATH to its executable.')
  return found
}

export async function launchChrome() {
  const profile = mkdtempSync(join(tmpdir(), 'compare-chrome-'))
  const proc = spawn(
    findChrome(),
    [
      '--headless=new',
      '--remote-debugging-port=0',
      `--user-data-dir=${profile}`,
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--font-render-hinting=none',
      // Deterministic rendering: no async image decoding or partial raster, software GL, sRGB.
      '--disable-checker-imaging',
      '--disable-partial-raster',
      '--disable-gpu',
      '--force-color-profile=srgb',
      '--no-first-run',
      '--no-default-browser-check',
      'about:blank',
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] },
  )
  process.on('exit', () => proc.kill())
  process.on('SIGINT', () => process.exit(130))
  const endpoint = await new Promise((resolveEndpoint, reject) => {
    let log = ''
    const timer = setTimeout(() => reject(new Error(`Chrome did not start:\n${log}`)), 20000)
    proc.stderr.on('data', (chunk) => {
      log += chunk
      const match = log.match(/DevTools listening on (ws:\/\/\S+)/)
      if (match) {
        clearTimeout(timer)
        resolveEndpoint(match[1])
      }
    })
    proc.on('exit', () => reject(new Error(`Chrome exited:\n${log}`)))
  })
  const close = () => {
    proc.kill()
    try {
      rmSync(profile, { recursive: true, force: true })
    } catch {
      // Chrome may still hold the profile for a moment; it lives in the temp dir anyway.
    }
  }
  return { endpoint, close }
}

/** Minimal DevTools-protocol client over the browser websocket, using flattened sessions. */
export async function connect(endpoint) {
  const ws = new WebSocket(endpoint)
  await new Promise((ok, fail) => {
    ws.onopen = ok
    ws.onerror = fail
  })
  let nextId = 0
  const pending = new Map()
  const listeners = new Set()
  ws.onmessage = ({ data }) => {
    const msg = JSON.parse(data)
    if (msg.id !== undefined) {
      if (!pending.has(msg.id)) return
      const { ok, fail } = pending.get(msg.id)
      pending.delete(msg.id)
      if (msg.error) fail(new Error(`${msg.error.message} (${msg.error.data ?? ''})`))
      else ok(msg.result)
    } else {
      listeners.forEach((listener) => listener(msg))
    }
  }
  const send = (method, params = {}, sessionId) =>
    new Promise((ok, fail) => {
      const id = ++nextId
      const timer = setTimeout(() => {
        pending.delete(id)
        fail(new Error(`${method} timed out`))
      }, 30000)
      pending.set(id, {
        ok: (value) => (clearTimeout(timer), ok(value)),
        fail: (error) => (clearTimeout(timer), fail(error)),
      })
      ws.send(JSON.stringify({ id, method, params, sessionId }))
    })
  const waitFor = (method, sessionId) =>
    new Promise((ok) => {
      const listener = (msg) => {
        if (msg.method === method && msg.sessionId === sessionId) {
          listeners.delete(listener)
          ok(msg.params)
        }
      }
      listeners.add(listener)
    })
  return { send, waitFor, close: () => ws.close() }
}

/**
 * Opens url in a new tab at the given viewport width, waits for web fonts and images,
 * then calls fn(send, pageHeight) and closes the tab.
 */
export async function withPage(cdp, url, width, fn) {
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' })
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true })
  const send = (method, params) => cdp.send(method, params, sessionId)
  try {
    await send('Page.enable')
    await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false })
    const loaded = cdp.waitFor('Page.loadEventFired', sessionId)
    await send('Page.navigate', { url })
    await loaded
    const { result } = await send('Runtime.evaluate', {
      awaitPromise: true,
      returnByValue: true,
      expression: `(async () => {
        await document.fonts.ready
        await Promise.all([...document.images].map((img) => img.decode().catch(() => {})))
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
        const el = document.documentElement
        return Math.max(el.scrollHeight, document.body.scrollHeight, el.getBoundingClientRect().height)
      })()`,
    })
    return await fn(send, Math.ceil(result.value))
  } finally {
    await cdp.send('Target.closeTarget', { targetId })
  }
}

/** Full-page PNG screenshot of url at the given width. */
export function screenshot(cdp, url, width) {
  return withPage(cdp, url, width, async (send, height) => {
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false })
    await send('Runtime.evaluate', {
      awaitPromise: true,
      expression: 'new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(r, 100))))',
    })
    const { data } = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width, height, scale: 1 },
      captureBeyondViewport: true,
    })
    return Buffer.from(data, 'base64')
  })
}
