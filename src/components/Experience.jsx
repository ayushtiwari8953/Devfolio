import { motion } from 'framer-motion'
import { Briefcase, MapPin } from 'lucide-react'
import SectionHeading from './SectionHeading'
import data from '../data/portfolioData.json'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeading eyebrow="Experience" title="Where I've worked" subtitle="My professional journey so far — building products, owning features, and learning from great teams." />

      <div className="relative max-w-3xl mx-auto pl-8">
        {/* vertical line */}
        <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-accent-deep via-accent/40 to-transparent" />

        {data.experience.map((e, i) => (
          <motion.div
            key={e.role + e.company}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative mb-10 last:mb-0"
          >
            {/* node */}
            <span className="absolute -left-[1.65rem] top-1.5 grid place-items-center h-6 w-6 rounded-full glass-card">
              <span className="h-2.5 w-2.5 rounded-full bg-accent-deep" />
            </span>

            <div className="glass-card gradient-border p-5 hover:shadow-glow transition-shadow">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-display font-semibold text-lg">{e.role}</h3>
                  <p className="text-accent-deep dark:text-accent text-sm font-medium">{e.company}</p>
                </div>
                <div className="text-right text-xs text-ink-500 dark:text-ink-400">
                  <p className="flex items-center gap-1 justify-end"><Briefcase size={12} /> {e.duration}</p>
                  <p className="flex items-center gap-1 justify-end mt-0.5"><MapPin size={12} /> {e.location}</p>
                </div>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-ink-600 dark:text-ink-300">
                {e.responsibilities.map((r) => (
                  <li key={r} className="flex gap-2"><span className="text-accent-deep mt-1">▹</span>{r}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
