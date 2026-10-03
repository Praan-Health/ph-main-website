import { asset } from '../lib/asset'

// All homepage copy lives here so it can be edited without touching layout code.
// Items marked TODO are placeholders that need real content/assets.

// TODO: replace with the real Cal.com booking link for Praan Advisors.
export const CAL_URL = 'https://cal.id/team/advisor/consultation-with-praan'

export const HERO_CONDITIONS = [
  'Diabetes',
  'Blood pressure',
  'Thyroid',
  'Heart health',
  'Menopause',
  'Joint pain',
] as const

// Nutrition is sold on the shop; the Nutrition section's CTA and the nav link open it.
export const SHOP_URL = 'https://shop.praan.health'

// Daily Movement sessions are booked on their own site.
export const EVERYDAY_URL = 'https://everyday.praan.health'

// Each link opens its own page (built here or, for the shop, external).
export const NAV_LINKS = [
  { label: 'Protocols', href: asset('/protocols/') },
  { label: 'Clinics', href: asset('/clinics/') },
  { label: 'Nutrition', href: SHOP_URL, tag: 'New', external: true },
  { label: 'About', href: asset('/about/') },
] as const

// Same profiles as the live praan.health footer.
export const SOCIAL_LINKS = [
  { network: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/praanhealth' },
  { network: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/praan_health' },
  { network: 'youtube', label: 'YouTube', href: 'https://youtube.com/@praan_health/' },
] as const

// Footer columns. Services open the pages built here (or the shop); quick links open the legal and support pages built here.
export const FOOTER_SERVICES = [
  { label: 'Protocols', href: asset('/protocols/') },
  { label: 'Clinics', href: asset('/clinics/') },
  { label: 'Nutrition', href: SHOP_URL, external: true },
] as const

export const FOOTER_QUICK_LINKS = [
  { label: 'Terms', href: asset('/tnc/') },
  { label: 'Privacy', href: asset('/privacy/') },
  { label: 'Refund Policy', href: asset('/refund-policy/') },
  { label: 'Support', href: asset('/team-support/') },
] as const

// Same details as the live footer. The email address shown is care@, but the live site mails support@.
export const FOOTER_CONTACT = [
  { kind: 'whatsapp', label: '+91 73494 32805', href: 'https://wa.me/917349432805' },
  { kind: 'email', label: 'care@praan.health', href: 'mailto:support@praan.health?subject=You%20have%20an%20email%20from%20Website' },
] as const

// Each pillar's media slot shows `poster` until a `video` is supplied.
// TODO: add the card videos (set `video` to a path under /public) when they arrive.
export const PILLARS = [
  {
    id: 'protocols',
    title: 'Protocols',
    body: 'Doctor-led, at-home and online 1:1 strength training and rehabilitation.',
    poster: asset('/assets/ui/Card.webp'),
    posterPosition: '50% 100%',
    video: undefined as string | undefined,
  },
  {
    id: 'clinics',
    title: 'Clinics',
    body: 'Non-surgical treatment for lasting relief from chronic pain.',
    poster: asset('/assets/6a6acab5e27bb0574e45713d_header-image.jpg'),
    posterPosition: '60% 50%',
    video: undefined as string | undefined,
  },
  {
    id: 'nutrition',
    title: 'Nutrition',
    body: 'Everyday nutrition that supports active ageing.',
    poster: asset('/assets/nutrition-bg.webp'),
    posterPosition: '78% 55%',
    video: undefined as string | undefined,
  },
] as const

// TODO: confirm each specialist's one-line description with the clinical team.
// x / y are the node centre as a % of the diagram box (see CareTeamDiagram).
export const CARE_TEAM = [
  { id: 'coordinator', role: 'Care Coordinator', does: 'Books, tracks and follows up', x: 50, y: 9 },
  { id: 'dietician', role: 'Dietician', does: 'Weekly meal plan reviews', x: 84, y: 36 },
  { id: 'trainer', role: 'Strength Trainer', does: 'Guided sessions, 3× a week', x: 75, y: 87 },
  { id: 'physio', role: 'Physiotherapist', does: 'Rehab and pain relief', x: 25, y: 87 },
  { id: 'counsellor', role: 'Counsellor', does: 'Mind, mood and motivation', x: 16, y: 36 },
] as const

export const NUMBERS = [
  { value: '7.5k+', label: 'Families served' },
  { value: '108+', label: 'Cities' },
  { value: '1.2L+', label: 'Sessions delivered' },
  { value: '84%', label: 'Graduate to independent routines' },
] as const

// TODO: confirm the specialities list with the clinical team.
export const SPECIALITIES = [
  'Knee pain',
  'Back & neck pain',
  'Arthritis',
  'Sciatica',
  'Shoulder pain',
  'Sports & muscle injury',
  'Post-surgery recovery',
  'Osteoporosis',
] as const

