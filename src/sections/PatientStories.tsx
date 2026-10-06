import { useCallback, useEffect, useRef, useState } from 'react'
import { testimonials } from '../protocols/content/clinics'

const GAP_PX = 20
const SUBHEADING = 'Real people who came to Praan with lasting pain, and got back to what they love without surgery.'

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function Chevron({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === 'prev' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
    </svg>
  )
}

/** Patient video stories, the same videos as the Clinics page: a snapping row, arrows, dots and click-to-play. */
export function PatientStories() {
  const videos = testimonials.videos
  const trackRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState<string | null>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current
    const item = itemRefs.current[index]
    if (!track || !item) return
    track.scrollTo({ left: item.offsetLeft - track.offsetLeft, behavior: 'smooth' })
  }, [])

  const scrollByOne = (direction: 1 | -1) => {
    const track = trackRef.current
    const first = itemRefs.current[0]
    if (!track || !first) return
    track.scrollBy({ left: direction * (first.getBoundingClientRect().width + GAP_PX), behavior: 'smooth' })
  }

  // Arrows hide at either end; the active dot follows the scroll position.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const update = () => {
      const max = track.scrollWidth - track.clientWidth
      setAtStart(track.scrollLeft <= 1)
      setAtEnd(max <= 1 || track.scrollLeft >= max - 1)
      const items = itemRefs.current.filter((el): el is HTMLLIElement => el !== null)
      const nearest = items.reduce((best, el, i) => (Math.abs(el.offsetLeft - track.offsetLeft - track.scrollLeft) < Math.abs(items[best].offsetLeft - track.offsetLeft - track.scrollLeft) ? i : best), 0)
      setActive(atEndOf(track) ? items.length - 1 : nearest)
    }
    update()
    track.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      track.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section className="section" id="stories" aria-labelledby="stories-title">
      <div className="container">
        <div className="section-head section-head--center">
          <h2 id="stories-title">{testimonials.heading}</h2>
          <p className="lead">{SUBHEADING}</p>
        </div>

        <div className="stories">
          <button type="button" className="stories__nav stories__nav--prev" aria-label="Previous stories" hidden={atStart} onClick={() => scrollByOne(-1)}>
            <Chevron dir="prev" />
          </button>
          <ul ref={trackRef} className="stories__track">
            {videos.map((id, i) => (
              <li
                key={id}
                ref={(el) => {
                  itemRefs.current[i] = el
                }}
                className="stories__item"
              >
                <button type="button" className="story" aria-label="Play patient story" onClick={() => setPlaying(id)}>
                  {playing === id ? (
                    <iframe
                      className="story__frame"
                      src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
                      title="Praan patient story"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <img className="story__thumb" src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
                      <span className="story__play">
                        <PlayIcon />
                      </span>
                    </>
                  )}
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="stories__nav stories__nav--next" aria-label="Next stories" hidden={atEnd} onClick={() => scrollByOne(1)}>
            <Chevron dir="next" />
          </button>
        </div>

        <div className="stories__dots" role="group" aria-label="Story pagination">
          {videos.map((id, i) => (
            <button key={id} type="button" className={`stories__dot ${i === active ? 'is-active' : ''}`} aria-label={`Go to story ${i + 1}`} aria-current={i === active || undefined} onClick={() => scrollToIndex(i)} />
          ))}
        </div>
      </div>
    </section>
  )
}

function atEndOf(track: HTMLElement): boolean {
  return track.scrollWidth - track.clientWidth > 1 && track.scrollLeft >= track.scrollWidth - track.clientWidth - 1
}
