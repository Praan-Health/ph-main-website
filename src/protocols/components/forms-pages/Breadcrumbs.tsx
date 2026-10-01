import Link from "next/link";
import { ChevronRightIcon, HomeIcon } from "./icons";

/** Home icon › current page, above the form (breadcrumbs-wrapper). */
export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="flex w-full max-w-[354px] items-center justify-start gap-x-2">
      <Link href="/" aria-label="Home" className="inline-block max-w-full">
        <div className="flex size-6 min-w-6 flex-col items-center justify-center">
          <HomeIcon />
        </div>
      </Link>
      <div className="flex size-3 min-w-3 flex-col items-center justify-center">
        <ChevronRightIcon />
      </div>
      <div aria-current="page" className="text-[.875rem] font-medium text-navy-700">
        {current}
      </div>
    </nav>
  );
}
