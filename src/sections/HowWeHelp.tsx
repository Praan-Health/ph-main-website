import { HelpStack } from '../components/HelpStack'

export function HowWeHelp() {
  return (
    <section className="section" aria-labelledby="how-title">
      <div className="container">
        <HelpStack
          intro={
            <div className="section-head help__intro">
              <span className="eyebrow">Holistic pain management</span>
              <h2 id="how-title">
                Treating the <span className="accent">cause</span>, not just the pain
              </h2>
              <p className="lead">
                Pain is often a sign of something deeper. We treat both, with one care coordinator beside you throughout.
              </p>
            </div>
          }
        />
      </div>
    </section>
  )
}
