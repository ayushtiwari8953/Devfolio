import { motion } from 'framer-motion'
import { PenLine, Mail } from 'lucide-react'
import SEO from '../components/SEO'
import SectionHeading from '../components/SectionHeading'

// Placeholder blog section — ready for future content.
const posts = [
  { title: 'Designing resilient React component libraries', date: 'Coming soon', excerpt: 'Lessons from building a shared UI kit across product teams.', tag: 'Architecture' },
  { title: 'From DSA to production: thinking in systems', date: 'Coming soon', excerpt: 'How practicing algorithms shapes real-world engineering decisions.', tag: 'Engineering' },
  { title: 'Shipping accessible interfaces by default', date: 'Coming soon', excerpt: 'A practical checklist for accessibility-first frontend work.', tag: 'Accessibility' },
]

export default function BlogPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="pt-28">
      <SEO title="Blog" description="Notes on software engineering, architecture, and craft." />
      <section className="section">
        <SectionHeading eyebrow="Blog" title="Writing & notes" subtitle="A space for thoughts on engineering, design, and growth. Articles coming soon." />
        <div className="grid md:grid-cols-3 gap-5">
          {posts.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass-card gradient-border p-6 hover:shadow-glow"
            >
              <span className="chip text-xs mb-3">{p.tag}</span>
              <h3 className="font-display font-semibold text-lg leading-snug">{p.title}</h3>
              <p className="text-sm text-ink-500 dark:text-ink-300 mt-2">{p.excerpt}</p>
              <div className="flex items-center justify-between mt-5 text-xs text-ink-400">
                <span className="flex items-center gap-1.5"><PenLine size={12} /> {p.date}</span>
                <Mail size={12} />
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
