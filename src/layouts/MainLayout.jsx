import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollProgress from '../components/ScrollProgress'
import ScrollToTop from '../components/ScrollToTop'
import CustomCursor from '../components/CustomCursor'
import Chatbot from '../components/Chatbot'
import ResumeModal from '../components/ResumeModal'
import { useUI } from '../context/ui-context'

export default function MainLayout() {
  const { resumeOpen, openResume, closeResume } = useUI()

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeResume()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeResume])

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <CustomCursor />
      <Navbar onOpenResume={openResume} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      <Chatbot />
      <AnimatePresence>
        {resumeOpen && <ResumeModal open={resumeOpen} onClose={closeResume} />}
      </AnimatePresence>
    </div>
  )
}
