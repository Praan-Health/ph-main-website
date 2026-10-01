import { cn } from "@/lib/cn";

/** Small navy label above a section heading ("Sounds Familiar?"). */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex [justify-content:inherit]", className)}>
      <div className="inline-flex gap-fluid-3 align-baseline">
        <div className="text-[0.75rem] leading-[1.5] font-medium tracking-normal text-pretty text-navy-700 capitalize">
          <p>{children}</p>
        </div>
      </div>
    </div>
  );
}

/** Section heading: fluid 2–2.625rem, regular weight, navy, Title Case (as every h2 on the site renders). */
export function SectionHeading({ className, ...rest }: React.ComponentProps<"h2">) {
  return <h2 className={cn("text-(length:--text-fluid-h2) leading-[1.3] font-normal tracking-heading text-navy-700 capitalize", className)} {...rest} />;
}

/** Libre Baskerville italic phrase inside a heading. */
export function Accent({ className, ...rest }: React.ComponentProps<"span">) {
  return <span className={cn("font-serif italic", className)} {...rest} />;
}

/** Large body paragraph (18px; 14px on phones). */
export function Lead({ className, ...rest }: React.ComponentProps<"p">) {
  return <p className={cn("py-2 text-[0.88rem] leading-[1.5] tracking-normal text-pretty xs:text-[1.125rem]", className)} {...rest} />;
}

/** Vertical rhythm between sections, from the site's spacing scale. */
export function SectionSpacer({ size }: { size: "lg" | "md" | "sm" }) {
  const heights = { lg: "h-8 md:h-(--spacing-section-lg)", md: "h-8 md:h-16", sm: "h-8 xs:h-12" };
  return <div aria-hidden="true" className={heights[size]} />;
}
