import { useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: '8.0', label: 'CGPA' },
  { value: '8+', label: 'Projects' },
  { value: '1', label: 'Patent Filed' },
  { value: '2026', label: 'Graduate' },
]

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const text = "I'm a passionate B.E Mechatronics Engineering student at SNS College of Technology. I build at the intersection of software, AI, and hardware — from a patented non-contact tonometer to full-stack web applications and AI agents. I believe great engineering is about solving real problems with clarity and craft."

  useGSAP(() => {
    const words = sectionRef.current?.querySelectorAll('.word')
    if (words) {
      gsap.fromTo(words,
        { opacity: 0.08 },
        {
          opacity: 1,
          stagger: 0.04,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            end: 'bottom 35%',
            scrub: 1.5,
          }
        }
      )
    }
  }, { scope: sectionRef })

  return (
    <section id="about" style={{ background: '#faf9f7' }}>
      <div ref={sectionRef} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 28px' }}>
        {/* Chapter label */}
        <p className="chapter-label" style={{ marginBottom: '48px' }}>01 — About</p>

        {/* Word reveal paragraph */}
        <div style={{ maxWidth: '800px', textAlign: 'center' }}>
          <p style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)', fontWeight: 500, lineHeight: 1.5, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em', color: '#1a1a1a' }}>
            {text.split(' ').map((word, i) => (
              <span key={i} className="word" style={{ display: 'inline-block', marginRight: '0.28em', opacity: 0.08, transition: 'color 0.3s' }}>
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '64px' }}>
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ textAlign: 'center', minWidth: '80px' }}
            >
              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.8rem', color: '#1a1a1a', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                {s.value}
              </p>
              <p style={{ fontSize: '0.72rem', fontWeight: 500, color: '#b0b0b0', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '6px' }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
