import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Moon, Sun, FileText } from 'lucide-react'
import { useTheme } from '../context/theme-context'
import { useActiveSection } from '../hooks/useScroll'
import data from '../data/portfolioData.json'
import { cn } from '../utils/cn'

export default function Navbar({ onOpenResume }) {
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const ids = data.navLinks.map((l) => l.id)
  const active = useActiveSection(ids)

  const go = (id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="mx-auto max-w-6xl mt-3 px-4">
        <div className="glass-card rounded-2xl px-4 sm:px-5 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={() => go('home')} className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="grid place-items-center h-9 w-9 rounded-xl bg-ink-900 text-white dark:bg-white dark:text-ink-900 text-sm">
              {data.profile.avatar}
            </span>
            <span className="hidden sm:block">{data.profile.firstName}<span className="text-accent-deep">.</span></span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {data.navLinks.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    active === l.id
                      ? 'text-ink-900 dark:text-white'
                      : 'text-ink-500 dark:text-ink-300 hover:text-ink-900 dark:hover:text-white'
                  )}
                >
                  {l.label}
                  {active === l.id && (
                    <motion.span layoutId="nav-active" className="absolute inset-0 -z-10 rounded-lg bg-accent/20 dark:bg-white/10" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenResume}
              className="hidden sm:inline-flex btn-ghost !px-4 !py-2 text-sm"
            >
              <FileText size={16} /> Resume
            </button>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="grid place-items-center h-10 w-10 rounded-xl glass hover:shadow-glow text-ink-800 dark:text-ink-100"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Sun size={18} />
                  </motion.span>
                ) : (
                  <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Moon size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              className="lg:hidden grid place-items-center h-10 w-10 rounded-xl glass text-ink-800 dark:text-ink-100"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-2 glass-card rounded-2xl p-3"
            >
              <ul className="grid grid-cols-2 gap-1">
                {data.navLinks.map((l) => (
                  <li key={l.id}>
                    <button
                      onClick={() => go(l.id)}
                      className={cn(
                        'w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                        active === l.id ? 'bg-accent/20 dark:bg-white/10 text-ink-900 dark:text-white' : 'text-ink-500 dark:text-ink-300'
                      )}
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
              <button onClick={() => { setOpen(false); onOpenResume() }} className="btn-primary w-full mt-2">
                <FileText size={16} /> Resume
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
