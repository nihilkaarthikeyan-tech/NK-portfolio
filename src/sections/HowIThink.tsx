import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num: '01',
    title: 'Understand',
    desc: 'Research user pain points, map existing solutions, and define clear success criteria before writing any code.',
  },
  {
    num: '02',
    title: 'Architect',
    desc: 'Sketch data flows, API contracts, and component boundaries. Good decisions early prevent costly rewrites later.',
  },
  {
    num: '03',
    title: 'Build',
    desc: 'Ship in small, testable increments. Each iteration is tested and validated against the original requirements.',
  },
  {
    num: '04',
    title: 'Reflect',
    desc: 'Document what worked, what didn\'t, and why. Compounding knowledge ensures I never repeat the same mistakes.',
  },
]

const DECISIONS = [
  { project: 'AI Lead Generator', decision: 'Next.js over React SPA', reason: 'SSR critical for SEO + API routes simplified backend.' },
  { project: 'Digital Signage', decision: 'Media3 over MediaPlayer', reason: 'Better buffering, DRM support, playlist management.' },
  { project: 'Publicationmart', decision: 'Inertia.js over REST', reason: 'Avoided SPA complexity while keeping React components.' },
]

export default function HowIThink() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // 3D folding effect for the grid items
    const items = gsap.utils.toArray<HTMLElement>('.think-item')
    items.forEach((item) => {
      gsap.fromTo(item,
        { opacity: 0, rotateX: -45, transformOrigin: 'top center', y: 30 },
        { 
          opacity: 1, 
          rotateX: 0, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out', 
          scrollTrigger: { 
            trigger: item, 
            start: 'top 90%'
          } 
        }
      )
    })
  }, { scope: ref })

  return (
    <section id="how-i-think" ref={ref} style={{ background: '#faf9f7', padding: '120px 28px', minHeight: '100vh', perspective: '1200px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <p className="chapter-label" style={{ marginBottom: '16px' }}>03 — Process</p>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#1a1a1a', marginBottom: '16px' }}>
            How I think
          </h2>
          <p style={{ fontSize: '1rem', color: '#888', maxWidth: '500px', lineHeight: 1.65, marginBottom: '56px' }}>
            My approach from blank page to shipped product.
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: '#ebebeb', borderRadius: '16px', overflow: 'hidden', marginBottom: '64px' }}>
          {STEPS.map(step => (
            <div
              key={step.num}
              className="think-item"
              style={{ background: '#ffffff', padding: '32px 28px', opacity: 0 }}
            >
              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2.2rem', fontWeight: 700, color: '#ebebeb', marginBottom: '16px', lineHeight: 1 }}>
                {step.num}
              </p>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '10px', letterSpacing: '-0.01em' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.65 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Decisions */}
        <motion.p 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true, margin: '-50px' }}
           className="chapter-label" 
           style={{ marginBottom: '24px' }}>Key decisions</motion.p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#ebebeb', borderRadius: '12px', overflow: 'hidden' }}>
          {DECISIONS.map(d => (
            <div
              key={d.decision}
              className="think-item"
              style={{ background: '#ffffff', padding: '24px 28px', display: 'flex', flexWrap: 'wrap', gap: '8px 32px', alignItems: 'baseline', opacity: 0 }}
            >
              <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#b0b0b0', minWidth: '140px' }}>
                {d.project}
              </span>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.95rem', color: '#1a1a1a', flex: '1', minWidth: '180px' }}>
                {d.decision}
              </span>
              <span style={{ fontSize: '0.85rem', color: '#888', flex: '2', minWidth: '200px' }}>
                {d.reason}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
