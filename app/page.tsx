import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/ui/Footer'
import { PageLoader } from '@/components/ui/PageLoader'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { BackToTop } from '@/components/ui/BackToTop'
import { SpotlightEffect } from '@/components/ui/SpotlightEffect'
import { ChatBot } from '@/components/chatbot/ChatBot'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <SpotlightEffect />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <ChatBot />
    </>
  )
}
