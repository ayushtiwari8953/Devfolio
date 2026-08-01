import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import SectionHeading from './SectionHeading'
import data from '../data/portfolioData.json'

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="section">
      <SectionHeading eyebrow="FAQ" title="Frequently asked" subtitle="Quick answers to questions recruiters and collaborators often ask." />
      <div className="max-w-3xl mx-auto space-y-3">
        {data.faqs.map((f, i) => {
          const isOpen = open === i
          return (
            <motion.div key={f.q} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="glass-card overflow-hidden">
              <button onClick={() => setOpen(isOpen ? -1 : i)} className="w-full flex items-center justify-between gap-3 p-5 text-left" aria-expanded={isOpen}>
                <span className="font-medium">{f.q}</span>
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="text-accent-deep"><Plus size={18} /></motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 text-sm text-ink-600 dark:text-ink-300"
                  >
                    {f.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
