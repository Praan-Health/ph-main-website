import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Doctors } from './sections/Doctors'
import { Clinics } from './sections/Clinics'
import { DailyMovement } from './sections/DailyMovement'
import { Hero } from './sections/Hero'
import { HowWeHelp } from './sections/HowWeHelp'
import { Nutrition } from './sections/Nutrition'
import { Protocols } from './sections/Protocols'
import { Stats } from './sections/Stats'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <HowWeHelp />
        <Clinics />
        <Protocols />
        <Doctors />
        <Nutrition />
        <DailyMovement />
      </main>
      <Footer />
    </>
  )
}
