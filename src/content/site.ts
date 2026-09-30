// All homepage copy lives here so it can be edited without touching layout code.
// Items marked TODO are placeholders that need real content/assets.

// TODO: replace with the real Cal.com booking link for Praan Advisors.
export const CAL_URL = 'https://cal.com/praan-health/advisor-call'

export const HERO_CONDITIONS = [
  'Diabetes',
  'Blood pressure',
  'Thyroid',
  'Heart health',
  'Menopause',
  'Joint pain',
] as const

export const NAV_LINKS = [
  { label: 'Protocols', href: '#protocols' },
  { label: 'Clinics', href: '#clinics' },
  { label: 'Nutrition', href: '#nutrition', tag: 'New' },
  { label: 'Health Pass', href: '#health-pass' },
  { label: 'About', href: '#about' },
] as const

// Health Pass lives in the footer and the Clinics section, not the header.
export const HEADER_LINKS = NAV_LINKS.filter((link) => link.href !== '#health-pass')

export const PILLARS = [
  {
    id: 'protocols',
    title: 'Protocols',
    body: 'Doctor-led, at-home and online 1:1 strength training and rehabilitation.',
    image: '/assets/ui/Card.webp',
  },
  {
    id: 'clinics',
    title: 'Clinics',
    body: 'Non-surgical treatment for lasting relief from chronic pain.',
    image: '/assets/6a0b0af0686e8aac45bd1234_daddi.webp',
  },
  {
    id: 'nutrition',
    title: 'Nutrition',
    body: 'Everyday nutrition that supports active ageing.',
    image: '/assets/ui/Card-2.webp',
  },
] as const

export const CARE_TEAM = [
  'Care Coordinator',
  'Dietician',
  'Strength Trainer',
  'Physiotherapist',
  'Counsellor',
] as const

export const PROTOCOL_DELIVERY = [
  { value: '100+', label: 'markers covered in diagnostics' },
  { value: 'Monthly', label: 'doctor consultations' },
  { value: 'Weekly', label: 'dietician reviews' },
  { value: '3×', label: 'strength training every week' },
] as const

export const NUMBERS = [
  { value: '7.5k+', label: 'Families served' },
  { value: '108+', label: 'Cities' },
  { value: '1.2L+', label: 'Sessions delivered' },
  // TODO: replace with the real graduation rate.
  { value: 'XX%', label: 'Graduate to independent routines' },
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

export const HEALTH_PASS = {
  price: '₹3,999',
  was: '₹8,999',
  // TODO: confirm the benefits list against the Health Pass details page.
  benefits: [
    'Doctor consultation with a specialist',
    'Diagnostics and a movement assessment',
    'A personalised care plan',
    'Priority booking at Praan Clinics',
  ],
} as const

// TODO: swap placeholder imagery for the daily protein powder and protein mix shots.
export const NUTRITION_PRODUCTS = [
  { name: 'Daily Protein Powder', blurb: 'Clean, everyday protein for strong muscles.', href: '#' },
  { name: 'Protein Mix', blurb: 'A ready mix built around how we age.', href: '#' },
] as const
