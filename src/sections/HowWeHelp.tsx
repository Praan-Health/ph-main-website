import { HelpStack } from '../components/HelpStack'

export function HowWeHelp() {
  return (
    <section className="section" aria-labelledby="how-title">
      <div className="container">
        <HelpStack
          intro={
            <div className="section-head help__intro">
              <span className="eyebrow">How Praan Health helps you</span>
              <h2 id="how-title">Three ways we look after the people you love</h2>
            </div>
          }
        />
      </div>
    </section>
  )
}
