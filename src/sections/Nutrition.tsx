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
          <p className="lead">Simple everyday products designed with our clinical team to support your bone and joint health</p>
          <Button href={SHOP_URL} variant="inverse" className="btn--lg">
            Shop now
          </Button>
        </div>
      </div>
    </section>
  )
}
