import { Button } from '../components/Button'

export function DailyMovement() {
  return (
    <section className="section section--linen" id="movement" aria-labelledby="movement-title">
      <div className="container movement">
        {/* TODO: replace with the Daily Movement / Navneeth imagery */}
        <div className="movement__media" role="img" aria-label="Daily movement with Navneeth — image coming soon" />
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
