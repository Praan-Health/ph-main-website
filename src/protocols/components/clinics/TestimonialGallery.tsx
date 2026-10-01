"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import styles from "./clinics.module.css";

const GAP_PX = 20; // 1.25rem
const AUTOPLAY_MS = 4000;
const PHONE_QUERY = "(max-width: 560px)";

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="ml-[3px]">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === "prev" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
    </svg>
  );
}

/**
 * Patient video testimonials (the page's `pht-*` embed): a scroll-snapping row of YouTube
 * thumbnails (3 / 2 / 1 per view), round arrows that hide at either end, dots that follow the
 * scroll position, and a click-to-play YouTube (nocookie) embed. On phones it auto-advances every
 * 4s until a video is playing.
 */
export function TestimonialGallery({ videos }: { videos: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState<string | null>(null);
  const [edges, setEdges] = useState({ prev: true, next: false });
  const activeRef = useRef(0);

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current;
    const item = itemRefs.current[i];
    if (!track || !item) return;
    // Horizontal only: the live embed uses scrollIntoView, which also drags the page back to the
    // carousel every 4s on phones.
    track.scrollTo({ left: item.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  const scrollByOne = (dir: 1 | -1) => {
    const track = trackRef.current;
    const first = itemRefs.current[0];
    if (!track || !first) return;
    track.scrollBy({ left: dir * (first.getBoundingClientRect().width + GAP_PX), behavior: "smooth" });
  };

  // Arrow visibility at the ends of the track.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      if (max <= 1) setEdges({ prev: true, next: true });
      else setEdges({ prev: track.scrollLeft <= 1, next: track.scrollLeft >= max - 1 });
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Active dot = the most visible card among those whose visibility just changed (as on live).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const items = itemRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const e of entries) if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        if (best && best.intersectionRatio > 0) {
          const i = items.indexOf(best.target as HTMLDivElement);
          activeRef.current = i;
          setActive(i);
        }
      },
      { root: track, threshold: [0.5, 0.75, 1] },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Phone autoplay, paused while a video plays.
  useEffect(() => {
    const mq = window.matchMedia(PHONE_QUERY);
    const id = setInterval(() => {
      if (playing || !mq.matches) return;
      scrollToIndex((activeRef.current + 1) % videos.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [playing, scrollToIndex, videos.length]);

  const navClass =
    "absolute top-1/2 z-2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white text-navy-700 shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-[background-color,color,scale] duration-150 ease-[ease] hover:scale-106 hover:bg-orange-500 hover:text-white max-[560px]:hidden";

  return (
    <div>
      <div className="relative mt-0">
        <button type="button" aria-label="Previous testimonials" onClick={() => scrollByOne(-1)} className={cn(navClass, "-left-[52px] max-[860px]:left-1", edges.prev && "hidden")}>
          <Chevron dir="prev" />
        </button>
        <div ref={trackRef} className={cn(styles.noScrollbar, "flex snap-x snap-mandatory gap-5 overflow-x-auto")}>
          {videos.map((id, i) => (
            <div
              key={id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="min-w-0 flex-[0_0_calc((100%-2*1.25rem)/3)] snap-start max-[860px]:basis-[calc((100%-1.25rem)/2)] max-[560px]:basis-full"
            >
              <button
                type="button"
                aria-label="Play testimonial"
                onClick={() => setPlaying(id)}
                className="group relative m-0 block aspect-video w-full cursor-pointer overflow-hidden rounded-[18px] border-0 bg-black p-0 shadow-[0_2px_12px_rgba(20,20,40,0.10)]"
              >
                {playing === id ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
                    title="Praan patient story"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 size-full border-0"
                  />
                ) : (
                  <>
                    {/* YouTube thumbnails are remote; next/image would need a remotePatterns entry. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 size-full object-cover transition-transform duration-350 ease-[ease] group-hover:scale-104"
                    />
                    <span className="absolute top-1/2 left-1/2 flex size-[58px] -translate-1/2 items-center justify-center rounded-full bg-white/94 text-orange-500 shadow-[0_6px_22px_rgba(0,0,0,0.32)] transition-[scale] duration-150 ease-[ease] group-hover:scale-108">
                      <PlayIcon />
                    </span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
        <button type="button" aria-label="Next testimonials" onClick={() => scrollByOne(1)} className={cn(navClass, "-right-[52px] max-[860px]:right-1", edges.next && "hidden")}>
          <Chevron dir="next" />
        </button>
      </div>
      <div aria-label="Testimonial video pagination" className="mt-5 flex justify-center gap-2">
        {videos.map((id, i) => (
          <button
            key={id}
            type="button"
            aria-label={`Go to testimonial ${i + 1}`}
            aria-current={i === active || undefined}
            onClick={() => scrollToIndex(i)}
            className={cn(
              "size-2 cursor-pointer rounded-full border-0 p-0 transition-[background-color,scale] duration-200 ease-[ease]",
              i === active ? "scale-125 bg-orange-500" : "bg-black/18 hover:bg-black/32",
            )}
          />
        ))}
      </div>
    </div>
  );
}
