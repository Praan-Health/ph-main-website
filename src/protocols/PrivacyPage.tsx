import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { UtmCapture } from "@/components/forms-pages/useUtmFields";
import html from "./legal/privacy.html?raw";
import { LegalPage } from "@/components/legal/LegalPage";

/** Privacy Policy: ported from praan-web with the shared site header and footer. */
export default function PrivacyPage() {
  return (
    <>
      <div className="flex min-h-svh flex-col overflow-clip">
        <Navbar />
        <main className="flex flex-1 flex-col">
          <LegalPage title="Privacy Policy" html={html} />
        </main>
        <Footer />
      </div>
      <CookieConsent />
      <UtmCapture />
    </>
  );
}
