import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

/**
 * 0 → 1 as `ref` scrolls up through the viewport: 0 while its top is below `startAt` (a fraction of the
 * viewport height), 1 once its bottom has risen to `endAt`. Returns 1 for reduced-motion users.
 */
export function useScrollProgress<T extends HTMLElement>(startAt = 0.7, endAt = 0.55): { ref: RefObject<T | null>; progress: number } {
  const ref = useRef<T>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1)
      return
    }
    let frame = 0
    const update = () => {
      frame = 0
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const start = window.innerHeight * startAt
      const end = window.innerHeight * endAt
      setProgress(Math.min(1, Math.max(0, (start - rect.top) / (rect.height + (start - end)))))
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
  }, [startAt, endAt])

  return { ref, progress }
}
