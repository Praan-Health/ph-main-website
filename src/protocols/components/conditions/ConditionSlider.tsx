"use client";

import { Children, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard, Navigation } from "swiper/modules";
import { cn } from "@/lib/cn";
import { SliderArrowIcon } from "@/components/home/results-icons";

type ConditionSliderProps = {
  children: React.ReactNode;
  label: string;
  /** Width classes for each slide. */
  slideClassName: string;
  /** slider_component: the root (e.g. add overflow-clip where the live component clips). */
  className?: string;
  /** slider-mask around the Swiper track. */
  maskClassName?: string;
  /** customer_header-wrap: the controls row under the track. */
  headerClassName?: string;
  /** review_description-wrap inside the controls row. */
  reviewClassName?: string;
  /** basic-swiper-arrows-wrapper: prev arrow, dots, next arrow. */
  arrowsClassName?: string;
  dotsClassName?: string;
  /** Hide the arrows below 480px ("mobile-hide"), leaving only the dots. */
  hideArrowsOnPhone?: boolean;
  /** Extra content at the end of the controls row (the team slider's phone-only "View All"). */
  after?: React.ReactNode;
  /** Paint the live "light-slider" mask (a linen block left of the track, 768px and up). */
  leftMask?: boolean;
};

/**
 * The site's "slider_component" as the condition pages use it: a looping Swiper (24px gaps, slides
 * centred below 992px and left-aligned above) with round orange arrows either side of pill dots.
 * A local variant of `@/components/ui/Slider` whose controls row keeps the live classes' exact
 * spacing (no trailing embed slot) and whose track is not clipped (the page sections clip it).
 */
export function ConditionSlider({
  children,
  label,
  slideClassName,
  className,
  maskClassName,
  headerClassName,
  reviewClassName,
  arrowsClassName,
  dotsClassName,
  hideArrowsOnPhone = false,
  after,
  leftMask = false,
}: ConditionSliderProps) {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [active, setActive] = useState(0);
  const ready = prevEl && nextEl;
  const slides = Children.toArray(children);
  const count = slides.length;
  // Swiper 8 (live) cloned slides for loop mode; current Swiper only re-orders them and refuses to
  // loop a short list, so short lists are repeated and the dots follow the real (modulo) index.
  const copies = count > 1 && count < 10 ? Math.ceil(10 / count) : 1;
  const track = Array.from({ length: copies }, () => slides).flat();

  const arrowClass = cn(
    "flex size-7 min-h-7 min-w-7 cursor-pointer items-center justify-center rounded-full bg-orange-500 p-[0.38rem] text-white transition-all duration-500 active:scale-[0.92]",
    hideArrowsOnPhone && "max-xs:hidden",
  );

  return (
    <div data-slider-theme="light" className={cn("mx-auto w-full max-w-[85rem] @container", className)}>
      <div
        className={cn(
          "relative z-2 w-full",
          leftMask &&
            "before:pointer-events-auto before:absolute before:-top-10 before:right-full before:-bottom-10 before:z-[9999] before:hidden before:w-screen before:bg-linen before:content-[''] sm:before:block",
          maskClassName,
        )}
      >
        {ready ? (
          <Swiper
            modules={[Navigation, A11y, Keyboard]}
            slidesPerView="auto"
            slidesPerGroup={1}
            spaceBetween={24}
            loop={count > 1}
            grabCursor
            keyboard={{ enabled: true, onlyInViewport: true }}
            breakpoints={{ 0: { centeredSlides: true }, 992: { centeredSlides: false } }}
            navigation={{ prevEl, nextEl }}
            onSwiper={setSwiper}
            onRealIndexChange={(s) => setActive(s.realIndex % count)}
            a11y={{ containerMessage: label }}
            className="relative z-1 !overflow-visible [&_.swiper-wrapper]:items-stretch"
          >
            {track.map((child, i) => (
              <SwiperSlide key={i} className={cn("!h-auto min-w-0 shrink-0 rounded-[0.25rem]", slideClassName)}>
                {child}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          // Before Swiper mounts, show the first slide where it will sit so the layout does not jump.
          <div className="flex max-md:justify-center">
            <div className={cn("shrink-0", slideClassName)}>{slides[0]}</div>
          </div>
        )}
      </div>
      <div
        className={cn(
          "flex w-full max-w-[1376px] items-end justify-between max-md:flex-col max-md:items-start max-md:pb-8 max-xs:mx-auto max-xs:items-center max-xs:pb-0",
          headerClassName,
        )}
      >
        <div className={cn("flex max-w-[27.25rem] flex-col items-end justify-between gap-6 max-md:max-w-none max-md:gap-12", reviewClassName)}>
          <div className={cn("mt-[2.63rem] flex items-center justify-center gap-4 max-md:ml-auto max-xs:mx-auto max-xs:mt-6", arrowsClassName)}>
            <button ref={setPrevEl} type="button" aria-label="Previous slide" className={arrowClass}>
              <SliderArrowIcon className="size-4 rotate-180" />
            </button>
            <div className={cn("slider-dots", dotsClassName)}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === active}
                  className={cn("slider-dot", i === active && "is-active")}
                  onClick={() => swiper?.slideToLoop(i)}
                />
              ))}
            </div>
            <button ref={setNextEl} type="button" aria-label="Next slide" className={arrowClass}>
              <SliderArrowIcon className="size-4" />
            </button>
          </div>
        </div>
        {after}
      </div>
    </div>
  );
}
