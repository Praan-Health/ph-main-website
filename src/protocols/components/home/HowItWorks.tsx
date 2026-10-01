import { Img } from "@/components/ui/Img";
import { Container } from "@/components/ui/Container";
import { Accent, Eyebrow, Lead, SectionHeading, SectionSpacer } from "@/components/ui/typography";
import { DeliversUnderline, HowItWorksGlow } from "@/components/home/how-it-works-icons";
import { howItWorks } from "@/content/home";

const DESKTOP = { width: 615, height: 416 };
const MOBILE = { width: 330, height: 512 };

/** "How it works": four service cards beside the one-doctor promise. */
export function HowItWorks() {
  const [line1, line2] = howItWorks.headingLines;
  return (
    <section className="relative flex flex-col items-stretch justify-center overflow-clip bg-white text-slate-600 xs:overflow-visible">
      <SectionSpacer size="md" />
      <Container>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[2fr_1.2fr] sm:gap-10 lg:gap-12">
          <ul className="grid grid-cols-2 grid-rows-[auto_auto] gap-6">
            {howItWorks.cards.map((card) => (
              <li key={card.title} className="relative flex h-64 flex-col items-start justify-start gap-4 overflow-clip rounded-[1.13rem] bg-linen p-4 xs:h-52 xs:p-6">
                <h3 className="relative z-1 text-[1.125rem] leading-[1.2] font-medium tracking-[-0.03375rem] text-balance text-navy-700">{card.title}</h3>
                <div className="relative z-1 max-w-full xs:max-w-[71%]">
                  <p className="text-(length:--text-fluid-body) leading-[1.5] tracking-normal text-pretty">{card.body}</p>
                </div>
                <div className="absolute inset-0 hidden size-full overflow-clip bg-[color-mix(in_lab,currentcolor_10%,transparent)] xs:block">
                  <Img src={card.image.desktop} alt="" {...DESKTOP} sizes="(max-width: 991px) 45vw, 22rem" className="absolute inset-0 block size-full object-cover" />
                </div>
                <div className="absolute inset-0 block size-full overflow-clip bg-[color-mix(in_lab,currentcolor_10%,transparent)] xs:hidden">
                  <Img src={card.image.mobile} alt="" {...MOBILE} sizes="45vw" className="absolute inset-0 block size-full object-cover object-[50%_100%]" />
                </div>
              </li>
            ))}
          </ul>

          <div className="relative flex flex-col items-center justify-start gap-6 text-center max-sm:[grid-area:1/1/2/2] sm:items-start sm:text-left">
            <Eyebrow>{howItWorks.eyebrow}</Eyebrow>
            <HowItWorksGlow className="pointer-events-none absolute -right-[27%] -bottom-1/2 h-[30rem] w-[29.4375rem] lg:-right-[30%] lg:-bottom-[60%] lg:h-[40rem] lg:w-[35rem]" />
            <div className="relative">
              <SectionHeading>
                {line1}
                <br />
                {line2}
                <br />
                <Accent>{howItWorks.headingAccent}</Accent>
              </SectionHeading>
              <DeliversUnderline className="absolute -bottom-[14%] left-[17%] h-[3.0625rem] w-40 text-orange-500 sm:-left-[2%] sm:w-[12.875rem] lg:-bottom-[11%]" />
            </div>
            <div className="max-w-none md:max-w-[13rem]">
              <Lead>{howItWorks.body}</Lead>
            </div>
          </div>
        </div>
      </Container>
      <SectionSpacer size="md" />
    </section>
  );
}
