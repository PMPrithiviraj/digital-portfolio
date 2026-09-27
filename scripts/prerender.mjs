// Bakes the rendered React tree into dist/index.html after `vite build`.
// Requires the SSR bundle produced by: vite build --ssr src/entry-server.tsx --outDir dist-ssr
import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const indexPath = path.join(root, 'dist', 'index.html')
const ssrDir = path.join(root, 'dist-ssr')
const PLACEHOLDER = '<!--app-html-->'

// Framer Motion renders entrance animations with an initial inline opacity:0.
// Without JavaScript those never animate in, so reveal them for no-JS visitors.
const NOSCRIPT_STYLE =
  '<noscript><style>#root [style*="opacity:0"]{opacity:1!important;transform:none!important}</style></noscript>'

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const template = await readFile(indexPath, 'utf8')

if (!template.includes(PLACEHOLDER)) {
  throw new Error(`prerender: ${PLACEHOLDER} not found in dist/index.html`)
}

const appHtml = render()
if (!appHtml.includes('<h1')) {
  throw new Error('prerender: rendered HTML has no <h1>; refusing to write an empty shell')
}

const html = template
  .replace(PLACEHOLDER, () => appHtml)
  .replace('</head>', () => `    ${NOSCRIPT_STYLE}\n  </head>`)

await writeFile(indexPath, html)
await rm(ssrDir, { recursive: true, force: true })
console.log(`prerender: wrote ${appHtml.length} chars of HTML into dist/index.html`)
