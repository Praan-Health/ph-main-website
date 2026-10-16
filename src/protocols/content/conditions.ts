import data from "../json/conditions.json";

export type ConditionImage = { src: string; alt: string };

export type Condition = {
  id: string;
  slug: string;
  name: string;
  /** One-line summary (hero text and meta description). */
  summary: string;
  icon: ConditionImage;
  /** Hero banner photos; only some conditions have them (the others show the plain navy card). */
  banner: { desktop: ConditionImage | null; mobile: ConditionImage | null };
  /** Rich text (CMS HTML). */
  overview: string;
  approach: { heading: string; body: string }[];
  improvements: string[];
  /** Rich text (CMS HTML). */
  quote: string;
  /** Answers are rich text (CMS HTML). */
  faqs: { question: string; answer: string }[];
  featuredStory: string;
};

/** The 16 CMS conditions, in the order the live /condition list shows them. */
export const conditions = data as Condition[];

export function getCondition(slug: string) {
  return conditions.find((c) => c.slug === slug);
}

/** The Calendly-style consultation link every condition CTA points to. */
export const consultationUrl = "https://cal.id/team/advisor/consultation-with-praan";

/** Closing orange CTA on each condition page ("cta" component, without-logo variant). */
export const conditionCta = {
  heading: "Start with a conversation. We'll build the rest.",
  body: "Our care plans are designed to manage all your chronic conditions together",
  button: { label: "Book A Free Consultation", href: consultationUrl },
};

/* ------------------------------------------------------------------ */
/* /condition (the conditions index)                                   */
/* ------------------------------------------------------------------ */

export const conditionIndex = {
  hero: {
    heading: "Find the right care for what they’re going through",
    body: "From diabetes to multiple conditions managed together, continuously",
  },
  list: {
    heading: "Common Conditions",
    searchPlaceholder: "Search For Conditions",
    empty: {
      heading: "We couldn’t find that condition",
      body: "Try a different spelling or explore common conditions",
      image: { src: "/images/bggg.webp", width: 168, height: 140 },
    },
  },
  expert: {
    heading: "Not sure where you fit?",
    body: "Every health journey is different. Let our experts help you find the care that’s right for you.",
    button: { label: "Talk to a Care Expert", href: consultationUrl },
  },
  steps: {
    eyebrow: "How it works",
    heading: "How Care Begins",
    body: "What seems minor today can cascade into serious health issues tomorrow",
    items: [
      {
        title: "Book a consultation",
        body: "1:1 advisor consultation to define a personalized doctor-led plan of action for your parents' needs.",
      },
      {
        title: "Enrol into the program",
        body: "Start your loved ones on their journey to better health, strength and an improved quality of life.",
      },
      {
        // Live repeats step 1's description here.
        title: "Meet your care team",
        body: "1:1 advisor consultation to define a personalized doctor-led plan of action for your parents' needs.",
      },
      { title: "Track and stay connected", body: "Receive daily updates, progress reviews, and 24/7 support." },
    ],
  },
  help: {
    eyebrow: "HOW WE CAN HELP",
    heading: "Care that adapts to your family",
    // Live copy, including the lower-case "our".
    body: "Every family is different. our care approach is built around your loved one’s unique needs and evolves as they do.",
    /** Desktop/tablet 2×2 grid; titles and bodies carry the live line breaks. */
    cards: [
      {
        title: ["Strength", "coach at", "home"],
        body: ["No travel. They", "come to your parent."],
        image: "/images/card-1-4.webp",
      },
      { title: ["Doctor on", "WhatsApp"], body: ["In their language. Not quarterly."], image: "/images/card-2-3.webp" },
      { title: ["Walk-in", "Clinic"], body: ["No appointment", "required."], image: "/images/card-3-3.webp" },
      { title: ["Reports Sent", "To You"], body: ["Labs, vitals,", "attendance."], image: "/images/card-6.webp" },
    ],
    /** Phone slider (below 480px): different line breaks and photos. */
    slides: [
      { title: ["Strength coach", "at home"], body: ["No travel. They come to", "your parent."], image: "/images/card-7.webp" },
      { title: ["Doctor on WhatsApp"], body: ["In their language. Not", "quarterly."], image: "/images/card-1-5.webp" },
      { title: ["Walk-in Clinic"], body: ["No appointment", "required."], image: "/images/card-2-4.webp" },
      { title: ["Reports Sent To You"], body: ["Labs, vitals, attendance."], image: "/images/card-3-4.webp" },
    ],
  },
  /** The featured patient journey card (a separate CMS collection on live; its data is not in our JSON). */
  journey: {
    story: "chandrasekhar-m",
    image: { src: "/images/screenshot-2026-05-19-at-3-39-53-pm.webp", width: 536, height: 494 },
    week: "Week 12",
    heading: "From complex comorbidities to measurable metabolic recovery.",
    conditions: ["High Cholesterol", "Hypertension", "Heart Disease", "Diabetes"],
    metrics: [
      {
        value: "12%",
        up: true,
        label: "Reduction in HbA1c",
        desktop: { src: "/images/frame-2147223606.webp", width: 450, height: 132 },
        mobile: { src: "/images/frame-2147223368.webp", width: 307, height: 132 },
      },
      {
        value: "7 kg",
        up: false,
        label: "Reduced through lifestyle modification",
        desktop: { src: "/images/frame-2147223460-4.webp", width: 338, height: 99 },
        mobile: { src: "/images/frame-2147223369.webp", width: 307, height: 132 },
      },
    ],
    body: "At 73, with diabetes, hypertension, and a history of cardiac disease, he believed decline was inevitable. In just 90 days with Praan Health, he lost 7 kg, dropped his HbA1c from 8.1% to 7.1%, regained energy, and prevented a hidden kidney risk early.",
  },
  team: {
    eyebrow: "Your parent's team",
    heading: "Led by a Team That Cares",
    body: "Multi-disciplinary experts with deep clinical experience.",
  },
  cta: {
    heading: "Have multiple conditions?",
    body: "Our care plans are designed to manage all your chronic conditions together",
    button: { label: "Start Your Journey", href: consultationUrl },
  },
};
