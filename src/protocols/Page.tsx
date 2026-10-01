import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { UtmCapture } from "@/components/forms-pages/useUtmFields";
import { Hero } from "@/components/home/Hero";
import { Familiar } from "@/components/home/Familiar";
import { Results } from "@/components/home/Results";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CareTeam } from "@/components/home/CareTeam";
import { Stats } from "@/components/home/Stats";
import { FindYourPlan } from "@/components/home/FindYourPlan";
import { Faq } from "@/components/home/Faq";
import { Cta } from "@/components/shared/Cta";
import { cta } from "@/content/home";
import { SectionSpacer } from "@/components/ui/typography";

/** The Protocols page: the current praan.health homepage, with its own header and footer. */
export default function ProtocolsPage() {
  return (
    <>
      <div className="flex min-h-svh flex-col overflow-clip">
        <Navbar />
        <main className="flex flex-1 flex-col">
          <Hero />
          <Familiar />
          <Results />
          <HowItWorks />
          <CareTeam />
          <SectionSpacer size="sm" />
          <Stats />
          <FindYourPlan />
          <Faq />
          <Cta section="cta" heading={cta.heading} body={cta.body} action={cta.button} />
        </main>
        <Footer />
      </div>
      <CookieConsent />
      <UtmCapture />
    </>
  );
}
