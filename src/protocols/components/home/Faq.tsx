import { Container } from "@/components/ui/Container";
import { Accent, SectionHeading, SectionSpacer } from "@/components/ui/typography";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { FaqCircle } from "@/components/home/home-tail-icons";
import { faq } from "@/content/home";

/** "Frequently Asked Questions": heading beside a single-open accordion. */
export function Faq() {
  return (
    <section data-section="faq" className="relative flex flex-col items-stretch justify-center overflow-clip bg-white text-wrap text-slate-600 xs:overflow-visible">
      <SectionSpacer size="md" />
      <Container>
        <div className="flex flex-col items-center justify-start gap-8 sm:grid sm:grid-cols-[0.8fr_1fr] sm:[place-items:start_stretch] sm:gap-4">
          <div className="relative flex flex-col items-start justify-start gap-6">
            <SectionHeading className="text-balance max-sm:text-center">
              {faq.heading}
              <br />
              <Accent>{faq.headingAccent}</Accent>
            </SectionHeading>
            <FaqCircle className="absolute -bottom-4 left-8 h-[3.0625rem] w-44 text-orange-500 xs:left-[1.7rem] xs:w-[12.875rem] sm:-left-2" />
          </div>
          <FaqAccordion items={faq.items} />
        </div>
      </Container>
      <SectionSpacer size="md" />
    </section>
  );
}
