import { cn } from "@/lib/cn";
import { press } from "@/content/clinics";
import styles from "./clinics.module.css";

/** "As featured in" strip: publication names scrolling left forever, paused on hover. */
export function PressMarquee() {
  // The list is rendered twice so the -50% loop is seamless; the copy is hidden from assistive tech.
  const renderItems = (copy: boolean) =>
    press.items.map((item) => (
      <a
        key={`${copy}-${item.name}`}
        href={item.href}
        target="_blank"
        rel="noopener"
        aria-hidden={copy || undefined}
        tabIndex={copy ? -1 : undefined}
        className="text-[1.05rem] font-semibold tracking-[-0.01em] whitespace-nowrap text-gray-500"
      >
        {item.name}
      </a>
    ));

  return (
    <div data-section="press" className={cn(styles.pressWrap, "overflow-hidden text-wrap border-y border-gray-100 bg-white py-[1.4rem]")}>
      <div className="mb-4 text-center text-[0.72rem] font-semibold tracking-[0.14em] text-gray-650 uppercase opacity-75">{press.label}</div>
      <div className={cn(styles.pressMask, "overflow-hidden")}>
        <div className={cn(styles.pressTrack, "flex w-max items-center gap-[2.75rem]")}>
          {renderItems(false)}
          {renderItems(true)}
        </div>
      </div>
    </div>
  );
}
