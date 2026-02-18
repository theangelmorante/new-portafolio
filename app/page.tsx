import { Hero } from '@/components/organisms/Hero'
import { About } from '@/components/organisms/About'
import { Skills } from '@/components/organisms/Skills'
import { Projects } from '@/components/organisms/Projects'
import { Experience } from '@/components/organisms/Experience'
import { Education } from '@/components/organisms/Education'
import { Certifications } from '@/components/organisms/Certifications'
import { Navigation } from '@/components/organisms/Navigation'
import { Footer } from '@/components/organisms/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <Footer />
    </main>
  )
}
