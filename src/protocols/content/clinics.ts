/** Copy and media for /clinics (non-surgical pain treatment landing page), as published on praan.health. */

export type ClinicImage = { src: string; width: number; height: number; alt: string };

export const clinicsMeta = {
  title: "Non-Surgical Pain Treatment Clinic in Bangalore | Praan Health",
  description:
    "Advanced, non-surgical treatment for chronic knee, back, shoulder, and joint pain. Doctor-led, minimally invasive care in Koramangala, Bengaluru. Book an assessment.",
};

export const hero = {
  eyebrow: "Non-Surgical Pain Care · Koramangala, Bengaluru",
  title: "Non-surgical treatment for lasting relief from chronic pain",
  lead: "Safe, evidence-based treatments that target the root cause of knee, back, shoulder, and joint pain — so you can walk, climb stairs, and move comfortably again, without surgery.",
  background: "/images/hero-section-image.webp",
};

export const callback = {
  button: "Request a Callback",
  heading: "Request a Callback",
  intro: "We just need a few details and we'll call you back to book your appointment.",
  formName: "Contact Form",
  success: "Thank you! Our team will reach out to you in 24-48 hours for a consultation.",
  error: "Oops! Something went wrong while submitting the form.",
  siteOfPain: [
    { value: "knee", label: "Knee" },
    { value: "back", label: "Back" },
    { value: "shoulder", label: "Shoulder" },
    { value: "neck", label: "Neck" },
    { value: "other", label: "Other" },
  ],
  intensity: [
    { value: "mild", label: "Mild" },
    { value: "moderate", label: "Moderate" },
    { value: "severe", label: "Severe" },
  ],
};

export const press = {
  label: "As featured in",
  items: [
    { name: "NDTV", href: "https://www.ndtv.com/health/indias-elderly-need-mobility-focused-care-not-disease-centric-treatment-experts-11796198" },
    { name: "The Economic Times", href: "https://health.economictimes.indiatimes.com/news/industry/indias-elderly-need-mobility-focused-care-not-disease-centric-treatment-experts/132504027" },
    { name: "PTI", href: "https://www.ptinews.com/story/national/india-s-elderly-need-mobility-focused-care-not-disease-centric-treatment-experts/3876567" },
    { name: "Indian Pharma Post", href: "https://www.indianpharmapost.com/healthcare/lite/praan-health-launches-first-integrated-fifty-clinic-in-bengaluru-for-senior-care-20985" },
    { name: "Business News This Week", href: "https://businessnewsthisweek.com/health/bengaluru-based-praan-health-launches-first-full-stack-clinic-for-citizens-aged-over-50/" },
    { name: "Awaz The Voice", href: "https://www.awazthevoice.in/health-news/experts-advocate-mobility-first-treatment-for-seniors-64060.html" },
    { name: "Tripura Star News", href: "https://www.tripurastarnews.com/bengaluru-based-healthcare-startup-praan-health-launches-their-first-full-stack-clinic-for-citizens-above-50-as-india-prepares-for-347-mn-senior-citizens-by-2050/" },
    { name: "Chennai Patrika", href: "https://chennaipatrika.com/post/bengaluru-based-healthcare-startup-praan-health-launches-their-first-full-stack-clinic-for-citizens-above-50-as-india-prepares-for-347-mn-senior-citizens-by-2050" },
  ],
};

export const rootCause = {
  eyebrow: "The root-cause problem",
  heading: "Why does your pain keep coming back?",
  paragraphs: [
    "If your pain keeps returning, it is usually because the real problem was never treated. Painkillers, braces, and generic exercises can help for a while, but they don't fix what is actually causing the pain.",
    "At Praan, we first identify why it hurts and what is stopping it from healing. That clarity lets us choose the right non-surgical treatment for your knee, back, shoulder, or joint pain — so you get relief that actually lasts.",
  ],
};

export const testimonials = {
  eyebrow: "Patient stories",
  heading: "Hear it from our patients",
  sub: "Real people who came to Praan with lasting pain — and got back to what they love, without surgery.",
  /** YouTube video ids, in live order. */
  videos: ["2Fd0yczqhNE", "MzF50N3R0GU", "0Gea_wh-n4A", "aopovphajIc", "P7pF5VmxlS4", "pQ33VJp452Q", "4ZcVPSZqTeM"],
};

