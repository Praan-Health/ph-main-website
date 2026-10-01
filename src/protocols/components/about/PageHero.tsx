import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionSpacer } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import { ChevronRightIcon, HomeTileIcon } from "./icons";

/** Home tile › current page ("breadcrumbs-wrapper"). On /for-families live, the home tile is not a link. */
export function Breadcrumbs({ current, linkHome = true }: { current: string; linkHome?: boolean }) {
  const home = (
    <div className="flex size-6 min-w-6 flex-col items-center justify-center">
      <HomeTileIcon className="size-full" />
    </div>
  );
  return (
    <nav aria-label="Breadcrumb" className="flex w-full max-w-[354px] items-center justify-start gap-x-2">
      {linkHome ? (
        <Link href="/" aria-label="Home" className="inline-block max-w-full">
          {home}
        </Link>
      ) : (
        home
      )}
      <div className="flex size-3 min-w-3 flex-col items-center justify-center text-navy-700">
        <ChevronRightIcon className="size-full" />
      </div>
      <div aria-current="page" className="text-[0.875rem] font-medium text-navy-700">
        {current}
      </div>
    </nav>
  );
}

/**
 * Breadcrumbs above a rounded photo banner with the page title on the left ("clinic_wrapper" in the
 * Webflow build). On phones the text sits centred at the bottom of a taller portrait photo.
 * `backgroundClassName` carries the per-page photos and positions.
 */
export function PageHero({
  section,
  breadcrumb,
  linkHome,
  backgroundClassName,
  textClassName,
  children,
}: {
  section: string;
  breadcrumb: string;
  linkHome?: boolean;
  backgroundClassName: string;
  /** Width of the text column (clinic_text-wrap variant). */
  textClassName: string;
  children: React.ReactNode;
}) {
  return (
    <section data-section={section} className="relative flex flex-col items-stretch justify-center bg-white text-slate-600">
      <div aria-hidden="true" className="h-(--spacing-margin)" />
      <Container>
        <Breadcrumbs current={breadcrumb} linkHome={linkHome} />
        <div
          className={cn(
            "mt-7 flex min-h-[28.75rem] items-end justify-center rounded-[1.75rem] bg-cover bg-no-repeat p-[1.13rem] text-center text-white xs:min-h-[18.44rem] xs:items-center xs:justify-start xs:bg-position-[100%_100%] xs:p-[2.63rem] xs:text-left",
            backgroundClassName,
          )}
        >
          <div className={cn("flex flex-col items-stretch justify-start gap-6 text-center xs:items-start xs:text-left", textClassName)}>{children}</div>
        </div>
      </Container>
      <SectionSpacer size="md" />
    </section>
  );
}

/** The banner title: the site's h2 style, regular weight with 1.2 line height. */
export function HeroHeading({ className, ...rest }: React.ComponentProps<"h1">) {
  return <h1 className={cn("text-(length:--text-fluid-h2) leading-[1.2] font-normal tracking-heading capitalize", className)} {...rest} />;
}
