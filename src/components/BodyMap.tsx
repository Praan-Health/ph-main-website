import type { CSSProperties } from 'react'
import { BODY_SIZE } from '../content/pain'
import type { BodyView, PainArea } from '../content/pain'
import { asset } from '../lib/asset'

const { width: W, height: H } = BODY_SIZE
const PICTURES: Record<BodyView, string> = {
  front: asset('/assets/body-front.webp'),
  back: asset('/assets/body-back.webp'),
}
const SPOT_RADIUS = 13

/** Translate + scale that puts `focus` in the middle of the picture without panning past its edges. */
function focusTransform(focus: PainArea['focus']): string {
  const { x, y, zoom } = focus
  const tx = Math.min(0, Math.max(W - W * zoom, W / 2 - x * zoom))
  const ty = Math.min(0, Math.max(H - H * zoom, H / 2 - y * zoom))
  return `translate(${tx}px, ${ty}px) scale(${zoom})`
}

/** A body picture (front or back) with red pain spots that radiate; zooms to the selected area. */
export function BodyMap({ area, view }: { area: PainArea | null; view: BodyView }) {
  const focus = area ? area.focus : { x: W / 2, y: H / 2, zoom: 1 }

  return (
    <svg className="body-map" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={area ? `Body, highlighting ${area.label.toLowerCase()}` : 'Outline of a body'}>
      <defs>
        <radialGradient id="pain-glow">
          <stop offset="0%" stopColor="#ff3b30" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#ff3b30" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ff3b30" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="body-map__focus" style={{ transform: focusTransform(focus) } as CSSProperties}>
        <image key={view} className="body-map__turn" href={PICTURES[view]} width={W} height={H} />

        {area?.spots.map((spot, i) => (
          <g key={`${area.id}-${i}`} className="body-map__spot" style={{ '--i': i } as CSSProperties}>
            <circle className="body-map__glow" cx={spot.x} cy={spot.y} r={SPOT_RADIUS * 3.2} fill="url(#pain-glow)" />
            <circle className="body-map__ring" cx={spot.x} cy={spot.y} r={SPOT_RADIUS} />
            <circle className="body-map__ring body-map__ring--late" cx={spot.x} cy={spot.y} r={SPOT_RADIUS} />
            <circle className="body-map__dot" cx={spot.x} cy={spot.y} r={SPOT_RADIUS * 0.7} />
          </g>
        ))}
      </g>
    </svg>
  )
}
