import Link from "next/link";
import { ArrowRightIcon, DotIcon } from "@/components/ui/icons";

type AnnouncementBarProps = {
  href: string;
  label: string;
  price: string;
  originalPrice: string;
  cta: string;
};

/** Orange promo strip above the nav. The price group is hidden below 768px, leaving only the CTA. */
export function AnnouncementBar({ href, label, price, originalPrice, cta }: AnnouncementBarProps) {
  return (
    <Link
      href={href}
      data-announcement-bar
      className="sticky top-0 flex w-full flex-col items-center justify-center gap-3 bg-orange-500 py-2 text-linen no-underline xs:flex-row"
    >
      <div className="hidden flex-none items-center justify-start gap-1 sm:flex">
        <div className="text-[0.875rem] font-medium">
          {label} {price}
        </div>
        <div className="text-[0.88rem] text-white/60">
          <span className="line-through">{originalPrice}</span>
        </div>
      </div>
      <DotIcon className="hidden size-[3px] sm:flex" />
      <div className="flex flex-none items-center justify-start gap-1 border-b border-white">
        <div className="text-[0.875rem] font-medium">
          <em>{cta}</em>
        </div>
        <ArrowRightIcon className="size-4" />
      </div>
    </Link>
  );
}
