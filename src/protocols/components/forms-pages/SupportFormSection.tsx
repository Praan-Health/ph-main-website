import { Container } from "@/components/ui/Container";
import { SectionHeading, SectionSpacer } from "@/components/ui/typography";
import { supportForm, supportPage } from "@/content/forms-pages";
import { Breadcrumbs } from "./Breadcrumbs";
import { FormField, SubmitButton } from "./FormControls";
import { SiteForm } from "./SiteForm";

/** /team-support: "How can we help?" and the support request form (half width on desktop). */
export function SupportFormSection() {
  return (
    <section data-section="support-form" className="relative flex flex-col items-stretch justify-center bg-white text-wrap text-slate-600">
      <div aria-hidden="true" className="h-(--spacing-margin)" />
      <Container>
        <Breadcrumbs current={supportPage.breadcrumb} />
        <SectionHeading className="mt-6 text-center text-wrap">{supportPage.heading}</SectionHeading>
        <p className="mt-5 py-1 text-center leading-[1.5] tracking-[0em] text-pretty">{supportPage.intro}</p>
        <div className="mt-7">
          <div className="mx-auto flex w-full flex-row md:w-1/2">
            <SiteForm form={supportForm}>
              <fieldset className="@container relative w-full items-[inherit] justify-[inherit]">
                <div className="grid auto-cols-[1fr] grid-cols-[minmax(0,1fr)] items-stretch justify-[inherit] gap-x-(--spacing-gutter) gap-y-fluid-2">
                  {supportForm.fields.map((field) => (
                    <FormField key={field.name} field={field} />
                  ))}
                </div>
              </fieldset>
              <fieldset className="@container relative -mt-[2.75rem] w-full items-[inherit] justify-[inherit]">
                <FormField field={supportForm.details} />
              </fieldset>
              <SubmitButton label={supportForm.submitLabel} centered />
            </SiteForm>
          </div>
        </div>
      </Container>
      <SectionSpacer size="md" />
    </section>
  );
}
