import { useState } from 'react'
import AboutSection from './components/AboutSection'
import CatEyeLoader from './components/CatEyeLoader'
import ContactSection from './components/ContactSection'
import FloatingWidgets from './components/FloatingWidgets'
import Footer from './components/Footer'
import FreelanceSection from './components/FreelanceSection'
import Header from './components/Header'
import Hero from './components/Hero'
import ProjectsSection from './components/ProjectsSection'
import SkillsSection from './components/SkillsSection'

function App() {
  const [bootKey, setBootKey] = useState(0)
  const [booting, setBooting] = useState(() => {
    if (typeof window === 'undefined') return false
    return !sessionStorage.getItem('cat_eye_booted')
  })

  function handleBootComplete() {
    setBooting(false)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('cat_eye_booted', '1')
    }
  }

  function handleReboot() {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('cat_eye_booted')
      sessionStorage.removeItem('hud_booted')
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    setBootKey((prev) => prev + 1)
    setBooting(true)
  }

  return (
    <div className="relative min-h-screen bg-bg-base text-ink-primary font-mono selection:bg-accent selection:text-black">
      {/* Black Cat Eyes Preloader & 8-Column Staircase Wipe */}
      <CatEyeLoader key={bootKey} active={booting} onComplete={handleBootComplete} />

      {/* Floating Theme Switcher Orb & BGM Player Pill */}
      <FloatingWidgets />

      {/* Header Navigation */}
      <Header onReboot={handleReboot} />

      {/* Main Content Sections */}
      <main className="overflow-x-hidden">
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <FreelanceSection />
        <ContactSection />
      </main>

      {/* Minimalist Arcade Footer */}
      <Footer />
    </div>
  )
}

export default App
