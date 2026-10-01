import { Container } from "@/components/ui/Container";
import { SectionSpacer } from "@/components/ui/typography";
import { Breadcrumbs } from "@/components/legal/Breadcrumbs";

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
          {/* Policy text is copied verbatim from the live page (content/legal/*.html) with only formatting tags kept. */}
          <div className="max-w-[38.13rem]">
            <div className="[&_a]:underline" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
        <SectionSpacer size="md" />
      </section>
    </>
  );
}
