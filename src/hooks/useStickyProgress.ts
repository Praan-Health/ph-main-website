import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

/**
 * 0 → 1 while a tall section scrolls past with a sticky pane inside it: 0 when its top reaches the
 * top of the viewport, 1 when its bottom reaches the bottom. Returns 0 for reduced-motion users.
 */
export function useStickyProgress<T extends HTMLElement>(): { ref: RefObject<T | null>; progress: number; scrollTo: (fraction: number) => void } {
  const ref = useRef<T>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      setProgress(scrollable <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / scrollable)))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  /** Scroll so the section is `fraction` (0-1) of the way through. */
  const scrollTo = (fraction: number) => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + fraction * (el.offsetHeight - window.innerHeight), behavior: 'smooth' })
  }

  return { ref, progress, scrollTo }
}
