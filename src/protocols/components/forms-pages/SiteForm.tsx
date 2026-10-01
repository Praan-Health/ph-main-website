"use client";

import { useRef, useState } from "react";
import { submitForm } from "@/lib/forms";
import { cn } from "@/lib/cn";
import type { FormDef } from "@/content/forms-pages";
import { UtmHiddenInputs, useUtmFields } from "./useUtmFields";

type Status = "idle" | "done" | "fail";

/**
 * Collects fields the way webflow.js does: every input except buttons, keyed by `data-name` (else
 * `name`), strings trimmed, checkboxes as true/false. Returns an error message for a required field
 * that is blank after trimming (Webflow alerts it; the browser's own validation catches the rest).
 */
function collectFields(form: HTMLFormElement): { fields: Record<string, string>; error: string | null } {
  const fields: Record<string, string> = {};
  let error: string | null = null;
  const controls = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea");
  controls.forEach((el, i) => {
    const type = el.getAttribute("type");
    if (type === "submit" || type === "button" || type === "file") return;
    const key = el.getAttribute("data-name") || el.getAttribute("name") || `Field ${i + 1}`;
    const value = el instanceof HTMLInputElement && type === "checkbox" ? String(el.checked) : el.value.trim();
    fields[key] = value;
    if (!error && el.required && (value === "" || value === "false")) error = `Please fill out the required field: ${encodeURIComponent(key)}`;
    else if (!error && el.required && /e(-)?mail/i.test(type ?? "") && !/^\S+@\S+$/.test(value))
      error = `Please enter a valid email address for: ${encodeURIComponent(key)}`;
  });
  return { fields, error };
}

/**
 * A Webflow form (`w-form`): on success it follows the form's redirect, or hides the form and shows
 * the success block; on failure the error block appears under the still-visible form.
 */
export function SiteForm({ form, formClassName, children }: { form: FormDef; formClassName?: string; children: React.ReactNode }) {
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const failRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  useUtmFields(formRef);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { fields, error } = collectFields(event.currentTarget);
    if (error) {
      window.alert(error);
      return;
    }
    // Like webflow.js, only the submit button is disabled while sending (its wrapper fades to 50%).
    const button = event.currentTarget.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (button) button.disabled = true;
    const ok = await submitForm({ formName: form.formName, fields });
    if (ok && form.redirect) {
      window.location.assign(form.redirect);
      return;
    }
    if (button) button.disabled = false;
    setStatus(ok ? "done" : "fail");
    requestAnimationFrame(() => (ok ? doneRef : failRef).current?.focus());
  }

  return (
    <div data-form={form.formName} className="mb-0 flex w-full flex-wrap">
      <form
        ref={formRef}
        name={`wf-form-${form.formName.replace(/ /g, "-")}`}
        data-name={form.formName}
        onSubmit={onSubmit}
        className={cn("flex w-full flex-col gap-fluid-8", status === "done" && "hidden", formClassName)}
      >
        <UtmHiddenInputs />
        {children}
      </form>
      <div
        ref={doneRef}
        data-form-done
        tabIndex={-1}
        role="region"
        aria-label={`${form.formName} success`}
        className={cn("w-full rounded-lg border-[.094rem] border-solid border-slate-600/20 bg-transparent p-[1.2rem] text-center", status === "done" ? "block" : "hidden")}
      >
        <div>{form.successText}</div>
      </div>
      <div
        ref={failRef}
        data-form-fail
        tabIndex={-1}
        role="region"
        aria-label={`${form.formName} failure`}
        className={cn(
          "mt-2.5 w-full self-start rounded-lg border-[.094rem] border-solid border-transparent bg-[#b10808] px-4 py-[.2rem] text-white",
          status === "fail" ? "block" : "hidden",
        )}
      >
        <div>{form.errorText}</div>
      </div>
    </div>
  );
}
