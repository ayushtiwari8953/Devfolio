import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Mail, FolderGit2, Code2, Cpu, Terminal } from 'lucide-react'
import { GithubIcon, LinkedinIcon, LeetcodeIcon, GfgIcon, EmailBrandIcon } from './BrandIcons'
import data from '../data/portfolioData.json'

// Lightweight typing animation (no extra deps).
function useTyping(phrases, typeSpeed = 70, deleteSpeed = 35, pause = 1400) {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[i % phrases.length]
    let t
    if (!deleting && text === current) {
      t = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setI((n) => n + 1)
    } else {
      t = setTimeout(() => {
        setText((prev) => deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1))
      }, deleting ? deleteSpeed : typeSpeed)
    }
    return () => clearTimeout(t)
  }, [text, deleting, i, phrases, typeSpeed, deleteSpeed, pause])

  return text
}

const floatingIcons = [
  { Icon: Code2, className: 'top-6 -left-2', delay: 0 },
  { Icon: Cpu, className: 'top-1/3 -right-4', delay: 1.5 },
  { Icon: Terminal, className: 'bottom-10 -left-4', delay: 3 },
  { Icon: GithubIcon, className: 'bottom-0 right-6', delay: 2 },
]

export default function Home({ onOpenResume }) {
  const typed = useTyping(data.profile.typingPhrases)
  const p = data.profile

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="chip mb-4 text-accent-deep dark:text-accent">Hello, I'm</span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold leading-tight heading-gradient">
            {p.name}
          </h1>
          <div className="mt-3 h-8 sm:h-10 flex items-center gap-1 font-mono text-lg sm:text-2xl text-ink-700 dark:text-ink-200">
            <span className="text-accent-deep">{'>'}</span>
            <span>{typed}</span>
            <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="text-accent-deep">|</motion.span>
          </div>
          <p className="mt-5 text-ink-500 dark:text-ink-300 max-w-xl text-balance">{p.intro}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={onOpenResume} className="btn-primary"><Download size={18} /> Download Resume</button>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }} className="btn-ghost"><Mail size={18} /> Contact Me</a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }} className="btn-ghost"><FolderGit2 size={18} /> View Projects</a>
          </div>

          <div className="mt-8 flex items-center gap-3">
            {[
              { href: p.social.github, Icon: GithubIcon, label: 'GitHub' },
              { href: p.social.linkedin, Icon: LinkedinIcon, label: 'LinkedIn' },
              { href: p.social.leetcode, Icon: LeetcodeIcon, label: 'LeetCode' },
              { href: p.social.gfg, Icon: GfgIcon, label: 'GeeksforGeeks' },
              { href: p.social.email, Icon: EmailBrandIcon, label: 'Email' },
            ].map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                className="grid place-items-center h-11 w-11 rounded-xl glass hover:shadow-glow hover:-translate-y-1 transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right — animated illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative grid place-items-center min-h-[320px] lg:min-h-[440px]"
        >
          {/* Blobs */}
          <div className="absolute h-72 w-72 sm:h-80 sm:w-80 rounded-full bg-gradient-to-br from-accent/40 to-ink-300/30 dark:from-accent/20 dark:to-ink-700/30 blur-2xl animate-float" />
          {/* Glass disc with avatar */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative grid place-items-center h-56 w-56 sm:h-64 sm:w-64 rounded-full glass-card gradient-border"
          >
            <span className="font-display text-7xl font-bold heading-gradient">{p.avatar}</span>
            <span className="absolute -bottom-3 px-4 py-1.5 rounded-full glass text-xs font-medium">{p.role}</span>
          </motion.div>

          {/* Floating tech icons */}
          {floatingIcons.map(({ Icon, className, delay }, idx) => (
            <motion.div key={idx}
              className={`absolute ${className} grid place-items-center h-12 w-12 rounded-2xl glass-card`}
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay }}
            >
              <Icon size={20} className="text-accent-deep" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-ink-400 dark:text-ink-500 tracking-widest uppercase"
      >
        Scroll
      </motion.div>
    </section>
  )
}
