import Link from "next/link";
import { cn } from "@/lib/cn";
import type { FormFieldDef } from "@/content/forms-pages";

/*
 * Form controls from the Lumos form component on praan.health (form_label_wrap / form_field / form_ui_label).
 * Webflow's `.w-input:focus` rule turns the border #3898ec on focus and removes the outline; kept as is.
 */

const fieldBase =
  "block h-12 w-full appearance-none rounded-sm border-[.094rem] border-solid border-navy-200 bg-transparent px-[.9rem] font-sans text-[1.125rem] leading-[1.5] font-normal tracking-[0em] text-inherit placeholder:text-slate-600/60 focus:border-[#3898ec] focus:outline-none";

const SELECT_ARROW = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232F387F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`;

// Webflow's grid-area: span 1 / span 2 (every field except the support form's select spans both columns).
export const spanBoth = "[grid-area:span_1/span_2/span_1/span_2]";

function LabelText({ children }: { children: React.ReactNode }) {
  return <span className="mb-fluid-1 inline-block">{children}</span>;
}

/** A labelled input, select or textarea (the consent checkbox is `ConsentCheckbox`). */
export function FormField({ field }: { field: FormFieldDef }) {
  if (field.kind === "consent") return <ConsentCheckbox field={field} />;
  const wide = field.kind === "input" && field.wide;
  return (
    <label data-trigger="focus" className={cn("relative flex w-full flex-col text-left", wide && spanBoth)}>
      <LabelText>{field.label}</LabelText>
      {field.kind === "input" && (
        <input
          className={fieldBase}
          maxLength={256}
          name={field.name}
          data-name={field.name}
          placeholder=""
          type={field.type}
          id={field.id}
          inputMode={field.inputMode}
          required
        />
      )}
      {field.kind === "select" && (
        <select
          id={field.id}
          name={field.name}
          data-name={field.name}
          required
          defaultValue=""
          style={{ backgroundImage: SELECT_ARROW }}
          className={cn(
            fieldBase,
            "cursor-pointer bg-size-[12px] bg-position-[97%] bg-no-repeat pr-[2.25rem]",
            // Lumos: a select still on its empty placeholder option is drawn at 60% text colour.
            "has-[option[value='']:checked]:text-slate-600/60",
          )}
        >
          <option value="">{field.placeholder}</option>
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )}
      {field.kind === "textarea" && (
        <textarea
          required
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          id={field.id}
          name={field.name}
          data-name={field.name}
          className={cn(fieldBase, "h-auto min-h-20 w-full max-w-full min-w-full pt-2")}
        />
      )}
    </label>
  );
}

/**
 * Webflow custom checkbox: the real input is hidden behind a drawn box, which turns orange with a tick
 * when checked. The label keeps Webflow's clearfix ::before/::after (flex items that add to the gaps),
 * which the box's -20px left margin cancels out.
 */
function ConsentCheckbox({ field }: { field: Extract<FormFieldDef, { kind: "consent" }> }) {
  return (
    <fieldset className={cn("@container relative w-full", spanBoth)}>
      <label className="group relative mb-0 flex items-center justify-start gap-2 pl-3 transition-all duration-200 before:table before:content-['_'] after:table after:content-['_']">
        <div
          aria-hidden="true"
          className="mt-1 -ml-5 flex aspect-square size-[1.6rem] flex-none cursor-pointer items-center justify-center rounded-sm border-[.094rem] border-solid border-slate-600/20 bg-transparent bg-center bg-size-[contain] p-0 text-white transition-all duration-200 group-has-[input:checked]:border-[#fd7217] group-has-[input:checked]:bg-[#fd7217] group-has-[input:checked]:bg-[url(/images/check.png)]"
        />
        <input type="checkbox" id={field.id} name={field.name} data-name={field.name} required className="absolute -z-1 opacity-0" />
        <span className="mb-0 inline-block cursor-pointer font-normal">
          {field.text}{" "}
          <Link href={field.href} className="underline">
            {field.linkText}
          </Link>
        </span>
      </label>
    </fieldset>
  );
}

/** The Lumos primary button (button_main_wrap): an orange pill with a peach under-shadow. */
export function SubmitButton({ label, centered = false }: { label: string; centered?: boolean }) {
  return (
    <div className={cn("flex flex-wrap content-center items-center gap-fluid-2", centered ? "-mt-10 justify-center" : "justify-[inherit]")}>
      <div
        data-button=" "
        className="relative inline-block rounded-[62.4375rem] border border-solid border-orange-500 bg-orange-500 bg-[linear-gradient(180deg,rgba(255,255,255,0)_59.52%,rgba(255,255,255,0.2)_121.43%)] shadow-[0_3px_0_0_#fed7aa] has-[button:disabled]:pointer-events-none has-[button:disabled]:opacity-50"
      >
        <div className="absolute inset-0 z-3 size-full rounded-[inherit]">
          <button type="submit" aria-label={label} className="absolute inset-0 size-full cursor-pointer rounded-[inherit] bg-transparent p-0" />
        </div>
        <div className="relative flex h-full items-center justify-center gap-2 rounded-[inherit] border-[.094rem] border-solid border-orange-500 bg-orange-500 px-6 py-[.9rem] text-center align-middle leading-none text-white transition-all duration-200">
          <div aria-hidden="true" className="text-trim relative text-(length:--text-fluid-body) leading-[inherit] font-normal tracking-normal text-pretty">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}
