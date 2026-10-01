/**
 * Copy and form definitions for /contact, /team-support and /thankyou, as published on praan.health.
 * Live copy is reproduced verbatim (including its mistakes); see the notes on each form.
 */

const DESCRIPTION =
  "Praan Clinics extend your health journey with expert doctors, diagnostics, and lifestyle guidance in one dedicated space.";

export const pageMeta = {
  contact: { title: "Contact", description: DESCRIPTION, ogImage: "/images/preview.webp" },
  teamSupport: {
    title: "Contact Support | Praan Health",
    description:
      "Need help with a refund, account deletion, or a callback? Reach the Praan Health support team and we'll get back to you.",
  },
  thankyou: { title: "Thankyou", description: DESCRIPTION, ogImage: "/images/preview.webp" },
};

/** Hidden attribution fields every site form carries (filled from the URL / sessionStorage). */
export const utmFieldNames = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "ref", "source", "campaign"] as const;

export type FormFieldDef =
  | {
      kind: "input";
      /** Webflow `data-name`: the key the submission is stored under. */
      name: string;
      label: string;
      type: "text" | "email" | "tel";
      id: string;
      inputMode?: "numeric";
      /** Span both columns of the form grid (Webflow `grid-area: span 1 / span 2`). */
      wide: boolean;
    }
  | { kind: "select"; name: string; label: string; id: string; placeholder: string; options: { value: string; label: string }[] }
  | { kind: "textarea"; name: string; label: string; id: string; placeholder: string; maxLength: number }
  | { kind: "consent"; name: string; id: string; text: string; linkText: string; href: string };

export type FormDef = {
  /** Stored as the submission's formName. */
  formName: string;
  /** Webflow's `data-redirect`: where the browser goes after a successful submission. */
  redirect?: string;
  submitLabel: string;
  successText: string;
  errorText: string;
};

const SUCCESS = "Thank you! Your submission has been received!";
const ERROR = "Oops! Something went wrong while submitting the form.";

// Both live forms redirect to the Health Pass payment page on success (their `data-redirect`), not to
// /thankyou. That is a live bug, reproduced here; change `redirect` to "/thankyou" to fix it.
const LIVE_REDIRECT = "https://pages.razorpay.com/healthpass";

export const contactForm: FormDef & { fields: FormFieldDef[] } = {
  formName: "Contact Form",
  redirect: LIVE_REDIRECT,
  submitLabel: "Submit",
  successText: SUCCESS,
  errorText: ERROR,
  fields: [
    { kind: "input", name: "First Name", label: "First Name", type: "text", id: "First-Name", wide: true },
    { kind: "input", name: "Last Name", label: "Last Name", type: "text", id: "Last-Name", wide: true },
    { kind: "input", name: "Email", label: "Email Address", type: "email", id: "email", wide: true },
    { kind: "input", name: "Phone", label: "Phone Number", type: "tel", id: "phoneNumber", inputMode: "numeric", wide: true },
    { kind: "consent", name: "Checkbox", id: "checkbox", text: "I agree to the", linkText: "terms", href: "/tnc" },
  ],
};

// Live, this form's data-name is also "Contact Form" (copied from /contact); it is stored under its
// own name here so support requests can be told apart.
export const supportForm: FormDef & { fields: FormFieldDef[]; details: FormFieldDef } = {
  formName: "Team Support Form",
  redirect: LIVE_REDIRECT,
  submitLabel: "Submit Request",
  successText: SUCCESS,
  errorText: ERROR,
  fields: [
    { kind: "input", name: "First Name", label: "Full Name", type: "text", id: "Full-Name", wide: true },
    { kind: "input", name: "Email", label: "Email Address", type: "email", id: "email", wide: true },
    { kind: "input", name: "Phone", label: "Phone Number", type: "tel", id: "phoneNumber", inputMode: "numeric", wide: true },
    {
      kind: "select",
      name: "Issue Type",
      label: "What can we help with?",
      id: "issueType",
      placeholder: "Select an issue",
      options: [
        { value: "Refund", label: "Refund" },
        { value: "Account Deletion", label: "Account deletion" },
        { value: "Callback Request", label: "Request a callback" },
        { value: "Billing Query", label: "Billing query" },
        { value: "Appointment or Booking Issue", label: "Appointment or booking issue" },
        { value: "Technical Issue", label: "Technical issue" },
        { value: "Other", label: "Other" },
      ],
    },
  ],
  details: {
    kind: "textarea",
    name: "Additional Details",
    label: "Tell us more",
    id: "Additional-Details",
    placeholder: "e.g. I was charged twice for my Health Pass renewal on 12 Aug and need the extra payment refunded.",
    maxLength: 5000,
  },
};

