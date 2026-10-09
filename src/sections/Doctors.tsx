import { DOCTORS } from '../content/site'

function initials(name: string): string {
  return name
    .replace(/^Dr\.?\s+/i, '')
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
}

export function Doctors() {
  return (
    <section className="section section--linen" id="doctors" aria-labelledby="doctors-title">
      <div className="container">
        <div className="section-head">
          <h2 id="doctors-title">
            The doctors behind your <span className="accent">recovery</span>
          </h2>
        </div>
        <ul className="doctors">
          {DOCTORS.map((doctor) => (
            <li key={doctor.name} className="doctor">
              {doctor.photo ? (
                <img className="doctor__photo" src={doctor.photo} alt={doctor.name} width="504" height="444" loading="lazy" />
              ) : (
                <span className="doctor__photo doctor__photo--placeholder" aria-hidden="true">
                  {initials(doctor.name)}
                </span>
              )}
              <h3 className="doctor__name">{doctor.name}</h3>
              <p className="doctor__role">{doctor.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
