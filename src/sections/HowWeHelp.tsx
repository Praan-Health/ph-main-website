import { PILLARS } from '../content/site'

export function HowWeHelp() {
  return (
    <section className="section" aria-labelledby="how-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">How Praan Health helps you</span>
          <h2 id="how-title">Three ways we look after the people you love</h2>
        </div>
        <ul className="pillars">
          {PILLARS.map((pillar) => (
            <li key={pillar.id}>
              <a className="pillar" href={`#${pillar.id}`}>
                <div className="pillar__media">
                  <img src={pillar.image} alt="" loading="lazy" width="480" height="360" />
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
                <span className="pillar__more">Explore →</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
