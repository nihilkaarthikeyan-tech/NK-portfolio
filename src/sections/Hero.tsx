import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState, type MouseEvent } from 'react'
import MagneticButton from '../components/MagneticButton'

const ROLES = [
  'Full Stack Developer',
  'AI Builder',
  'Mechatronics Engineer',
]

function TypewriterRole() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = ROLES[roleIdx]
    if (!deleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
      return () => clearTimeout(t)
    }
    if (!deleting && displayed.length === current.length) {
      const t = setTimeout(() => setDeleting(true), 2500)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIdx(i => (i + 1) % ROLES.length)
    }
  }, [displayed, deleting, roleIdx])

  return (
    <span style={{ color: '#888', fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)', fontFamily: 'Inter, sans-serif', fontWeight: 400, letterSpacing: '0.01em' }}>
      {displayed}
      <span
        className="animate-blink"
        style={{
          borderRight: '1.5px solid #c9a96e',
          marginLeft: '2px',
          display: 'inline-block',
          height: '0.85em',
          verticalAlign: 'middle',
        }}
      />
    </span>
  )
}

function CinematicProfileImage() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 60, damping: 25 })
  const mouseYSpring = useSpring(y, { stiffness: 60, damping: 25 })
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg'])
  const bgX = useTransform(mouseXSpring, [-0.5, 0.5], ['-10px', '10px'])
  const bgY = useTransform(mouseYSpring, [-0.5, 0.5], ['-10px', '10px'])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => { x.set(0); y.set(0) }

  return (
    <div
      style={{ position: 'relative', width: '100%', maxWidth: '320px', aspectRatio: '3/4', perspective: '1200px', margin: '0 auto' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div style={{ width: '100%', height: '100%', rotateX, rotateY, transformStyle: 'preserve-3d', position: 'relative' }}>
        <motion.div
          style={{
            position: 'absolute', inset: '-5%',
            background: 'rgba(0,0,0,0.07)',
            filter: 'blur(30px)',
            borderRadius: '24px',
            x: bgX, y: bgY,
            transform: 'translateZ(-40px)',
          }}
        />
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '100%', height: '100%',
            borderRadius: '24px', overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.06)',
            background: '#f5f4f1',
            transform: 'translateZ(20px)',
            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.12)',
          }}
        >
          <img
            src="/profile.jpeg"
            alt="Nihil Kaarthikeyan"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%' }}
          />
        </motion.div>

        <motion.div
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: 0, left: '10%', right: '10%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
            transform: 'translateZ(25px)',
            borderRadius: '1px',
          }}
        />

        {/* Gold corner accent lines */}
        <div style={{
          position: 'absolute', bottom: '18px', right: '18px',
          transform: 'translateZ(30px)',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px',
          pointerEvents: 'none',
        }}>
          <div style={{ width: '28px', height: '1px', background: 'rgba(201,169,110,0.55)' }} />
          <div style={{ width: '14px', height: '1px', background: 'rgba(201,169,110,0.35)' }} />
        </div>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: '#ffffff',
        padding: '120px 28px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ghost watermark — large faint initials */}
      <div style={{
        position: 'absolute',
        right: '-4%',
        top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: 'Cormorant Garamond, Georgia, serif',
        fontSize: 'clamp(18rem, 32vw, 42rem)',
        fontWeight: 300,
        color: 'rgba(26,26,26,0.022)',
        lineHeight: 0.85,
        pointerEvents: 'none',
        userSelect: 'none',
        letterSpacing: '-0.05em',
        zIndex: 0,
      }}>
        NK
      </div>

      <div className="hero-grid">
        {/* Left Column */}
        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '9px',
              background: '#f5f4f1', borderRadius: '100px',
              padding: '7px 16px 7px 12px', marginBottom: '40px',
            }}
          >
            <span
              className="status-dot"
              style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', flexShrink: 0, display: 'inline-block' }}
            />
            <span style={{ fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888', fontFamily: 'Inter, sans-serif' }}>
              Available for work
            </span>
          </motion.div>

          {/* Name — editorial serif */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(4rem, 8.5vw, 8rem)',
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: '-0.01em',
              color: '#1a1a1a',
              marginBottom: '28px',
            }}
          >
            <em style={{ fontStyle: 'italic', fontWeight: 300 }}>Nihil</em><br />
            <span style={{ fontWeight: 600, fontStyle: 'normal' }}>Kaarthikeyan</span>
          </motion.h1>

          {/* Gold rule + typewriter role */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}
          >
            <div style={{ height: '1px', width: '40px', background: '#c9a96e', flexShrink: 0 }} />
            <TypewriterRole />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: '1rem', lineHeight: 1.8, color: '#888', maxWidth: '440px', marginBottom: '48px' }}
          >
            B.E Mechatronics student based in Coimbatore, building
            at the intersection of software, AI, and hardware.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
          >
            <MagneticButton href="#work" className="btn-primary">
              View work <span style={{ fontSize: '0.9em' }}>↓</span>
            </MagneticButton>
            <MagneticButton href="#contact" className="btn-ghost">
              Get in touch
            </MagneticButton>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 1 }}
            style={{ marginTop: '56px', display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}
          >
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#d4d4d4', fontWeight: 500, marginRight: '10px' }}>
              Find me
            </span>
            {[
              { label: 'GitHub', href: 'https://github.com/Nihilkarthik12' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nihilkaarthikeyanv' },
              { label: 'LeetCode', href: 'https://leetcode.com/u/karthi12/' },
              { label: 'Email', href: 'mailto:nihilkaarthikeyan@gmail.com' },
            ].map((s, i) => (
              <span key={s.label} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                {i > 0 && (
                  <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#e0e0e0', display: 'inline-block', flexShrink: 0 }} />
                )}
                <a
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.72rem', fontWeight: 500, color: '#b0b0b0', letterSpacing: '0.06em', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#c9a96e')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#b0b0b0')}
                >
                  {s.label}
                </a>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 0.4, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', zIndex: 1 }}
        >
          <CinematicProfileImage />
        </motion.div>
      </div>
    </section>
  )
}
