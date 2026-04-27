import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let start: number | null = null
    const duration = 1800

    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * 100))

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setCount(100)
        setTimeout(() => setDone(true), 300)
        setTimeout(onDone, 300 + 900)
      }
    }

    requestAnimationFrame(step)
  }, [onDone])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#1a1a1a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Counter */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(6rem, 18vw, 14rem)',
              fontWeight: 300,
              color: '#ffffff',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              fontVariantNumeric: 'tabular-nums',
              userSelect: 'none',
            }}
          >
            {String(count).padStart(2, '0')}
          </motion.span>

          {/* Name line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#c9a96e',
              marginTop: '24px',
            }}
          >
            Nihil Kaarthikeyan
          </motion.p>

          {/* Bottom progress line */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '1px',
            width: `${count}%`,
            background: 'rgba(201,169,110,0.5)',
            transition: 'width 0.05s linear',
          }} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
