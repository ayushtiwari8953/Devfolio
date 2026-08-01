import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import SectionHeading from './SectionHeading'
import data from '../data/portfolioData.json'

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <SectionHeading eyebrow="Testimonials" title="Kind words" subtitle="What people I've worked with have to say." />
      <div className="grid md:grid-cols-3 gap-5">
        {data.testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="glass-card gradient-border p-6 flex flex-col"
          >
            <Quote size={28} className="text-accent-deep mb-3" />
            <blockquote className="text-sm text-ink-600 dark:text-ink-300 leading-relaxed flex-1">"{t.quote}"</blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <span className="grid place-items-center h-10 w-10 rounded-full bg-accent/20 text-accent-deep font-semibold">{t.name.charAt(0)}</span>
              <div>
                <p className="font-medium text-sm">{t.name}</p>
                <p className="text-xs text-ink-500 dark:text-ink-400">{t.role}</p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}
