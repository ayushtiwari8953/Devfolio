import { motion } from 'framer-motion'
import { GraduationCap, Calendar } from 'lucide-react'
import SectionHeading from './SectionHeading'
import data from '../data/portfolioData.json'

export default function Education() {
  return (
    <section id="education" className="section">
      <SectionHeading eyebrow="Education" title="Academic background" subtitle="Foundations that shaped how I think about computing and problem solving." />

      <div className="relative max-w-3xl mx-auto pl-8">
        <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-accent-deep via-accent/40 to-transparent" />

        {data.education.map((e, i) => (
          <motion.div
            key={e.degree}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative mb-8 last:mb-0"
          >
            <span className="absolute -left-[1.65rem] top-1.5 grid place-items-center h-6 w-6 rounded-full glass-card">
              <GraduationCap size={12} className="text-accent-deep" />
            </span>

            <div className="glass-card gradient-border p-5 hover:shadow-glow transition-shadow">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-display font-semibold text-lg">{e.degree}</h3>
                  <p className="text-accent-deep dark:text-accent text-sm">{e.institution}</p>
                </div>
                <div className="text-right text-xs text-ink-500 dark:text-ink-400">
                  <p className="flex items-center gap-1 justify-end"><Calendar size={12} /> {e.duration}</p>
                  <p className="mt-0.5 font-medium text-ink-700 dark:text-ink-200">{e.score}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">{e.details}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
