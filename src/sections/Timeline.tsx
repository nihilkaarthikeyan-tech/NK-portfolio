import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { education, experience } from '../data/education'

const TYPE_LABELS: Record<string, string> = {
  Education:  'EDU',
  Internship: 'EXP',
  Workshop:   'WRK',
  Achievement:'ACH',
  Volunteer:  'VOL',
}

const timelineItems = [
  ...education.map(e => ({ type: 'Education', title: e.degree, subtitle: e.institution, date: e.period, desc: e.description })),
  ...experience.map(e => ({ type: e.type, title: e.type === 'Internship' ? e.company : e.description, subtitle: e.company, date: e.date, desc: e.description }))
]

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Create a scroll-linked animation for a vertical line connecting the items
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  return (
    <section id="timeline" ref={containerRef} style={{ background: '#faf9f7', padding: '120px 28px', position: 'relative' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: '-100px' }}
           transition={{ duration: 0.8 }}
        >
          <p className="chapter-label" style={{ marginBottom: '16px' }}>05 — Journey</p>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#1a1a1a', marginBottom: '80px' }}>
            Education & experience
          </h2>
        </motion.div>

        {/* The Animated Connecting Line */}
        <div style={{ position: 'absolute', left: '16px', top: '200px', bottom: '100px', width: '2px', background: '#ebebeb', zIndex: 0, display: 'none' }} className="md:block">
           <motion.div 
             style={{ 
                width: '100%', 
                height: '100%', 
                background: '#1a1a1a', 
                scaleY: scrollYProgress, 
                transformOrigin: 'top' 
             }} 
           />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', position: 'relative', zIndex: 1 }}>
          {timelineItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20, rotateY: 10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                paddingLeft: '40px', // space for the line indicator
                perspective: '1000px',
              }}
              className="md:pl-[64px]"
            >
              {/* Dot indicator */}
              <div 
                className="hidden md:block"
                style={{ 
                  position: 'absolute', 
                  left: '-24px', 
                  top: '6px', 
                  width: '10px', 
                  height: '10px', 
                  borderRadius: '50%', 
                  background: '#ffffff', 
                  border: '2px solid #1a1a1a',
                  zIndex: 2,
                }} 
              />

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'baseline', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#888', minWidth: '100px', fontFamily: 'Space Grotesk, sans-serif' }}>
                  {item.date}
                </span>
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: '#1a1a1a',
                  background: '#ebebeb',
                  padding: '2px 8px',
                  borderRadius: '4px'
                }}>
                  {TYPE_LABELS[item.type] || 'ITEM'}
                </span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: '#ffffff', padding: '32px', borderRadius: '16px', border: '1px solid #ebebeb', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                 <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.25rem', fontWeight: 600, color: '#1a1a1a', letterSpacing: '-0.01em' }}>
                    {item.title}
                 </h3>
                 <p style={{ fontSize: '0.9rem', fontWeight: 500, color: '#555' }}>
                   {item.subtitle}
                 </p>
                 <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.6, marginTop: '8px', maxWidth: '600px' }}>
                   {item.desc}
                 </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