/** Shared by the "What is" and "Outcome" sections (the live page uses the same placeholder photo twice). */
const clinicRoom: ClinicImage = { src: "/images/header-image.jpg", width: 2752, height: 1536, alt: "Placeholder — replace me" };

export const whatIs = {
  eyebrow: "A safer alternative to surgery",
  heading: "What is non-surgical pain treatment?",
  sub: "A medical approach to relieving pain without an operation, hospital stay, or long recovery. Instead of cutting or replacing parts of the joint, it reduces pain, calms inflammation, and fixes the underlying cause — helping the body heal rather than just numbing the pain.",
  checks: [
    "Targets the root cause of pain, not just the symptoms",
    "Reduces chronic inflammation and nerve irritation",
    "Improves movement, strength, and joint stability",
    "Helps you return to daily activities, exercise, and sport",
    "Avoids surgery, stitches, and long downtime",
    "Delivered by a coordinated team of pain specialists and physiotherapists",
  ],
  image: clinicRoom,
};

export type ImgCardItem = { tag?: string; num?: string; title: string; text: string; image: ClinicImage };

const treatmentImage = (file: string, height = 800): ClinicImage => ({ src: `/images/${file}`, width: 1200, height, alt: "Placeholder — replace me" });

export const treatments = {
  eyebrow: "Our treatments",
  heading: "Proven non-surgical pain treatments",
  sub: "Every plan is personalised to your diagnosis and activity level. Our interventional pain specialists select the right combination of the following procedures.",
  cards: [
    { tag: "Joint inflammation", title: "Intra-Articular Injections", text: "Calm swelling and pain in the knee, shoulder, hip, and smaller joints to restore mobility.", image: treatmentImage("intra-articular-injection.webp") },
    { tag: "Joint lubrication", title: "Hyaluronic Acid (Gel Shot)", text: "Restores cushioning and lubrication inside the joint. Ideal for knee osteoarthritis.", image: treatmentImage("hyaluronic-acid.webp") },
    { tag: "Tissue repair", title: "PRP & Regenerative", text: "Uses your body's own healing factors to repair tissue and slow cartilage wear.", image: treatmentImage("prp-regenerative.webp") },
    { tag: "Targeted relief", title: "Nerve Blocks", text: "Image-guided blocks interrupt specific pain signals for peripheral nerve pain.", image: treatmentImage("nerve-blocks.webp") },
    { tag: "Ligament stability", title: "Prolotherapy", text: "Stimulates repair in lax ligaments and chronically painful joints.", image: treatmentImage("prolotherapy.webp") },
    { tag: "Muscle & tendon", title: "Trigger Point & Tendon", text: "Relieves myofascial pain, trigger finger, De Quervain's, and bursitis.", image: treatmentImage("trigger-point-injection.webp") },
    { tag: "Therapy suite", title: "Advanced Physiotherapy", text: "IFT, TENS, ultrasound, laser, dry needling, and supervised exercise.", image: treatmentImage("advanced-physiotherapy.webp") },
    { tag: "Rehab", title: "Neuro & PM&R Rehab", text: "Robotic therapy, gait & balance retraining, NMES, and spasticity care.", image: treatmentImage("neuro-pmr-rehab.webp", 900) },
    { tag: "Nursing", title: "IV Infusion & Nursing", text: "Osteoporosis infusions, iron & B12, hydration, and adult vaccinations.", image: treatmentImage("iv-infusion-nursing.webp") },
  ] satisfies ImgCardItem[],
};

export const whoFor = {
  eyebrow: "Who it's for",
  heading: "Who non-surgical treatment is for",
  body: "It is designed for people with persistent pain who feel stuck between temporary relief and the fear of surgery. If you are tired of relying on painkillers, braces, or generic advice that doesn't work long-term, this structured approach is built for you. A clinical evaluation confirms if it is right for you.",
  subhead: "Conditions we treat",
  checks: [
    "Knee osteoarthritis and early joint stiffness",
    "Frozen shoulder, rotator cuff, and bursitis",
    "Chronic low back, neck, and cervical/lumbar spondylosis",
    "Hip and trochanteric pain",
    "Sciatica and nerve-related pain",
    "Tendinopathies — tennis/golfer's elbow, Achilles, plantar fasciitis",
  ],
};

