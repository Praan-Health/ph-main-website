import type { AnchorHTMLAttributes, ReactNode } from "react";

const LIVE_SITE = "https://praan.health";
const BASE = import.meta.env.BASE_URL;

/** Pages built in this project; every other internal route still lives on the live site. */
const LOCAL_ROUTES: Record<string, string> = { "/": BASE, "/protocols": `${BASE}protocols/`, "/clinics": `${BASE}clinics/`, "/about": `${BASE}about/` };

export function resolveHref(href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const [path, rest = ""] = href.split(/(?=[?#])/);
  const suffix = rest;
  const local = LOCAL_ROUTES[path.replace(/\/$/, "") || "/"];
  return local ? `${local}${suffix}` : `${LIVE_SITE}${href}`;
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  prefetch?: boolean;
  scroll?: boolean;
  children?: ReactNode;
};

/** Stand-in for next/link: a plain anchor with base-aware routes. */
export default function Link({ href, prefetch: _prefetch, scroll: _scroll, ...rest }: LinkProps) {
  return <a href={resolveHref(href)} {...rest} />;
}
