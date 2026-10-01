import { Container } from "@/components/ui/Container";
import { SectionSpacer } from "@/components/ui/typography";
import { CountUp } from "@/components/home/CountUp";
import { cn } from "@/lib/cn";
import { stats } from "@/content/home";

// Per-card illustration sizing (stats_image, .is_two, .is_three, .is_four on live).
const IMAGE_CLASSES = [
  "w-full max-w-[7.38rem] xs:w-1/2",
  "w-full max-w-[8.31rem] xs:w-1/2",
  "w-full max-w-[8.5rem] rounded-br-lg xs:w-1/2 xs:max-w-[8.06rem]",
  "w-auto max-w-[6.69rem]",
];

/** Four stat cards (families, sessions, experts, cities) with count-up numbers. */
export function Stats() {
  return (
    <section data-section="stats" className="relative flex flex-col items-stretch justify-center bg-white text-wrap text-slate-600">
      <Container>
        <div className="grid grid-cols-2 grid-rows-[auto_auto] gap-x-[1.56rem] gap-y-[1.38rem] sm:flex sm:items-stretch sm:justify-between sm:gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "relative flex min-h-[8.63rem] flex-1 flex-col items-start justify-start rounded-lg border border-slate-200 px-[0.88rem] pt-[0.63rem] pb-16 xs:min-h-0 xs:px-[1.13rem] xs:pb-[0.63rem] lg:max-h-[5.63rem]",
                i === 2 && "max-xs:[grid-area:1/2/2/3]",
              )}
            >
              <div className="text-[2.63rem] leading-[1.2] font-medium text-navy-700">
                <CountUp initial={stat.initial} target={stat.target} />
                {stat.suffix}
              </div>
              <div className="text-[0.75rem]">{stat.label}</div>
              {/* eslint-disable-next-line @next/next/no-img-element -- small decorative SVGs */}
              <img
                src={stat.image.src}
                width={stat.image.width}
                height={stat.image.height}
                alt=""
                loading="lazy"
                className={cn("absolute inset-x-0 bottom-0 mx-auto inline-block h-auto align-middle xs:left-auto xs:mx-0", IMAGE_CLASSES[i])}
              />
            </div>
          ))}
        </div>
      </Container>
      <SectionSpacer size="sm" />
    </section>
  );
}
