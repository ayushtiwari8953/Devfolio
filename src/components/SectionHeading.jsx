import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn('mb-12', align === 'center' ? 'text-center' : 'text-left')}
    >
      {eyebrow && (
        <span className="chip mb-3 text-accent-deep dark:text-accent">{eyebrow}</span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold heading-gradient text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-4 text-ink-500 dark:text-ink-300 max-w-2xl text-balance', align === 'center' && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
