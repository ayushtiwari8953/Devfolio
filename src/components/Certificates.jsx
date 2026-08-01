import { motion } from 'framer-motion'
import { Award, ExternalLink, Calendar } from 'lucide-react'
import SectionHeading from './SectionHeading'
import data from '../data/portfolioData.json'

export default function Certificates() {
  return (
    <section id="certificates" className="section">
      <SectionHeading eyebrow="Certificates" title="Credentials & courses" subtitle="Continuous learning — courses and certifications I've completed to deepen my craft." />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.certificates.map((c, i) => (
          <motion.a
            key={c.title}
            href={c.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className="group glass-card gradient-border p-5 hover:shadow-glow block"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="grid place-items-center h-12 w-12 rounded-xl bg-accent/15 text-accent-deep group-hover:rotate-6 transition-transform">
                <Award size={22} />
              </span>
              <ExternalLink size={16} className="text-ink-400 group-hover:text-accent-deep transition-colors" />
            </div>
            <h3 className="font-display font-semibold leading-snug">{c.title}</h3>
            <p className="text-sm text-ink-500 dark:text-ink-300 mt-1">{c.issuer}</p>
            <p className="flex items-center gap-1 text-xs text-ink-400 dark:text-ink-500 mt-2"><Calendar size={12} /> {c.year}</p>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
