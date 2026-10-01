import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";

const base =
  "flex min-h-12 max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-[40px] border px-4 py-2 text-center text-[1.13rem] leading-[1.5] font-medium tracking-[-0.01em] transition-[transform,background-color,color] duration-[2s,200ms,200ms] active:scale-[0.93] xs:px-8";

const variants: Record<Variant, string> = {
  primary: "border-orange-500 bg-orange-500 text-white shadow-[0_3px_#fed7aa]",
  secondary: "border-orange-200 bg-white text-navy-700 shadow-[0_3px_#fd71181a]",
};

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

type ButtonProps = React.ComponentProps<"button"> & { variant?: Variant };

/** The site's pill button ("button_mains" in the Webflow build). */
export function Button({ variant = "primary", className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, className)} {...rest} />;
}

type ButtonLinkProps = React.ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({ variant = "primary", className, ...rest }: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, className)} {...rest} />;
}
