// Regression checks for the built site. Run after `npm run build`: npm run check:seo
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const SITE = 'https://digital-portfolio-nine-navy.vercel.app/'
const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const read = (file) => readFileSync(path.join(dist, file), 'utf8')

const failures = []
const check = (ok, message) => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${message}`)
  if (!ok) failures.push(message)
}

// --- sitemap.xml
const sitemap = read('sitemap.xml')
check(sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'), 'sitemap uses the sitemaps.org namespace')
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
check(locs.length > 0, `sitemap lists ${locs.length} URL(s)`)
check(locs.every((loc) => loc.startsWith(SITE)), 'every sitemap <loc> is on the canonical https host')
const lastmods = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1].trim())
check(lastmods.every((d) => !Number.isNaN(Date.parse(d))), 'every <lastmod> is a valid W3C date')

// --- robots.txt
const robots = read('robots.txt')
check(robots.includes(`Sitemap: ${SITE}sitemap.xml`), 'robots.txt declares the sitemap')
check(!/^\s*Disallow:\s*\/\s*$/im.test(robots), 'robots.txt does not disallow the whole site')

// --- index.html
const html = read('index.html')
const canonicals = [...html.matchAll(/<link[^>]+rel="canonical"[^>]*href="([^"]+)"/g)].map((m) => m[1])
check(canonicals.length === 1 && canonicals[0] === SITE, 'exactly one canonical, pointing at the homepage')
check(!/<meta[^>]+name="robots"[^>]+noindex/i.test(html), 'no meta robots noindex')
check(/<title>[^<]{10,}<\/title>/.test(html), 'has a non-trivial <title>')
check(/<meta[^>]+name="description"[^>]+content="[^"]{50,}"/.test(html), 'has a meta description')

const rootHtml = html.slice(html.indexOf('<div id="root">'))
check(!html.includes('<!--app-html-->'), 'prerender placeholder was replaced')
check((rootHtml.match(/<h1[\s>]/g) ?? []).length === 1, 'prerendered HTML has exactly one <h1>')
for (const id of ['home', 'work', 'skills', 'about', 'freelance', 'contact']) {
  check(rootHtml.includes(`id="${id}"`), `prerendered HTML contains #${id} section`)
}

const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
check(jsonLd.length > 0, 'has JSON-LD')
for (const [, body] of jsonLd) {
  try {
    JSON.parse(body)
    check(true, 'JSON-LD parses')
  } catch (err) {
    check(false, `JSON-LD parses (${err.message})`)
  }
}

const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1] ?? ''
check(ogImage.startsWith(SITE) && existsSync(path.join(dist, ogImage.slice(SITE.length))), 'og:image exists in the build')

if (failures.length > 0) {
  console.error(`\n${failures.length} SEO check(s) failed`)
  process.exit(1)
}
console.log('\nAll SEO checks passed')
