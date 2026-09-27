import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import FreelanceSection from './components/FreelanceSection'
import Header from './components/Header'
import Hero from './components/Hero'
import ProjectsSection from './components/ProjectsSection'
import SkillsSection from './components/SkillsSection'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
        <FreelanceSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default App
