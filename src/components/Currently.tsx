import { motion } from 'framer-motion'

export default function Currently() {
  return (
    <div style={{
      background: '#ffffff',
      borderBottom: '1px solid #ebebeb',
      padding: '14px 28px',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flexWrap: 'wrap',
      }}>
        {/* Live indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexShrink: 0 }}>
          <span className="status-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
          <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b0b0b0', fontFamily: 'Inter, sans-serif' }}>
            Currently building
          </span>
        </div>

        <div style={{ width: '1px', height: '14px', background: '#ebebeb', flexShrink: 0 }} />

        {/* Project name */}
        <motion.span
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '1.05rem',
            fontWeight: 500,
            color: '#1a1a1a',
            letterSpacing: '0.01em',
          }}
        >
          GATE AI Study Assistant
        </motion.span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '1px', background: '#c9a96e' }} />
          <span style={{ fontSize: '0.72rem', color: '#888', fontFamily: 'Inter, sans-serif' }}>
            11-module AI prep platform · Claude API + pgvector + SymPy
          </span>
        </div>
      </div>
    </div>
  )
}
