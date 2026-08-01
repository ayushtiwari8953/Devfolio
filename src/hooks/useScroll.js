import { useEffect, useRef, useState } from 'react'

// Tracks whether a target element is in view (once or continuously).
export function useInView(options = { once: true, margin: '-80px' }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const once = options.once
  const margin = options.margin

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        if (once) observer.disconnect()
      } else if (!once) {
        setInView(false)
      }
    }, { rootMargin: margin })
    observer.observe(el)
    return () => observer.disconnect()
  }, [once, margin])

  return [ref, inView]
}

// Animated number counter that triggers when `active` becomes true.
export function useCountUp(target, active, duration = 1600) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, duration])
  return value
}

// Active section id based on scroll position, given a stable list of ids.
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  // Store ids in a ref so the scroll listener doesn't re-bind every render.
  const idsRef = useRef(ids)
  idsRef.current = ids

  useEffect(() => {
    const handler = () => {
      const list = idsRef.current
      const scrollPos = window.scrollY + window.innerHeight / 3
      let current = list[0]
      for (const id of list) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollPos) current = id
      }
      setActive(current)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return active
}

// Scroll progress 0 -> 1
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const handler = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? h.scrollTop / max : 0)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return progress
}
