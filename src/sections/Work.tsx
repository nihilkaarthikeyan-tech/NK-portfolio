import { useState, type MouseEvent } from 'react'
import { projects, type Project, type ProjectType } from '../data/projects'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

const FILTERS: { label: string; value: 'all' | ProjectType }[] = [
  { label: 'All', value: 'all' },
  { label: 'AI', value: 'ai' },
  { label: 'Web', value: 'web' },
  { label: 'Hardware', value: 'hardware' },
  { label: 'Mobile', value: 'mobile' },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // High damping, low stiffness for a premium "heavy" tilt feel
  const springConfig = { stiffness: 100, damping: 30 }
  const mouseXSpring = useSpring(x, springConfig)
  const mouseYSpring = useSpring(y, springConfig)
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"])
  // The light glare effect matching the mouse
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"])
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / rect.width - 0.5
    const yPct = mouseY / rect.height - 0.5
    x.set(xPct)
    y.set(yPct)
  }
  const handleMouseLeave = () => { x.set(0); y.set(0); }

  return (
    <div style={{ perspective: '1200px' }}>
      <motion.div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          height: '100%',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid #ebebeb',
          boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{
           borderColor: '#d4d4d4',
           boxShadow: '0 16px 40px rgba(0,0,0,0.08)',
           transition: { duration: 0.3 }
        }}
      >
        {/* Ghost card number */}
        <div style={{
          position: 'absolute',
          bottom: '-8px',
          right: '16px',
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: '7rem',
          fontWeight: 300,
          color: 'rgba(26,26,26,0.045)',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          letterSpacing: '-0.03em',
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Subtle Glare Effect inside card */}
        <motion.div
           style={{
             position: 'absolute',
             width: '200%',
             height: '200%',
             background: 'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 50%)',
             top: '-50%',
             left: '-50%',
             x: glareX,
             y: glareY,
             pointerEvents: 'none',
             opacity: 0,
           }}
           whileHover={{ opacity: 0.5 }}
        />

        {/* Card Content floated slightly on Z-axis for deeper 3D feel */}
        <div style={{ transform: 'translateZ(20px)', display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', pointerEvents: 'auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              fontSize: '0.68rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#b0b0b0',
            }}>
              {project.type}
            </span>
            {project.link !== '#' && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: '#b0b0b0', transition: 'color 0.2s', position: 'relative', zIndex: 10 }}
                onMouseEnter={e => (e.currentTarget.style.color = '#1a1a1a')}
                onMouseLeave={e => (e.currentTarget.style.color = '#b0b0b0')}
              >↗</a>
            )}
          </div>

          <div>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.25rem', fontWeight: 700, color: '#1a1a1a', letterSpacing: '-0.02em', marginBottom: '4px' }}>
              {project.title}
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#888', lineHeight: 1.5 }}>
              {project.tagline}
            </p>
          </div>

          <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.65 }}>
            {project.problem}
          </p>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '12px' }}
              >
                <div>
                  <p style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#b0b0b0', marginBottom: '4px' }}>Solution</p>
                  <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.65 }}>{project.solution}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#b0b0b0', marginBottom: '4px' }}>Impact</p>
                  <p style={{ fontSize: '0.85rem', color: '#1a1a1a', lineHeight: 1.65, fontWeight: 500 }}>{project.impact}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontSize: '0.72rem',
                fontWeight: 500,
                padding: '4px 10px',
                borderRadius: '100px',
                background: '#f5f4f1',
                color: '#888',
              }}>
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={() => setExpanded(v => !v)}
            style={{
              fontSize: '0.78rem',
              fontWeight: 500,
              color: '#1a1a1a',
              textAlign: 'left',
              padding: '4px 0',
              cursor: 'pointer',
              borderBottom: '1px solid #1a1a1a',
              alignSelf: 'flex-start',
              lineHeight: 1.4,
              transition: 'opacity 0.2s',
              position: 'relative',
              zIndex: 10,
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {expanded ? 'Show less' : 'View details'}
          </button>

        </div>
      </motion.div>
    </div>
  )
}

export default function Work() {
  const [filter, setFilter] = useState<'all' | ProjectType>('all')
  const filtered = filter === 'all' ? projects : projects.filter(p => p.type === filter)

  return (
    <section id="work" style={{ background: '#ffffff', padding: '120px 28px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}
        >
          <p className="chapter-label">02 — Work</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyItems: 'space-between', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px' }}>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#1a1a1a', lineHeight: 1.1 }}>
              Selected projects
            </h2>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {FILTERS.map(f => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  style={{
                    padding: '7px 16px',
                    borderRadius: '100px',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: filter === f.value ? '#1a1a1a' : 'transparent',
                    color: filter === f.value ? '#fff' : '#888',
                    border: filter === f.value ? '1px solid #1a1a1a' : '1px solid #ebebeb',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9, rotateX: -10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, type: 'spring' }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
