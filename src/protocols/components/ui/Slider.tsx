"use client";

import { Children, useId, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard, Navigation, Pagination } from "swiper/modules";
import { cn } from "@/lib/cn";
import { SliderArrowIcon } from "@/components/home/results-icons";

type SliderProps = {
  children: React.ReactNode;
  /** Width classes for each slide, e.g. "w-[22rem] md:w-[24rem]". */
  slideClassName: string;
  theme: "dark" | "light";
  label: string;
  /**
   * Phone (<480px) behaviour. "centered": the track is capped at 22rem and centred with the
   * controls centred beneath it (results slider). "natural": the track keeps full width and the
   * controls keep their tablet layout (team slider).
   */
  phoneLayout?: "centered" | "natural";
  /** Hide the arrows below 480px, leaving only the dots (results slider). */
  hideArrowsOnPhone?: boolean;
  /** Keep the empty trailing element some Webflow sliders have after the arrows (it takes a gap slot). */
  trailingGap?: boolean;
  /** Fade the right edge of the track into this colour (hidden on phones), as the team slider does. */
  fadeRightEdge?: string;
  className?: string;
};

/**
 * Looping card carousel used across the site ("slider_component" in the Webflow build):
 * 24px gaps, slides centred below 992px and left-aligned above, round arrows either side of
 * pill-shaped dots (arrows hidden on phones). An invisible mask to the left of the track stops
 * the peeking cards there from being clicked, as on the original.
 */
export function Slider({ children, slideClassName, theme, label, phoneLayout = "natural", hideArrowsOnPhone = false, trailingGap = true, fadeRightEdge, className }: SliderProps) {
  const fadeId = `fade-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const centered = phoneLayout === "centered";
  // Dark sections use white arrows with navy icons; light sections use the brand orange with white icons.
  const arrowClass = cn(
    "flex size-7 min-h-7 min-w-7 cursor-pointer items-center justify-center rounded-full p-[0.38rem] transition-all duration-500 active:scale-[0.92]",
    theme === "dark" ? "bg-white text-navy-700" : "bg-orange-500 text-white",
    hideArrowsOnPhone && "max-xs:hidden",
  );
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
  const [dotsEl, setDotsEl] = useState<HTMLDivElement | null>(null);
  const ready = prevEl && nextEl && dotsEl;

  return (
    <div data-slider-theme={theme} className={cn("mx-auto w-full overflow-clip @container", centered && "max-xs:flex max-xs:flex-col max-xs:items-center max-xs:justify-start", className)}>
      <div className={cn("relative z-2 w-full overflow-visible before:pointer-events-auto before:absolute before:-top-10 before:right-full before:-bottom-10 before:z-[9999] before:hidden before:w-screen before:content-[''] sm:before:block", centered && "max-xs:mx-auto max-xs:max-w-[22rem]")}>
        {ready && (
          <Swiper
            modules={[Navigation, Pagination, A11y, Keyboard]}
            slidesPerView="auto"
            slidesPerGroup={1}
            spaceBetween={24}
            loop
            grabCursor
            keyboard={{ enabled: true, onlyInViewport: true }}
            breakpoints={{ 0: { centeredSlides: true }, 992: { centeredSlides: false } }}
            navigation={{ prevEl, nextEl }}
            pagination={{ el: dotsEl, clickable: true, bulletClass: "slider-dot", bulletActiveClass: "is-active" }}
            a11y={{ containerMessage: label }}
            className="relative z-1 !overflow-visible [&_.swiper-wrapper]:items-stretch"
          >
            {Children.map(children, (child) => (
              <SwiperSlide className={cn("!h-auto min-w-0 shrink-0 rounded-[0.25rem]", slideClassName)}>{child}</SwiperSlide>
            ))}
          </Swiper>
        )}
        {fadeRightEdge && (
          <svg
            viewBox="0 0 156 313"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            className="pointer-events-none absolute -top-4 right-0 z-2 hidden h-[19.5625rem] w-[9.75rem] xs:block"
          >
            <rect width="156" height="313" fill={`url(#${fadeId})`} />
            <defs>
              <linearGradient id={fadeId} x1="0" y1="156.5" x2="156" y2="156.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" stopOpacity="0" />
                <stop offset="1" stopColor={fadeRightEdge} />
              </linearGradient>
            </defs>
          </svg>
        )}
      </div>
      {/* Controls row: left-aligned under the track on desktop and tablet; centred on phones in the "centered" layout. */}
      <div
        className={cn(
          "flex w-full max-w-[1376px] flex-col items-start justify-between pb-8 max-xs:mx-auto max-xs:items-center max-xs:pb-0 md:flex-row md:items-end md:pb-0",
          centered && "max-xs:max-w-[22rem] max-xs:flex-row max-xs:justify-center max-xs:px-5",
        )}
      >
        <div className={cn("flex flex-col items-end justify-between gap-12 md:max-w-[27.25rem] md:gap-6", centered && "max-xs:mr-auto max-xs:w-full max-xs:max-w-[22rem] max-xs:min-w-[22rem]")}>
          <div className={cn("mt-[2.63rem] flex items-center justify-center gap-4 max-md:ml-auto max-xs:mx-auto max-xs:mt-6", centered && "max-xs:w-full max-xs:min-w-full")}>
            <button ref={setPrevEl} type="button" aria-label="Previous slide" className={arrowClass}>
              <SliderArrowIcon className="size-4 rotate-180" />
            </button>
            {/* Swiper 8 (used by the original) gave the pagination element width: 100%. */}
            <div ref={setDotsEl} className={cn("slider-dots w-full", centered && "max-xs:justify-center")} />
            <button ref={setNextEl} type="button" aria-label="Next slide" className={arrowClass}>
              <SliderArrowIcon className="size-4" />
            </button>
            {/* The original row ends with an empty embed element that still takes a gap slot. */}
            {trailingGap && <span aria-hidden="true" />}
          </div>
        </div>
      </div>
    </div>
  );
}

