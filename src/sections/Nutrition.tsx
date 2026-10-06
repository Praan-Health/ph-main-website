import { Button } from '../components/Button'
import { SHOP_URL } from '../content/site'

export function Nutrition() {
  return (
    <section className="nutrition" id="nutrition" aria-labelledby="nutrition-title">
      <div className="container nutrition__inner">
        <div className="nutrition__copy">
          <h2 id="nutrition-title">
            Nutrition that supports your <span className="accent accent--light">recovery</span>
          </h2>
          <p className="lead">Simple, everyday products, designed with our dieticians to support your recovery and strength.</p>
          <Button href={SHOP_URL} variant="inverse" className="btn--lg">
            Shop now
          </Button>
        </div>
      </div>
    </section>
  )
}
