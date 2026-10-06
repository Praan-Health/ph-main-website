// The "Where does it hurt?" explorer. Coordinates are pixels of the body pictures (768 x 1376, front and back).
// TODO: have the clinical team confirm the conditions listed for each area.

export type BodyView = 'front' | 'back'

export interface Point {
  x: number
  y: number
}

export interface PainArea {
  id: string
  label: string
  view: BodyView
  /** Where the red spots sit. */
  spots: readonly Point[]
  /** What the body zooms to; `zoom` 1 shows the whole body. */
  focus: Point & { zoom: number }
  conditions: readonly string[]
}

export const BODY_SIZE = { width: 768, height: 1376 } as const

export const PAIN_AREAS: readonly PainArea[] = [
  {
    id: 'head',
    label: 'Face / Head',
    view: 'front',
    spots: [{ x: 385, y: 170 }],
    focus: { x: 385, y: 160, zoom: 2.4 },
    conditions: ['Migraine', 'Tension-type headache', 'Cervicogenic headache', 'Trigeminal neuralgia', 'Jaw (TMJ) pain'],
  },
  {
    id: 'neck',
    label: 'Neck',
    view: 'front',
    spots: [{ x: 385, y: 268 }],
    focus: { x: 385, y: 268, zoom: 2.6 },
    conditions: ['Cervical spondylosis', 'Muscle strain', 'Slipped (herniated) disc', 'Pinched nerve', 'Poor posture'],
  },
  {
    id: 'shoulder',
    label: 'Shoulder',
    view: 'front',
    spots: [{ x: 255, y: 330 }, { x: 520, y: 330 }],
    focus: { x: 385, y: 330, zoom: 1.65 },
    conditions: ['Frozen shoulder', 'Rotator cuff injury', 'Shoulder impingement', 'Bursitis', 'Shoulder arthritis'],
  },
  {
    id: 'upper-back',
    label: 'Upper back / Mid back',
    view: 'back',
    spots: [{ x: 348, y: 400 }, { x: 422, y: 400 }],
    focus: { x: 385, y: 400, zoom: 2.1 },
    conditions: ['Muscle strain', 'Thoracic spine pain', 'Rib joint pain', 'Poor posture', 'Compression fracture'],
  },
  {
    id: 'lower-back',
    label: 'Lower back',
    view: 'back',
    spots: [{ x: 350, y: 540 }, { x: 420, y: 540 }],
    focus: { x: 385, y: 540, zoom: 2.3 },
    conditions: ['Muscle strain', 'Slipped (herniated) disc', 'Sciatica', 'Facet joint pain', 'Sacroiliac joint pain'],
  },
  {
    id: 'arm',
    label: 'Elbow / Wrist / Hand',
    view: 'front',
    spots: [{ x: 212, y: 545 }, { x: 562, y: 545 }, { x: 203, y: 745 }, { x: 568, y: 745 }],
    focus: { x: 385, y: 650, zoom: 1.2 },
    conditions: ['Tennis or golfer\'s elbow', 'Carpal tunnel syndrome', 'Trigger finger', "De Quervain's tenosynovitis", 'Hand osteoarthritis'],
  },
  {
    id: 'hip',
    label: 'Hip / Pelvis',
    view: 'front',
    spots: [{ x: 290, y: 680 }, { x: 482, y: 680 }],
    focus: { x: 385, y: 680, zoom: 1.8 },
    conditions: ['Hip osteoarthritis', 'Trochanteric bursitis', 'Piriformis syndrome', 'Sacroiliac joint pain', 'Hip labral tear'],
  },
  {
    id: 'knee',
    label: 'Knee',
    view: 'front',
    spots: [{ x: 325, y: 985 }, { x: 450, y: 985 }],
    focus: { x: 385, y: 985, zoom: 2.5 },
    conditions: ['Knee osteoarthritis', 'Meniscus tear', 'Ligament injury', 'Patellofemoral pain', 'Bursitis'],
  },
  {
    id: 'foot',
    label: 'Ankle / Foot',
    view: 'front',
    spots: [{ x: 302, y: 1250 }, { x: 468, y: 1250 }],
    focus: { x: 385, y: 1250, zoom: 2.3 },
    conditions: ['Plantar fasciitis', 'Heel spur', 'Achilles tendinitis', 'Ankle sprain', 'Ankle arthritis'],
  },
]
