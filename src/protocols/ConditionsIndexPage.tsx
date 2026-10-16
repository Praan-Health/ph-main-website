import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { UtmCapture } from "@/components/forms-pages/useUtmFields";
import { Cta } from "@/components/shared/Cta";
import { conditionIndex } from "@/content/conditions";
import { IndexExpert, IndexHelp, IndexHero, IndexJourney, IndexList, IndexSteps, IndexTeam } from "@/components/conditions/IndexSections";

/** /protocols/conditions/: every condition Praan treats, with a search, ported from praan-web. */
export default function ConditionsIndexPage() {
  return (
    <>
      <div className="flex min-h-svh flex-col overflow-clip">
        <Navbar />
        <main className="flex flex-1 flex-col">
          <IndexHero />
          <IndexList />
          <IndexExpert />
          <IndexSteps />
          <IndexHelp />
          <IndexJourney />
          <IndexTeam />
          <Cta section="condition-index-cta" heading={conditionIndex.cta.heading} body={conditionIndex.cta.body} action={conditionIndex.cta.button} />
        </main>
        <Footer />
      </div>
      <CookieConsent />
      <UtmCapture />
    </>
  );
}
