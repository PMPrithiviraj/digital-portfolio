export default function Footer() {
  return (
    <footer className="border-t border-ink-muted/10 bg-bg-raised px-6 py-8 text-center text-sm text-ink-muted">
      <p>&copy; {new Date().getFullYear()} Prithiviraj P M. All rights reserved.</p>
      <p className="mt-1">
        <a
          href="https://github.com/PMPrithiviraj/digital-portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent"
        >
          View source on GitHub
        </a>
      </p>
    </footer>
  )
}
