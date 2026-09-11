import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Background from './components/Background'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Journey from './components/Journey'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'

import { setLenis, scrollToId } from './utils/smoothScroll'
import { usePrefersReducedMotion } from './hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.15,
      wheelMultiplier: 1,
      smoothWheel: true,
    })
    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [reduced])

  useEffect(() => {
    if (loaded) ScrollTrigger.refresh()
  }, [loaded])

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh).catch(() => {})
    return () => {
      document.fonts?.ready.then(refresh).catch(() => {})
    }
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null
      if (!target) return
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href) return
      const id = href.slice(1)
      if (!document.getElementById(id)) return
      e.preventDefault()
      scrollToId(id)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <Background />
      <CustomCursor />
      <div className="noise-overlay" aria-hidden="true" />

      <AnimatePresence>
        {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <main className="relative z-10">
        <Navbar ready={loaded} />
        <Hero ready={loaded} />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Education />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  )
}