// Shared Framer Motion variants for consistent animations.
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
}

export const slideLeft = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export const slideRight = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export const zoomIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export const scaleRotate = {
  hidden: { opacity: 0, scale: 0.8, rotate: -6 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

export const float = {
  animate: { y: [0, -14, 0], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } },
}

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: 'easeIn' } },
}
