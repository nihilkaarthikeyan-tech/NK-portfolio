import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '28px',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(7rem, 20vw, 12rem)',
            fontWeight: 300,
            color: 'rgba(26,26,26,0.05)',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          404
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 400,
            color: '#1a1a1a',
            marginTop: '-16px',
            marginBottom: '12px',
            letterSpacing: '-0.01em',
          }}
        >
          Page not found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          style={{ fontSize: '0.95rem', color: '#888', marginBottom: '40px', lineHeight: 1.7 }}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href="/" className="btn-primary" style={{ fontSize: '0.85rem' }}>
            ← Back to portfolio
          </a>
          <a href="/#contact" className="btn-ghost" style={{ fontSize: '0.85rem' }}>
            Get in touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
        >
          <div style={{ width: '24px', height: '1px', background: '#c9a96e' }} />
          <span style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b0b0b0', fontWeight: 500 }}>
            Nihil Kaarthikeyan
          </span>
          <div style={{ width: '24px', height: '1px', background: '#c9a96e' }} />
        </motion.div>
      </div>
    </div>
  )
}
