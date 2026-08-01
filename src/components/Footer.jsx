import { Link } from 'react-router-dom'
import { Mail, ArrowUp, Heart } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import data from '../data/portfolioData.json'

export default function Footer() {
  const year = new Date().getFullYear()
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <footer className="relative mt-20 border-t border-ink-200/50 dark:border-ink-800/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="font-display font-bold text-xl mb-2">{data.profile.name}</h3>
            <p className="text-sm text-ink-500 dark:text-ink-300 max-w-xs">{data.profile.tagline}</p>
            <div className="flex gap-3 mt-4">
              <a href={data.profile.social.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid place-items-center h-10 w-10 rounded-xl glass hover:shadow-glow"><GithubIcon size={18} /></a>
              <a href={data.profile.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid place-items-center h-10 w-10 rounded-xl glass hover:shadow-glow"><LinkedinIcon size={18} /></a>
              <a href={data.profile.social.email} aria-label="Email" className="grid place-items-center h-10 w-10 rounded-xl glass hover:shadow-glow"><Mail size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-ink-500 dark:text-ink-300">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {data.navLinks.map((l) => (
                <li key={l.id}><button onClick={() => go(l.id)} className="text-ink-600 dark:text-ink-300 hover:text-accent-deep dark:hover:text-accent transition-colors">{l.label}</button></li>
              ))}
              <li><Link to="/blog" className="text-ink-600 dark:text-ink-300 hover:text-accent-deep dark:hover:text-accent transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-ink-500 dark:text-ink-300">Get in touch</h4>
            <p className="text-sm text-ink-600 dark:text-ink-300">{data.profile.email}</p>
            <p className="text-sm text-ink-600 dark:text-ink-300">{data.profile.phone}</p>
            <p className="text-sm text-ink-600 dark:text-ink-300">{data.profile.location}</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-ink-200/40 dark:border-ink-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-500 dark:text-ink-400 flex items-center gap-1.5">
            © {year} {data.profile.name}. Built with <Heart size={12} className="text-accent-deep" /> using React & Tailwind.
          </p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-1.5 text-xs text-ink-500 dark:text-ink-300 hover:text-accent-deep dark:hover:text-accent">
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
