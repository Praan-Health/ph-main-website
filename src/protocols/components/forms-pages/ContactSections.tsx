import { Container } from "@/components/ui/Container";
import { SectionSpacer } from "@/components/ui/typography";
import { contactForm, contactPage } from "@/content/forms-pages";
import { Breadcrumbs } from "./Breadcrumbs";
import { FormField, SubmitButton } from "./FormControls";
import { SiteForm } from "./SiteForm";

/** Breadcrumbs and the contact form (First/Last name, email, phone, consent). */
export function ContactFormSection() {
  return (
    <section data-section="contact-form" className="relative flex flex-col items-stretch justify-center bg-white text-wrap text-slate-600">
      <div aria-hidden="true" className="h-(--spacing-margin)" />
      <Container>
        <Breadcrumbs current={contactPage.breadcrumb} />
        <div className="mt-7">
          <div className="mx-auto flex w-full flex-row">
            <SiteForm form={contactForm}>
              <fieldset className="@container relative w-full items-[inherit] justify-[inherit]">
                <div className="grid auto-cols-[1fr] grid-cols-[minmax(0,1fr)] items-stretch justify-[inherit] gap-x-(--spacing-gutter) gap-y-fluid-2">
                  {contactForm.fields.map((field) => (
                    <FormField key={field.name} field={field} />
                  ))}
                  <SubmitButton label={contactForm.submitLabel} />
                </div>
              </fieldset>
            </SiteForm>
          </div>
        </div>
      </Container>
      <SectionSpacer size="md" />
    </section>
  );
}
