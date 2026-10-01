import { Container } from "@/components/ui/Container";
import { Accent, Eyebrow, Lead, SectionHeading, SectionSpacer } from "@/components/ui/typography";
import { CalEmbed } from "@/components/home/CalEmbed";
import { ForYouCircle } from "@/components/home/home-tail-icons";
import { findYourPlan } from "@/content/home";

/**
 * "Find your plan": booking calendar (Cal.id inline embed) and the Praan Clinics teaser.
 * The live section also contains a "Find Your Plan Form" questionnaire, but it is hidden (`form.hide`)
 * and never renders, so only its empty wrapper is kept (it still adds one flex gap).
 */
export function FindYourPlan() {
  const [line1, line2] = findYourPlan.headingLines;
  const { clinics } = findYourPlan;
  return (
    <section data-section="find-your-plan" className="relative flex flex-col items-stretch justify-center bg-linen text-wrap text-slate-600">
      <SectionSpacer size="md" />
      <SectionSpacer size="sm" />
      <Container>
        <div className="relative flex flex-col items-center justify-start gap-12 text-center">
          <div className="relative z-[99] mx-auto flex w-full max-w-[27.13rem] flex-col items-center justify-start gap-6 lg:max-w-[28.38rem] lg:min-w-[28.38rem]">
            <Eyebrow>{findYourPlan.eyebrow}</Eyebrow>
            <div className="relative">
              <SectionHeading className="!text-balance">
                {line1}
                <br />
                {line2} <Accent>{findYourPlan.headingAccent}</Accent>
              </SectionHeading>
              <ForYouCircle className="absolute right-0 -bottom-[0.9rem] h-[2.875rem] w-32 text-orange-500 xs:w-[11.4375rem]" />
            </div>
            <div className="max-w-[90%] xs:max-w-[17rem]">
              <Lead>{findYourPlan.body}</Lead>
            </div>
          </div>

          <div className="relative z-[99] mx-auto flex w-full max-w-[50rem] flex-col gap-4 xs:static xs:z-auto">
            <div className="max-h-[600px] w-full overflow-hidden rounded-[2rem] [&_iframe]:max-h-[600px] [&_iframe]:overflow-hidden [&_iframe]:rounded-[2rem]">
              <CalEmbed calLink={findYourPlan.calLink} />
            </div>
            <div className="max-xs:relative" />
          </div>
        </div>

        <div className="mt-16 flex min-h-[34.44rem] items-end justify-center rounded-xl bg-[url(/images/frame-2147223359.webp)] bg-cover bg-right-bottom bg-no-repeat p-[1.13rem] text-center text-white xs:min-h-0 xs:items-center xs:justify-start xs:bg-[url(/images/cta-blue.webp)] xs:p-[2.63rem] xs:text-left">
          <div className="flex max-w-[19.875rem] flex-col items-stretch justify-start gap-6 xs:items-start">
            <h2 className="text-(length:--text-fluid-h2) leading-[1.2] font-normal tracking-heading capitalize">{clinics.heading}</h2>
            <div>{clinics.body}</div>
            <div className="leading-[1.5] tracking-[-0.00875rem] text-orange-300">{clinics.note}</div>
          </div>
        </div>
      </Container>
      <SectionSpacer size="sm" />
    </section>
  );
}
