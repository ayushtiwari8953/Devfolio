import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, ExternalLink, Star } from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import SectionHeading from './SectionHeading'
import data from '../data/portfolioData.json'

const categories = ['All', 'Full Stack', 'AI', 'Systems']

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return data.projects.filter((p) => {
      const matchCat = filter === 'All' || p.category === filter
      const q = query.trim().toLowerCase()
      const matchQuery = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.technologies.join(' ').toLowerCase().includes(q)
      return matchCat && matchQuery
    })
  }, [filter, query])

  return (
    <section id="projects" className="section">
      <SectionHeading eyebrow="Projects" title="Things I've built" subtitle="A selection of products I've shipped — from real-time platforms to systems built from scratch." />

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === c ? 'bg-ink-900 text-white dark:bg-white dark:text-ink-900 shadow-lg' : 'glass text-ink-600 dark:text-ink-300 hover:shadow-glow'}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative md:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            aria-label="Search projects"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl glass text-sm outline-none focus:shadow-glow transition-shadow"
          />
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="grid md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.article
              key={p.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -6 }}
              className="group glass-card gradient-border overflow-hidden hover:shadow-glow"
            >
              {/* Visual header */}
              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-ink-200/60 to-accent/20 dark:from-ink-800/60 dark:to-accent-deep/20">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="font-display text-3xl font-bold heading-gradient">{p.title}</span>
                </div>
                {p.featured && (
                  <span className="absolute top-3 right-3 chip bg-accent/30 text-accent-deep"><Star size={12} /> Featured</span>
                )}
                {/* hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <a href={p.github} target="_blank" rel="noreferrer" aria-label="GitHub repo" className="grid place-items-center h-11 w-11 rounded-full glass text-white hover:scale-110 transition-transform"><GithubIcon size={18} /></a>
                  <a href={p.demo} target="_blank" rel="noreferrer" aria-label="Live demo" className="grid place-items-center h-11 w-11 rounded-full glass text-white hover:scale-110 transition-transform"><ExternalLink size={18} /></a>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-display font-semibold text-lg">{p.title}</h3>
                  <span className="chip text-xs">{p.category}</span>
                </div>
                <p className="text-sm text-ink-500 dark:text-ink-300 mb-4">{p.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.technologies.map((t) => <span key={t} className="chip text-xs">{t}</span>)}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-ink-500 dark:text-ink-400 mt-10">No projects match your search.</p>
      )}
    </section>
  )
}