export const conditions = {
  eyebrow: "Conditions we treat",
  heading: "Relief for pain across the body",
  sub: "From joints to spine to nerves — our non-surgical protocols are tailored to the conditions most common after 50.",
  cards: [
    { title: "Knee osteoarthritis & joint pain", text: "Steroid, gel-shot, and PRP injections to calm knee pain and restore movement.", image: { src: "/images/condition-knee-pain-v2.png", width: 500, height: 500, alt: "Knee pain" } },
    { title: "Back & neck pain", text: "Injections, traction, and physiotherapy for chronic back, neck, and spondylosis pain.", image: { src: "/images/condition-back-pain.png", width: 1024, height: 1024, alt: "Back and neck pain" } },
    { title: "Spine, disc & sciatica", text: "Non-surgical care for disc prolapse, sciatica, and nerve-related pain.", image: { src: "/images/condition-spine-injuries.png", width: 1024, height: 1024, alt: "Spine and sciatica" } },
    { title: "Shoulder, hip & mobility", text: "Relief for frozen shoulder, rotator cuff, bursitis, and hip pain.", image: { src: "/images/condition-strength-mobility.png", width: 1024, height: 1024, alt: "Shoulder hip mobility" } },
    { title: "Post-surgery & neuro recovery", text: "Robotic and NMES-assisted rehab to rebuild strength after surgery or stroke.", image: { src: "/images/condition-post-op-recovery.png", width: 1024, height: 1024, alt: "Post surgery recovery" } },
  ],
};

const stepImage = (file: string, alt: string): ClinicImage => ({ src: `/images/${file}`, width: 1536, height: 1024, alt });

export const steps = {
  eyebrow: "How it works",
  heading: "A step-by-step path to pain-free movement",
  sub: "We don't guess. We follow a clinically proven, three-step protocol so your recovery is precise and lasting.",
  cards: [
    { num: "1", title: "Root-cause identification", text: "A 360° diagnosis of posture, muscle balance, and nerve function to find what triggers your pain.", image: stepImage("step-1.png", "Diagnosis") },
    { num: "2", title: "Targeted intervention", text: "Advanced, image-guided procedures to stop pain signals or repair damaged tissue.", image: stepImage("step-2.png", "Treatment") },
    { num: "3", title: "Functional restoration", text: "Guided physiotherapy rebuilds strength and stability so pain doesn't return.", image: stepImage("step-3.png", "Recovery") },
  ] satisfies ImgCardItem[],
};

export const outcome = {
  eyebrow: "The outcome",
  heading: "Life beyond pain feels possible again",
  sub: "Non-surgical treatment is about more than lower pain scores — it's about getting back to living normally, with lasting function instead of short-term relief.",
  checks: [
    "Reduces or removes the need for repeated painkillers",
    "Helps you return to walking, workouts, and sport safely",
    "Improves strength, stability, and flexibility",
    "Supports better sleep by easing night-time discomfort",
    "Lowers the risk of pain recurrence and future damage",
    "Avoids surgery and long recovery downtime",
  ],
  image: clinicRoom,
};

export const whyPraan = {
  eyebrow: "Why Praan",
  heading: "World-class expertise, integrated care",
  sub: "Standard pain treatment often fails because it's fragmented — pills from one doctor, exercises from another, with no coordination. At Praan, every part of your care works together.",
  features: [
    { title: "More effective", text: "Clinical research shows our integrated methodology outperforms traditional single-mode treatment." },
    { title: "Multidisciplinary team", text: "Pain specialists, physiotherapists, nutritionists, and care managers work together on your case." },
    { title: "Precision technology", text: "Advanced, image-guided techniques target the exact source of your pain — with no guesswork." },
    { title: "Holistic recovery", text: "We address lifestyle factors like nutrition and posture so the pain stays away for good." },
  ],
};

