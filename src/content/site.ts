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

export const NAV_LINKS = [
  { label: 'Protocols', href: '#protocols' },
  { label: 'Clinics', href: '#clinics' },
  { label: 'Nutrition', href: '#nutrition', tag: 'New' },
  { label: 'About', href: '#about' },
] as const

export const PILLARS = [
  {
    id: 'protocols',
    title: 'Protocols',
    body: 'Doctor-led, at-home and online 1:1 strength training and rehabilitation.',
    image: asset('/assets/ui/Card.webp'),
  },
  {
    id: 'clinics',
    title: 'Clinics',
    body: 'Non-surgical treatment for lasting relief from chronic pain.',
    image: asset('/assets/6a0b0af0686e8aac45bd1234_daddi.webp'),
  },
  {
    id: 'nutrition',
    title: 'Nutrition',
    body: 'Everyday nutrition that supports active ageing.',
    image: asset('/assets/ui/Card-2.webp'),
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

export const WHAT_INCLUDED = [
  { tag: 'To start', text: 'Diagnostic review with 100+ markers' },
  { tag: 'Monthly', text: 'Monthly doctor consultations' },
  { tag: 'Weekly', text: 'Weekly dietician reviews' },
  { tag: '3× a week', text: '3× week strength training and rehabilitation' },
  { tag: 'Always on', text: 'Personalised care plan for your journey' },
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

// TODO: swap placeholder imagery for the product shots.
// Each product opens its page on the shop.
export const NUTRITION_PRODUCTS = [
  { name: 'Daily Protein', size: '1 kg', price: '₹2,499', blurb: 'Clean, everyday protein for strong muscles.', href: 'https://shop.praan.health/products/daily-protein' },
  { name: 'Protein Food Mix', size: '400 g', price: '₹1,199', blurb: 'A ready mix built around how we age.', href: 'https://shop.praan.health/products/protein-food-mix' },
] as const
