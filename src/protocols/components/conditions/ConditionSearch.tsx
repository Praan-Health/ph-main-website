"use client";

import { useState } from "react";
import Link from "next/link";
import { Img } from "@/components/ui/Img";
import { cn } from "@/lib/cn";
import { ClearIcon } from "./icons";

type Item = { slug: string; name: string; icon: { src: string; alt: string } };
type Empty = { heading: string; body: string; image: { src: string; width: number; height: number } };

/**
 * "Common Conditions" search + list. Live filters the CMS list with Finsweet List (case-insensitive
 * substring match on the name), fades in the clear cross while a query is active, and shows the
 * "We couldn't find that condition" block when nothing matches.
 */
export function ConditionSearch({ items, placeholder, empty }: { items: Item[]; placeholder: string; empty: Empty }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const visible = q ? items.filter((item) => item.name.toLowerCase().includes(q)) : items;

  return (
    <div className="mb-0">
      <form
        role="search"
        aria-label="Conditions"
        onSubmit={(e) => e.preventDefault()}
        className="mb-0 flex w-full flex-col items-center justify-start max-md:gap-12 max-xs:gap-0"
      >
        <div className="flex w-full flex-col items-center justify-start gap-[2em] text-center max-md:gap-[1.5em] max-xs:gap-[1em]">
          <div className="relative mx-auto mb-6 flex w-full max-w-[33.38rem] flex-1 flex-col max-xs:max-w-none">
            <input
              type="text"
              name="Field"
              maxLength={256}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              aria-label={placeholder}
              className="mx-auto mb-0 h-full min-h-[3em] w-full max-w-[33.38rem] rounded-sm border border-slate-200 bg-linen bg-[url(/images/search.svg)] bg-[length:18px] bg-[position:2.5%_50%] bg-no-repeat py-[.75em] pr-[.88rem] pl-[2.63rem] text-base leading-[1.5] tracking-body !text-navy-700 transition-[border-color] duration-200 placeholder:text-[1em] placeholder:text-gray-400 focus:border-slate-200 sm:min-w-[33.38rem]"
            />
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery("")}
              tabIndex={q ? 0 : -1}
              className={cn(
                "absolute inset-y-0 right-0 z-1 my-auto flex h-[1.26rem] cursor-pointer items-center justify-center rounded-sm px-4 py-[.63rem] text-[#a4a4a4] uppercase transition-opacity duration-200",
                q ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <ClearIcon className="absolute inset-y-0 right-[.88rem] my-auto size-[1.125rem]" />
            </button>
          </div>
        </div>
        <div className="w-full max-w-[43.75rem]">
          <div className="relative">
            {visible.length > 0 && (
              <div
                role="list"
                className="ml-auto flex max-w-[40rem] flex-wrap items-start justify-center gap-[.63rem] max-xs:grid max-xs:grid-cols-2 max-xs:items-stretch"
              >
                {visible.map((item) => (
                  <div role="listitem" key={item.slug}>
                    <Link
                      href={`/protocols/conditions/${item.slug}`}
                      className="flex h-12 flex-[0_auto] items-center justify-start gap-2 rounded-sm border border-slate-200 p-3 max-xs:h-full max-xs:text-left"
                    >
                      <Img src={item.icon.src} alt={item.icon.alt} width={14} height={14} className="size-[.88rem] min-h-[.88rem] min-w-[.88rem] object-contain" />
                      <div className="text-base leading-[1.5] font-normal tracking-[-0.005em] text-navy-700 max-xs:text-[.88rem]">{item.name}</div>
                      <Img
                        src="/images/caretright.svg"
                        alt=""
                        width={14}
                        height={14}
                        className="size-[.88rem] min-h-[.88rem] min-w-[.88rem] object-contain max-xs:ml-auto"
                      />
                    </Link>
                  </div>
                ))}
              </div>
            )}
            {visible.length === 0 && (
              <div
                role="status"
                className="flex min-h-48 w-full flex-col items-center justify-center gap-4 rounded-lg p-4 text-center text-[#b7b7b7] max-xs:mx-auto max-xs:max-w-[92%]"
              >
                <div className="flex flex-col items-center justify-start gap-y-3">
                  <Img src={empty.image.src} alt="" width={empty.image.width} height={empty.image.height} className="h-[4.38rem] w-[5.25rem] object-contain" />
                  <div className="text-[1.13rem] leading-[1.5] font-medium text-navy-700">{empty.heading}</div>
                  <div className="max-w-[15.13rem]">
                    <div className="text-[.88rem] xs:text-base">{empty.body}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
