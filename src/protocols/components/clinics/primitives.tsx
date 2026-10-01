import { Img } from "@/components/ui/Img";
import { cn } from "@/lib/cn";
import type { ClinicImage, ImgCardItem } from "@/content/clinics";

/*
 * Building blocks of the /clinics page, which Webflow built from a page-specific "v4-*" class set
 * (a u-section wrapping a u-container.v4-wrap, headed by a pill eyebrow and a regular-weight h2).
 */

const tones = { white: "bg-white", cream: "bg-cream", mint: "bg-teal-50" } as const;

/** u-section: full-width band; `after` renders below the container (the page's v4-media photos). */
export function V4Section({
  name,
  tone = "white",
  className,
  children,
  after,
}: {
  name: string;
  tone?: keyof typeof tones;
  className?: string;
  children: React.ReactNode;
  after?: React.ReactNode;
}) {
  return (
    <section data-section={name} className={cn("relative flex flex-col items-stretch justify-center text-wrap", tones[tone], className)}>
      <V4Wrap>{children}</V4Wrap>
      {after}
    </section>
  );
}

/** u-container.v4-wrap (a block container, not flex, with clamp(3rem, 7vw, 6rem) vertical padding). */
export function V4Wrap({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("relative mx-auto w-[calc(100%-var(--spacing-margin)*2)] max-w-(--container-main) py-[clamp(3rem,7vw,6rem)]", className)}>
      {children}
    </div>
  );
}

/** Orange uppercase pill above each heading (v4-eyebrow). */
export function V4Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("inline-block w-auto max-w-max rounded-[100px] bg-peach-100 px-[0.9rem] py-[0.4rem] text-[0.8rem] font-semibold tracking-[0.14em] text-orange-500 uppercase", className)}>
      {children}
    </div>
  );
}

/** h2.u-text-style-h2.u-weight-regular: fluid 32.6–42px, 1.2 line height, regular, slate text, Title Case. */
export function V4Heading({ className, as: Tag = "h2", balance, ...rest }: React.ComponentProps<"h2"> & { as?: "h1" | "h2"; balance?: boolean }) {
  return (
    <Tag
      className={cn("text-(length:--text-fluid-h2) leading-[1.2] font-normal tracking-heading capitalize", balance ? "text-balance" : "text-wrap", className)}
      {...rest}
    />
  );
}

/** v4-head: eyebrow + heading (+ sub) stack; `center` for the centred variant. */
export function V4Head({ center, flush, className, children }: { center?: boolean; flush?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex max-w-[60ch] flex-col gap-4", flush ? "mb-0" : "mb-10", center ? "mx-auto items-center text-center" : "items-start", className)}>
      {children}
    </div>
  );
}

export function V4Sub({ children }: { children: React.ReactNode }) {
  return <p className="m-0 text-[1.1rem] leading-[1.6] opacity-82">{children}</p>;
}

export function V4P({ children, last }: { children: React.ReactNode; last?: boolean }) {
  return <p className={cn("text-[1.05rem] leading-[1.7] opacity-85", last ? "mb-0" : "mb-4")}>{children}</p>;
}

/** Centred-head section header used by most sections. */
export function V4CenteredHead({ eyebrow, heading, sub }: { eyebrow: string; heading: string; sub?: string }) {
  return (
    <V4Head center>
      <V4Eyebrow>{eyebrow}</V4Eyebrow>
      <V4Heading>{heading}</V4Heading>
      {sub && <V4Sub>{sub}</V4Sub>}
    </V4Head>
  );
}

/** v4-check: two-column tick list (one column below 768px, or always with `single`). */
export function CheckList({ items, single }: { items: string[]; single?: boolean }) {
  return (
    <ul className={cn("m-0 grid list-none grid-cols-1 gap-x-6 gap-y-[0.85rem] p-0", !single && "sm:grid-cols-2")}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-[0.6rem] text-[1.02rem] leading-[1.5]">
          <span aria-hidden="true" className="mt-[0.1rem] inline-flex size-[1.4rem] flex-none items-center justify-center rounded-[100px] bg-teal-100 text-[0.78rem] font-bold text-teal-600">
            ✓
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

/** v4-media: a wide rounded photo under a section's container, capped at 400px tall. */
export function V4Media({ image }: { image: ClinicImage }) {
  return (
    <div className="mx-auto mt-8 w-full max-w-[64rem] px-5">
      <Img
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        sizes="(max-width: 1064px) calc(100vw - 2.5rem), 984px"
        className="block h-auto max-h-[400px] w-full rounded-[20px] object-cover"
      />
    </div>
  );
}

/** Responsive card grid: as many 280px+ columns as fit. */
export function CardGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">{children}</div>;
}

/** v4-imgcard: photo card with a dark gradient, an orange tag or step number, and white text at the bottom. */
export function ImgCard({ card }: { card: ImgCardItem }) {
  return (
    <div className="relative flex min-h-[17rem] flex-col justify-end overflow-hidden rounded-[18px]">
      <Img
        src={card.image.src}
        alt={card.image.alt}
        fill
        sizes="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1200px) 33vw, 355px"
        className="z-0 object-cover"
      />
      <div className="absolute inset-0 z-1 bg-[linear-gradient(#17141e0d_0%,#17141e59_45%,#17141ed1_100%)]" />
      {card.tag && (
        <div className="absolute top-4 left-4 z-2 rounded-[100px] bg-orange-500 px-[0.72rem] py-[0.32rem] text-[0.68rem] font-semibold tracking-[0.08em] text-white uppercase">
          {card.tag}
        </div>
      )}
      {card.num && (
        <div className="absolute top-4 left-4 z-2 flex size-[2.4rem] items-center justify-center rounded-[100px] bg-orange-500 font-bold text-white">{card.num}</div>
      )}
      <div className="relative z-2 flex flex-col gap-y-[0.4rem] p-[1.4rem]">
        <h3 className="m-0 text-[1.15rem] leading-[1.2] font-medium tracking-[-0.03375rem] text-balance text-white">{card.title}</h3>
        <p className="m-0 text-[0.95rem] leading-[1.5] text-white/90">{card.text}</p>
      </div>
    </div>
  );
}
