import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { UtmCapture } from "@/components/forms-pages/useUtmFields";
import { ContactFormSection } from "@/components/forms-pages/ContactSections";
import { FounderSection, InvestorsSection } from "@/components/shared/CompanySections";
import { Cta } from "@/components/shared/Cta";
import { contactPage } from "@/content/forms-pages";

/** Contact | Praan Health: ported from praan-web with the shared site header and footer. */
export default function ContactPage() {
  return (
    <>
      <div className="flex min-h-svh flex-col overflow-clip">
        <Navbar />
        <main className="flex flex-1 flex-col">
          <>
            <FounderSection />
            <InvestorsSection />
            <ContactFormSection />
            <Cta section="contact-cta" heading={contactPage.cta.heading} body={contactPage.cta.body} action={contactPage.cta.button} />
          </>
        </main>
        <Footer />
      </div>
      <CookieConsent />
      <UtmCapture />
    </>
  );
}
