// Animated gradient blobs + subtle grid. Purely decorative, pointer-events disabled.
export default function AnimatedBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-ink-50 via-white to-ink-100 dark:from-ink-950 dark:via-ink-900 dark:to-black transition-colors duration-500" />
      <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-accent/20 dark:bg-accent/10 blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-ink-300/20 dark:bg-ink-700/30 blur-3xl animate-blob [animation-delay:4s]" />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-accent-soft/30 dark:bg-accent-deep/10 blur-3xl animate-blob [animation-delay:8s]" />
      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />
    </div>
  )
}
