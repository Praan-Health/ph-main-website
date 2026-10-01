import { Img } from "@/components/ui/Img";
import { cn } from "@/lib/cn";
import {
  careTeam,
  conditions,
  hero,
  outcome,
  recovery,
  rootCause,
  safety,
  steps,
  testimonials,
  treatments,
  visit,
  whatIs,
  whoFor,
  whyPraan,
} from "@/content/clinics";
import { CallbackModal } from "./CallbackModal";
import { TestimonialGallery } from "./TestimonialGallery";
import { CardGrid, CheckList, ImgCard, V4CenteredHead, V4Eyebrow, V4Head, V4Heading, V4Media, V4P, V4Section, V4Wrap } from "./primitives";

export function ClinicsHero() {
  return (
    <section
      data-section="hero"
      className="relative flex flex-col items-stretch justify-center bg-white text-wrap bg-[linear-gradient(#fbf8f2bd_0%,#fbf8f2db_60%,#fbf8f2f7_100%),url(/images/hero-section-image.webp)] bg-cover bg-center bg-no-repeat"
    >
      <V4Wrap>
        <div className="flex flex-col items-center gap-6 text-center">
          <V4Eyebrow>{hero.eyebrow}</V4Eyebrow>
          <V4Heading as="h1" balance className="m-0 max-w-[20ch]">
            {hero.title}
          </V4Heading>
          <p className="m-0 max-w-[60ch] text-[1.2rem] leading-[1.6] opacity-85">{hero.lead}</p>
          {/* Empty button row (its only link is hidden on live) still adds a gap and 4px margin. */}
          <div aria-hidden="true" className="mt-1 flex" />
          <CallbackModal autoOpen />
        </div>
      </V4Wrap>
    </section>
  );
}

/** Two columns (1fr / 1.2fr) that stack below 768px. */
function TwoCol({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("grid grid-cols-1 items-start gap-10 sm:grid-cols-[1fr_1.2fr]", className)}>{children}</div>;
}

export function RootCause() {
  return (
    <V4Section name="root-cause" tone="cream">
      <TwoCol>
        <V4Head>
          <V4Eyebrow>{rootCause.eyebrow}</V4Eyebrow>
          <V4Heading>{rootCause.heading}</V4Heading>
        </V4Head>
        <div>
          {rootCause.paragraphs.map((p) => (
            <V4P key={p}>{p}</V4P>
          ))}
        </div>
      </TwoCol>
    </V4Section>
  );
}

export function Testimonials() {
  return (
    <V4Section name="testimonials" tone="mint">
      <V4CenteredHead eyebrow={testimonials.eyebrow} heading={testimonials.heading} sub={testimonials.sub} />
      <TestimonialGallery videos={testimonials.videos} />
    </V4Section>
  );
}

export function WhatIs() {
  return (
    <V4Section name="what-is" after={<V4Media image={whatIs.image} />}>
      <V4CenteredHead eyebrow={whatIs.eyebrow} heading={whatIs.heading} sub={whatIs.sub} />
      <CheckList items={whatIs.checks} />
    </V4Section>
  );
}

export function Treatments() {
  return (
    <V4Section name="treatments">
      <V4CenteredHead eyebrow={treatments.eyebrow} heading={treatments.heading} sub={treatments.sub} />
      <CardGrid>
        {treatments.cards.map((card) => (
          <ImgCard key={card.title} card={card} />
        ))}
      </CardGrid>
    </V4Section>
  );
}

export function WhoFor() {
  return (
    <V4Section name="who-for">
      <TwoCol>
        <V4Head>
          <V4Eyebrow>{whoFor.eyebrow}</V4Eyebrow>
          <V4Heading>{whoFor.heading}</V4Heading>
          <V4P>{whoFor.body}</V4P>
        </V4Head>
        <div>
          <div className="mb-5 text-[1.2rem] font-semibold text-navy-900">{whoFor.subhead}</div>
          <CheckList items={whoFor.checks} single />
        </div>
      </TwoCol>
    </V4Section>
  );
}

export function Conditions() {
  return (
    <V4Section name="conditions" tone="mint">
      <V4CenteredHead eyebrow={conditions.eyebrow} heading={conditions.heading} sub={conditions.sub} />
      <CardGrid>
        {conditions.cards.map((card) => (
          <div key={card.title} className="flex h-full flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_2px_8px_#1414280f]">
            <div className="relative h-[150px] w-full overflow-hidden bg-teal-50">
              <Img src={card.image.src} alt={card.image.alt} fill sizes="(max-width: 767px) calc(100vw - 2.5rem), 355px" className="block object-cover" />
            </div>
            <div className="flex grow flex-col gap-y-2 px-[1.3rem] pt-[1.15rem] pb-6">
              <h3 className="m-0 text-[1.1rem] leading-[1.3] font-semibold tracking-heading text-balance text-navy-900">{card.title}</h3>
              <p className="m-0 text-[0.95rem] leading-[1.5] text-gray-650">{card.text}</p>
            </div>
          </div>
        ))}
      </CardGrid>
    </V4Section>
  );
}

export function Steps() {
  return (
    <V4Section name="steps">
      <V4CenteredHead eyebrow={steps.eyebrow} heading={steps.heading} sub={steps.sub} />
      <CardGrid>
        {steps.cards.map((card) => (
          <ImgCard key={card.title} card={card} />
        ))}
      </CardGrid>
    </V4Section>
  );
}

export function Outcome() {
  return (
    <V4Section name="outcome" after={<V4Media image={outcome.image} />}>
      <V4CenteredHead eyebrow={outcome.eyebrow} heading={outcome.heading} sub={outcome.sub} />
      <CheckList items={outcome.checks} />
    </V4Section>
  );
}

