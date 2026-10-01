import { Accent, Eyebrow, Lead, SectionHeading, SectionSpacer } from "@/components/ui/typography";
import { Slider } from "@/components/ui/Slider";
import { DoctorCard } from "@/components/team/DoctorCard";
import { CredentialCircle } from "@/components/home/CredentialCircle";
import { careTeam } from "@/content/doctors";
import { team } from "@/content/home";

/** "Your parent's team": the care team in a looping slider on linen. */
export function CareTeam() {
  return (
    <section className="relative flex flex-col items-stretch justify-center bg-linen text-slate-600">
      <SectionSpacer size="md" />
      <div>
        <div className="mx-auto flex max-w-[70rem] flex-col gap-6 md:grid md:grid-cols-[minmax(385px,385px)_1fr] md:[place-items:start_stretch] md:gap-4 lg:grid-cols-[minmax(454px,454px)_1fr]">
          <div className="relative z-[99] order-first mx-auto flex w-full max-w-[27.13rem] flex-col items-center justify-start gap-6 text-center md:order-none md:mx-0 md:items-start md:text-left lg:max-w-[28.38rem] lg:min-w-[28.38rem]">
            <Eyebrow>{team.eyebrow}</Eyebrow>
            <div className="relative">
              <SectionHeading className="!text-balance">
                {team.heading}
                <br />
                <Accent>{team.headingAccent}</Accent>
              </SectionHeading>
              <CredentialCircle className="absolute -bottom-[22%] left-[0.77rem] w-[13rem] text-orange-500 md:-left-[0.63rem] md:w-[13.83rem]" />
            </div>
            <div>
              <Lead className="!text-balance">{team.body}</Lead>
            </div>
          </div>

          <div className="relative flex w-full max-w-none flex-col gap-4 max-xs:z-[99]">
            <Slider theme="light" label="Care team" className="max-w-none" slideClassName="w-[15.75rem] lg:w-[13.75rem]" fadeRightEdge="#f7f7f0">
              {careTeam.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <SectionSpacer size="sm" />
    </section>
  );
}
