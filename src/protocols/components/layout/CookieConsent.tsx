"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { buttonClasses } from "@/components/ui/Button";

/**
 * Cookie consent banner. Choices are stored in localStorage as a Google Consent Mode object under
 * "consentMode", the same key and shape the Webflow site used, so existing visitors keep their choice.
 * Visibility is decided before paint by CONSENT_STATE_SCRIPT (see layout), which sets
 * <html data-consent="pending"> when nothing is stored.
 */

type ConsentKey =
  | "functionality_storage"
  | "analytics_storage"
  | "ad_storage"
  | "ad_user_data"
  | "ad_personalization"
  | "personalization_storage"
  | "security_storage";

type ConsentMode = Record<ConsentKey, "granted" | "denied">;

// "balance" mirrors the live labels; Personalization Storage was left without it and wraps greedily.
const OPTIONS: { key: ConsentKey; label: string; balance?: false }[] = [
  { key: "functionality_storage", label: "Functionality" },
  { key: "analytics_storage", label: "Analytics Storage" },
  { key: "ad_storage", label: "Ad Storage" },
  { key: "ad_user_data", label: "Ad User Data" },
  { key: "ad_personalization", label: "Ad Personalisation" },
  { key: "personalization_storage", label: "Personalization Storage", balance: false },
  { key: "security_storage", label: "Security Storage" },
];

export const CONSENT_STORAGE_KEY = "consentMode";

export const CONSENT_STATE_SCRIPT = `try{if(localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)})===null)document.documentElement.dataset.consent="pending"}catch(e){}`;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function saveConsent(granted: (key: ConsentKey) => boolean) {
  const mode = Object.fromEntries(
    OPTIONS.map(({ key }) => [
      key,
      key === "functionality_storage" || granted(key) ? "granted" : "denied",
    ]),
  ) as ConsentMode;
  window.gtag?.("consent", "update", mode);
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(mode));
  } catch {
    // Storage unavailable (private mode): the choice still applies for this page view.
  }
  delete document.documentElement.dataset.consent;
}

export function CookieConsent() {
  const [expanded, setExpanded] = useState(false);
  // Every option starts ticked, as on the live site; functionality is always granted.
  const [selected, setSelected] = useState<Record<ConsentKey, boolean>>(
    () =>
      Object.fromEntries(OPTIONS.map(({ key }) => [key, true])) as Record<
        ConsentKey,
        boolean
      >,
  );

  return (
    <div
      role="dialog"
      data-cookie-consent
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-[10px] bottom-[10px] z-[99] hidden max-w-full rounded-lg bg-white p-6 shadow-[0_2px_50px_#0000004d] xs:left-auto xs:right-5 xs:bottom-5 xs:p-4 sm:right-8 sm:max-w-[80%] sm:px-8 sm:pt-8 sm:pb-[1.69rem] md:max-w-[600px] [[data-consent=pending]_&]:block"
    >
      <div className="mt-0 mb-fluid-3">
        <h3
          id="cookie-consent-title"
          className="text-[1.5rem] leading-[1.2] font-medium tracking-heading text-navy-700"
        >
          Cookie Settings
        </h3>
      </div>
      <p className="mb-fluid-2 text-[0.875rem] leading-[1.5] tracking-normal">
        We use cookies to provide you with the best possible experience. They
        also allow us to analyze user behavior in order to constantly improve
        the website for you.
      </p>
      <Link href="/privacy" className="underline max-xs:text-[0.75rem]">
        See our Privacy Policy
      </Link>

      <div className="mt-4 grid grid-cols-2 gap-4 xs:flex xs:flex-row xs:flex-wrap sm:flex-nowrap">
        <button
          type="button"
          className={primaryButton}
          onClick={() => saveConsent(() => true)}
        >
          <div>Accept All</div>
        </button>
        <button
          type="button"
          className={secondaryButton}
          onClick={() => saveConsent(() => false)}
        >
          <span className="leading-[1.3] whitespace-nowrap text-black/80">
            Reject all
          </span>
        </button>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls="cookie-consent-options"
          className="col-span-2 flex items-center justify-center bg-transparent hover:underline max-xs:text-[0.88rem] xs:block"
          onClick={() => setExpanded(true)}
        >
          <div className="cursor-pointer underline sm:no-underline">
            I want to choose
          </div>
        </button>
      </div>

      {/* Expands open (300ms, ease-in-quad), as the Webflow "Consent Expand" interaction did. */}
      <div
        id="cookie-consent-options"
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-quad",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
        inert={!expanded}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pb-[0.31rem]">
            <div className="mb-[15px]">
              <form
                className="mt-4 grid grid-cols-2 items-start justify-start gap-4 xs:mt-8 sm:gap-6"
                onSubmit={(e) => e.preventDefault()}
              >
                {OPTIONS.map(({ key, label, balance }) => {
                  const locked = key === "functionality_storage";
                  return (
                    <label
                      key={key}
                      className="relative mb-[5px] flex items-center gap-[6px] pl-5 before:table before:content-[''] after:table after:content-[''] max-xs:text-[0.88rem]"
                    >
                      <input
                        type="checkbox"
                        className="peer absolute -z-1 opacity-0"
                        checked={locked || selected[key]}
                        disabled={locked}
                        onChange={(e) =>
                          setSelected((s) => ({
                            ...s,
                            [key]: e.target.checked,
                          }))
                        }
                      />
                      <span
                        aria-hidden="true"
                        className="-ml-5 size-5 cursor-pointer rounded-[4px] border border-orange-200 leading-normal peer-checked:border-[#fd7217] peer-checked:bg-[#fd7217] peer-checked:bg-[url(/images/checkbox-check.svg)] peer-checked:bg-[length:14px] peer-checked:bg-center peer-checked:bg-no-repeat peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-navy-700"
                      />
                      <span className={cn("inline-block cursor-pointer", balance !== false && "text-balance")}>
                        {label}
                      </span>
                    </label>
                  );
                })}
              </form>
            </div>
            <button
              type="button"
              className={primaryButton}
              onClick={() => saveConsent((key) => selected[key])}
            >
              <span className="leading-[1.3] whitespace-nowrap text-white">
                Accept selection
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const primaryButton = buttonClasses("primary");
const secondaryButton = buttonClasses("secondary", "w-full whitespace-nowrap xs:w-auto");