export function WhyPraan() {
  return (
    <V4Section name="why-praan">
      <V4CenteredHead eyebrow={whyPraan.eyebrow} heading={whyPraan.heading} sub={whyPraan.sub} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
        {whyPraan.features.map((f, i) => (
          <div key={f.title} className={cn("flex flex-col gap-2 rounded-lg p-6", i % 2 === 0 ? "bg-peach-50" : "bg-teal-75")}>
            <div className="font-semibold text-navy-900">{f.title}</div>
            <p className="m-0 text-[0.97rem] leading-[1.6] opacity-80">{f.text}</p>
          </div>
        ))}
      </div>
    </V4Section>
  );
}

export function CareTeam() {
  return (
    <V4Section name="care-team" tone="cream">
      <div className="flex flex-col items-center gap-y-[1.1rem] text-center">
        <V4Eyebrow>{careTeam.eyebrow}</V4Eyebrow>
        <div className="my-3 w-full max-w-[52rem] overflow-hidden rounded-[20px] shadow-[0_2px_14px_#1414280f]">
          <Img
            src={careTeam.image.src}
            width={careTeam.image.width}
            height={careTeam.image.height}
            alt={careTeam.image.alt}
            sizes="(max-width: 900px) calc(100vw - 2.5rem), 832px"
            className="block w-full object-cover object-center"
            style={{ aspectRatio: "3 / 2" }}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-[0.7rem]">
          {careTeam.specialists.map((s) => (
            <span key={s.label} className={cn("rounded-[100px] px-[1.2rem] py-[0.6rem] text-base font-semibold text-navy-900", s.teal ? "bg-teal-75" : "bg-peach-50")}>
              {s.label}
            </span>
          ))}
        </div>
        <p className="m-0 max-w-[52ch] text-[1.02rem] leading-[1.55] text-gray-650">{careTeam.note}</p>
      </div>
    </V4Section>
  );
}

export function Recovery() {
  return (
    <V4Section name="recovery">
      <V4CenteredHead eyebrow={recovery.eyebrow} heading={recovery.heading} sub={recovery.sub} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
        {recovery.cards.map((c) => (
          <div key={c.title} className="flex flex-col gap-y-[0.6rem] rounded-lg bg-white p-[1.6rem] shadow-[0_2px_8px_#1414280d]">
            <div aria-hidden="true" className={cn("flex size-12 items-center justify-center rounded-[100px] text-[1.4rem]", c.teal ? "bg-teal-100" : "bg-peach-100")}>
              {c.icon}
            </div>
            <h3 className="m-0 text-[1.1rem] leading-[1.2] font-semibold tracking-heading text-balance text-navy-900">{c.title}</h3>
            <p className="m-0 text-[0.95rem] leading-[1.5] text-gray-650">{c.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 mb-5 text-[1.2rem] font-semibold text-navy-900">{recovery.timelineHeading}</div>
      <ol className="mt-4 grid list-none grid-cols-1 gap-y-5 rounded-[20px] bg-white px-8 pt-9 pb-7 shadow-[0_2px_14px_#1414280d] sm:grid-cols-2 md:grid-cols-4">
        {recovery.timeline.map((step, i) => (
          <li key={step.phase} className="flex flex-col gap-y-2 pr-5">
            <div className="relative mb-[0.4rem] flex items-center">
              <div className="flex size-10 flex-none items-center justify-center rounded-[100px] bg-orange-500 font-bold text-white">{i + 1}</div>
              <div aria-hidden="true" className={cn("h-[2px] flex-auto max-sm:hidden", i < recovery.timeline.length - 1 ? "bg-sand" : "bg-transparent")} />
            </div>
            <div className="self-start rounded-[100px] bg-peach-100 px-[0.6rem] py-1 text-[0.72rem] font-semibold tracking-[0.04em] text-orange-500 uppercase">{step.when}</div>
            <div className="text-[1.05rem] font-semibold text-navy-900">{step.phase}</div>
            <div className="text-[0.92rem] leading-[1.5] text-gray-650">{step.desc}</div>
          </li>
        ))}
      </ol>
    </V4Section>
  );
}

export function Safety() {
  return (
    <V4Section name="safety" after={<V4Media image={safety.image} />}>
      <div className="rounded-[20px] bg-teal-75 p-[clamp(1.5rem,4vw,2.75rem)]">
        <TwoCol>
          <V4Head flush>
            <V4Eyebrow>{safety.eyebrow}</V4Eyebrow>
            <V4Heading>{safety.heading}</V4Heading>
          </V4Head>
          <div>
            {safety.paragraphs.map((p, i) => (
              <V4P key={p} last={i === safety.paragraphs.length - 1}>
                {p}
              </V4P>
            ))}
          </div>
        </TwoCol>
      </div>
    </V4Section>
  );
}

export function VisitClinic() {
  return (
    <V4Section name="visit" tone="cream">
      <V4Head center>
        <V4Eyebrow>{visit.eyebrow}</V4Eyebrow>
        <V4Heading>{visit.heading}</V4Heading>
      </V4Head>
      <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_2px_14px_#1414280d]">
        <iframe
          src={visit.mapSrc}
          title={visit.mapTitle}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="block h-[420px] w-full border-0"
        />
        <div className="flex items-center justify-between gap-x-4 bg-white px-5 py-4">
          <span className="text-[0.95rem] text-gray-650">{visit.address}</span>
          <a href={visit.directions.href} rel="noopener" className="font-semibold whitespace-nowrap text-orange-500">
            {visit.directions.label}
          </a>
        </div>
      </div>
    </V4Section>
  );
}

