import { CallbackModal } from './components/CallbackModal'
import { CookieBanner } from './components/CookieBanner'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Doctors } from './sections/Doctors'
import { ClinicCard } from './sections/ClinicCard'
import { Clinics } from './sections/Clinics'
import { DailyMovement } from './sections/DailyMovement'
import { Hero } from './sections/Hero'
import { HowWeHelp } from './sections/HowWeHelp'
import { Nutrition } from './sections/Nutrition'
import { Journey } from './sections/Journey'
import { PatientStories } from './sections/PatientStories'
import { Protocols } from './sections/Protocols'
import { Treatments } from './sections/Treatments'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ClinicCard />
        <HowWeHelp />
        <Journey />
        <Clinics />
        <Treatments />
        <Doctors />
        <PatientStories />
        <Protocols />
        <Nutrition />
        <DailyMovement />
      </main>
      <Footer />
      <CallbackModal />
      <CookieBanner />
    </>
  )
}
