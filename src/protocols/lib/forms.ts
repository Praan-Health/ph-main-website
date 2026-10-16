import { captureUtmParams } from "../components/forms-pages/useUtmFields";
import { getAttribution } from "./attribution";
import { buildLeadParams } from "./lead";

type Submission = {
  formName: string;
  fields: Record<string, string>;
};

type Env = Record<string, string | undefined>;
const env = (import.meta as { env?: Env }).env ?? {};

// Pages has no server. The forms service keeps a copy of every submission in Firestore; the lead itself goes straight
// from the browser to n8n so Meta's conversion API sees the visitor's IP, not a server's.
const FORMS_ENDPOINT = env.VITE_FORMS_ENDPOINT || "/api/forms";
const N8N_WEBHOOK_URL = env.VITE_N8N_WEBHOOK_URL || "";

// Forms whose submissions are leads for the sales pipeline; the rest (support requests) only get the Firestore copy.
const LEAD_FORMS = ["Contact Form"];

const nonEmpty = (values: Record<string, string>): Record<string, string> =>
  Object.fromEntries(Object.entries(values).filter(([, value]) => value !== ""));

async function saveCopy(formName: string, fields: Record<string, string>, eventId: string, fbp: string, fbc: string): Promise<boolean> {
  try {
    const res = await fetch(FORMS_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        formName,
        fields,
        pagePath: window.location.pathname,
        pageUrl: window.location.href,
        eventId,
        fbp,
        fbc,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Fire and forget: with no-cors the response cannot be read, so success only means the request left the browser. */
async function sendLead(params: Record<string, string>): Promise<boolean> {
  if (!N8N_WEBHOOK_URL) return false;
  try {
    await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      body: new URLSearchParams(params),
      mode: "no-cors",
      credentials: "omit",
      keepalive: true,
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Client helper for site forms. Saves a copy through the forms service and, for lead forms, posts the lead to the
 * n8n Incoming Leads webhook. Returns true when either delivery went through, so one being down never loses the lead.
 */
export async function submitForm({ formName, fields }: Submission): Promise<boolean> {
  const attribution = getAttribution();
  const eventId = crypto.randomUUID();
  const copyFields = { ...nonEmpty(captureUtmParams() as Record<string, string>), ...nonEmpty(fields) };

  const copy = saveCopy(formName, copyFields, eventId, attribution.fbp ?? "", attribution.fbc ?? "");
  const lead = LEAD_FORMS.includes(formName)
    ? sendLead(
        buildLeadParams({
          formName,
          fields,
          attribution,
          env: {
            href: window.location.href,
            pathname: window.location.pathname,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            now: new Date().toISOString(),
            eventId,
          },
        }),
      )
    : Promise.resolve(false);

  const [copied, sent] = await Promise.all([copy, lead]);
  return copied || sent;
}
