import type { LeadAttribution } from "./lead";

/**
 * Where a visitor came from, kept in first-party cookies for 90 days (names shared with the protocol site:
 * praan_utm_source, ..., praan_gclid, praan_fbclid); the latest click overwrites them. Meta's _fbp/_fbc are
 * read, or built when the Pixel is not on the page. Cookies are written only once the visitor has accepted
 * cookies in the banner; until then values live in sessionStorage for the visit.
 */
const DAYS = 90;
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;
type Param = (typeof PARAMS)[number];

type Consent = Partial<Record<"analytics_storage" | "ad_storage", string>>;

function consent(): Consent {
  try {
    return JSON.parse(localStorage.getItem("consentMode") ?? "null") ?? {};
  } catch {
    return {};
  }
}
const mayPersist = (): boolean => consent().analytics_storage === "granted" || consent().ad_storage === "granted";
const mayUseAdCookies = (): boolean => consent().ad_storage === "granted";

function readCookie(name: string): string {
  const match = document.cookie.split("; ").find((part) => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : "";
}

function writeCookie(name: string, value: string): void {
  const secure = window.location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${DAYS * 86400}; path=/; samesite=lax${secure}`;
}

function store(name: string, value: string): void {
  if (mayPersist()) writeCookie(name, value);
  else {
    try {
      sessionStorage.setItem(name, value);
    } catch {
      // Storage blocked: the value only lasts for this page.
    }
  }
}

function recall(name: string): string {
  let fromSession = "";
  try {
    fromSession = sessionStorage.getItem(name) ?? "";
  } catch {
    // Storage blocked.
  }
  return readCookie(name) || fromSession;
}

/** Call on every page load: saves any campaign parameters in the URL (and _fbc when there is an fbclid). */
export function captureAttribution(): void {
  const query = new URLSearchParams(window.location.search);
  for (const param of PARAMS) {
    const value = query.get(param);
    if (value) store(`praan_${param}`, value);
  }
  const fbclid = query.get("fbclid");
  if (fbclid && mayUseAdCookies()) writeCookie("_fbc", `fb.1.${Date.now()}.${fbclid}`);
}

const randomDigits = (length: number): string => Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");

/** The saved attribution for a submission. fbp/fbc are only included when ad cookies were accepted. */
export function getAttribution(): LeadAttribution {
  const saved = Object.fromEntries(PARAMS.map((param) => [param, recall(`praan_${param}`)])) as Record<Param, string>;
  let fbp = "";
  let fbc = "";
  if (mayUseAdCookies()) {
    fbp = readCookie("_fbp");
    if (!fbp) {
      fbp = `fb.1.${Date.now()}.${randomDigits(10)}`;
      writeCookie("_fbp", fbp);
    }
    fbc = readCookie("_fbc");
    if (!fbc && saved.fbclid) {
      fbc = `fb.1.${Date.now()}.${saved.fbclid}`;
      writeCookie("_fbc", fbc);
    }
  }
  return { ...saved, fbp, fbc };
}
