import Link from "next/link";
import { ChevronIcon, HomeTileIcon } from "@/components/legal/breadcrumb-icons";

/** Home › Current page, as on the utility pages. */
export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="flex w-full max-w-[354px] items-center justify-start gap-2">
      <Link href="/" aria-label="Home">
        <HomeTileIcon className="size-6 min-w-6" />
      </Link>
      <ChevronIcon className="size-3 min-w-3 text-navy-700" />
      <div aria-current="page" className="text-[0.875rem] font-medium text-navy-700">
        {current}
      </div>
    </nav>
  );
}
