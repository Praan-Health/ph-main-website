"use client";

import { useId, useRef, useState } from "react";
import { submitForm } from "@/lib/forms";
import { cn } from "@/lib/cn";
import { callback } from "@/content/clinics";
import {
  UtmHiddenInputs,
  useUtmFields,
} from "@/components/forms-pages/useUtmFields";
import { utmFieldNames } from "@/content/forms-pages";

const fieldClass =
  "block h-12 w-full appearance-none rounded-sm border-[0.094rem] border-navy-200 bg-transparent px-[0.9rem] text-[1.125rem] leading-[1.5] font-normal tracking-normal placeholder:text-[color-mix(in_srgb,var(--color-slate-600)_60%,transparent)] focus:border-[#3898ec] focus:outline-none focus-visible:outline-none";
const labelTextClass = "mb-fluid-1 block";

type Status = "idle" | "done" | "fail";

/** Required fields, keyed by input name, with the label Webflow's alert names. */
const REQUIRED: [string, string][] = [
  ["First-Name", "First Name"],
  ["Last-Name", "Last Name"],
  ["Phone-Number", "Phone Number"],
  ["Intensity-of-Pain", "Field"],
];

/**
 * "Contact Form" inside the Request a Callback modal, behaving like webflow.js: values are trimmed,
 * a required field that is only whitespace triggers Webflow's alert, only the submit button is
 * disabled while sending, success hides the form and shows the thank-you block, failure shows the
 * red block under the still-visible form (focus moves to whichever block appears).
 */
export function CallbackForm({
  firstFieldRef,
}: {
  firstFieldRef?: React.Ref<HTMLInputElement>;
}) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const failRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [sending, setSending] = useState(false);
  const [site, setSite] = useState("");
  const [intensity, setIntensity] = useState("");
  useUtmFields(formRef);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const blank = REQUIRED.find(([name]) => value(name) === "");
    if (blank) {
      window.alert(
        `Please fill out the required field: ${encodeURIComponent(blank[1])}`,
      );
      return;
    }
    const utm: Record<string, string> = {};
    for (const name of utmFieldNames) utm[name] = value(name);
    setSending(true);
    // Keys are the visible labels; on live both selects share data-name "Field", so one overwrote the other.
    const ok = await submitForm({
      formName: callback.formName,
      fields: {
        ...utm,
        "First Name": value("First-Name"),
        "Last Name": value("Last-Name"),
        "Phone Number": value("Phone-Number"),
        "Site of Pain": site,
        "Intensity of Pain": intensity,
      },
    });
    setSending(false);
    setStatus(ok ? "done" : "fail");
    requestAnimationFrame(() => (ok ? doneRef : failRef).current?.focus());
  }

  return (
    <div className="flex w-full flex-row">
      <div className="flex w-full flex-wrap">
        <form
          ref={formRef}
          name="wf-form-Contact-Form"
          data-name={callback.formName}
          aria-label={callback.formName}
          onSubmit={onSubmit}
          className={cn(
            "flex w-full flex-col gap-fluid-8",
            status === "done" && "hidden",
          )}
        >
          <UtmHiddenInputs />
          <fieldset className="relative w-full">
            <div className="grid grid-cols-[minmax(0,1fr)] gap-x-(--spacing-gutter) gap-y-fluid-2">
              <label className="relative flex w-full flex-col text-left">
                <span className={labelTextClass}>First Name</span>
                <input
                  ref={firstFieldRef}
                  className={cn(fieldClass, "text-inherit")}
                  maxLength={256}
                  name="First-Name"
                  type="text"
                  autoComplete="given-name"
                  required
                />
              </label>
              <label className="relative flex w-full flex-col text-left">
                <span className={labelTextClass}>Last Name</span>
                <input
                  className={cn(fieldClass, "text-inherit")}
                  maxLength={256}
                  name="Last-Name"
                  type="text"
                  autoComplete="family-name"
                  required
                />
              </label>
              <label className="relative flex w-full flex-col text-left">
                <span className={labelTextClass}>Phone Number</span>
                <input
                  className={cn(fieldClass, "text-inherit")}
                  maxLength={256}
                  name="Phone-Number"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Enter your phone number"
                  required
                />
              </label>
              {/* The live form has an empty fieldset here that takes up one grid row. */}
              <div aria-hidden="true" />
              <label
                htmlFor={`${id}-site`}
                className={cn(labelTextClass, "w-full text-left")}
              >
                Site of Pain
              </label>
              <select
                id={`${id}-site`}
                name="Site-of-Pain"
                value={site}
                onChange={(e) => setSite(e.target.value)}
                className={cn(
                  fieldClass,
                  "cursor-default",
                  site === "" ? "text-black/60" : "text-inherit",
                )}
              >
                <option value="">Select one...</option>
                {callback.siteOfPain.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <label
                htmlFor={`${id}-intensity`}
                className={cn(labelTextClass, "w-full text-left")}
              >
                Intensity of Pain
              </label>
              <select
                id={`${id}-intensity`}
                name="Intensity-of-Pain"
                required
                value={intensity}
                onChange={(e) => setIntensity(e.target.value)}
                className={cn(
                  fieldClass,
                  "cursor-default",
                  intensity === "" ? "text-black/60" : "text-inherit",
                )}
              >
                <option value="">Select one...</option>
                {callback.intensity.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap content-center items-center gap-fluid-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="relative inline-block cursor-pointer rounded-full border border-orange-500 bg-orange-500 shadow-[0_3px_0_0_#fed7aa] disabled:pointer-events-none disabled:opacity-50"
                >
                  <span className="relative flex h-full items-center justify-center gap-2 rounded-[inherit] border-[0.094rem] border-orange-500 bg-orange-500 px-6 py-[0.9rem] text-center align-middle leading-none text-white">
                    <span className="text-trim relative leading-[inherit] tracking-normal">
                      Submit
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </fieldset>
        </form>
        <div
          ref={doneRef}
          tabIndex={-1}
          role="status"
          className={cn(
            "w-full rounded-lg border-[0.094rem] border-[color-mix(in_srgb,var(--color-slate-600)_20%,transparent)] p-[1.2rem] text-center outline-none",
            status === "done" ? "block" : "hidden",
          )}
        >
          <div>{callback.success}</div>
        </div>
        <div
          ref={failRef}
          tabIndex={-1}
          role="alert"
          className={cn(
            "mt-[10px] w-full self-start rounded-lg border-[0.094rem] border-transparent bg-[#b10808] px-4 py-[0.2rem] text-white outline-none",
            status === "fail" ? "block" : "hidden",
          )}
        >
          <div>{callback.error}</div>
        </div>
      </div>
    </div>
  );
}
