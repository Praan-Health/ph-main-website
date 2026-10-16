import { cn } from "@/lib/cn";
import { SliderArrowIcon } from "@/components/home/results-icons";
import { ConditionSlider } from "./ConditionSlider";
import { SliderFade, TabCornerLeft, TabCornerRight } from "./icons";

type Card = { heading: string; body: string };

/** One "condition-featured_box": navy header with stacked icon tiles, a white tab heading and a text panel. */
function ApproachCard({ heading, body }: Card) {
  return (
    <div className="h-full max-w-[23.94rem] overflow-hidden rounded-[1.75rem] border border-navy-100 bg-navy-700">
      <div className="flex items-center justify-end pt-3 pr-3">
        <div className="relative z-1 -mr-[1.69rem] flex size-[2.33rem] min-h-[2.33rem] min-w-[2.33rem] items-center justify-center rounded-[0.67rem] bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element -- tiny static SVG icon */}
          <img src="/images/frame-1707479564.svg" alt="" loading="lazy" className="size-[1.63rem] min-h-[1.63rem] max-w-[1.63rem] min-w-[1.63rem]" />
        </div>
        <div className="relative -mr-[1.69rem] size-[2.33rem] min-h-[2.33rem] min-w-[2.33rem] rounded-[0.67rem] bg-orange-500" />
        <div className="size-[2.33rem] min-h-[2.33rem] min-w-[2.33rem] rounded-[0.67rem] bg-teal-400" />
      </div>
      <div className="-mb-[0.1rem] mt-[0.94rem] flex items-center justify-start">
        <TabCornerLeft className="h-[2.375rem] w-[1.125rem] shrink-0 text-white" />
        <div className="relative z-3 -ml-[0.1rem] h-[2.375rem] bg-white pt-4 pr-[0.63rem] pb-[0.13rem]">
          <div className="text-[1.13rem] leading-[1.5] font-medium text-navy-700">{heading}</div>
        </div>
        <TabCornerRight className="-ml-[0.2rem] h-[2.375rem] w-11 shrink-0 text-white" />
      </div>
      <div className="min-h-[9.88rem] bg-white px-6 pt-[0.88rem] pb-[1.13rem]">
        <div className="relative z-3 text-balance">{body}</div>
      </div>
    </div>
  );
}

/** Linen fades over both ends of the track (hidden on phones). */
function Fades({ idPrefix }: { idPrefix: string }) {
  return (
    <>
      <SliderFade idPrefix={`${idPrefix}-r`} className="pointer-events-none absolute -top-4 right-0 z-2 hidden h-[19.5625rem] w-[9.75rem] xs:block" />
      <SliderFade idPrefix={`${idPrefix}-l`} className="pointer-events-none absolute -top-4 -left-8 z-2 hidden h-[19.5625rem] w-40 rotate-180 xs:block" />
    </>
  );
}

const slideWidth = "!w-[23.94rem] min-w-[23.94rem] max-w-[23.94rem]";

/** "Praan's Care Approach" cards in the light slider ("slider-wrapper"). */
export function ApproachSlider({ cards, idPrefix }: { cards: Card[]; idPrefix: string }) {
  return (
    <div data-slider="approach" className="relative w-full px-5 xs:px-0 xs:pl-10">
      <ConditionSlider label="Praan's care approach" slideClassName={slideWidth} hideArrowsOnPhone leftMask>
        {cards.map((card) => (
          <ApproachCard key={card.heading} {...card} />
        ))}
      </ConditionSlider>
      <Fades idPrefix={idPrefix} />
    </div>
  );
}

const arrowClass =
  "flex size-7 min-h-7 min-w-7 cursor-pointer items-center justify-center rounded-full bg-orange-500 p-[0.38rem] text-white transition-all duration-500 active:scale-[0.92] max-xs:hidden";

/**
 * The second approach slider on live is an unfilled CMS template with a single "Heading" /
 * "Description" card. Swiper 8's loop mode clones that card on both sides and shows one dot; a
 * modern Swiper will not loop a single slide, so this renders the same static picture.
 */
export function PlaceholderApproachSlider({ idPrefix }: { idPrefix: string }) {
  const card = <ApproachCard heading="Heading" body="Description" />;
  const clone = "absolute top-0 w-[23.94rem] h-full";
  return (
    <div data-slider="approach-placeholder" aria-hidden="true" className="relative w-full px-5 xs:px-0 xs:pl-10">
      <div className="mx-auto w-full max-w-[85rem]">
        <div className="relative z-2 h-[16.3rem] w-full before:pointer-events-auto before:absolute before:-top-10 before:right-full before:-bottom-10 before:z-[9999] before:hidden before:w-screen before:bg-linen before:content-[''] sm:before:block">
          {/* Centred below 992px (clones either side), left-aligned above. */}
          <div className="absolute top-0 left-1/2 h-full w-[23.94rem] -translate-x-1/2 md:left-0 md:translate-x-0">
            <div className={cn(clone, "right-[calc(100%+1.5rem)]")}>{card}</div>
            {card}
            <div className={cn(clone, "left-[calc(100%+1.5rem)]")}>{card}</div>
          </div>
        </div>
        <div className="flex w-full max-w-[1376px] items-end justify-between max-md:flex-col max-md:items-start max-md:pb-8 max-xs:mx-auto max-xs:items-center max-xs:pb-0">
          <div className="flex max-w-[27.25rem] flex-col items-end justify-between gap-6 max-md:max-w-none max-md:gap-12">
            <div className="mt-[2.63rem] flex items-center justify-center gap-4 max-md:ml-auto max-xs:mx-auto max-xs:mt-6">
              <span className={arrowClass}>
                <SliderArrowIcon className="size-4 rotate-180" />
              </span>
              <div className="slider-dots">
                <span className="slider-dot is-active" />
              </div>
              <span className={arrowClass}>
                <SliderArrowIcon className="size-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <Fades idPrefix={idPrefix} />
    </div>
  );
}
