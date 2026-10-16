import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { UtmCapture } from "@/components/forms-pages/useUtmFields";
import { Results } from "@/components/home/Results";
import { Cta } from "@/components/shared/Cta";
import { ConditionBody, ConditionHero } from "@/components/conditions/ConditionSections";
import { conditionCta, getCondition } from "@/content/conditions";

/** /protocols/conditions/<slug>/: one condition. The slug comes from the page's own root element. */
export default function ConditionPage({ slug }: { slug: string }) {
  const condition = getCondition(slug);
  if (!condition) return null;
  return (
    <>
      <div className="flex min-h-svh flex-col overflow-clip">
        <Navbar />
        <main className="flex flex-1 flex-col">
          <ConditionHero condition={condition} />
          <ConditionBody condition={condition} />
          <Results />
          <Cta section="condition-cta" headingClassName="w-full max-w-[46.56rem]" heading={conditionCta.heading} body={conditionCta.body} action={conditionCta.button} />
        </main>
        <Footer />
      </div>
      <CookieConsent />
      <UtmCapture />
    </>
  );
}
