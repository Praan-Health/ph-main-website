import { Container } from "@/components/ui/Container";
import { Img } from "@/components/ui/Img";
import { Eyebrow, Lead, SectionHeading, SectionSpacer } from "@/components/ui/typography";
import { CountUp } from "@/components/home/CountUp";
import { cn } from "@/lib/cn";
import { aboutHero, approach, featured, impact, medicalTeam } from "@/content/about";
import { HeroHeading, PageHero } from "./PageHero";
import { PetalFan } from "./icons";
import styles from "./about.module.css";

const sectionClass = "relative flex flex-col items-stretch justify-center bg-white text-slate-600";

/** Breadcrumbs and the "Building continuous care for every home" photo banner. */
export function AboutHero() {
  return (
    <PageHero
      section="about-hero"
      breadcrumb={aboutHero.breadcrumb}
      backgroundClassName="bg-[url(/images/about-mobile.webp)] bg-position-[50%_0] xs:bg-[url(/images/about-desktop.webp)] lg:bg-[url(/images/about-hero.webp)]"
      textClassName="max-w-[26.94rem]"
    >
      <HeroHeading>{aboutHero.heading}</HeroHeading>
      <div>{aboutHero.body}</div>
    </PageHero>
  );
}

/** "Our approach": heading beside three photo cards (who we are / what we do / how we do it). */
export function Approach() {
  return (
    <section data-section="about-approach" className={cn(sectionClass, "overflow-hidden")}>
      <SectionSpacer size="md" />
      <Container>
        <div className="mr-auto flex w-full flex-col items-center justify-start md:flex-row md:items-stretch md:justify-between lg:gap-8">
          <div className="relative z-[99] order-[-9999] mx-auto flex w-full max-w-[20.88rem] flex-col items-center justify-start gap-6 text-center md:order-none md:mx-0 md:items-start md:text-left lg:min-w-[19.7rem]">
            <div className="pointer-events-none absolute -bottom-[18.5rem] -left-20 hidden h-[40rem] w-[30rem] flex-col items-center justify-center md:flex xl:-bottom-[17rem] xl:h-[35rem] xl:w-[25rem]">
              <PetalFan className="size-full" />
            </div>
            <Eyebrow>{approach.eyebrow}</Eyebrow>
            <div className="relative">
              <SectionHeading>{approach.heading}</SectionHeading>
            </div>
          </div>
          <div className="flex w-full flex-col items-start justify-start gap-6 pt-6 xs:flex-row xs:gap-x-4 xs:gap-y-0 md:pt-0">
            {approach.cards.map((card) => (
              <div
                key={card.title}
                style={{ backgroundImage: `url(${card.image})` }}
                className="relative flex h-[23.94rem] w-full flex-col items-start justify-end gap-y-3 overflow-hidden rounded-[28px] border border-slate-200 bg-linen bg-size-[100%] bg-position-[50%_0] bg-no-repeat p-4 max-xs:bg-cover lg:min-w-[15.2rem]"
              >
                <h3 className="trim-off text-[1.5rem] leading-[1.1] font-medium tracking-[-0.03em]">{card.title}</h3>
                <div className="text-[0.88rem] xs:text-base">{card.body}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
      <SectionSpacer size="md" />
    </section>
  );
}

/** Centred h2 (with an optional line below) used by the impact and press sections. */
function CenteredHeading({ children, below }: { children: React.ReactNode; below?: React.ReactNode }) {
  return (
    <div className="mr-auto flex w-full flex-col items-center justify-center text-center">
      <div className="relative z-[99] mx-auto flex w-full max-w-[27.13rem] flex-col items-center justify-start gap-6 text-center lg:max-w-[28.38rem] lg:min-w-[28.38rem]">
        <div className="relative">
          <SectionHeading>{children}</SectionHeading>
        </div>
        {below}
      </div>
    </div>
  );
}

/** "Our Impact": four outcome stats with count-up numbers. */
export function Impact() {
  return (
    <section data-section="about-impact" className={cn(sectionClass, "overflow-hidden")}>
      <SectionSpacer size="md" />
      <Container>
        <CenteredHeading below={<Lead className="!text-balance">{impact.body}</Lead>}>{impact.heading}</CenteredHeading>
        <div className="mt-6 grid grid-cols-2 gap-x-[1.56rem] gap-y-[1.38rem] xs:gap-4">
          {impact.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex h-full w-full flex-col items-start justify-start gap-x-6 gap-y-4 overflow-hidden rounded-lg border border-slate-200 p-[0.88rem] xs:h-auto xs:flex-row xs:items-center xs:rounded-[12px] xs:p-[1.13rem]"
            >
              <div className="flex flex-[0_auto] items-center justify-start gap-x-[0.38rem]">
                <div className="max-w-[3rem] min-w-[3rem] text-[1.5rem] leading-[1.2] font-medium tracking-[-0.03em] text-navy-700 capitalize xs:max-w-[5.31rem] xs:min-w-auto xs:text-[42px] md:min-w-[5.31rem]">
                  <CountUp initial={stat.target} target={stat.target} />
                  {stat.suffix}
                </div>
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element -- small decorative SVG */}
                  <img src={impact.arrow.src} width={impact.arrow.width} height={impact.arrow.height} alt="" loading="lazy" className="inline-block size-5 min-h-5 min-w-5 align-middle" />
                </div>
              </div>
              <div className="hidden h-[1.81rem] min-h-[1.81rem] w-[0.13rem] min-w-[0.13rem] flex-col rounded-[0.63rem] bg-teal-400 xs:flex max-md:h-full" />
              <div className="flex w-full max-w-[18.13rem] items-center justify-start gap-x-1">
                <div className="text-[0.75rem] leading-[1.5] tracking-[-0.005em] text-slate-600 xs:text-[1.13rem]">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <SectionSpacer size="md" />
    </section>
  );
}

/** "From our medical team": intro beside the Chief Medical Officer's navy quote card. */
export function MedicalTeam() {
  const { doctor } = medicalTeam;
  return (
    <section data-section="about-medical-team" className={sectionClass}>
      <SectionSpacer size="md" />
      <Container>
        <div className="mr-auto flex w-full flex-col items-center justify-between gap-8 md:flex-row">
          <div className="relative z-[99] order-[-9999] mx-auto flex w-full max-w-[32.19rem] flex-col items-center justify-start gap-6 text-center md:order-none md:mx-0 md:min-w-[32.19rem] md:items-start md:text-left">
            <Eyebrow>{medicalTeam.eyebrow}</Eyebrow>
            <div className="relative">
              <SectionHeading>{medicalTeam.heading}</SectionHeading>
            </div>
            <div className="max-w-[28.63rem]">
              <p className="text-slate-600">{medicalTeam.body}</p>
            </div>
          </div>
          <div className="flex w-full max-w-[28.69rem] flex-col items-start justify-start gap-y-[14px] rounded-[28px] bg-navy-700 p-6 font-sans text-slate-100 lg:min-w-[28.69rem]">
            <div className="flex w-full items-start justify-start gap-x-[14px]">
              <Img
                src={doctor.image.src}
                width={doctor.image.width}
                height={doctor.image.height}
                alt={doctor.name}
                sizes="65px"
                className="aspect-square w-[4.06rem] rounded-full object-cover"
              />
              <div className="flex w-full flex-col items-start justify-start gap-y-[6px]">
                <div className="text-[0.75rem] text-teal-400">{doctor.role}</div>
                <div className="text-[1.13rem] xs:text-[1.5rem]">{doctor.name}</div>
              </div>
            </div>
            <div className="text-[0.88rem] leading-[1.5] xs:text-base">{doctor.quote}</div>
          </div>
        </div>
      </Container>
      <SectionSpacer size="md" />
    </section>
  );
}

/** "Featured & Recognized": publication logos scrolling left forever (paused on hover). */
export function Featured() {
  // Three identical rows each slide left by their own width, so the strip loops seamlessly.
  const rows = [0, 1, 2];
  return (
    <section data-section="about-featured" className={sectionClass}>
      <SectionSpacer size="md" />
      <div className="relative mx-auto flex w-full max-w-(--container-main) flex-col justify-center">
        <CenteredHeading below={<p className="text-[0.75rem] font-medium text-navy-700">{featured.caption}</p>}>{featured.heading}</CenteredHeading>
        <div className={cn(styles.logos, "relative flex pt-6")}>
          {rows.map((row) => (
            <div key={row} aria-hidden={row > 0 || undefined} className={cn(styles.logoRow, "flex flex-none items-center gap-4 pl-4 xs:gap-6 xs:pl-6")}>
              {featured.logos.map((logo) => (
                <Img
                  key={logo.src}
                  src={logo.src}
                  width={logo.width}
                  height={logo.height}
                  alt={row > 0 ? "" : logo.alt}
                  sizes={`${Math.round((logo.width / logo.height) * 72)}px`}
                  loading="eager"
                  className="h-[4.5rem] w-auto max-w-none flex-none opacity-100 xs:opacity-40 xs:hover:opacity-100"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <SectionSpacer size="md" />
    </section>
  );
}
