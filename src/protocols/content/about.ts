/** Copy and assets for /about, as on the live page. */

// Live reuses the site-wide Praan Clinics description on this page.
const description =
  "Praan Clinics extend your health journey with expert doctors, diagnostics, and lifestyle guidance in one dedicated space.";

export const aboutMeta = {
  title: "About",
  description,
  image: { url: "/images/preview.webp", width: 1200, height: 630 },
};

export const aboutHero = {
  breadcrumb: "About",
  heading: "Building continuous care for every home",
  body: "Most families wait until crisis to seek care. We believe continuous, doctor-led support at home can prevent escalation and restore dignity to aging and chronic illness.",
};

export const approach = {
  eyebrow: "Our approach",
  heading: "Care, built around real needs",
  cards: [
    {
      title: "Who we are",
      body: "Praan Health is built around a simple belief that care should not begin and end at the hospital. We help families improve aging and long-term health with clarity and consistent support.",
      image: "/images/group-1707479577.webp",
    },
    {
      title: "What We Do",
      body: "We provide continuous, doctor-guided care for aging parents, focused on managing chronic conditions. Helping families stay ahead, stay involved, and improve outcomes over time.",
      image: "/images/group-1707479578.webp",
    },
    {
      title: "How We Do It",
      body: "We practise doctor-led, evidence-based care - combining nutrition, lifestyle guidance, proactive monitoring and coordination, while ensuring families are informed at all times.",
      image: "/images/group-1707479579.webp",
    },
  ],
};

export const impact = {
  heading: "Our Impact",
  body: "Evidence-backed care designed to create meaningful health outcomes.",
  // Flowbase count-up targets; the page HTML shows the final value until the animation starts.
  stats: [
    { target: "87", suffix: "%", label: "Improvement in medication adherence within 3 months" },
    { target: "2.4", suffix: "x", label: "Increase in mobility scores through structured programs" },
    { target: "92", suffix: "%", label: "Family satisfaction with care continuity and visibility" },
    { target: "40", suffix: "%", label: "Reduction in emergency room visits over 6 months" },
  ],
  arrow: { src: "/images/vector-6.svg", width: 20, height: 20 },
};

export const medicalTeam = {
  eyebrow: "From our medical team",
  heading: "Rooted in medicine. Designed for everyday care.",
  body: "Praan is guided by doctors and care specialists who understand that aging is a continuous progression. Our protocols are built on clinical experience and evidence-based practices.",
  doctor: {
    role: "Chief Medical Officer",
    name: "Dr. Rachit Gulati",
    image: { src: "/images/dr-rachit-gulati-circle.webp", width: 222, height: 222 },
    quote:
      "We built Praan and its personalized care protocols to close the gap between routine check-ups and critical care. With proactive guidance and continuous monitoring, we help people stay healthier, and improve their quality of life.",
  },
};

export const featured = {
  heading: "Featured & Recognized",
  caption: "As Seen In",
  logos: [
    { src: "/images/frame-2147223545-2.webp", width: 590, height: 144, alt: "Entrepreneur" },
    { src: "/images/frame-2147223547.webp", width: 356, height: 144, alt: "Inc42" },
    { src: "/images/frame-2147223548.webp", width: 260, height: 144, alt: "Hindustan Times" },
    { src: "/images/frame-2147223546.webp", width: 560, height: 144, alt: "The Economic Times" },
  ],
};

export const aboutCta = {
  heading: "Start caring with clarity",
  body: "Give your parents the structured, doctor-guided support they need - without the uncertainty.",
  button: { label: "Start Your Journey", href: "https://cal.id/team/advisor/consultation-with-praan" },
};

/** The page's AboutPage JSON-LD, verbatim from live (including its placeholder phone number). */
export const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Praan Health",
  url: "/about",
  inLanguage: "en",
  description,
  about: {
    "@type": "Organization",
    name: "Praan Health",
    alternateName: "Praan Healthcare",
    description:
      "Praan Health provides continuous, doctor-guided care for aging parents, focused on managing chronic conditions. Helping families stay ahead, stay involved, and improve outcomes over time.",
    url: "/about",
    logo: {
      "@type": "ImageObject",
      url: "https://cdn.prod.website-files.com/69f0a8db5b4b69ce0e543f8d/6a0c0051f5253f19cda4dad0_Logo%20Orange.png",
    },
    slogan: "Building continuous care for every home",
    telephone: "+91 98765 43210",
    email: "care@praan.health",
    address: { "@type": "PostalAddress", addressLocality: "Bangalore", addressCountry: "IN" },
    employee: [
      {
        "@type": "Person",
        name: "Dr. Rachit Gulati",
        jobTitle: "Chief Medical Officer",
        image: {
          "@type": "ImageObject",
          url: "https://cdn.prod.website-files.com/69f0a8db5b4b69ce0e543f8d/6a0b4894cdce9f2490a2a157_Dr.%20Rachit%20Gulati%20-%20circle.png",
        },
        description:
          "We built Praan and its personalized care protocols to close the gap between routine check-ups and critical care. With proactive guidance and continuous monitoring, we help people stay healthier, and improve their quality of life.",
      },
    ],
  },
};
