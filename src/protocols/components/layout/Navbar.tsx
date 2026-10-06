"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { logo, navigation, type NavLink } from "@/content/site";

/**
 * Sticky site navigation. Below 992px the links collapse into a full-height panel behind a
 * round hamburger button. The spacers above and below the bar tighten from 20px to 10px over
 * the first 3% of page scroll, as on the original site.
 */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const navRef = useRef<HTMLDivElement>(null);

  // Close the menu when the route changes (adjusting state during render, not in an effect).
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  // Close the menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div
      ref={navRef}
      className="sticky inset-x-0 top-0 z-[999] mx-auto flex w-full max-w-[120rem] flex-col items-center justify-start border-b border-slate-200 md:justify-center"
      style={{ "--nav-spacer": "26px" } as React.CSSProperties}
    >
      <div className="h-(--nav-spacer) w-full [overflow-anchor:none]" />
      <div className="pointer-events-none absolute inset-0 bg-white/90 backdrop-blur-[10px]" />
      <nav className="w-full" aria-label="Main">
        <div className="relative mx-auto flex w-auto max-w-[70.375rem] flex-col justify-center md:w-[calc(100%-var(--spacing-margin)*2)]">
          <div className="relative flex w-full items-center justify-between gap-4 px-5 text-left md:px-0">
            <Link
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              className="flex w-[60%] max-w-[5.63rem] items-start justify-start xs:max-w-[6.88rem] md:w-auto md:justify-center"
            >
              <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} priority className="h-9 w-auto object-contain" />
            </Link>

            <ul className="hidden w-[35%] flex-1 items-center justify-end gap-8 md:flex">
              {navigation.map((item) => (
                <li key={item.label}>
                  <NavItem item={item} current={isCurrent(pathname, item)} />
                </li>
              ))}
            </ul>

            <MenuButton open={open} controls={menuId} onToggle={() => setOpen((o) => !o)} />
          </div>
        </div>
      </nav>
      <div className="h-(--nav-spacer) w-full [overflow-anchor:none]" />

      {/* Mobile panel: slides down from under the bar. Webflow shows the open menu as a block, so items stack by padding alone. */}
      <div className={cn("absolute inset-x-0 top-full h-svh overflow-hidden md:hidden", !open && "pointer-events-none")}>
        <ul
          id={menuId}
          inert={!open}
          className={cn(
            "block h-svh w-full rounded-[10px] bg-linen px-5 py-[1.13rem] transition-transform duration-400 ease-[ease] xs:px-[1.13rem]",
            open ? "translate-y-0" : "-translate-y-full",
          )}
        >
          {navigation.map((item) => (
            <li key={item.label}>
              <NavItem item={item} current={isCurrent(pathname, item)} mobile />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function NavItem({ item, current, mobile }: { item: NavLink; current: boolean; mobile?: boolean }) {
  const external = item.external ? { target: "_blank", rel: "noopener" } : {};
  const link = (
    <Link
      href={item.href}
      aria-current={current ? "page" : undefined}
      className="flex cursor-pointer items-center gap-2 text-[1.0625rem] text-navy-700 transition-colors duration-200 hover:text-orange-500"
      {...external}
    >
      <span>{item.label}</span>
      {item.badge && <span className="flex items-center justify-start pt-[0.13rem] text-[0.63rem] text-orange-500">{item.badge}</span>}
      {item.children && !mobile && (
        <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true" className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180">
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </Link>
  );

  return (
    <div className={cn("group relative flex flex-col", mobile && "px-[1.13rem] py-4")}>
      {link}
      {item.children && (
        <div
          className={cn(
            mobile
              ? "mt-3 flex flex-col gap-3 pl-4"
              : "invisible absolute top-full -left-4 z-10 mt-2 grid min-w-52 gap-1 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-[0_12px_32px_rgb(48_56_128/0.12)] transition-opacity duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 before:absolute before:inset-x-0 before:-top-3 before:h-3 before:content-['']",
          )}
        >
          {item.children.map((child) => (
            <Link
              key={child.label}
              href={child.href}
              className={cn(
                "flex items-center gap-2 text-[1.0625rem] text-navy-700 transition-colors duration-200 hover:text-orange-500",
                !mobile && "rounded-lg px-3 py-2 hover:bg-orange-50",
              )}
              {...(child.external ? { target: "_blank", rel: "noopener" } : {})}
            >
              <span>{child.label}</span>
              {child.badge && <span className="pt-[0.13rem] text-[0.63rem] text-orange-500">{child.badge}</span>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MenuButton({ open, controls, onToggle }: { open: boolean; controls: string; onToggle: () => void }) {
  // Open: bars move together (200ms) then rotate into an X (200ms). Close runs the reverse.
  const bar = "block h-[3px] w-[1.13rem] rounded-[40px] bg-navy-700 my-[3px] xs:w-4 transition-[translate,rotate] duration-200";
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={controls}
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={onToggle}
      className="group relative block size-12 cursor-pointer select-none rounded-full border border-slate-200 p-0 md:hidden"
    >
      {/* The 48px box starts inside the 1px border, as in the original, so the bars sit 1px right of and below centre. */}
      <span className="flex size-12 flex-col items-center justify-center">
        <span
          className={cn(
            bar,
            open ? "translate-y-1 rotate-45 [transition-delay:0ms,200ms]" : "translate-y-0 rotate-0 group-hover:-translate-x-[5px] [transition-delay:200ms,0ms]",
          )}
        />
        <span
          className={cn(
            bar,
            open ? "-translate-y-[5px] -rotate-45 [transition-delay:0ms,200ms]" : "translate-y-0 rotate-0 group-hover:translate-x-[5px] [transition-delay:200ms,0ms]",
          )}
        />
      </span>
    </button>
  );
}

function isCurrent(pathname: string, item: NavLink) {
  return !item.external && (pathname === item.href || pathname.startsWith(`${item.href}/`));
}