export const contactPage = {
  founder: {
    eyebrow: "From Our Founder",
    heading: "Why today's Elder care system is broken",
    body: "The gap between hospital visits and home care leaves ageing parents managing chronic conditions alone, without the support they need.",
    video: {
      src: "https://www.youtube.com/embed/ucvNztFm9_U?rel=0&controls=1&autoplay=0&mute=0&start=0",
      title: "Praan Health, explained by our Founder, Mr. Navneeth.",
    },
    paragraphs: [
      "Praan was built to close this gap - by bringing together medical care, daily habits, and continuous monitoring into one connected system.",
      "Instead of reacting to problems, families can stay ahead with the visibility, guidance, and support needed to manage health over time.",
    ],
  },
  investors: {
    heading: "Investors who share our vision",
    logos: [
      { src: "/images/frame-2147223543.webp", width: 342, height: 144 },
      { src: "/images/frame-2147223545.webp", width: 340, height: 144 },
      { src: "/images/frame-2147223539.webp", width: 356, height: 144 },
    ],
  },
  breadcrumb: "Contact",
  cta: {
    heading: "Start caring with clarity",
    body: "Give your parents the structured, doctor-guided support they need - without the uncertainty.",
    // Live links to "#" in a new tab (the button was wired to a popup that isn't on this page).
    button: { label: "Start Your Journey", href: "#" },
  },
};

export const supportPage = {
  breadcrumb: "Support",
  heading: "How can we help?",
  intro: "Tell us what's going on and our support team will get back to you within 1 business day.",
};

export const thankyouPage = {
  heading: "Thank you for sharing your needs",
  body: "Our care advisor will reach out to you shortly!",
  faq: {
    heading: "Frequently Asked",
    headingAccent: "Questions",
    items: [
      {
        question: "Is this protocol safe if my parents have chronic conditions?",
        answer:
          "Yes. Most of our members are between 45-75, often with pre-existing conditions.  Safety is our first priority, and all diet and exercise plans are medically cleared and closely monitored. Any discomfort or change in symptoms triggers immediate review and adjustment.",
      },
      {
        question: "What kind of results can we expect? How are they measured?",
        answer:
          "Most clients notice better energy, sleep, and mobility in 4-6 weeks. Over 3 months, we often see measurable improvements in strength, stamina, lab markers, and in some cases, reduced dependency on certain medications (with doctor guidance). Quantitatively, we assess improvements through blood tests and biomarker analysis at the start and end of the program. Qualitatively, we measure changes in strength, mobility, energy, and lifestyle through assessments and client feedback, capturing both medical outcomes and real-life improvements.",
      },
      {
        question: "Will my parents need to stop or change their current medication?",
        answer:
          "Never without medical supervision. Our doctors work alongside their existing physician, and if health improves, medications may be reduced safely.",
      },
      {
        question: "Who will be part of my parents' care team?",
        answer:
          "Depending on their needs, the team can include: a primary doctor, clinical nutritionist, strength coach, and mental health professional - all coordinated under our Chief Medical Officer. Our doctors have specializations with 10+yrs experience. Nutritionists and psychologists are MSc qualified, and strength coaches are certified for elderly care.",
      },
    ],
  },
  cta: {
    heading: ["Take Control of Your", "Health"] as const,
    body: "Praan Clinics extend your health journey with expert doctors, diagnostics, and lifestyle guidance in one dedicated space.",
    button: { label: "Book Free Consultation", href: "https://cal.id/team/advisor/consultation-with-praan" },
  },
};
