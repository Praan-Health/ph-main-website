import { Fragment } from "react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { Eyebrow, Lead, SectionHeading, SectionSpacer } from "@/components/ui/typography";
import { DoctorCard } from "@/components/team/DoctorCard";
import { careTeam } from "@/content/doctors";
import { getPatientStory } from "@/content/stories";
import { conditionIndex, conditions } from "@/content/conditions";
import { cn } from "@/lib/cn";
import { Breadcrumbs } from "./Breadcrumbs";
import { ConditionSearch } from "./ConditionSearch";
import { ConditionSlider } from "./ConditionSlider";
import { FlowerBig, FlowerLeft, FlowerRight } from "./icons";

const { hero, list, expert, steps, help, journey, team } = conditionIndex;

/** Joins lines with <br>, as the live copy does. */
function Lines({ lines }: { lines: string[] }) {
  return lines.map((line, i) => (
    <Fragment key={line}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));
}

export function IndexHero() {
  return (
    <section data-section="condition-index-hero" className="relative flex flex-col items-stretch justify-center bg-white">
      <div aria-hidden="true" className="h-(--spacing-margin)" />
      <Container>
        <Breadcrumbs trail={[{ label: "Protocols", href: "/protocols" }]} current="Conditions" />
        <div className="mt-6 flex min-h-[27.19rem] items-end justify-center rounded-[1.75rem] bg-[url(/images/mobile-condition.webp)] bg-cover bg-right-bottom bg-no-repeat p-[2.2rem] text-center text-white xs:mt-7 xs:min-h-[18.31rem] xs:items-center xs:justify-start xs:bg-[url(/images/condition-listing.webp)] xs:text-left sm:p-[2.63rem]">
          <div className="flex max-w-[34.38rem] flex-col items-stretch justify-start gap-6 xs:items-start">
            <h1 className="text-(length:--text-fluid-h2) leading-[1.2] font-normal tracking-heading capitalize">{hero.heading}</h1>
            <div className="mx-auto max-w-[17.25rem] xs:mx-0">
              <div className="text-slate-100">{hero.body}</div>
            </div>
          </div>
        </div>
      </Container>
      <SectionSpacer size="md" />
    </section>
  );
}

/** "Common Conditions": searchable list of every condition page. */
export function IndexList() {
  return (
    <section data-section="condition-index-list" className="relative flex flex-col items-stretch justify-center bg-white">
      <SectionSpacer size="md" />
      <Container>
        <div className="relative flex flex-col items-center justify-start gap-6 text-center">
          <div className="relative z-[99] flex w-full max-w-[27.13rem] flex-col items-center justify-start gap-6 max-md:mx-auto lg:max-w-[28.38rem] lg:min-w-[28.38rem]">
            <SectionHeading className="text-balance">{list.heading}</SectionHeading>
          </div>
          <ConditionSearch
            items={conditions.map(({ slug, name, icon }) => ({ slug, name, icon }))}
            placeholder={list.searchPlaceholder}
            empty={list.empty}
          />
        </div>
      </Container>
      <SectionSpacer size="md" />
      <FlowerLeft className="pointer-events-none absolute -bottom-[60%] -left-[30%] z-1 hidden h-[47.625rem] w-[47.9375rem] sm:block lg:-left-[20%]" />
      <FlowerRight className="pointer-events-none absolute -right-[15%] -bottom-[60%] hidden h-[47.625rem] w-[47.9375rem] sm:block xl:-right-[10%]" />
    </section>
  );
}

/** "Not sure where you fit?" navy card. */
export function IndexExpert() {
  return (
    <section data-section="condition-index-expert" className="relative flex flex-col items-stretch justify-center overflow-hidden bg-white">
      <Container>
        <div className="rounded-[1.75rem] bg-[#303880] bg-[url(/images/banner-big.webp)] bg-cover bg-center px-[1.13rem] pt-8 pb-[1.13rem] text-center text-base font-normal text-white xs:p-16">
          <div className="mx-auto flex flex-col items-center justify-center gap-6 text-center max-xs:w-full">
            <div className="relative z-1 max-xs:flex max-xs:flex-col max-xs:items-start max-xs:justify-center">
              <h2 className="max-w-[35rem] text-(length:--text-fluid-h2) leading-none font-medium tracking-heading text-balance">
                <div className="text-[2.25rem] leading-[1.1] font-medium tracking-[-0.03em] text-white">{expert.heading}</div>
              </h2>
            </div>
            <div className="mx-auto max-w-[25.25rem]">
              <div>{expert.body}</div>
            </div>
            <ButtonLink href={expert.button.href} target="_blank" className="whitespace-nowrap max-xs:w-full">
              <div>{expert.button.label}</div>
            </ButtonLink>
          </div>
        </div>
      </Container>
      <SectionSpacer size="md" />
    </section>
  );
}

