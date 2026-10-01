/** Homepage content. */

export const hero = {
  headingBefore: "Get Your Parents'",
  headingAfter: "Under Control",
  // Non-breaking spaces keep multi-word conditions on one line while they animate.
  conditions: ["Diabetes", "Blood Pressure", "Thyroid", "Heart Disease", "Menopause", "Sarcopenia", "High Cholesterol", "Arthritis"],
  body: "Through a dedicated doctor managing their exercise, diet, and medicines - extending care beyond your presence.",
  cta: { label: "Book Free Consultation", href: "https://cal.id/team/advisor/consultation-with-praan" },
  image: { src: "/images/daddi.webp", width: 986, height: 1316, alt: "" },
  bubbles: [
    { src: "/images/bubble-1.webp", width: 671, height: 751, alt: "" },
    { src: "/images/bubble-2.webp", width: 421, height: 422, alt: "" },
  ],
};

export const familiar = {
  eyebrow: "Sounds Familiar?",
  heading: "You already know something's",
  headingAccent: "not right.",
  body: "You hear it every week. But you're never completely sure.",
  images: [
    { src: "/images/container-3.webp", width: 580, height: 616, alt: "" },
    { src: "/images/container-2-2.webp", width: 553, height: 545, alt: "" },
  ],
  caption: "With Praan, one dedicated doctor manages all their conditions and keeps you regularly informed.",
};

export const results = {
  eyebrow: "Real Results, Real People",
  headingLines: ["What changes", "in"],
  headingAccent: "90 days",
};

export const howItWorks = {
  eyebrow: "How it works",
  headingLines: ["One doctor runs", "everything. The team"],
  headingAccent: "delivers it.",
  body: "In person and online, wherever your parent is.",
  cards: [
    {
      title: "Strength Training",
      // Same copy as Nutrition Plan on the live site; likely needs its own description.
      body: "Built around their conditions, their meds, and what they'll actually eat.",
      image: { desktop: "/images/card-1.webp", mobile: "/images/card-1-2.webp" },
    },
    {
      title: "Doctor on WhatsApp",
      body: "Knows their full history. Stays on it weekly. Available on phone.",
      image: { desktop: "/images/card-2.webp", mobile: "/images/card-2-2.webp" },
    },
    {
      title: "Nutrition Plan",
      body: "Built around their conditions, their meds, and what they'll actually eat.",
      image: { desktop: "/images/card-3.webp", mobile: "/images/card-3-2.webp" },
    },
    {
      title: "Reports Sent To You",
      body: "What's improving, what's not — in plain language, every month.",
      image: { desktop: "/images/card.webp", mobile: "/images/card-4.webp" },
    },
  ],
};

export const team = {
  eyebrow: "Your parent's team",
  heading: "Faces, not just",
  headingAccent: "credentials",
  body: "In person and online, wherever your parent is.",
};

export const stats = [
  // `initial` is the number in the page HTML before the count-up runs; the live site counts to `target`.
  // Live shows "108" in the HTML but counts up to 26 for "Cities globally".
  { initial: "7.5", target: "7.5", suffix: "k+", label: "Families worked with", image: { src: "/images/frame-1707479556.svg", width: 119, height: 63 } },
  { initial: "1.2", target: "1.2", suffix: "L+", label: "Sessions conducted", image: { src: "/images/frame-1707479556-1.svg", width: 134, height: 64 } },
  { initial: "240", target: "240", suffix: "+", label: "Experts", image: { src: "/images/frame-2147223460.svg", width: 130, height: 62 } },
  { initial: "108", target: "26", suffix: "+", label: "Cities globally", image: { src: "/images/frame-2147223461.svg", width: 108, height: 63 } },
];

export const findYourPlan = {
  eyebrow: "Find your plan",
  headingLines: ["Is Praan Health the", "right fit"],
  headingAccent: "for you?",
  body: "Book a consultation with our Praan Advisor and get started.",
  calLink: "team/advisor/consultation-with-praan",
  clinics: {
    heading: "Praan Clinics",
    body: "Praan Clinics extend your health journey with expert doctors, diagnostics, and lifestyle guidance in one dedicated space.",
    note: "Coming soon!",
  },
};

export const faq = {
  heading: "Frequently Asked",
  headingAccent: "Questions",
  items: [
    {
      question: "Is this protocol safe if my parents have chronic conditions?",
      answer:
        "Yes. Most of our members are between 45-75, often with pre-existing conditions. Safety is our first priority, and all diet and exercise plans are medically cleared and closely monitored. Any discomfort or change in symptoms triggers immediate review and adjustment.",
    },
    {
      question: "What kind of results can we expect? How are they measured?",
      answer:
        "Most clients notice better energy, sleep, and mobility in 4-6 weeks. Over 3 months, we often see measurable improvements in strength, stamina, lab markers, and in some cases, reduced dependency on certain medications (with doctor guidance). Quantitatively, we assess improvements through blood tests and biomarker analysis at the start and end of the program. Qualitatively, we measure changes in strength, mobility, energy, and lifestyle through assessments and client feedback, capturing both medical outcomes and real-life improvements.",
    },
    {
      question: "Will my parents need to stop or change their current medication?",
      answer: "Never without medical supervision. Our doctors work alongside their existing physician, and if health improves, medications may be reduced safely.",
    },
    {
      question: "Who will be part of my parents' care team?",
      answer:
        "Depending on their needs, the team can include: a primary doctor, clinical nutritionist, strength coach, and mental health professional - all coordinated under our Chief Medical Officer. Our doctors have specializations with 10+yrs experience. Nutritionists and psychologists are MSc qualified, and strength coaches are certified for elderly care.",
    },
  ],
};

export const cta = {
  heading: ["Take Control of Your", "Health"] as const,
  // Same copy as the Praan Clinics card above; kept as on live.
  body: "Praan Clinics extend your health journey with expert doctors, diagnostics, and lifestyle guidance in one dedicated space.",
  button: { label: "Book Free Consultation", href: "https://cal.id/team/advisor/consultation-with-praan" },
};
