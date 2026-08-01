import { AnimatePresence, motion } from 'framer-motion'
import { X, Download, FileText } from 'lucide-react'
import data from '../data/portfolioData.json'

export default function ResumeModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] grid place-items-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-ink-200/40 dark:border-ink-800/60">
              <h3 className="font-display font-bold text-lg flex items-center gap-2"><FileText size={18} /> Resume Preview</h3>
              <button onClick={onClose} aria-label="Close" className="grid place-items-center h-9 w-9 rounded-lg glass hover:shadow-glow"><X size={18} /></button>
            </div>

            <div className="p-6 sm:p-10 overflow-y-auto">
              {/* Inline resume preview */}
              <div className="space-y-6 text-sm">
                <header className="text-center">
                  <h2 className="font-display text-2xl font-bold">{data.profile.name}</h2>
                  <p className="text-ink-500 dark:text-ink-300">{data.profile.role} · {data.profile.location}</p>
                  <p className="text-ink-500 dark:text-ink-300">{data.profile.email} · {data.profile.phone}</p>
                </header>

                <section>
                  <h3 className="font-semibold uppercase tracking-wider text-xs text-accent-deep mb-2">Objective</h3>
                  <p className="text-ink-600 dark:text-ink-300">{data.profile.careerObjective}</p>
                </section>

                <section>
                  <h3 className="font-semibold uppercase tracking-wider text-xs text-accent-deep mb-2">Experience</h3>
                  {data.experience.map((e, ei) => (
                    <div key={ei} className="mb-3">
                      <p className="font-medium">{e.role} — {e.company}</p>
                      <p className="text-ink-500 dark:text-ink-400 text-xs">{e.duration} · {e.location}</p>
                      <ul className="list-disc ml-5 mt-1 text-ink-600 dark:text-ink-300">
                        {e.responsibilities.map((r, ri) => <li key={ri}>{r}</li>)}
                      </ul>
                    </div>
                  ))}
                </section>

                <section>
                  <h3 className="font-semibold uppercase tracking-wider text-xs text-accent-deep mb-2">Education</h3>
                  {data.education.map((e, ei) => (
                    <div key={ei} className="mb-2">
                      <p className="font-medium">{e.degree}</p>
                      <p className="text-ink-500 dark:text-ink-400 text-xs">{e.institution} · {e.duration} · {e.score}</p>
                    </div>
                  ))}
                </section>

                <section>
                  <h3 className="font-semibold uppercase tracking-wider text-xs text-accent-deep mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.flatMap((c) => c.items.map((i) => i.name)).map((s) => (
                      <span key={s} className="chip">{s}</span>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-ink-200/40 dark:border-ink-800/60 flex justify-end gap-2">
              <button onClick={onClose} className="btn-ghost">Close</button>
              <a href={data.profile.resumeUrl} download className="btn-primary"><Download size={16} /> Download Resume</a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
