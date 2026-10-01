import { Eyebrow, Accent, SectionHeading, SectionSpacer } from "@/components/ui/typography";
import { Slider } from "@/components/ui/Slider";
import { PatientStoryCard } from "@/components/stories/PatientStoryCard";
import { NinetyDaysCircle } from "@/components/home/results-icons";
import { patientStories } from "@/content/stories";
import { results } from "@/content/home";

/** "Real Results, Real People": patient story cards in a looping slider on a dark background. */
export function Results() {
  const [line1, line2] = results.headingLines;
  return (
    <section className="relative flex flex-col items-stretch justify-center bg-white bg-[url(/images/container-2.webp)] bg-cover bg-center text-white xs:bg-[url(/images/light-bg-section.webp)] xs:bg-left">
      <SectionSpacer size="md" />
      <div>
        <div className="mx-auto flex max-w-[81rem] flex-col gap-6 md:grid md:grid-cols-[minmax(385px,385px)_1fr] md:[place-items:start_stretch] md:gap-4 md:pl-12 lg:pl-24">
          <div className="relative z-[99] order-first mx-auto flex w-full max-w-[27.13rem] flex-col items-center justify-start gap-6 text-center md:order-none md:mx-0 md:items-start md:text-left lg:max-w-[28.38rem] lg:min-w-[28.38rem]">
            <Eyebrow className="[&_.text-navy-700]:!text-slate-100">{results.eyebrow}</Eyebrow>
            <div className="max-xs:max-w-60">
              <div className="relative">
                <SectionHeading className="text-slate-100">
                  {line1}
                  <br />
                  {line2} <Accent>{results.headingAccent}</Accent>
                </SectionHeading>
                <NinetyDaysCircle className="absolute -bottom-[17%] left-[20%] h-10 w-40 -rotate-[4deg] xs:-bottom-[23%] xs:left-[13%] xs:h-14 xs:w-[9.75rem] lg:-bottom-[24%] lg:left-[14%]" />
              </div>
            </div>
            {/* Empty on the live site (its paragraph is hidden) but its top margin still spaces the column. */}
            <div className="mt-0 xs:mt-7" />
          </div>

          <div className="relative flex w-full max-w-none flex-col gap-4 max-xs:z-[99]">
            <Slider theme="dark" label="Patient results" phoneLayout="centered" hideArrowsOnPhone slideClassName="w-[22rem] md:w-[24rem]" className="max-w-[85rem]">
              {patientStories.map((story) => (
                <PatientStoryCard key={story.id} story={story} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <SectionSpacer size="md" />
    </section>
  );
}
