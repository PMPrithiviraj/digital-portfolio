import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './theme/ThemeProvider.tsx'

// #root contains build-time prerendered HTML (see scripts/prerender.mjs) for crawlers.
// createRoot (not hydrateRoot) intentionally replaces it: motion/theme state depends on
// browser-only values, so hydrating would risk mismatches.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
