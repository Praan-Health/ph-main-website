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
const CENTRE = { x: 50, y: 50 }

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
