"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const INTERVAL_MS = 3000;
const LETTER_STAGGER_MS = 100;

/**
 * Cycles through words letter by letter: every 3s the next word's letters slide up into view
 * (0.8s each, 100ms apart) while the previous word's letters slide up and out. The box eases
 * to the width of the incoming word. Mirrors the jQuery animation on the Webflow site.
 */
export function RotatingWord({ words, className }: { words: string[]; className?: string }) {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [widths, setWidths] = useState<number[] | null>(null);
  const wordRefs = useRef<(HTMLElement | null)[]>([]);
  const boxRef = useRef<HTMLSpanElement>(null);

  // Measure each word once fonts are ready, and again on resize. The box is border-box, so its
  // width is the word plus the box's horizontal padding (what jQuery's .width() set on the original).
  useLayoutEffect(() => {
    const measure = () => {
      const box = boxRef.current;
      const cs = box ? getComputedStyle(box) : null;
      const padding = cs ? parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight) : 0;
      setWidths(wordRefs.current.map((el) => (el?.getBoundingClientRect().width ?? 0) + padding));
    };
    measure();
    document.fonts?.ready.then(measure);
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(measure, 120);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setCurrent((c) => {
        setPrevious(c);
        return (c + 1) % words.length;
      });
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <span
      ref={boxRef}
      className={cn("relative inline-flex overflow-hidden transition-all duration-800 ease-[cubic-bezier(.77,0,.175,1)]", className)}
      style={widths ? { width: widths[current] } : undefined}
    >
      <span className="sr-only">{words[current].replace(/ /g, " ")}</span>
      {/* Before measurement, an invisible copy of the first word gives the box its width. */}
      {!widths && (
        <span aria-hidden="true" className="invisible flex tracking-[-0.02rem]">
          {words[0]}
        </span>
      )}
      {words.map((word, w) => {
        const state = w === current ? "in" : w === previous ? "out" : "idle";
        return (
          <strong
            key={word}
            aria-hidden="true"
            ref={(el) => {
              wordRefs.current[w] = el;
            }}
            className="absolute top-2 left-3 flex font-normal tracking-[-0.02rem]"
          >
            {[...word].map((letter, i) => (
              <em
                key={i}
                className={cn(
                  "relative inline-block text-navy-700 not-italic",
                  state === "idle" && "translate-y-[120%]",
                  state !== "idle" && "transition-transform duration-800",
                  state === "in" && "translate-y-0",
                  state === "out" && "-translate-y-[120%]",
                )}
                style={state !== "idle" && previous !== null ? { transitionDelay: `${i * LETTER_STAGGER_MS}ms` } : undefined}
              >
                {letter}
              </em>
            ))}
          </strong>
        );
      })}
    </span>
  );
}
