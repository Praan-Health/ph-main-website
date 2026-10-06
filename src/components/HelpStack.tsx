import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent, ReactNode } from 'react'
import { PILLARS } from '../content/site'

const SWIPE_PX = 40

function usePrefersReducedMotion(): boolean {
  const [reduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  return reduced
}

function slotOf(index: number, active: number, count: number): number {
  return (index - active + count) % count
}

interface PillarMediaProps {
  poster: string
  position: string
  video?: string
  isFront: boolean
}

/** Poster image, or a looping muted video that only plays on the front card. */
function PillarMedia({ poster, position, video, isFront }: PillarMediaProps) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (isFront) void el.play().catch(() => undefined)
    else el.pause()
  }, [isFront])

  if (video) {
    return (
      <video ref={ref} className="stack-card__media" src={video} poster={poster} muted loop playsInline preload="metadata" />
    )
  }
  return <img className="stack-card__media" src={poster} alt="" style={{ objectPosition: position }} loading="lazy" />
}

/** Three pillar cards in a perspective stack; the front card changes on a timer, click or swipe. */
export function HelpStack({ intro }: { intro: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion()
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const swipeStart = useRef<number | null>(null)
  const count = PILLARS.length

  const goTo = (index: number) => setActive((index + count) % count)

  const onTabKey = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') goTo(active + 1)
    if (event.key === 'ArrowLeft') goTo(active - 1)
  }
  const onPointerDown = (event: PointerEvent) => {
    swipeStart.current = event.clientX
  }
  const onPointerUp = (event: PointerEvent) => {
    if (swipeStart.current === null) return
    const dx = event.clientX - swipeStart.current
    swipeStart.current = null
    if (Math.abs(dx) > SWIPE_PX) goTo(active + (dx < 0 ? 1 : -1))
  }

  return (
    <div
      className={`help ${isPaused ? 'is-paused' : ''}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="help__side">
      {intro}
      <div className="help__tabs" role="tablist" aria-label="Holistic pain management" onKeyDown={onTabKey}>
        {PILLARS.map((pillar, i) => (
          <button
            key={pillar.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            className={`help__tab ${i === active ? 'is-active' : ''}`}
            onClick={() => goTo(i)}
          >
            <span className="help__tab-label">{pillar.tab}</span>
            <span className="help__tab-track" aria-hidden="true">
              {/* Advances to the next card when the bar finishes; pausing the animation pauses the loop. */}
              {i === active && <span key={active} className="help__tab-fill" onAnimationEnd={() => goTo(active + 1)} />}
            </span>
          </button>
        ))}
      </div>
      </div>

      <div className="stack" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        {PILLARS.map((pillar, i) => {
          const slot = slotOf(i, active, count)
          const isFront = slot === 0
          return (
            <article
              key={pillar.id}
              className="stack-card"
              data-slot={slot}
              aria-hidden={reducedMotion ? undefined : !isFront}
              onClick={() => !isFront && goTo(i)}
            >
              <div className="stack-card__frame">
                <PillarMedia poster={pillar.poster} position={pillar.posterPosition} video={pillar.video} isFront={isFront} />
              </div>
              <div className="stack-card__body">
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
                <a className="stack-card__more" href={pillar.href} tabIndex={isFront || reducedMotion ? 0 : -1}>
                  Explore →
                </a>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
