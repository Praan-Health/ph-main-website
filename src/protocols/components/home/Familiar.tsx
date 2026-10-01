import { Img } from "@/components/ui/Img";
import { Container } from "@/components/ui/Container";
import { Accent, Eyebrow, Lead, SectionHeading, SectionSpacer } from "@/components/ui/typography";
import { HandDrawnCircle } from "@/components/home/HandDrawnCircle";
import { familiar } from "@/content/home";

/** "Sounds Familiar?": the problem statement beside two overlapping message cards. */
export function Familiar() {
  const [first, second] = familiar.images;
  return (
    <section className="relative flex flex-col items-stretch justify-center bg-white text-slate-600">
      <SectionSpacer size="lg" />
      <Container>
        <div className="flex w-full max-w-[61.56rem] flex-col items-center justify-start gap-7 xs:gap-16 md:mr-auto md:flex-row md:items-stretch md:justify-between">
          <div className="flex w-full max-w-[30.44rem] flex-col items-center justify-start gap-[1.13rem] text-center">
            <div className="relative flex w-full max-w-full items-start justify-center">
              <Img src={first.src} alt={first.alt} width={first.width} height={first.height} sizes="(max-width: 479px) 13.5rem, 17.4rem" className="relative -right-[1.8rem] block h-auto w-full max-w-[13.5rem] xs:-right-4 xs:max-w-[14.5rem] xs:scale-120" />
              <Img src={second.src} alt={second.alt} width={second.width} height={second.height} sizes="(max-width: 479px) 13.5rem, 17.4rem" className="relative -left-[1.8rem] block h-auto w-full max-w-[13.5rem] xs:-left-4 xs:max-w-[14.5rem] xs:scale-120" />
            </div>
            <div className="mx-auto max-w-[26.94rem]">
              <p className="-mt-10 text-base text-slate-600 xs:-mt-6">{familiar.caption}</p>
            </div>
          </div>

          <div className="relative z-[99] order-first mx-auto flex w-full max-w-[27.13rem] flex-col items-center justify-start gap-6 text-center md:order-none md:mx-0 md:items-start md:text-left lg:max-w-[28.38rem] lg:min-w-[28.38rem]">
            <Eyebrow>{familiar.eyebrow}</Eyebrow>
            <div className="relative">
              <SectionHeading>
                {familiar.heading} <Accent>{familiar.headingAccent}</Accent>
              </SectionHeading>
              <HandDrawnCircle className="absolute right-[10vw] -bottom-[13%] h-[2.8125rem] w-36 text-orange-500 xs:right-[9%] xs:w-[11.8125rem] lg:right-[7%] xl:right-[5%]" />
            </div>
            <div className="max-w-[90%] xs:max-w-[17rem]">
              <Lead>{familiar.body}</Lead>
            </div>
          </div>
        </div>
      </Container>
      <SectionSpacer size="md" />
    </section>
  );
}
