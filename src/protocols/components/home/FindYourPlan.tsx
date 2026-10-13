import { Container } from "@/components/ui/Container";
import { Accent, Eyebrow, Lead, SectionHeading, SectionSpacer } from "@/components/ui/typography";
import { CalEmbed } from "@/components/home/CalEmbed";
import { ForYouCircle } from "@/components/home/home-tail-icons";
import { findYourPlan } from "@/content/home";

/**
 * "Find your plan": booking calendar (Cal.id inline embed).
 * The live section also contains a "Find Your Plan Form" questionnaire, but it is hidden (`form.hide`)
 * and never renders, so only its empty wrapper is kept (it still adds one flex gap).
 */
export function FindYourPlan() {
  const [line1, line2] = findYourPlan.headingLines;
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
      </Container>
      <SectionSpacer size="sm" />
    </section>
  );
}
