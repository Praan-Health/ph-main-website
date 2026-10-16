import { captureUtmParams } from "../components/forms-pages/useUtmFields";

type Submission = {
  formName: string;
  fields: Record<string, string>;
};

// Pages has no server, so the endpoint points at the forms Cloud Run service (VITE_FORMS_ENDPOINT, set in the deploy workflow).
const FORMS_ENDPOINT = (import.meta as { env?: Record<string, string | undefined> }).env?.VITE_FORMS_ENDPOINT || "/api/forms";

const cookie = (name: string): string => {
  const match = document.cookie.split("; ").find((part) => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : "";
};

/** One id per submission; the same id on the browser pixel's Lead event lets Meta count it once. */
const newEventId = (): string => `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

/**
 * Client helper for site forms. Adds the landing page's UTM tags (kept in sessionStorage), an event id and Meta's
 * _fbp/_fbc cookies, then posts to the forms service, which stores the lead in Firestore and forwards it to n8n.
 * Returns true when the service accepted it.
 */
export async function submitForm({ formName, fields }: Submission): Promise<boolean> {
  try {
    const res = await fetch(FORMS_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        formName,
        fields: { ...captureUtmParams(), ...fields },
        pagePath: window.location.pathname,
        pageUrl: window.location.href,
        eventId: newEventId(),
        fbp: cookie("_fbp"),
        fbc: cookie("_fbc"),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
