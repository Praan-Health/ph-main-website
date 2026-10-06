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
    id: 'neck',
    label: 'Neck pain',
    view: 'front',
    spots: [{ x: 385, y: 268 }],
    focus: { x: 385, y: 268, zoom: 2.6 },
    conditions: ['Cervical spondylosis', 'Muscle strain', 'Slipped (herniated) disc', 'Pinched nerve', 'Poor posture'],
  },
  {
    id: 'shoulder',
    label: 'Shoulder pain',
    view: 'front',
    spots: [{ x: 255, y: 330 }, { x: 520, y: 330 }],
    focus: { x: 385, y: 330, zoom: 1.65 },
    conditions: ['Frozen shoulder', 'Rotator cuff injury', 'Shoulder impingement', 'Bursitis', 'Shoulder arthritis'],
  },
  {
    id: 'back',
    label: 'Back pain',
    view: 'back',
    spots: [{ x: 350, y: 540 }, { x: 420, y: 540 }],
    focus: { x: 385, y: 540, zoom: 2.3 },
    conditions: ['Muscle strain', 'Slipped (herniated) disc', 'Sciatica', 'Facet joint pain', 'Sacroiliac joint pain'],
  },
  {
    id: 'spine',
    label: 'Pain in the spine',
    view: 'back',
    spots: [{ x: 385, y: 300 }, { x: 385, y: 420 }, { x: 385, y: 530 }],
    focus: { x: 385, y: 420, zoom: 1.9 },
    conditions: ['Spinal stenosis', 'Degenerative disc disease', 'Spondylolisthesis', 'Compression fracture', 'Osteoporosis'],
  },
  {
    id: 'hands',
    label: 'Joint pain in the hands',
    view: 'front',
    spots: [{ x: 203, y: 765 }, { x: 568, y: 765 }],
    focus: { x: 385, y: 765, zoom: 1.15 },
    conditions: ['Osteoarthritis', 'Rheumatoid arthritis', 'Carpal tunnel syndrome', 'Trigger finger', "De Quervain's tenosynovitis"],
  },
  {
    id: 'knee',
    label: 'Knee pain',
    view: 'front',
    spots: [{ x: 325, y: 985 }, { x: 450, y: 985 }],
    focus: { x: 385, y: 985, zoom: 2.5 },
    conditions: ['Knee osteoarthritis', 'Meniscus tear', 'Ligament injury', 'Patellofemoral pain', 'Bursitis'],
  },
  {
    id: 'heel',
    label: 'Heel pain',
    view: 'back',
    spots: [{ x: 318, y: 1295 }, { x: 455, y: 1295 }],
    focus: { x: 385, y: 1285, zoom: 2.5 },
    conditions: ['Plantar fasciitis', 'Heel spur', 'Achilles tendinitis', 'Heel bursitis'],
  },
  {
    id: 'everything',
    label: 'Everything',
    view: 'front',
    spots: [{ x: 385, y: 268 }, { x: 255, y: 330 }, { x: 520, y: 330 }, { x: 203, y: 765 }, { x: 568, y: 765 }, { x: 325, y: 985 }, { x: 450, y: 985 }, { x: 290, y: 1290 }, { x: 475, y: 1290 }],
    focus: { x: 385, y: 688, zoom: 1 },
    conditions: ['Fibromyalgia', 'Widespread joint arthritis', 'Myofascial pain syndrome', 'Inflammatory arthritis', 'Chronic widespread pain'],
  },
]
