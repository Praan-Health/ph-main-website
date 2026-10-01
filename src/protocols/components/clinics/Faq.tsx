"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Accent, SectionHeading, SectionSpacer } from "@/components/ui/typography";
import { faq } from "@/content/clinics";

function FaqUnderline({ className }: { className?: string }) {
  return (
    <svg className={className} width="100%" height="100%" viewBox="0 0 206 49" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <g opacity="0.2" style={{ mixBlendMode: "multiply" }}>
        <path
          d="M110.088 34.342C109.983 35.3363 109.877 36.3307 109.771 37.3251C117.869 38.0517 126.046 38.6335 134.199 39.0947C149.958 39.9496 165.69 40.5292 181.527 39.9237C189.267 39.2402 197.629 40.0664 204.786 35.2988C205.66 34.4216 205.592 32.8319 204.969 31.9572C204.894 31.8309 204.805 31.6984 204.717 31.578C204.649 31.4836 204.575 31.3891 204.498 31.2943C204.342 31.1048 204.169 30.9143 203.977 30.722C203.793 30.5364 203.549 30.3132 203.37 30.1594C203.198 30.0115 203.016 29.8623 202.823 29.7116C202.437 29.4101 202.007 29.1026 201.533 28.7879C201.156 28.5385 200.76 28.29 200.331 28.0341C199.903 27.7788 199.446 27.5187 198.961 27.2537C198.555 27.0329 198.15 26.8194 197.715 26.5973C194.057 24.7472 190.66 23.3649 186.749 21.864C185.675 21.4551 184.581 21.0518 183.466 20.654C149.879 9.21447 114.557 4.34765 79.3487 1.41828C61.6813 0.120615 44.0692 -0.591877 26.2735 0.632353C21.7154 0.979513 17.3724 1.44218 12.9261 2.30379C8.73993 3.46608 3.75494 3.32689 0.29124 8.67338C-0.914491 12.0104 1.92378 14.5449 3.35563 15.7949C5.42266 17.4823 6.94184 18.3658 9.25824 19.6346C11.0045 20.5764 13.2221 21.6325 15.2828 22.5306C17.1702 23.356 19.2494 24.204 21.5291 25.0754C23.354 25.7742 25.3718 26.4775 27.2565 27.0906C67.3421 38.9257 108.619 43.8183 149.915 47.4548C158.112 48.0419 166.261 48.6149 174.499 48.3671C174.458 47.368 174.416 46.3688 174.374 45.3697C166.449 45.6108 158.272 45.0485 150.141 44.4633C109.081 40.8589 67.682 35.9099 28.1856 24.2381C26.3384 23.6372 24.3676 22.9516 22.5968 22.2767C20.3531 21.4225 18.3141 20.596 16.4727 19.7978C14.462 18.9288 12.3147 17.9141 10.6505 17.0272C8.4524 15.8379 7.01109 14.9941 5.23249 13.5555C4.84167 13.2277 4.56095 12.9749 4.20784 12.6113C3.82288 12.2115 3.53233 11.8408 3.32668 11.5116C3.22014 11.3387 3.15377 11.2204 3.06726 11.0253C2.98471 10.8353 2.93463 10.6668 2.90719 10.5165C2.85541 10.2155 2.87544 9.98799 2.97606 9.71466C7.41467 4.6548 18.282 4.2004 26.4836 3.26349C44.0271 1.86345 61.601 2.31952 79.2134 3.37208C114.321 5.80327 149.707 10.2094 183.13 21.5958C184.238 21.9913 185.326 22.3927 186.392 22.7999C190.28 24.2955 193.654 25.681 197.244 27.5147C197.67 27.7347 198.066 27.9459 198.462 28.1638C198.936 28.4249 199.38 28.6803 199.794 28.9301C200.208 29.1803 200.59 29.4223 200.949 29.6635C201.403 29.9672 201.809 30.2614 202.168 30.5454C203.598 31.6527 205.146 33.3827 203.953 34.5822C197.888 38.5723 189.052 38.108 181.478 38.5807C165.727 38.9706 150.035 38.0814 134.357 36.819C126.246 36.1471 118.116 35.3287 110.088 34.342Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

function Chevron() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * "Frequently Asked Questions" (the site's `hs-faq-*` accordion): the first answer starts open,
 * opening one closes the others, and clicking anywhere on an open card closes it. Answers slide
 * via max-height over 0.4s; the chevron flips instantly.
 */
export function Faq() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Measured heights of the answers; the open one's max-height is its scrollHeight.
  const [heights, setHeights] = useState<number[] | null>(null);

  useEffect(() => {
    const measure = () => setHeights(answerRefs.current.map((el) => el?.scrollHeight ?? 0));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const toggle = (i: number) => {
    setHeights(answerRefs.current.map((el) => el?.scrollHeight ?? 0));
    setOpenIndex((current) => (current === i ? null : i));
  };

  return (
    <section data-section="faq" className="relative flex flex-col items-stretch justify-center bg-white text-wrap max-xs:overflow-clip">
      <SectionSpacer size="md" />
      <Container>
        <div className="grid grid-cols-[0.8fr_1fr] items-start justify-items-stretch gap-4 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-start max-sm:gap-8">
          <div className="relative flex flex-col items-start justify-start gap-6">
            <SectionHeading className="max-sm:text-center">
              {faq.heading}
              <br />
              <Accent>{faq.headingAccent}</Accent>
            </SectionHeading>
            <FaqUnderline className="absolute -bottom-4 -left-2 h-[3.0625rem] w-[12.875rem] text-orange-500 max-sm:left-[1.7rem] max-xs:left-8 max-xs:w-44" />
          </div>
          <div className="flex w-full flex-col gap-4">
            {faq.items.map((item, i) => {
              const open = openIndex === i;
              const answerId = `${baseId}-answer-${i}`;
              // Before measuring, the initially open answer is left unclamped so it renders open.
              const maxHeight = open ? (heights ? `${heights[i]}px` : "none") : "0px";
              return (
                <div key={item.q} onClick={() => toggle(i)} className="cursor-pointer rounded-md bg-linen px-6 py-3 max-xs:text-left">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={answerId}
                    className="flex w-full cursor-pointer items-start justify-between gap-x-12 text-left text-[1.25rem] leading-[1.5] font-medium tracking-body"
                  >
                    <span className="flex max-w-[90%] items-start justify-between gap-x-12 text-base leading-[1.5] text-navy-700 max-md:w-full max-xs:text-[1.13rem]">
                      {item.q}
                    </span>
                    <span
                      className="relative flex aspect-square w-5 flex-col items-center justify-center max-sm:w-[1.125rem]"
                      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      <span className="flex aspect-square size-5 min-h-5 min-w-5 items-center justify-center p-[0.2rem] text-orange-500">
                        <Chevron />
                      </span>
                    </span>
                  </button>
                  <div
                    id={answerId}
                    ref={(el) => {
                      answerRefs.current[i] = el;
                    }}
                    aria-hidden={!open}
                    className="flex flex-col items-start gap-y-2 overflow-hidden transition-all duration-400 ease-[ease]"
                    style={{ maxHeight }}
                  >
                    <div className="mt-3 pb-[0.31rem]">
                      <div className="text-[0.88rem] leading-[1.5] text-pretty xs:text-base">{item.a}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
      <SectionSpacer size="md" />
    </section>
  );
}
