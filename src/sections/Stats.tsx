import { CLINIC_STATS } from '../content/site'

export function Stats() {
  return (
    <section className="stats" aria-label="Praan Health in numbers">
      <ul className="container stats__list">
        {CLINIC_STATS.map((stat) => (
          <li key={stat.label} className="stats__item">
            <span className="stats__value">
              {stat.value.replace('★', '')}
              {stat.value.endsWith('★') && (
                <svg className="stats__star" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 1.5l3.1 6.9 7.4.8-5.5 5 1.6 7.4L12 18l-6.6 3.6 1.6-7.4-5.5-5 7.4-.8z" fill="currentColor" />
                </svg>
              )}
            </span>
            <span className="stats__label">{stat.label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
