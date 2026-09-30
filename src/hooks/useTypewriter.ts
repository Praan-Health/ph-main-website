import { useEffect, useState } from 'react'

const TYPE_MS = 55
const DELETE_MS = 28
const HOLD_MS = 1100
const PAUSE_MS = 250

/** Types each word in turn, holds it, deletes it, then moves to the next. */
export function useTypewriter(words: readonly string[]): string {
  const [wordIndex, setWordIndex] = useState(0)
  const [length, setLength] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [reduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (reduceMotion) {
      const id = window.setInterval(() => setWordIndex((i) => (i + 1) % words.length), 2400)
      return () => window.clearInterval(id)
    }

    const word = words[wordIndex]
    const isFullyTyped = !isDeleting && length === word.length
    const isEmpty = isDeleting && length === 0

    const delay = isFullyTyped ? HOLD_MS : isEmpty ? PAUSE_MS : isDeleting ? DELETE_MS : TYPE_MS
    const id = window.setTimeout(() => {
      if (isFullyTyped) setIsDeleting(true)
      else if (isEmpty) {
        setIsDeleting(false)
        setWordIndex((i) => (i + 1) % words.length)
      } else setLength((n) => n + (isDeleting ? -1 : 1))
    }, delay)
    return () => window.clearTimeout(id)
  }, [words, wordIndex, length, isDeleting, reduceMotion])

  return reduceMotion ? words[wordIndex] : words[wordIndex].slice(0, length)
}
