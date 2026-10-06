import type { ReactNode } from 'react'
import { CARE_TEAM } from '../content/site'
import { useInView } from '../hooks/useInView'
import {
  ActivityIcon,
  AppleIcon,
  ChatIcon,
  ClipboardCheckIcon,
  DumbbellIcon,
  StethoscopeIcon,
} from './icons'

// The diagram box is 650 x 560. Node positions are % of the box, so spokes are
// laid out in "cqw" units (1% of box width) using this aspect ratio.
const BOX_ASPECT = 650 / 560
const BOX_W = 650
const BOX_H = 560
const CENTRE = { x: 50, y: 50 }

/** Smooth closed curve (Catmull-Rom as cubic Beziers) through every specialist, in diagram pixels. */
function ringPath(): string {
  const pts = CARE_TEAM.map((m) => ({ x: (m.x / 100) * BOX_W, y: (m.y / 100) * BOX_H }))
  const n = pts.length
  const f = (v: number) => v.toFixed(1)
  let d = `M${f(pts[0].x)} ${f(pts[0].y)}`
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % n]
    const p3 = pts[(i + 2) % n]
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 }
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 }
    d += ` C${f(c1.x)} ${f(c1.y)} ${f(c2.x)} ${f(c2.y)} ${f(p2.x)} ${f(p2.y)}`
  }
  return `${d}Z`
}

const RING_PATH = ringPath()
const CHEVRONS = [0, 1, 2]
const LAP_SECONDS = 12

const ICONS: Record<(typeof CARE_TEAM)[number]['id'], ReactNode> = {
  coordinator: <ClipboardCheckIcon />,
  dietician: <AppleIcon />,
  trainer: <DumbbellIcon />,
  physio: <ActivityIcon />,
  counsellor: <ChatIcon />,
}

function spokeGeometry(x: number, y: number) {
  const heightUnit = 100 / BOX_ASPECT / 100 // % of box height -> cqw
  const dx = x - CENTRE.x
  const dy = (y - CENTRE.y) * heightUnit
  return { length: Math.hypot(dx, dy), angle: (Math.atan2(dy, dx) * 180) / Math.PI }
}

/** Doctor in the centre directing five specialists; animates once when scrolled into view. */
export function CareTeamDiagram() {
  const { ref, isInView } = useInView<HTMLDivElement>()

  return (
    <div ref={ref} className={`care-team ${isInView ? 'is-visible' : ''}`}>
      <div className="care-team__box">
        {/* A loop of hand-offs: dashes flow around the team and arrowheads travel it, so the care visibly passes between people. */}
        <svg className="ct-ring" viewBox={`0 0 ${BOX_W} ${BOX_H}`} aria-hidden="true" focusable="false">
          <path className="ct-ring__path" d={RING_PATH} />
          {CHEVRONS.map((n) => (
            <polygon key={n} className="ct-ring__chev" points="-10,-8 10,0 -10,8 -5,0">
              <animateMotion
                dur={`${LAP_SECONDS}s`}
                begin={`${-(LAP_SECONDS / CHEVRONS.length) * n}s`}
                repeatCount="indefinite"
                rotate="auto"
                path={RING_PATH}
              />
            </polygon>
          ))}
        </svg>
        {CARE_TEAM.map((member, i) => {
          const { length, angle } = spokeGeometry(member.x, member.y)
          return (
            <div
              key={`spoke-${member.id}`}
              className="spoke"
              aria-hidden="true"
              style={{ '--len': length, '--angle': `${angle}deg`, '--i': i } as React.CSSProperties}
            >
              <span className="spoke__dot" />
            </div>
          )
        })}

        <div className="ct-node ct-node--doctor">
          <span className="ct-node__icon">
            <StethoscopeIcon size={26} />
          </span>
          <span className="ct-node__text">
            <strong>Doctor</strong>
            <span>Leads your plan</span>
          </span>
        </div>

        {CARE_TEAM.map((member, i) => (
          <div
            key={member.id}
            className="ct-node"
            style={{ left: `${member.x}%`, top: `${member.y}%`, '--i': i } as React.CSSProperties}
          >
            <span className="ct-node__icon">{ICONS[member.id]}</span>
            <span className="ct-node__text">
              <strong>{member.role}</strong>
              <span>{member.does}</span>
            </span>
          </div>
        ))}
      </div>
      <p className="care-team__caption">One plan. One doctor. Everyone in sync.</p>
    </div>
  )
}
