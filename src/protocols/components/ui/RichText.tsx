import { cn } from "@/lib/cn";

/**
 * Renders CMS rich text. The HTML comes from this repo's own content files (imported from the
 * Webflow CMS by scripts/import-cms.py), never from user input.
 */
export function RichText({ html, className }: { html: string; className?: string }) {
  return <div className={cn("[&_p]:[font:inherit]", className)} dangerouslySetInnerHTML={{ __html: html }} />;
}
