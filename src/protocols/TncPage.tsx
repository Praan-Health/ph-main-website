import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { UtmCapture } from "@/components/forms-pages/useUtmFields";
import html from "./legal/tnc.html?raw";
import { LegalPage } from "@/components/legal/LegalPage";

/** Terms and Conditions: ported from praan-web with the shared site header and footer. */
export default function TncPage() {
  return (
    <>
      <div className="flex min-h-svh flex-col overflow-clip">
        <Navbar />
        <main className="flex flex-1 flex-col">
          <LegalPage title="Terms and Conditions" html={html} extraTopSpace />
        </main>
        <Footer />
      </div>
      <CookieConsent />
      <UtmCapture />
    </>
  );
}
