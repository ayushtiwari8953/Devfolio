import { motion } from 'framer-motion'
import {
  Code2, Server, Database, Terminal, Wrench, Users, Layout
} from 'lucide-react'
import SectionHeading from './SectionHeading'
import { useInView } from '../hooks/useScroll'
import data from '../data/portfolioData.json'

const categoryIcons = {
  Frontend: Layout,
  Backend: Server,
  Database: Database,
  Programming: Code2,
  Tools: Wrench,
  'Soft Skills': Users,
}

function SkillBar({ name, level, delay }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between text-sm mb-1.5">
        <span className="font-medium">{name}</span>
        <span className="text-ink-500 dark:text-ink-400 font-mono text-xs">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-ink-200/60 dark:bg-ink-800/70 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-accent-deep via-accent to-accent-soft"
        />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeading eyebrow="Skills" title="Tools I work with" subtitle="A categorized view of my technical and interpersonal strengths, with self-assessed proficiency." />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.skills.map((cat, ci) => {
          const Icon = categoryIcons[cat.category] || Terminal
          return (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: ci * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass-card gradient-border p-5 hover:shadow-glow"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="grid place-items-center h-11 w-11 rounded-xl bg-accent/15 text-accent-deep"><Icon size={20} /></span>
                <h3 className="font-display font-semibold text-lg">{cat.category}</h3>
              </div>
              {cat.items.map((s, si) => (
                <SkillBar key={s.name} name={s.name} level={s.level} delay={si * 0.08} />
              ))}
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
