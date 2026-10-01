import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { UtmCapture } from "@/components/forms-pages/useUtmFields";
import { FounderSection, InvestorsSection } from "@/components/shared/CompanySections";
import { AboutHero, Approach, Featured, Impact, MedicalTeam } from "@/components/about/sections";
import { Cta } from "@/components/shared/Cta";
import { aboutCta, aboutJsonLd } from "@/content/about";

/** The About page, ported from praan-web: who Praan is, the founder video, outcomes, medical lead, investors and press. */
export default function AboutPage() {
  return (
    <>
      <div className="flex min-h-svh flex-col overflow-clip">
        <Navbar />
        <main className="flex flex-1 flex-col">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />
          <AboutHero />
          <Approach />
          <FounderSection />
          <Impact />
          <MedicalTeam />
          <InvestorsSection />
          <Featured />
          <Cta section="about-cta" headingClassName="max-w-none" heading={aboutCta.heading} body={aboutCta.body} action={aboutCta.button} />
        </main>
        <Footer />
      </div>
      <CookieConsent />
      <UtmCapture />
    </>
  );
}
