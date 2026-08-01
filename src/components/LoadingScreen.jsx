import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] grid place-items-center bg-ink-50 dark:bg-ink-950"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-16 w-16">
          <span className="absolute inset-0 rounded-full border-2 border-accent/30" />
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent-deep"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        <motion.p
          className="font-display text-sm tracking-[0.3em] uppercase text-ink-500 dark:text-ink-300"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          Loading
        </motion.p>
      </div>
    </motion.div>
  )
}
