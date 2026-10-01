import { useEffect, useRef, useState } from 'react'

/** True once the element has scrolled into view (fires once). */
export function useInView<T extends Element>(threshold = 0.35) {
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || isInView) return
    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [isInView, threshold])

  return { ref, isInView }
}
