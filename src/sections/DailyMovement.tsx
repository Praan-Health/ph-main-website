import { Button } from '../components/Button'
import { asset } from '../lib/asset'

export function DailyMovement() {
  return (
    <section className="section section--linen section--flush-bottom" id="movement" aria-labelledby="movement-title">
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
          <span className="eyebrow">Daily movement</span>
          <h2 id="movement-title">
            Move a little, every day — with <span className="accent">Navneeth</span>
          </h2>
          <p className="lead">
            Short, guided sessions that fit into your parents' morning and build strength and balance over time.
          </p>
          <Button href="#">Join a session</Button>
        </div>
      </div>
    </section>
  )
}
