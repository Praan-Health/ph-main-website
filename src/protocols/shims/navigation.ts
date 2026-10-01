/** Stand-in for next/navigation: the current path relative to the deploy base. */
export function usePathname(): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const path = window.location.pathname;
  const relative = base && path.startsWith(base) ? path.slice(base.length) : path;
  return relative.replace(/\/$/, "") || "/";
}
