import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import Home from '../components/Home'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
import Education from '../components/Education'
import Certificates from '../components/Certificates'
import GitHubStats from '../components/GitHubStats'
import LeetCodeStats from '../components/LeetCodeStats'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import { useUI } from '../context/ui-context'

export default function HomePage() {
  const { openResume } = useUI()
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <SEO />
      <Home onOpenResume={openResume} />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certificates />
      <GitHubStats />
      <LeetCodeStats />
      <Testimonials />
      <FAQ />
      <Contact />
    </motion.div>
  )
}
