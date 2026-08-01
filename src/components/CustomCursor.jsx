import { useEffect, useRef } from 'react'

// Desktop-only custom cursor: a dot that follows instantly and a ring that trails.
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return
    if (window.matchMedia('(hover: none)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    let mx = 0, my = 0, rx = 0, ry = 0
    let raf

    const move = (e) => {
      mx = e.clientX; my = e.clientY
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`
    }
    const loop = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`
      raf = requestAnimationFrame(loop)
    }
    const over = (e) => {
      const t = e.target
      const interactive = t.closest('a,button,[role="button"],input,textarea,select,.cursor-grow')
      ring.style.width = interactive ? '56px' : '36px'
      ring.style.height = interactive ? '56px' : '36px'
      ring.style.background = interactive ? 'rgba(200,194,182,0.15)' : 'transparent'
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  )
}
