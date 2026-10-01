import { Button } from '../components/Button'
import { NUTRITION_PRODUCTS } from '../content/site'

export function Nutrition() {
  return (
    <section className="nutrition" id="nutrition" aria-labelledby="nutrition-title">
      <div className="container nutrition__grid">
        <div className="nutrition__copy">
          <span className="eyebrow eyebrow--light">Praan Nutrition</span>
          <h2 id="nutrition-title">
            Nutrition to support <span className="accent accent--light">active</span> ageing
          </h2>
          <p className="lead">Simple, everyday products designed with our dieticians for the way our parents eat.</p>
        </div>
        <ul className="products">
          {NUTRITION_PRODUCTS.map((p) => (
            <li key={p.name} className="product">
              {/* TODO: replace with the real product shot */}
              <div className="product__shot" role="img" aria-label={`${p.name} — image coming soon`} />
              <h3>{p.name}</h3>
              <p>{p.blurb}</p>
              <span className="product__meta">
                {p.size} · {p.price}
              </span>
              <Button href={p.href} variant="inverse">
                View product
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
