import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { UtmCapture } from "@/components/forms-pages/useUtmFields";
import { cta } from "@/content/clinics";
import { PressMarquee } from "@/components/clinics/PressMarquee";
import { Faq } from "@/components/clinics/Faq";
import { Cta } from "@/components/shared/Cta";
import { CallbackModal } from "@/components/clinics/CallbackModal";
import {
  CareTeam,
  ClinicsHero,
  Conditions,
  Outcome,
  Recovery,
  RootCause,
  Safety,
  Steps,
  Testimonials,
  Treatments,
  VisitClinic,
  WhatIs,
  WhoFor,
  WhyPraan,
} from "@/components/clinics/sections";

/** The Clinics page: ported from praan-web (non-surgical pain treatment at the Koramangala clinic). */
export default function ClinicsPage() {
  return (
    <>
      <div className="flex min-h-svh flex-col overflow-clip">
        <Navbar />
        <main className="flex flex-1 flex-col">
          <ClinicsHero />
          <PressMarquee />
          <RootCause />
          <Testimonials />
          <WhatIs />
          <Treatments />
          <WhoFor />
          <Conditions />
          <Steps />
          <Outcome />
          <WhyPraan />
          <CareTeam />
          <Recovery />
          <Safety />
          <Faq />
          <VisitClinic />
          <Cta
            section="cta"
            headingClassName="max-w-[35rem]"
            heading={cta.heading}
            body={cta.body}
            action={<CallbackModal variant="secondary" buttonClassName="relative z-1" />}
            imageFit="fill"
          />
        </main>
        <Footer />
      </div>
      <CookieConsent />
      <UtmCapture />
    </>
  );
}
