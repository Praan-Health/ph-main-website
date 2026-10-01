import { cn } from "@/lib/cn";

/** Centred page column: 69rem max, with the fluid site margin on either side. */
export function Container({ className, children, ...rest }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("relative mx-auto flex w-[calc(100%-var(--spacing-margin)*2)] max-w-(--container-main) flex-col justify-center", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
