import { useRef, useState, useEffect } from 'react'
import { skills, certifications } from '../data/skills'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

// ─── Lightbox ────────────────────────────────────────────────────────────────

function CertLightbox({ cert, onClose }: { cert: typeof certifications[0]; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 16 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          overflow: 'hidden',
          maxWidth: '820px',
          width: '100%',
          boxShadow: '0 40px 80px rgba(0,0,0,0.35)',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #ebebeb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#b0b0b0', marginBottom: '4px' }}>
              {cert.issuer}
            </p>
            <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.3 }}>
              {cert.title}
            </h4>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: '#f5f4f1', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem', color: '#555', flexShrink: 0,
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#ebebeb')}
            onMouseLeave={e => (e.currentTarget.style.background = '#f5f4f1')}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Certificate image */}
        <div style={{ background: '#faf9f7', padding: '12px', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={cert.image}
            alt={cert.title}
            style={{ width: '100%', height: 'auto', maxHeight: '70vh', objectFit: 'contain', borderRadius: '8px', display: 'block' }}
            onError={e => {
              const el = e.currentTarget
              el.style.display = 'none'
              const parent = el.parentElement!
              parent.innerHTML = `<p style="color:#b0b0b0;font-size:0.85rem;text-align:center;padding:60px 20px">Certificate image not found.<br/>Add it at <strong>${cert.image}</strong></p>`
            }}
          />
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 24px', borderTop: '1px solid #ebebeb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: '#b0b0b0' }}>{cert.date}</p>
          <p style={{ fontSize: '0.72rem', color: '#b0b0b0' }}>Press Esc or click outside to close</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Skill Pill ───────────────────────────────────────────────────────────────

function SkillPill({ name }: { name: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - (rect.left + rect.width / 2))
    y.set(e.clientY - (rect.top + rect.height / 2))
  }
  const handleMouseLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.span
      style={{
        display: 'inline-flex', alignItems: 'center',
        padding: '6px 14px', borderRadius: '100px',
        fontSize: '0.78rem', fontWeight: 500,
        background: '#f5f4f1', color: '#555',
        border: '1px solid transparent', cursor: 'default',
        x: mouseXSpring, y: mouseYSpring,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ background: '#ffffff', borderColor: '#d4d4d4', color: '#1a1a1a', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', scale: 1.05, transition: { duration: 0.2 } }}
    >
      {name}
    </motion.span>
  )
}

// ─── Cert Card ────────────────────────────────────────────────────────────────

function CertCard({ cert, onClick }: { cert: typeof certifications[0]; onClick: () => void }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { stiffness: 150, damping: 20 }
  const mouseXSpring = useSpring(x, springConfig)
  const mouseYSpring = useSpring(y, springConfig)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => { x.set(0); y.set(0) }

  return (
    <div style={{ perspective: '1000px' }} className="cert-card">
      <motion.div
        onClick={onClick}
        style={{
          padding: '24px', background: '#faf9f7',
          borderRadius: '12px', border: '1px solid transparent',
          rotateX, rotateY, transformStyle: 'preserve-3d',
          cursor: 'pointer',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{
          background: '#ffffff', borderColor: '#ebebeb',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)', scale: 1.02,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div style={{ transform: 'translateZ(10px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#b0b0b0' }}>
              {cert.issuer}
            </p>
            {/* View indicator */}
            <span style={{ fontSize: '0.62rem', fontWeight: 500, color: '#b0b0b0', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '0.7rem' }}>↗</span> View
            </span>
          </div>
          <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.95rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px', lineHeight: 1.4 }}>
            {cert.title}
          </h4>
          <p style={{ fontSize: '0.75rem', color: '#888' }}>{cert.date}</p>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeCert, setActiveCert] = useState<typeof certifications[0] | null>(null)

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.skill-category')
    gsap.fromTo(cards,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
    )

    const certs = gsap.utils.toArray<HTMLElement>('.cert-card')
    gsap.fromTo(certs,
      { opacity: 0, y: 20, rotateX: 20 },
      { opacity: 1, y: 0, rotateX: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.certs-grid', start: 'top 85%' } }
    )
  }, { scope: sectionRef })

  return (
    <>
      <AnimatePresence>
        {activeCert && (
          <CertLightbox cert={activeCert} onClose={() => setActiveCert(null)} />
        )}
      </AnimatePresence>

      <section id="skills" ref={sectionRef} style={{ background: '#ffffff', padding: '120px 28px', minHeight: '100vh', perspective: '1200px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <p className="chapter-label" style={{ marginBottom: '16px' }}>04 — Capabilities</p>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#1a1a1a', marginBottom: '56px' }}>
              Core technologies
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px', marginBottom: '80px' }}>
            {skills.map(s => (
              <div key={s.category} className="skill-category" style={{ opacity: 0, transformOrigin: 'top left' }}>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                  {s.category}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {s.items.map(skill => <SkillPill key={skill} name={skill} />)}
                </div>
              </div>
            ))}
          </div>

          <div className="section-divider" style={{ marginBottom: '56px' }} />

          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.25rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px', letterSpacing: '-0.01em' }}
          >
            Certifications
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: '0.8rem', color: '#b0b0b0', marginBottom: '32px' }}
          >
            Click any card to view the certificate
          </motion.p>

          <div className="certs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {certifications.map(cert => (
              <CertCard key={cert.title} cert={cert} onClick={() => setActiveCert(cert)} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
