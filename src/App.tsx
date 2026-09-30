import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Clinics } from './sections/Clinics'
import { DailyMovement } from './sections/DailyMovement'
import { Hero } from './sections/Hero'
import { HowWeHelp } from './sections/HowWeHelp'
import { Nutrition } from './sections/Nutrition'
import { Protocols } from './sections/Protocols'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowWeHelp />
        <Protocols />
        <Clinics />
        <Nutrition />
        <DailyMovement />
      </main>
      <Footer />
    </>
  )
}
