import { asset } from '../lib/asset'

// All homepage copy lives here so it can be edited without touching layout code.
// Items marked TODO are placeholders that need real content/assets.

// TODO: replace with the real Cal.com booking link for Praan Advisors.
export const CAL_URL = 'https://cal.id/team/advisor/consultation-with-praan'

// Pain areas the hero eyebrow types through.
export const HERO_PAIN_AREAS = ['back pain', 'knee pain', 'shoulder pain', 'neck pain'] as const

// "Request Callback" opens the callback form on the Clinics page.
export const CALLBACK_HREF = asset('/clinics/?callback=1')

// Nutrition is sold on the shop; the Nutrition section's CTA and the nav link open it.
export const SHOP_URL = 'https://shop.praan.health'

// Daily Movement sessions are booked on their own site.
export const EVERYDAY_URL = 'https://everyday.praan.health'

// Services is the clinic first; protocols and nutrition sit under it as sub-tabs.
export interface NavLink {
  label: string
  href: string
  tag?: string
  external?: boolean
  children?: readonly NavLink[]
}

export const NAV_LINKS: readonly NavLink[] = [
  {
    label: 'Services',
    href: asset('/clinics/'),
    children: [
      { label: 'Clinics', href: asset('/clinics/') },
      { label: 'Protocols', href: asset('/protocols/') },
      { label: 'Nutrition', href: SHOP_URL, tag: 'New', external: true },
    ],
  },
  { label: 'About', href: asset('/about/') },
]

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

// The three parts of holistic pain management, in the order a patient moves through them. Each
// step's media slot shows `poster` until a `video` is supplied.
// TODO: add the card videos (set `video` to a path under /public) when they arrive.
export const PILLARS = [
  {
    id: 'consultation',
    tab: 'Understanding your pain', // short label on the left-hand list
    href: asset('/clinics/'),
    title: 'Doctor review and analysis',
    body: 'Your doctor understands your pain and suggests interventional, non-surgical care if required.',
    poster: asset('/assets/6a0de0c1c1e0593386b2be34_clinic-bg.webp'),
    posterPosition: '50% 50%',
    video: undefined as string | undefined,
  },
  {
    id: 'rehab',
    tab: 'Rehabilitating', // short label on the left-hand list
    href: asset('/protocols/'),
    title: 'Physiotherapy rehab',
    body: 'We rehabilitate the affected area through physiotherapy so movement comes back.',
    poster: asset('/assets/ui/Card.webp'),
    posterPosition: '50% 100%',
    video: undefined as string | undefined,
  },
  {
    id: 'strength',
    tab: 'Long term relief from pain', // short label on the left-hand list
    href: asset('/protocols/'),
    title: 'Strength and nutrition',
    body: 'Strength training and nutrition for long-term pain relief and to manage the conditions behind it.',
    poster: asset('/assets/nutrition-bg.webp'),
    posterPosition: '78% 55%',
    video: undefined as string | undefined,
  },
] as const

// Clinic and programme numbers shown near the top of the homepage.
export const CLINIC_STATS = [
  { value: '4.9★', label: 'Rated on Google' },
  { value: '800+', label: 'Patients helped in 2 months' },
  { value: '7.5K+', label: 'Families helped' },
] as const

// TODO: add each doctor's photo when they arrive. `photo` falls back to initials.
export const DOCTORS = [
  { name: 'Dr. Prajwal Venugopal', role: 'Chief Medical Officer', photo: undefined as string | undefined },
  { name: 'Dr. Anindya Debnath', role: 'FIPM Rehab Specialist', photo: undefined as string | undefined },
  { name: 'Dr. Arpitha K', role: 'Pain Specialist', photo: undefined as string | undefined },
  { name: 'Dr. Yashvanth Gowda', role: 'Pain Physician', photo: undefined as string | undefined },
  { name: 'Dr. Milan Prathipal', role: 'Internal Medicine', photo: undefined as string | undefined },
] as const

// TODO: confirm each specialist's one-line description with the clinical team.
// x / y are the node centre as a % of the diagram box (see CareTeamDiagram).
export const CARE_TEAM = [
  { id: 'coordinator', role: 'Care Coordinator', does: 'With you at every step', x: 50, y: 9 },
  { id: 'dietician', role: 'Dietician', does: 'Nutrition for the root cause', x: 84, y: 36 },
  { id: 'trainer', role: 'Strength Trainer', does: 'Strength that keeps pain away', x: 75, y: 87 },
  { id: 'physio', role: 'Physiotherapist', does: 'Rehabilitates the area', x: 25, y: 87 },
  { id: 'counsellor', role: 'Counsellor', does: 'Mind, mood and motivation', x: 16, y: 36 },
] as const

// The patient's path, in order. Each step has a picture beside it; `cutout` pictures are transparent
// people shown on a tinted panel, the rest are photographs that fill it.
// TODO: replace the placeholder pictures with photos or short videos of each step.
export const JOURNEY_STEPS = [
  {
    id: 'understand',
    title: 'We understand your pain',
    who: 'Doctor',
    does: 'Your doctor listens, reviews your history and finds the cause of your pain.',
    image: asset('/assets/6a6acab5e27bb0574e45713d_header-image.jpg'),
    cutout: false,
    position: '50% 50%',
  },
  {
    id: 'treat',
    title: 'We treat it, without surgery',
    who: 'Doctor',
    does: 'If needed, a minimally invasive procedure such as PRP or RFA targets the source.',
    image: asset('/assets/6a0de0c1c1e0593386b2be34_clinic-bg.webp'),
    cutout: false,
    position: '50% 50%',
  },
  {
    id: 'rehab',
    title: 'We rebuild your movement',
    who: 'Physiotherapist',
    does: 'Guided physiotherapy rehabilitates the affected area so everyday movement comes back.',
    image: asset('/assets/ui/Card.webp'),
    cutout: false,
    position: '50% 70%',
  },
  {
    id: 'strengthen',
    title: 'We keep the pain away',
    who: 'Strength trainer and dietician',
    does: 'Strength training and nutrition manage the conditions behind your pain for the long term.',
    image: asset('/assets/daily-movement.webp'),
    cutout: true,
    position: '50% 100%',
  },
  {
    id: 'relief',
    title: 'You get back to living',
    who: 'You, with your care coordinator beside you',
    does: 'Less pain, more movement, and a team that keeps checking in.',
    image: asset('/assets/6a0b0af0686e8aac45bd1234_daddi.webp'),
    cutout: true,
    position: '50% 100%',
  },
] as const

export const NUMBERS = [
  { value: '7.5k+', label: 'Families served' },
  { value: '108+', label: 'Cities' },
  { value: '1.2L+', label: 'Sessions delivered' },
  { value: '84%', label: 'Graduate to independent routines' },
] as const
