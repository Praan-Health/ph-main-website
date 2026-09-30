/** Resolves a /public path against the deploy base (e.g. /ph-main-website/ on GitHub Pages). */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
