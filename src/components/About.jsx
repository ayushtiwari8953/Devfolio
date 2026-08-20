import { motion } from 'framer-motion'
import { Briefcase, Layers, Cpu, Brain } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { useCountUp, useInView } from '../hooks/useScroll'
import data from '../data/portfolioData.json'

function StatCard({ stat, index }) {
  const [ref, inView] = useInView()
  const value = useCountUp(stat.value, inView)
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card gradient-border p-5 text-center hover:-translate-y-1 transition-transform"
    >
      <p className="font-display text-3xl font-bold heading-gradient">{value}{stat.suffix}</p>
      <p className="text-sm text-ink-500 dark:text-ink-300 mt-1">{stat.label}</p>
    </motion.div>
  )
}

const infoCards = [
  // { Icon: Briefcase, label: 'Experience', value: '2+ Years' },
  { Icon: Layers, label: 'Projects', value: '24+ Shipped' },
  { Icon: Cpu, label: 'Technologies', value: '18+ Tools' },
  { Icon: Brain, label: 'DSA Solved', value: '300+' },
]

export default function About() {
  const p = data.profile
  return (
    <section id="about" className="section">
      <SectionHeading eyebrow="About Me" title="A bit about my journey" subtitle={p.careerObjective} />

      <div className="grid lg:grid-cols-5 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3 space-y-4 text-ink-600 dark:text-ink-300 leading-relaxed"
        >
          <p>{p.intro}</p>
          <p>
            I've worked across the stack — designing responsive interfaces with React and Tailwind,
            building resilient Node.js/Express APIs, modeling data in MongoDB and MySQL, and
            sharpening my fundamentals with Java and C++. I treat performance, accessibility, and
            maintainability as first-class citizens.
          </p>
          <p>
            Outside of code, I enjoy breaking down hard problems on LeetCode, contributing to open
            source, and writing about clean architecture. I'm always eager to join teams that value
            craft and ship with intent.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 grid grid-cols-2 gap-3"
        >
          {infoCards.map(({ Icon, label, value }) => (
            <motion.div
              key={label}
              whileHover={{ y: -4 }}
              className="glass-card p-4 flex items-center gap-3"
            >
              <span className="grid place-items-center h-11 w-11 rounded-xl bg-accent/15 text-accent-deep"><Icon size={20} /></span>
              <div>
                <p className="text-xs text-ink-500 dark:text-ink-400">{label}</p>
                <p className="font-semibold">{value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Animated stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        {data.profile.stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
      </div>
    </section>
  )
}
