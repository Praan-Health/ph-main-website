import { Button } from '../components/Button'
import { SHOP_URL } from '../content/site'

export function Nutrition() {
  return (
    <section className="nutrition" id="nutrition" aria-labelledby="nutrition-title">
      <div className="container nutrition__inner">
        <div className="nutrition__copy">
          <span className="eyebrow eyebrow--light">Praan Nutrition</span>
          <h2 id="nutrition-title">
            Nutrition to support <span className="accent accent--light">active</span> ageing
          </h2>
          <p className="lead">Simple, everyday products designed with our dieticians for the way our parents eat.</p>
          <Button href={SHOP_URL} variant="inverse" className="btn--lg">
            Shop now
          </Button>
        </div>
      </div>
    </section>
  )
}