/** "How Care Begins": four numbered steps in a linen stepper card. */
export function IndexSteps() {
  return (
    <section data-section="condition-index-steps" className="relative flex flex-col items-stretch justify-center overflow-hidden bg-white">
      <SectionSpacer size="md" />
      <Container>
        <div className="mr-auto flex w-full items-stretch justify-between gap-16 max-md:flex-col max-md:items-center max-md:justify-start max-md:gap-12 max-xs:gap-6">
          <div className="relative z-[99] flex w-full max-w-[20.31rem] min-w-[20.31rem] flex-col items-start justify-start gap-6 max-md:order-first max-md:mx-auto max-md:items-center max-md:text-center">
            <Eyebrow>{steps.eyebrow}</Eyebrow>
            <div className="relative">
              <SectionHeading>{steps.heading}</SectionHeading>
            </div>
            <div>
              <Lead>{steps.body}</Lead>
            </div>
            <FlowerBig className="pointer-events-none absolute -bottom-[18.5rem] -left-[3.3rem] hidden h-[40rem] w-[35rem] xs:flex lg:h-[45rem] lg:w-[40rem]" />
          </div>
          <div className="w-full max-w-[37.88rem] flex-1 overflow-hidden rounded-[1.75rem]">
            {steps.items.map((step, i) => {
              const first = i === 0;
              const last = i === steps.items.length - 1;
              return (
                <div
                  key={step.title}
                  className={cn(
                    "flex w-full items-start justify-start gap-4 bg-linen p-7 shadow-[0_0_26.7px_#fd711829]",
                    first && "rounded-t-[1.75rem]",
                    last ? "z-4 overflow-hidden rounded-b-[1.75rem]" : "overflow-visible",
                  )}
                >
                  <div className="relative flex size-6 flex-col items-center justify-center gap-y-2.5 rounded-full bg-orange-500 max-xs:min-h-6 max-xs:min-w-6">
                    <div className="text-[14px] leading-[1.5] font-normal tracking-[-0.005em] text-white">{i + 1}</div>
                    {!last && (
                      <div className="absolute inset-x-0 top-6 mx-auto flex h-[6.5rem] w-px flex-col items-center justify-center border-r border-[#ffe3d1] max-xs:h-[8.3rem]" />
                    )}
                  </div>
                  <div className="flex w-full flex-col items-start justify-start gap-y-1">
                    <div className="w-full text-[18px] leading-[1.5] font-medium tracking-[-0.005em] text-navy-700">{step.title}</div>
                    <div className="w-full text-[.88rem] leading-[1.5] font-normal tracking-[-0.01em] text-navy-700 opacity-70">{step.body}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
      <SectionSpacer size="md" />
    </section>
  );
}

type HelpCard = { title: string[]; body: string[]; image: string };

/** A "how-it-work_card": title and note over a photo. */
function HelpCardView({ card, phone }: { card: HelpCard; phone?: boolean }) {
  return (
    <div
      className={cn(
        "relative flex h-52 flex-col items-start justify-start gap-4 overflow-clip rounded-[1.13rem] bg-linen p-6 max-sm:min-w-[20rem] max-xs:h-[17.25rem] max-xs:max-w-[20rem] max-xs:p-4",
      )}
    >
      <h3 className="relative z-1 text-2xl leading-[1.2] font-medium tracking-heading text-balance text-navy-700">
        <Lines lines={card.title} />
      </h3>
      <div className="relative z-1 max-w-[71%] max-xs:max-w-full">
        <p className="text-[.88rem] xs:text-base">
          <Lines lines={card.body} />
        </p>
      </div>
      <div className="absolute inset-0 size-full overflow-clip bg-[color-mix(in_lab,currentcolor_10%,transparent)]">
        <Img
          src={card.image}
          alt=""
          width={phone ? 480 : 656}
          height={phone ? 401 : 416}
          sizes="20rem"
          className={cn("absolute inset-0 block size-full object-cover", phone && "object-[50%_100%]")}
        />
      </div>
    </div>
  );
}

/** "Care that adapts to your family": 2×2 photo cards (a slider on phones). */
export function IndexHelp() {
  return (
    <section data-section="condition-index-help" className="relative flex flex-col items-stretch justify-center bg-white">
      <SectionSpacer size="md" />
      <Container className="max-sm:w-full">
        <div className="grid grid-cols-[1.2fr_2fr] gap-10 max-sm:flex max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-start max-sm:gap-6 lg:gap-12">
          <div className="relative flex flex-col items-start justify-start gap-6 max-sm:items-center max-sm:text-center">
            <Eyebrow>{help.eyebrow}</Eyebrow>
            <div className="relative">
              <div className="max-xs:max-w-[15.75rem]">
                <SectionHeading className="text-balance">{help.heading}</SectionHeading>
              </div>
            </div>
            <div className="max-w-[21.5rem]">
              <Lead>{help.body}</Lead>
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-[auto_auto] gap-6 max-sm:flex max-sm:w-full max-sm:items-center max-sm:justify-start max-sm:overflow-scroll max-sm:px-5 max-xs:hidden">
            {help.cards.map((card) => (
              <HelpCardView key={card.image} card={card} />
            ))}
          </div>
          <div className="hidden w-full max-xs:block">
            <div className="relative w-full px-5">
              <ConditionSlider
                label="How we can help"
                slideClassName="!w-[20rem] min-w-[20rem] max-w-[20rem]"
                maskClassName="max-w-[20rem]"
                hideArrowsOnPhone
              >
                {help.slides.map((card) => (
                  <HelpCardView key={card.image} card={card} phone />
                ))}
              </ConditionSlider>
            </div>
          </div>
        </div>
      </Container>
      <SectionSpacer size="md" />
    </section>
  );
}

/** Featured patient journey: photo with the white summary card overlapping it. */
export function IndexJourney() {
  const story = getPatientStory(journey.story);
  const name = story?.name ?? "Chandrasekhar M";
  const age = story?.age ?? 73;
  return (
    <section data-section="condition-index-journey" className="relative flex flex-col items-stretch justify-center bg-white">
      <SectionSpacer size="md" />
      <Container>
        <div className="flex flex-col gap-6">
          <div className="relative flex items-center justify-between overflow-clip rounded-[1.13rem] bg-white max-md:flex-col xs:rounded-[1.75rem]">
            <Img
              src={journey.image.src}
              alt=""
              width={journey.image.width}
              height={journey.image.height}
              sizes="(max-width: 991px) 100vw, 42rem"
              className="static h-auto w-full max-w-none object-cover sm:max-md:max-w-full md:absolute md:inset-y-0 md:left-0 md:h-full md:max-w-[60%]"
            />
            <div className="relative z-11 ml-auto flex w-full flex-col items-start justify-start gap-y-6 overflow-hidden rounded-[1.75rem] bg-white p-[1.13rem] max-md:-mt-16 xs:gap-y-3 xs:p-7 sm:min-w-[35.81rem] md:max-w-[35.84rem]">
              <div className="flex flex-col items-start justify-start gap-4 xs:gap-3">
                <div className="flex items-center justify-start gap-[6px]">
                  <div className="text-[.75rem] font-medium">Currently on</div>
                  <div className="flex max-h-[1.19rem] min-h-[1.19rem] items-center justify-center gap-[10px] rounded-[32px] bg-orange-500 bg-[linear-gradient(#ffffffb3,#ffffffb3)] px-[10px] py-[6px]">
                    <div className="text-center text-[10px] leading-[1.5] font-medium tracking-[-0.005em] text-navy-700">{journey.week}</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-[10px]">
                  <div className="text-center text-2xl leading-[1.1] font-medium tracking-[-0.005em] text-navy-700">{name}</div>
                  <div className="flex items-center justify-start gap-[.31rem]">
                    <div className="text-center text-[24px] leading-[1.1] font-medium tracking-[-0.005em] text-slate-600">{age}</div>
                    <div className="text-center text-[24px] leading-[1.1] font-medium tracking-[-0.005em] text-slate-600">yrs</div>
                  </div>
                </div>
                <div className="text-base leading-[1.5] text-slate-600">{journey.heading}</div>
              </div>
              <div>
                <div className="flex w-full flex-wrap items-start justify-start gap-2">
                  {journey.conditions.map((condition) => (
                    <div key={condition} className="flex max-h-6 min-h-6 items-center justify-center gap-[.63rem] rounded-[32px] border border-orange-500 px-[10px] py-2">
                      <div className="text-[.75rem]">{condition}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex w-full flex-col items-start justify-center gap-y-4">
                <div className="text-[14px] font-medium text-navy-700">Improvement Data</div>
                <div className="grid w-full grid-cols-2 items-start justify-start gap-x-[.69rem] gap-y-4">
                  {journey.metrics.map((metric, i) => (
                    <div
                      key={metric.label}
                      className={cn(
                        "flex w-full flex-col items-start justify-start gap-y-[.88rem] overflow-hidden rounded-[8px] border border-slate-200 px-[.88rem] pt-[.63rem] max-xs:h-[8.5rem] max-xs:max-h-[8.5rem] max-xs:pl-0",
                        i === 1 && "h-full",
                      )}
                    >
                      <div className="flex items-center justify-start gap-[6px]">
                        <div className="max-w-[5.81rem] min-w-[5.81rem] text-2xl leading-[1.1] font-medium tracking-[-0.03em] text-navy-700 max-xs:min-w-[4.8rem] max-xs:pl-[.88rem] xs:text-[36px]">
                          {metric.value}
                        </div>
                        {metric.up && (
                          // eslint-disable-next-line @next/next/no-img-element -- tiny static SVG icon
                          <img src="/images/vector-6.svg" alt="" loading="lazy" className="min-h-5 min-w-5 object-contain p-[1.8px] max-xs:max-h-5" />
                        )}
                      </div>
                      <div className="text-[.75rem] max-xs:pl-[.88rem]">{metric.label}</div>
                      <Img
                        src={metric.desktop.src}
                        alt=""
                        width={metric.desktop.width}
                        height={metric.desktop.height}
                        sizes="14rem"
                        className="hidden h-auto w-full min-w-full xs:block"
                      />
                      <Img
                        src={metric.mobile.src}
                        alt=""
                        width={metric.mobile.width}
                        height={metric.mobile.height}
                        sizes="9rem"
                        className="block h-auto w-full min-w-full xs:hidden"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[.88rem] xs:text-base">
                  <p>{journey.body}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <SectionSpacer size="md" />
    </section>
  );
}

/** "Led by a Team That Cares": the care team slider. */
export function IndexTeam() {
  return (
    <section data-section="condition-index-team" className="relative mx-auto flex w-full max-w-[82rem] flex-col items-stretch justify-center bg-white">
      <SectionSpacer size="md" />
      <div>
        <div className="mx-auto grid max-w-[90rem] grid-cols-[minmax(385px,385px)_1fr] [place-items:start_stretch] gap-4 pl-12 max-md:flex max-md:flex-col max-md:gap-6 max-md:px-0 lg:pl-24">
          <div className="relative z-[99] flex w-full max-w-[27.13rem] flex-col items-start justify-start gap-6 max-md:order-first max-md:mx-auto max-md:max-w-[30rem] max-md:items-center max-md:px-5 max-md:text-center lg:max-w-[28.38rem] lg:min-w-[28.38rem]">
            <Eyebrow>{team.eyebrow}</Eyebrow>
            <div className="relative">
              <SectionHeading className="text-balance">{team.heading}</SectionHeading>
            </div>
            <div className="max-w-[17rem] max-xs:max-w-[90%]">
              <Lead className="!text-balance">{team.body}</Lead>
            </div>
          </div>
          <div className="relative flex w-full max-w-none flex-col gap-4 max-xs:z-[99]">
            <ConditionSlider
              label="Care team"
              className="max-w-[85rem] overflow-clip max-xs:flex max-xs:flex-col max-xs:items-center max-xs:justify-start"
              slideClassName="!w-[15.75rem] min-w-[15.75rem] max-w-[15.75rem] lg:!w-[13.75rem] lg:min-w-[13.75rem] lg:max-w-[13.75rem]"
              headerClassName="max-xs:flex-row max-xs:px-5"
              reviewClassName="max-xs:w-full"
              arrowsClassName="max-xs:w-full max-xs:min-w-full"
              dotsClassName="w-full max-xs:justify-center"
              hideArrowsOnPhone
            >
              {careTeam.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </ConditionSlider>
          </div>
        </div>
      </div>
      <SectionSpacer size="md" />
    </section>
  );
}
