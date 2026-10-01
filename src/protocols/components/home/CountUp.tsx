"use client";

import { useEffect, useRef, useState } from "react";

const DELAY = 200;
const DURATION = 3000;
const STEP = 16;

/**
 * Frames of the Flowbase "boosters-countup" animation the live site uses: the digits count up from 0
 * over DURATION in STEP ms frames, with the target's "." / "," re-inserted at the same position.
 */
function countFrames(target: string): string[] {
  const n = DURATION / STEP;
  const frames: string[] = Array.from({ length: Math.ceil(n) }, () => "");
  const seps = [...target.matchAll(/[.,]/g)].map((m) => ({ char: m[0], i: target.length - (m.index ?? 0) - 1 })).sort((a, b) => a.i - b.i);
  const digits = Number(target.replace(/[.,]/g, ""));
  let h = frames.length - 1;
  for (let u = n; u >= 1; u--) {
    const value = String(Math.trunc((digits / n) * u));
    frames[h--] = seps.reduce((s, { char, i }) => (s.length <= i ? s : s.slice(0, -i) + char + s.slice(-i)), value);
  }
  frames.push(target);
  return frames;
}

/** Number that counts up to `target` once it is fully in view (shows `initial` until then, as live does). */
export function CountUp({ initial, target }: { initial: string; target: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(initial);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const run = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setText(target);
        return;
      }
      const frames = countFrames(target);
      const tick = () => {
        setText(frames.shift() || " ");
        if (frames.length) timer = setTimeout(tick, STEP);
      };
      tick();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        timer = setTimeout(run, DELAY);
      },
      { threshold: 1 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [target]);

  return <span ref={ref}>{text}</span>;
}
