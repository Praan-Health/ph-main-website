import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { SectionSpacer } from "@/components/ui/typography";
import { PraanMark } from "@/components/home/home-tail-icons";
import { cn } from "@/lib/cn";

const headingPart = "relative z-1 inline text-[2.38rem] leading-[1.1] font-normal capitalize xs:text-[3rem] md:text-[4rem]";

type CtaLink = { label: string; href: string; /** Opens in a new tab (default true). */ newTab?: boolean };

type CtaProps = {
  /** `data-section` value (used by the comparison tooling). */
  section: string;
  /** One phrase, or two phrases with the Praan mark between them (the Webflow component's base variant). */
  heading: string | readonly [string, string];
  body: string;
  /** Heading width (live "is-none" / "is-680px" / "is-745px"…). Defaults to 35rem with the mark, none without. */
  headingClassName?: string;
  /** A link, or a custom control such as a dialog trigger (a secondary button with `relative z-1`). */
  action: CtaLink | React.ReactNode;
  /** "cover" sizes the background from its aspect ratio (min 150% tall); "fill" stretches it to the section first. */
  imageFit?: "cover" | "fill";
};

/** The orange-gradient closing call to action ("cta" component on the live site), used on most pages. */
export function Cta({ section, heading, body, headingClassName, action, imageFit = "cover" }: CtaProps) {
  const withMark = typeof heading !== "string";
  return (
    <section data-section={section} className="relative flex flex-col items-stretch justify-center overflow-clip bg-white text-wrap text-white">
      <SectionSpacer size="sm" />
      <Container>
        <div className="relative mx-auto flex flex-col items-center justify-center gap-6 text-center xs:gap-9">
          <div className="relative z-1 max-xs:flex max-xs:flex-col max-xs:items-start max-xs:justify-center">
            <h2
              className={cn(
                "text-(length:--text-fluid-h2) leading-none font-medium tracking-heading text-balance",
                headingClassName ?? (withMark ? "max-w-[35rem]" : "max-w-none"),
              )}
            >
              {withMark ? (
                <>
                  <span className={headingPart}>{heading[0]}</span>
                  <span className="relative top-2 mx-[0.63rem] inline-block w-[1.88rem] scale-110 xs:top-[0.63rem] xs:w-8 md:w-12">
                    <PraanMark width="100%" height="100%" className="inline align-baseline" />
                  </span>
                  <span className={headingPart}>{heading[1]}</span>
                </>
              ) : (
                <span className={headingPart}>{heading}</span>
              )}
            </h2>
          </div>
          <div className="mx-auto max-w-[22rem]">
            <div className="relative z-1 !text-balance">{body}</div>
          </div>
          {isLink(action) ? (
            <ButtonLink
              href={action.href}
              {...(action.newTab === false ? {} : { target: "_blank", rel: "noopener" })}
              variant="secondary"
              className="relative z-1 whitespace-nowrap max-xs:w-full"
            >
              <div>{action.label}</div>
            </ButtonLink>
          ) : (
            action
          )}
        </div>
      </Container>
      {imageFit === "fill" ? (
        <Img src="/images/bg-orange-gradient.webp" alt="" fill sizes="100vw" className="pointer-events-none z-0 my-auto min-h-[150%] object-cover" />
      ) : (
        <Img
          src="/images/bg-orange-gradient.webp"
          width={2560}
          height={1366}
          alt=""
          sizes="100vw"
          className="pointer-events-none absolute inset-0 z-0 my-auto h-auto min-h-[150%] w-full max-w-full object-cover"
        />
      )}
      <SectionSpacer size="sm" />
    </section>
  );
}

function isLink(action: CtaProps["action"]): action is CtaLink {
  return typeof action === "object" && action !== null && "href" in action && "label" in action;
}
