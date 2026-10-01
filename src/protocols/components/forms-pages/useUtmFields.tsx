"use client";

import { useEffect, type RefObject } from "react";
import { utmFieldNames } from "@/content/forms-pages";

/**
 * The live site's footer script, run on every page: a value in the URL query is saved to
 * sessionStorage. Returns the saved value for each field (so parameters from the landing page survive
 * navigating to a form within the same tab).
 */
export function captureUtmParams(): Partial<Record<(typeof utmFieldNames)[number], string>> {
  const params = new URLSearchParams(window.location.search);
  const saved: Partial<Record<(typeof utmFieldNames)[number], string>> = {};
  for (const field of utmFieldNames) {
    const fromUrl = params.get(field);
    let value: string | null = fromUrl;
    try {
      if (fromUrl) sessionStorage.setItem(field, fromUrl);
      value = sessionStorage.getItem(field);
    } catch {
      // Storage blocked: fall back to this page's query only.
    }
    if (value) saved[field] = value;
  }
  return saved;
}

/**
 * Site-wide capture, for pages without a form. Mount once in the root layout to match live, where the
 * footer script stores the parameters on whichever page the visitor lands.
 */
export function UtmCapture() {
  useEffect(() => {
    captureUtmParams();
  }, []);
  return null;
}

/** Fills a form's hidden attribution inputs (rendered by `UtmHiddenInputs`) from the URL / sessionStorage. */
export function useUtmFields(formRef: RefObject<HTMLFormElement | null>) {
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const saved = captureUtmParams();
    for (const field of utmFieldNames) {
      const input = form.elements.namedItem(field);
      const value = saved[field];
      if (value && input instanceof HTMLInputElement) input.value = value;
    }
  }, [formRef]);
}

/** The hidden inputs the hook fills (the live forms' `div.hide` embed). */
export function UtmHiddenInputs() {
  return (
    <div className="hidden">
      {utmFieldNames.map((name) => (
        <input key={name} type="hidden" name={name} id={name} />
      ))}
    </div>
  );
}
