import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import { UIProvider } from './context/UIContext'
import AnimatedBackground from './components/AnimatedBackground'
import LoadingScreen from './components/LoadingScreen'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1100)
    return () => clearTimeout(t)
  }, [])

  return (
    <ThemeProvider>
      <UIProvider>
        <BrowserRouter>
          <AnimatedBackground />
          <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UIProvider>
    </ThemeProvider>
  )
}
