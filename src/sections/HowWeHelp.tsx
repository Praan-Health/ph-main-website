import { HelpStack } from '../components/HelpStack'

export function HowWeHelp() {
  return (
    <section className="section" aria-labelledby="how-title">
      <div className="container">
        <HelpStack
          intro={
            <div className="section-head help__intro">
              <span className="eyebrow">Our approach</span>
              <h2 id="how-title">
                Treating the <span className="accent">cause</span>, not just the pain
              </h2>
              <p className="lead">We treat the pain and the underlying condition.</p>
            </div>
          }
        />
      </div>
    </section>
  )
}
