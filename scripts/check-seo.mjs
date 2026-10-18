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
check(robots.includes('GPTBot') && robots.includes('PerplexityBot'), 'robots.txt permits AI search engine crawlers')

// --- llms.txt & llms-full.txt (2026 GEO standard)
const llmsExists = existsSync(path.join(dist, 'llms.txt'))
const llmsContent = llmsExists ? read('llms.txt') : ''
check(llmsExists && llmsContent.length > 100, 'llms.txt exists and is non-empty in dist')
check(llmsContent.includes('Prithiviraj P M') && llmsContent.includes('Chennai'), 'llms.txt contains primary developer identity and location')

const llmsFullExists = existsSync(path.join(dist, 'llms-full.txt'))
const llmsFullContent = llmsFullExists ? read('llms-full.txt') : ''
check(llmsFullExists && llmsFullContent.length > 100, 'llms-full.txt exists and is non-empty in dist')
check(llmsFullContent.includes('AES-256') && llmsFullContent.includes('PBKDF2'), 'llms-full.txt contains deep technical specifications')

// --- index.html
const html = read('index.html')
const canonicals = [...html.matchAll(/<link[^>]+rel="canonical"[^>]*href="([^"]+)"/g)].map((m) => m[1])
check(canonicals.length === 1 && canonicals[0] === SITE, 'exactly one canonical, pointing at the homepage')
check(!/<meta[^>]+name="robots"[^>]+noindex/i.test(html), 'no meta robots noindex')
check(/<title>[^<]{10,}<\/title>/.test(html), 'has a non-trivial <title>')
check(/<meta[^>]+name="description"[^>]+content="[^"]{50,}"/.test(html), 'has a meta description')
check(html.includes('<link rel="alternate" type="text/plain" href="/llms.txt"'), 'declares alternate link to llms.txt')

const rootHtml = html.slice(html.indexOf('<div id="root">'))
check(!html.includes('<!--app-html-->'), 'prerender placeholder was replaced')
check((rootHtml.match(/<h1[\s>]/g) ?? []).length === 1, 'prerendered HTML has exactly one <h1>')
for (const id of ['home', 'work', 'skills', 'about', 'freelance', 'contact']) {
  check(rootHtml.includes(`id="${id}"`), `prerendered HTML contains #${id} section`)
}

// Check key entity strings in prerendered HTML
const requiredEntities = ['Prithiviraj P M', 'Chennai', 'Python', 'React', 'MongoDB', 'AES-256']
for (const entity of requiredEntities) {
  check(rootHtml.includes(entity), `prerendered HTML contains core entity "${entity}"`)
}

const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
check(jsonLd.length > 0, 'has JSON-LD')
for (const [, body] of jsonLd) {
  try {
    const parsed = JSON.parse(body)
    check(true, 'JSON-LD parses')
    const graph = parsed['@graph'] || [parsed]
    const types = new Set(graph.map((item) => item['@type']))
    for (const requiredType of ['Person', 'ProfilePage', 'WebSite', 'ItemList', 'FAQPage']) {
      check(types.has(requiredType), `JSON-LD includes Schema.org @type "${requiredType}"`)
    }

    const person = graph.find((item) => item['@type'] === 'Person')
    check(Boolean(person), 'JSON-LD contains Person entity')
    if (person) {
      const alternateNames = person.alternateName || []
      check(
        Array.isArray(alternateNames) && alternateNames.length >= 20,
        `Person has alternateName matrix with >=20 variations (found ${alternateNames.length})`
      )
      const sameAs = person.sameAs || []
      check(
        Array.isArray(sameAs) && sameAs.length >= 5,
        `Person has sameAs profile array with >=5 URLs (found ${sameAs.length})`
      )
      const contactPoints = person.contactPoint || []
      check(
        Array.isArray(contactPoints) && contactPoints.length >= 2,
        `Person has structured contactPoint definitions (found ${contactPoints.length})`
      )
    }
  } catch (err) {
    check(false, `JSON-LD parses (${err.message})`)
  }
}

// --- Multi-platform identity & rel="me" verification links
check(html.includes('rel="me"'), 'HTML contains rel="me" identity verification links')
for (const profileUrl of [
  'github.com/PMPrithiviraj',
  'linkedin.com/in/prithivirajpm',
  'instagram.com/milky_boy._.05',
  'facebook.com',
  'wa.me/919003800733',
]) {
  check(html.includes(profileUrl), `HTML contains external profile link "${profileUrl}"`)
}

check(
  /ENTITY_ID:[\s\S]*?Prithiviraj P M[\s\S]*?Prithviraj PM/.test(rootHtml),
  'prerendered HTML contains footer entity index and aliases'
)

const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1] ?? ''
check(ogImage.startsWith(SITE) && existsSync(path.join(dist, ogImage.slice(SITE.length))), 'og:image exists in the build')

if (failures.length > 0) {
  console.error(`\n${failures.length} SEO check(s) failed`)
  process.exit(1)
}
console.log('\nAll SEO checks passed')
