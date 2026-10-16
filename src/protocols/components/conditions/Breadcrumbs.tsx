import { Fragment } from "react";
import Link from "next/link";
import { ChevronIcon, HomeTileIcon } from "@/components/legal/breadcrumb-icons";
import { cn } from "@/lib/cn";

/** Home › … › current page ("breadcrumbs-wrapper"); only the home tile is a link on live. */
export function Breadcrumbs({ trail, current }: { trail?: { label: string; href: string }[]; current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="flex w-full max-w-[354px] items-center justify-start gap-2">
      <Link href="/" aria-label="Home">
        <HomeTileIcon className="size-6 min-w-6" />
      </Link>
      {[...(trail ?? []), { label: current, href: "" }].map(({ label, href }, i, all) => {
        const last = i === all.length - 1;
        const className = cn("text-[0.875rem] font-medium", last ? "text-navy-700" : "text-gray-400");
        return (
          <Fragment key={label}>
            <ChevronIcon className="size-3 min-w-3" />
            {last ? (
              <div aria-current="page" className={className}>
                {label}
              </div>
            ) : (
              <Link href={href} className={className}>
                {label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
