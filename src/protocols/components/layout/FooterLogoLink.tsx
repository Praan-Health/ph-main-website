"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * The logo sits as an inline image in a text line box (as on the live site). On the homepage the
 * link is "current", and Webflow shrinks that line box's font below 992px, which changes the
 * footer height by a fraction of a pixel. Reproduced so the footer matches on every page.
 */
export function FooterLogoLink({ children }: { children: React.ReactNode }) {
  const current = usePathname() === "/";
  return (
    <Link
      href="/"
      aria-current={current ? "page" : undefined}
      className="inline-block w-full max-w-[6.19rem] text-[30px] leading-none aria-[current=page]:text-[22px] xs:aria-[current=page]:text-[24px] sm:aria-[current=page]:text-[28px] md:aria-[current=page]:text-[30px]"
    >
      {children}
    </Link>
  );
}
