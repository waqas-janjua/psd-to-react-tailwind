import { Hero } from './components/Hero'
import { NavBar } from './components/NavBar'
import { About } from './components/About'
import { Footer } from './components/Footer'
import { Services } from './components/Services'

export default function App() {
  return (
    <>
      <NavBar />
      <Hero />
      <Services />
      <About />
      <Footer />
    </>
  )
}
