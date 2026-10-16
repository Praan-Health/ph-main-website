"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { RichText } from "@/components/ui/RichText";
import { FaqToggleChevron } from "./icons";
import { richTextFlow } from "./styles";

type Item = { question: string; answer: string };

/**
 * The condition pages' "hs-faq" accordion (Early signs, Why it happens, …). Same behaviour as
 * `@/components/shared/FaqAccordion` (first answer open, one open at a time, click anywhere on a
 * card), but the answers are CMS rich text and the cards use the rich-wrap column's sizes.
 */
export function ConditionFaq({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const [heights, setHeights] = useState<number[] | null>(null);
  const answers = useRef<(HTMLDivElement | null)[]>([]);
  const baseId = useId();

  useEffect(() => {
    const els = answers.current.filter((el): el is HTMLDivElement => !!el);
    const measure = () => setHeights(answers.current.map((el) => el?.scrollHeight ?? 0));
    const observer = new ResizeObserver(measure);
    els.forEach((el) => el.firstElementChild && observer.observe(el.firstElementChild));
    return () => observer.disconnect();
  }, []);

  const maxHeight = (i: number) => (open !== i ? "0px" : heights ? `${heights[i]}px` : "none");

  return (
    <div className="flex flex-col gap-4 max-sm:w-full">
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
            className="cursor-pointer rounded-md bg-linen px-6 py-3 max-xs:text-left"
            onClick={() => setOpen(isOpen ? null : i)}
          >
            <button
              id={questionId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={answerId}
              className="flex w-full cursor-pointer items-start justify-between gap-12 text-left text-[1.25rem] leading-[1.5] font-medium tracking-body"
            >
              <span itemProp="name" className="block max-w-[90%] text-[1.13rem] leading-[1.5] text-navy-700 xs:text-base">
                {item.question}
              </span>
              <span className={cn("relative flex aspect-square w-[1.125rem] flex-col items-center justify-center sm:w-5", isOpen && "rotate-180")}>
                <span className="flex aspect-square size-5 min-h-5 min-w-5 items-center justify-center p-[0.2rem] text-orange-500">
                  <FaqToggleChevron className="size-full" />
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
                <RichText html={item.answer} className={cn("text-[0.88rem] text-pretty xs:text-base", richTextFlow)} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
