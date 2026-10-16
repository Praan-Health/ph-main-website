import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { RichText } from "@/components/ui/RichText";
import { SectionSpacer } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import { consultationUrl, type Condition } from "@/content/conditions";
import { Breadcrumbs } from "./Breadcrumbs";
import { ConditionFaq } from "./ConditionFaq";
import { richTextFlow } from "./styles";
import { ApproachSlider, PlaceholderApproachSlider } from "./ApproachSlider";
import { TickCircle } from "./icons";

/** "h3-l" section title: 36px medium navy (24px regular on phones). */
function PanelHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl leading-[1.2] font-normal tracking-[-0.01125rem] text-balance text-navy-700 xs:text-[2.25rem] xs:font-medium">{children}</h2>;
}

/** Breadcrumbs and the navy summary card (with the condition's banner photo when it has one). */
export function ConditionHero({ condition }: { condition: Condition }) {
  const { desktop, mobile } = condition.banner;
  return (
    <section data-section="condition-hero" className="relative flex flex-col items-stretch justify-center bg-white">
      <div aria-hidden="true" className="h-(--spacing-margin)" />
      <Container>
        <Breadcrumbs trail={[{ label: "Protocols", href: "/protocols" }, { label: "Conditions", href: "/protocols/conditions" }]} current={condition.name} />
        {/* Phones show the clinic photo behind the card when there is no mobile banner (live's is-diabetes card). */}
        <div className="relative mt-6 flex min-h-[26.81rem] items-end justify-center overflow-hidden rounded-[1.75rem] bg-navy-700 bg-[url(/images/bg-m.webp)] bg-cover bg-right-bottom bg-no-repeat p-[1.13rem] text-center text-white xs:mt-7 xs:min-h-[18.31rem] xs:items-center xs:justify-start xs:bg-none xs:p-[2.63rem] xs:text-left">
          {desktop && (
            <Img
              src={desktop.src}
              alt={desktop.alt}
              width={1632}
              height={440}
              priority
              sizes="(max-width: 479px) 1px, 69rem"
              className="pointer-events-none absolute inset-0 hidden size-full max-h-full scale-[1.03] object-cover xs:block"
            />
          )}
          {mobile && (
            <Img
              src={mobile.src}
              alt={mobile.alt}
              width={531}
              height={644}
              priority
              sizes="(max-width: 479px) 100vw, 1px"
              className="pointer-events-none absolute inset-0 block size-full max-h-full rounded-sm object-cover xs:hidden"
            />
          )}
          <div className="relative flex w-full max-w-none flex-col items-stretch justify-start gap-6 xs:w-auto xs:max-w-[30rem] xs:items-start">
            <h1 className="text-(length:--text-fluid-h2) leading-[1.2] font-normal tracking-heading capitalize">{condition.name}</h1>
            <div className="mx-auto max-w-[19.88rem] xs:mx-0">
              <div className="text-slate-100">{condition.summary}</div>
            </div>
            <ButtonLink href={consultationUrl} target="_blank" className="whitespace-nowrap max-xs:w-full">
              <div>Start {condition.name} Care</div>
            </ButtonLink>
          </div>
        </div>
      </Container>
      <SectionSpacer size="md" />
    </section>
  );
}

/**
 * Overview + accordion on the left; the quote, care-approach slider(s) and expected improvements in the
 * linen column on the right (stacked below 992px).
 */
export function ConditionBody({ condition }: { condition: Condition }) {
  return (
    <section data-section="condition-body" className="relative mx-auto flex w-full max-w-[80rem] flex-col items-stretch justify-center bg-white">
      <div className="relative flex w-full items-stretch justify-between max-md:flex-col">
        <div className="flex-1 px-5 pt-7 xs:px-10 xs:pt-12 lg:pl-24">
          <PanelHeading>Overview</PanelHeading>
          <div className="w-full pt-6 pb-8">
            <RichText html={condition.overview} className={cn("text-[1.13rem] leading-[1.7] font-normal tracking-[-0.00563rem] text-pretty", richTextFlow)} />
          </div>
          <ConditionFaq items={condition.faqs} />
          <SectionSpacer size="lg" />
        </div>

        <div className="flex w-full flex-col items-start justify-start gap-12 overflow-clip bg-linen py-12 md:max-w-[32rem]">
          <div className="relative z-1 w-full px-5 xs:w-auto xs:px-0 xs:pl-10">
            <div className="max-w-none rounded-[1.75rem] bg-[#303880] bg-[url(/images/bg-shinny.webp)] bg-cover bg-center px-[1.63rem] py-10 text-center text-2xl leading-[1.5] font-medium text-white xs:max-w-[23.5rem]">
              <RichText html={condition.quote} />
            </div>
          </div>

          <div className="relative w-full">
            <div className="pb-7">
              <div className="relative z-1 w-full px-5 xs:px-0 xs:pl-10">
                <PanelHeading>Praan’s Care Approach</PanelHeading>
              </div>
            </div>
            {/* Live binds each card's text to the matching "expected improvement", not the approach copy. */}
            <ApproachSlider
              cards={condition.approach.map((item, i) => ({ heading: item.heading, body: condition.improvements[i] ?? "" }))}
              idPrefix={`${condition.slug}-approach`}
            />
            {/* An unfilled template slider ("Heading" / "Description") sits under the real one on live. */}
            <PlaceholderApproachSlider idPrefix={`${condition.slug}-placeholder`} />
          </div>

          <div className="relative z-1 w-full px-5 xs:w-auto xs:px-0 xs:pl-10">
            <div className="max-w-none xs:max-w-[23.7rem]">
              <div className="pb-7">
                <PanelHeading>Expected Improvement</PanelHeading>
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-[0.63rem] rounded-[1.75rem] bg-white p-6 shadow-[0_0_26.7px_#fd711829] xs:w-auto">
                {condition.improvements.map((item) => (
                  <div key={item} className="flex w-full items-center justify-start gap-2 text-navy-700">
                    <TickCircle className="size-6 min-h-6 min-w-6 text-orange-500" />
                    <div className="text-[0.88rem] xs:text-base">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
