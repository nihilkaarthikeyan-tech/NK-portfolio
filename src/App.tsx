import { useEffect, useState, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import { Analytics } from '@vercel/analytics/react'

import Hero from './sections/Hero'
import About from './sections/About'
import Work from './sections/Work'
import HowIThink from './sections/HowIThink'
import Skills from './sections/Skills'
import Timeline from './sections/Timeline'
import Contact from './sections/Contact'
import NavBar from './components/NavBar'
import Loader from './components/Loader'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import Marquee from './components/Marquee'
import Services from './sections/Services'
import NotFound from './pages/NotFound'

function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? scrollTop / docHeight : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${pct})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div ref={barRef} className="scroll-progress" style={{ width: '100%', transformOrigin: 'left' }} />
}

function GrainOverlay() {
  return (
    <svg
      style={{
        position: 'fixed',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        opacity: 0.04,
        pointerEvents: 'none',
        zIndex: 9997,
        animation: 'grain-shift 8s steps(10) infinite',
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="grain-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-noise)" />
    </svg>
  )
}

function Portfolio() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!loaded) return
    const lenis = new Lenis()
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => { lenis.destroy() }
  }, [loaded])

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <Cursor />
      <GrainOverlay />

      <div
        style={{
          background: '#ffffff',
          color: '#1a1a1a',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
          minHeight: '100vh',
          overflowX: 'hidden',
        }}
      >
        <ScrollProgress />
        <NavBar />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Work />
          <HowIThink />
          <Skills />
          <Timeline />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Analytics />
    </>
  )
}

export default App