export const careTeam = {
  eyebrow: "Your wider care team",
  image: { src: "/images/clinic-team.jpg", width: 1280, height: 691, alt: "The Praan clinical team" } satisfies ClinicImage,
  specialists: [
    { label: "Interventional Pain Physicians", teal: false },
    { label: "Physiotherapists", teal: true },
    { label: "Clinical Nutritionists", teal: false },
    { label: "Pain Counsellors", teal: true },
  ],
  note: "Every plan is coordinated across specialists, so your care works as one team — not scattered referrals.",
};

export const recovery = {
  eyebrow: "Recovery & aftercare",
  heading: "Back to daily life without long downtime",
  sub: "Treatment is designed to fit into real life, not interrupt it.",
  cards: [
    { icon: "🏠", teal: false, title: "Same-day return", text: "No hospital stay. You return home the same day and recover in your own space — no bed rest required." },
    { icon: "⚡", teal: true, title: "Back to routine quickly", text: "Most patients resume light activities like desk work or walking within 24–48 hours." },
    { icon: "🩺", teal: false, title: "Guided, monitored care", text: "A dedicated care manager tracks your recovery, with physiotherapy at our clinic or at home." },
  ],
  timelineHeading: "Typical recovery timeline",
  timeline: [
    { when: "Same day – 48 hrs", phase: "Immediate", desc: "Temporary pain reduction or numbness from local medication." },
    { when: "Days 3–7", phase: "Early improvement", desc: "Pain and stiffness gradually ease as inflammation settles." },
    { when: "Weeks 2–4", phase: "Functional gains", desc: "Improved movement, strength, and confidence in daily activities." },
    { when: "Weeks 4–8", phase: "Lasting relief", desc: "Sustained relief and better function, supported by guided physiotherapy." },
  ],
};

export const safety = {
  eyebrow: "Safety first",
  heading: "Minimally invasive and low risk",
  paragraphs: [
    "Most procedures are minimally invasive and performed with image guidance, which significantly lowers risk compared with surgery. With no large incisions, the chances of infection and complications are low, and downtime is minimal.",
    "Every treatment is carried out by experienced interventional pain specialists and monitored by a dedicated care team — with any change in symptoms reviewed and adjusted promptly.",
  ],
  image: { src: "/images/doc.webp", width: 504, height: 462, alt: "Placeholder — replace me" } satisfies ClinicImage,
};

export const faq = {
  heading: "Frequently Asked",
  headingAccent: "Questions",
  items: [
    { q: "Is non-surgical pain treatment safe?", a: "Yes. Our procedures are minimally invasive and image-guided, and are performed by experienced interventional pain specialists. Safety is our first priority — any change in symptoms is reviewed and adjusted promptly by your care team." },
    { q: "How soon will I feel relief, and how long does it last?", a: "Many patients feel early changes within days, with pain and stiffness easing over the first few weeks. With guided physiotherapy, relief typically becomes more sustained between weeks 4 and 8. Because we treat the root cause rather than just symptoms, results are designed to last." },
    { q: "Will I need to stop my current medication?", a: "Never without medical supervision. Our doctors work alongside your existing physician and, as your pain improves, help you reduce your reliance on painkillers safely." },
    { q: "Who will be part of my care team?", a: "Depending on your needs, your team can include an interventional pain specialist, physiotherapist, clinical nutritionist, and a dedicated care manager — all coordinated so every part of your treatment works together." },
  ],
};

export const visit = {
  eyebrow: "Visit the clinic",
  heading: "Come see us in Koramangala",
  mapSrc: "https://maps.google.com/maps?q=The%20Fifty%2B%20Clinic%20by%20Praan%20Health&z=16&output=embed",
  mapTitle: "The Fifty+ Clinic by Praan Health",
  address: "The Fifty+ Clinic by Praan Health · Koramangala, Bengaluru",
  directions: { label: "Get directions →", href: "https://maps.app.goo.gl/SygxUyW48Fzc6XsJA" },
};

export const cta = {
  heading: "Start your pain free journey",
  body: "Praan Clinics extend your health journey with expert doctors, diagnostics, and lifestyle guidance in one dedicated space.",
};
