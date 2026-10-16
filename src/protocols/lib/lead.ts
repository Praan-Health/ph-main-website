/**
 * The lead the browser posts to the n8n "Incoming Leads" webhook, in the field names and allowed values that
 * workflow documents (phone as E.164, `knownConditions` from a fixed label list, `protocol=home` for routing).
 * Pure functions only, so they can be unit tested.
 */

const INDIAN_MOBILE = /^[6-9]\d{9}$/;

/** "+91 98450-12345", "09845012345" and "9845012345" all become "+919845012345"; anything else is null. */
export function toE164India(value: string): string | null {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return INDIAN_MOBILE.test(digits) ? `+91${digits}` : null;
}

/** An error message for a phone number the pipeline would reject, or null when it is fine. */
export function phoneProblem(value: string): string | null {
  return toE164India(value) ? null : "Please enter a valid 10-digit mobile number";
}

// LeadSquared's multi-select only accepts these labels, so the pain site is mapped onto them.
const CONDITION_LABELS: Record<string, string> = {
  knee: "Joint Pain / Arthritis",
  shoulder: "Joint Pain / Arthritis",
  back: "Spine / Mobility",
  neck: "Spine / Mobility",
  other: "Other",
};

export const knownConditionFor = (site: string): string => CONDITION_LABELS[site.trim().toLowerCase()] ?? "";

export interface LeadAttribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  fbp?: string;
  fbc?: string;
}

export interface LeadEnvironment {
  href: string;
  pathname: string;
  referrer: string;
  userAgent: string;
  /** ISO timestamp, also used by Meta as the event time. */
  now: string;
  /** One per submission; the same id on the browser pixel's Lead event lets Meta count it once. */
  eventId: string;
}

interface LeadInput {
  formName: string;
  fields: Record<string, string>;
  attribution: LeadAttribution;
  env: LeadEnvironment;
}

const present = (object: Record<string, string | undefined>): Record<string, string> =>
  Object.fromEntries(Object.entries(object).filter((entry): entry is [string, string] => Boolean(entry[1])));

/**
 * Flat form-encoded params for the webhook; empty values are left out. Our forms are completed by the patient
 * themselves, hence exploringFor "Myself". The page's own `source`/`ref`/`campaign` query values are not sent
 * because the webhook routes on `source`, and a stray value could send a lead to an unrelated campaign.
 */
export function buildLeadParams({ fields, attribution, env }: LeadInput): Record<string, string> {
  const site = (fields["Site of Pain"] ?? "").trim();
  const intensity = (fields["Intensity of Pain"] ?? "").trim();
  const details = [site && `Site of pain: ${site}.`, intensity && `Intensity of pain: ${intensity}.`].filter(Boolean).join(" ");
  const phone = toE164India(fields["Phone Number"] ?? fields.Phone ?? "") ?? "";

  return present({
    firstName: (fields["First Name"] ?? "").trim(),
    lastName: (fields["Last Name"] ?? "").trim(),
    email: (fields.Email ?? "").trim().toLowerCase(),
    phone,
    exploringFor: "Myself",
    knownConditions: knownConditionFor(site),
    conditionDescription: details,
    protocol: "home",
    landingPage: env.pathname,
    event_source_url: env.href,
    referrer: env.referrer,
    submittedAt: env.now,
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    utm_term: attribution.utm_term,
    utm_content: attribution.utm_content,
    gclid: attribution.gclid,
    fbclid: attribution.fbclid,
    fbp: attribution.fbp,
    fbc: attribution.fbc,
    user_agent: env.userAgent,
    event_id: env.eventId,
  });
}
