import { playClickActuate, playHoverTick } from '../lib/soundEngine'

const officialLinks = [
  {
    platform: 'Portfolio',
    handle: 'digital-portfolio-nine-navy.vercel.app',
    href: 'https://digital-portfolio-nine-navy.vercel.app/',
    external: false,
    ariaLabel: 'Official Portfolio Website of Prithiviraj P M',
  },
  {
    platform: 'GitHub',
    handle: 'github.com/PMPrithiviraj',
    href: 'https://github.com/PMPrithiviraj',
    external: true,
    ariaLabel: 'Prithiviraj P M on GitHub (@PMPrithiviraj)',
  },
  {
    platform: 'LinkedIn',
    handle: 'linkedin.com/in/prithivirajpm',
    href: 'https://www.linkedin.com/in/prithivirajpm',
    external: true,
    ariaLabel: 'Prithiviraj P M on LinkedIn',
  },
  {
    platform: 'Instagram',
    handle: '@prxthiviz',
    href: 'https://www.instagram.com/prxthiviz',
    external: true,
    ariaLabel: 'Prithiviraj P M on Instagram (@milky_boy._.05)',
  },
  {
    platform: 'Facebook',
    handle: 'Prithivi Raj',
    href: 'https://www.facebook.com/people/Prithivi-Raj/pfbid0Z74B3BWhnZ6u59uKjfKQg2cnrqNHJiXG5XN7xD2qnuQx61CsYQ1xghCqGy29miMpl/',
    external: true,
    ariaLabel: 'Prithiviraj P M on Facebook',
  },
  {
    platform: 'WhatsApp',
    handle: '+91 9003800733',
    href: 'https://wa.me/919003800733',
    external: true,
    ariaLabel: 'Contact Prithiviraj P M on WhatsApp (+91 9003800733)',
  },
  {
    platform: 'Email',
    handle: 'pmprithiviraj@gmail.com',
    href: 'mailto:pmprithiviraj@gmail.com',
    external: true,
    ariaLabel: 'Email Prithiviraj P M (pmprithiviraj@gmail.com)',
  },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-border-subtle bg-bg-base px-4 py-12 sm:py-16 font-mono text-xs text-ink-muted">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Top: Directory Header & Official Links Grid */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-accent">
              // OFFICIAL DIRECTORY &amp; MULTI-PLATFORM VERIFIED LINKS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {officialLinks.map((item) => (
              <a
                key={item.platform}
                href={item.href}
                {...(item.external ? { target: '_blank', rel: 'me noopener noreferrer' } : {})}
                onClick={playClickActuate}
                onMouseEnter={playHoverTick}
                aria-label={item.ariaLabel}
                className="group flex flex-col justify-center rounded-xl border border-border-subtle bg-bg-card p-3.5 transition-all hover:border-accent hover:shadow-[0_0_15px_var(--color-accent-dim)]"
              >
                <span className="text-[10px] uppercase tracking-wider text-ink-muted group-hover:text-accent font-semibold transition-colors">
                  {item.platform}
                </span>
                <span className="mt-1 text-xs text-ink-secondary group-hover:text-ink-primary font-medium truncate transition-colors">
                  {item.handle}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Crawl-Indexable Entity Alias & Full-Text Telemetry */}
        <div className="rounded-xl border border-border-subtle/60 bg-bg-card/50 p-4 leading-relaxed">
          <p className="text-[11px] text-ink-muted">
            <strong className="text-accent font-semibold">ENTITY_ID:</strong> Prithiviraj P M (Prithviraj PM / P M Prithiviraj / Pirthiviraj / Pirithiviraj / Prithvi Raj / PMPrithiviraj) · Full Stack Developer in Ambattur, Chennai, Tamil Nadu, India · Python, React 19, TypeScript, MongoDB, REST APIs, JWT Auth &amp; AES-256.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Meta */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border-subtle/40 text-[11px] text-ink-muted">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} Prithiviraj P M · Built with React 19 &amp; Tailwind CSS v4</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/PMPrithiviraj/digital-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickActuate}
              onMouseEnter={playHoverTick}
              className="text-accent hover:underline font-semibold"
            >
              [GitHub Repository]
            </a>
            <span className="text-border-subtle">•</span>
            <span className="text-ink-secondary">Chennai, India</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
