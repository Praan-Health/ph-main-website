import { Img } from "@/components/ui/Img";
import { useId } from "react";
import { Container } from "@/components/ui/Container";
import { buttonClasses } from "@/components/ui/Button";
import { RotatingWord } from "@/components/home/RotatingWord";
import { hero } from "@/content/home";

export function Hero() {
  const [upper, lower] = hero.bubbles;
  return (
    <section className="relative mx-auto flex w-full max-w-[100rem] flex-col items-stretch justify-center overflow-clip bg-white bg-[url(/images/home-hero-gradient.webp)] bg-cover bg-[60%] pt-12 pb-[30rem] text-slate-600 xs:bg-center md:py-[7.5rem]">
      <PhoneGlow />

      <Container className="z-1 max-xs:static max-xs:z-auto">
        <div className="mx-auto flex w-full max-w-[32.13rem] flex-col items-center justify-start text-center md:mx-0 md:items-start md:text-left">
          <div className="relative mx-auto text-center md:mr-auto md:ml-0">
            <h1 className="relative z-1 mx-auto flex flex-col items-center text-[2rem] leading-[1.4] font-normal tracking-heading text-balance text-navy-700 xs:flow-root xs:text-center xs:text-(length:--text-fluid-h1) xs:leading-none md:mr-auto md:ml-0 md:text-left">
              {hero.headingBefore}{" "}
              <RotatingWord
                words={hero.conditions}
                className="-top-[0.2rem] mb-[-0.3em] h-[3.63rem] items-center justify-center rounded-[0.56rem] py-2 pr-3 pl-0 text-center font-serif italic xs:top-[0.2rem] xs:mb-0 xs:h-[4.5rem] xs:justify-start xs:rounded-[0.63rem] xs:text-left"
              />{" "}
              {hero.headingAfter}
            </h1>
          </div>

          <div className="relative z-1 pt-6 xs:static xs:py-9">
            <div className="max-w-80 xs:max-w-[29.75rem]">
              <p className="py-2 text-[0.88rem] leading-[1.5] tracking-normal text-pretty xs:text-[1.125rem]">{hero.body}</p>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-6 z-10 mx-auto max-w-[90%] xs:static xs:mx-0 xs:max-w-none">
            <a href={hero.cta.href} className={buttonClasses("primary", "w-full whitespace-nowrap xs:w-auto")}>
              <div>{hero.cta.label}</div>
            </a>
          </div>
        </div>
      </Container>

      <div className="absolute inset-x-0 right-4 bottom-0 mx-auto h-auto w-full max-w-[21rem] xs:right-0 xs:max-w-[27rem] md:inset-x-auto md:right-0 md:mx-0 md:h-full md:w-[45%] md:max-w-[40.5rem] lg:w-[44%] lg:max-w-[30rem] xl:w-[35.63rem]">
        <Img
          src={hero.image.src}
          alt={hero.image.alt}
          width={hero.image.width}
          height={hero.image.height}
          priority
          sizes="(max-width: 479px) 21rem, (max-width: 991px) 27rem, 30rem"
          className="pointer-events-none relative -right-12 bottom-[34px] z-1 block h-auto w-full xs:-right-8 xs:bottom-0 lg:right-0 lg:scale-110"
        />
        <div className="absolute top-[19%] left-0 z-2 flex w-full max-w-48 animate-float-up flex-col items-start justify-start xs:top-[25%] xs:-left-[5%] xs:w-auto md:max-w-80 lg:-left-[27%]">
          <Img src={upper.src} alt={upper.alt} width={upper.width} height={upper.height} sizes="20rem" className="pointer-events-none h-auto w-full" />
        </div>
        <div className="absolute top-0 right-0 flex max-w-32 animate-float-down flex-col items-start justify-start xs:right-[10%] md:max-w-48 lg:right-[13%] xl:right-[15%]">
          <Img src={lower.src} alt={lower.alt} width={lower.width} height={lower.height} sizes="12rem" className="pointer-events-none h-auto w-full" />
        </div>
      </div>

      {/* White fade over the lower half of the image on tablets and phones. */}
      <div className="absolute inset-x-0 bottom-0 z-9 h-64 w-full bg-[linear-gradient(#0000,#ffffff80_54%,#fff_75%,#fff)] xs:h-[10.125rem] xs:bg-[linear-gradient(#0000,#ffffff80_42%,#fff_65%,#fff)] md:hidden" />
    </section>
  );
}

/** Soft white glow at the top of the hero on phones. */
function PhoneGlow() {
  // useId output contains characters that are not safe in an SVG url(#…) reference.
  const filterId = `glow-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg
      viewBox="0 0 390 435"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-[27.1875rem] w-full text-white xs:hidden"
    >
      <g filter={`url(#${filterId})`}>
        <ellipse cx="195" cy="86.5" rx="216" ry="212.5" fill="currentColor" />
      </g>
      <defs>
        <filter id={filterId} x="-156.508" y="-261.508" width="703.017" height="696.017" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="67.7542" result="blur" />
        </filter>
      </defs>
    </svg>
  );
}
