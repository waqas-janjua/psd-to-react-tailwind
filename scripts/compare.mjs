// Screenshot comparison: reference/index.html vs the React page, in headless Chrome.
//
//   npm run compare                       all widths (1440, 1024, 414, 375)
//   npm run compare -- --width 414        one or more widths (repeat or comma-separate)
//   npm run compare -- --threshold 8      ignore per-channel differences up to 8
//
// Full-page screenshots and a red-on-grey diff image for each width are written to .compare/.
// Uses only Node built-ins (WebSocket, zlib) and a local Chrome; set CHROME_PATH to override.

import { mkdirSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { createServer } from 'vite'
import { connect, launchChrome, screenshot } from './chrome.mjs'
import { decodePng, encodePng } from './png.mjs'

const root = resolve(import.meta.dirname, '..')
const outDir = join(root, '.compare')

// ---------- options ----------

const args = process.argv.slice(2)
const option = (name) => {
  const values = []
  args.forEach((arg, i) => {
    if (arg === `--${name}`) values.push(args[i + 1])
    else if (arg.startsWith(`--${name}=`)) values.push(arg.slice(name.length + 3))
  })
  return values.flatMap((v) => v.split(','))
}
const widths = option('width').map(Number).filter(Boolean)
if (widths.length === 0) widths.push(1440, 1024, 414, 375)
const threshold = Number(option('threshold')[0] ?? 0)

// ---------- diff ----------

/** Compares the overlapping area pixel by pixel; any extra height on either side counts as differing. */
function diff(a, b) {
  const width = Math.max(a.width, b.width)
  const height = Math.max(a.height, b.height)
  const out = Buffer.alloc(width * height * 4)
  const rowCounts = new Array(height).fill(0)
  let count = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const o = (y * width + x) * 4
      const inA = x < a.width && y < a.height
      const inB = x < b.width && y < b.height
      const ia = (y * a.width + x) * 4
      const ib = (y * b.width + x) * 4
      let differs = !inA || !inB
      if (!differs) {
        for (let ch = 0; ch < 3; ch++) {
          if (Math.abs(a.pixels[ia + ch] - b.pixels[ib + ch]) > threshold) differs = true
        }
      }
      if (differs) {
        count++
        rowCounts[y]++
        out.set([255, 0, 0, 255], o)
      } else {
        // Faded reference so the red stands out.
        const grey = (a.pixels[ia] + a.pixels[ia + 1] + a.pixels[ia + 2]) / 3
        const v = 200 + grey * 0.2
        out.set([v, v, v, 255], o)
      }
    }
  }
  // Group differing rows into bands for a quick "where" summary.
  const bands = []
  rowCounts.forEach((n, y) => {
    if (!n) return
    const last = bands.at(-1)
    if (last && y - last.end <= 4) {
      last.end = y
      last.pixels += n
    } else bands.push({ start: y, end: y, pixels: n })
  })
  return { count, total: width * height, bands, image: { width, height, pixels: out } }
}

// ---------- run ----------

mkdirSync(outDir, { recursive: true })

const server = await createServer({ root, logLevel: 'silent', server: { port: 0, strictPort: false } })
await server.listen()
const reactUrl = server.resolvedUrls.local[0]
const referenceUrl = pathToFileURL(join(root, 'reference/index.html')).href

const chrome = await launchChrome()
const cdp = await connect(chrome.endpoint)
let failed = false

try {
  console.log(`threshold: ${threshold}   output: ${outDir}\n`)
  for (const width of widths) {
    const refPng = await screenshot(cdp, referenceUrl, width)
    const appPng = await screenshot(cdp, reactUrl, width)
    writeFileSync(join(outDir, `${width}-reference.png`), refPng)
    writeFileSync(join(outDir, `${width}-react.png`), appPng)

    const ref = decodePng(refPng)
    const app = decodePng(appPng)
    const result = diff(ref, app)
    writeFileSync(join(outDir, `${width}-diff.png`), encodePng(result.image))

    const pct = ((result.count / result.total) * 100).toFixed(3)
    const heights = ref.height === app.height ? `height ${ref.height}` : `height ${ref.height} vs ${app.height}`
    console.log(`${String(width).padStart(5)}px  ${String(result.count).padStart(8)} px differ (${pct}%)  ${heights}`)
    result.bands.slice(0, 12).forEach((band) => {
      console.log(`          rows ${band.start}-${band.end}: ${band.pixels} px`)
    })
    if (result.bands.length > 12) console.log(`          … ${result.bands.length - 12} more bands`)
    if (result.count) failed = true
  }
} finally {
  cdp.close()
  chrome.close()
  await server.close()
}

process.exitCode = failed ? 1 : 0
