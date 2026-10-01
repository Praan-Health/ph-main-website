/** Site-wide chrome content: navigation and the announcement bar. */

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
  badge?: string;
};

export const navigation: NavLink[] = [
  { label: "Conditions", href: "/condition" },
  { label: "Clinics", href: "/clinics" },
  { label: "Nutrition", href: "https://shop.praan.health", external: true, badge: "New" },
  { label: "For Families", href: "/for-families" },
  { label: "Health Pass", href: "/health-pass" },
  { label: "About", href: "/about" },
];

export const announcement = {
  href: "/health-pass",
  label: "Health Pass",
  price: "₹3,999",
  originalPrice: "₹8,999",
  cta: "Get one now",
};

export const logo = {
  src: "/images/logo-orange.webp",
  width: 156,
  height: 58,
  alt: "Praan Health",
};

export type SocialNetwork = "linkedin" | "instagram" | "youtube";

export const footer = {
  logo: { src: "/images/logo-dark.svg", width: 100, height: 37, alt: "Praan Health" },
  tagline: "Chronic care for ageing parents - even from far away.",
  social: [
    { network: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/praanhealth" },
    { network: "instagram", label: "Instagram", href: "https://www.instagram.com/praan_health" },
    { network: "youtube", label: "YouTube", href: "https://youtube.com/@praan_health/" },
  ] satisfies { network: SocialNetwork; label: string; href: string }[],
  quickLinks: [
    { label: "Terms", href: "/tnc" },
    { label: "Privacy", href: "/privacy" },
    { label: "Refund Policy", href: "/refund-policy" },
  ],
  contact: [
    // The live site links the phone number to an email address; it dials here instead.
    { kind: "phone", label: "+91 73494 32805", href: "tel:+917349432805" },
    // Shows care@ but emails support@ on the live site; kept until the team confirms which is intended.
    { kind: "email", label: "care@praan.health", href: "mailto:support@praan.health?subject=You%20have%20an%20email%20from%20Website" },
    { kind: "location", label: "Bangalore, India" },
  ] as { kind: "phone" | "email" | "location"; label: string; href?: string }[],
  copyright: "© 2026 Praan Healthcare. All rights reserved.",
};
