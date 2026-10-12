import { Button } from '../components/Button'
import { EVERYDAY_URL } from '../content/site'
import { asset } from '../lib/asset'

export function DailyMovement() {
  return (
    <section className="section section--flush-bottom" id="movement" aria-labelledby="movement-title">
      <div className="container movement">
        <img
          className="movement__media"
          src={asset('/assets/daily-movement.webp')}
          alt="Navneeth with two members of the community, arms crossed and smiling"
          width="1454"
          height="963"
          loading="lazy"
        />
        <div className="movement__copy">
          <h2 id="movement-title">
            Make exercise a daily habit, with <span className="accent">Navneeth</span>
          </h2>
          <p className="lead">
            45-min live guided sessions that fit into your everyday routine to build your strength, mobility, and balance
          </p>
          <Button href={EVERYDAY_URL}>Join Today</Button>
        </div>
      </div>
    </section>
  )
}
