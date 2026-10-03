import { Container } from "@/components/ui/Container";
import { SectionSpacer } from "@/components/ui/typography";
import { Breadcrumbs } from "@/components/legal/Breadcrumbs";
import { formatLegalHtml } from "@/components/legal/formatLegalHtml";

/** Utility text page (privacy, terms, refund policy): breadcrumb header and a 610px text column. */
export function LegalPage({ title, html, extraTopSpace = false }: { title: string; html: string; extraTopSpace?: boolean }) {
  return (
    <>
      <section className="relative flex flex-col items-stretch justify-center bg-white text-slate-600">
        <div aria-hidden="true" className="h-(--spacing-margin)" />
        <Container>
          <Breadcrumbs current={title} />
        </Container>
        <SectionSpacer size="md" />
      </section>
      <section>
        {extraTopSpace && <SectionSpacer size="md" />}
        <div className="relative flex flex-col items-center justify-center bg-white text-slate-600">
          {/* Policy text is copied verbatim from the live page (legal/*.html); formatLegalHtml rebuilds headings, paragraphs and bullets from its <br> breaks. */}
          <div className="max-w-[38.13rem]">
            <div
              className="px-5 min-[700px]:px-0 [&_a]:underline [&_h2]:mt-10 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy-700 [&_h3]:mt-6 [&_h3]:mb-1 [&_h3]:font-semibold [&_h3]:text-navy-700 [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_h2+p]:mt-0 [&_h3+p]:mt-0"
              dangerouslySetInnerHTML={{ __html: formatLegalHtml(html) }}
            />
          </div>
        </div>
        <SectionSpacer size="md" />
      </section>
    </>
  );
}
