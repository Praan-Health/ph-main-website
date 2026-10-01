import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { UtmCapture } from "@/components/forms-pages/useUtmFields";
import { SupportFormSection } from "@/components/forms-pages/SupportFormSection";

/** Team Support: ported from praan-web with the shared site header and footer. */
export default function TeamSupportPage() {
  return (
    <>
      <div className="flex min-h-svh flex-col overflow-clip">
        <Navbar />
        <main className="flex flex-1 flex-col">
          <SupportFormSection />
        </main>
        <Footer />
      </div>
      <CookieConsent />
      <UtmCapture />
    </>
  );
}
