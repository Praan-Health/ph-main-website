"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { FaqChevron } from "@/components/home/home-tail-icons";

type Item = { question: string; answer: string };

/**
 * The live "hs-faq" accordion: the first answer starts open, opening one closes the others, and a
 * click anywhere on a card toggles it. Answers animate max-height over 0.4s; the chevron flips instantly.
 */
export function FaqAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  // Content heights of each answer; null until measured after hydration (open answer uses "none").
  const [heights, setHeights] = useState<number[] | null>(null);
  const answers = useRef<(HTMLDivElement | null)[]>([]);
  const baseId = useId();

  // Pixel max-heights (kept current on reflow) let opening and closing transition like live.
  useEffect(() => {
    const els = answers.current.filter((el): el is HTMLDivElement => !!el);
    const measure = () => setHeights(answers.current.map((el) => el?.scrollHeight ?? 0));
    const observer = new ResizeObserver(measure);
    els.forEach((el) => el.firstElementChild && observer.observe(el.firstElementChild));
    return () => observer.disconnect();
  }, []);

  const maxHeight = (i: number) => (open !== i ? "0px" : heights ? `${heights[i]}px` : "none");

  return (
    <div className="flex w-full flex-col gap-4 sm:w-auto">
      {items.map((item, i) => {
        const isOpen = open === i;
        const answerId = `${baseId}-answer-${i}`;
        const questionId = `${baseId}-question-${i}`;
        return (
          <div
            key={item.question}
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
            className="cursor-pointer rounded-md bg-linen px-6 py-3 text-left"
            onClick={() => setOpen(isOpen ? null : i)}
          >
            <button
              id={questionId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={answerId}
              className="flex w-full cursor-pointer items-start justify-between gap-12 text-left text-[1.25rem] font-medium tracking-body"
            >
              <span itemProp="name" className="block max-w-[90%] text-[1.13rem] leading-[1.5] text-navy-700 xs:text-[1rem]">
                {item.question}
              </span>
              <span className={cn("relative flex aspect-square w-[1.125rem] flex-col items-center justify-center sm:w-5", isOpen && "rotate-180")}>
                <span className="flex aspect-square size-5 min-h-5 min-w-5 items-center justify-center p-[0.2rem] text-orange-500">
                  <FaqChevron className="size-full" />
                </span>
              </span>
            </button>
            <div
              id={answerId}
              role="region"
              aria-labelledby={questionId}
              ref={(el) => {
                answers.current[i] = el;
              }}
              style={{ maxHeight: maxHeight(i) }}
              className="flex flex-col items-start gap-2 overflow-hidden transition-all duration-400 ease-[ease]"
              inert={!isOpen}
            >
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer" className="mt-3 pb-[0.31rem]">
                <div itemProp="text" className="text-[0.88rem] text-pretty xs:text-[1rem]">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
