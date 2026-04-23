import { useEffect, useState } from 'react'

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setLeaving(true)
            setTimeout(onDone, 600)
          }, 200)
          return 100
        }
        return p + 2.5
      })
    }, 16)
    return () => clearInterval(interval)
  }, [onDone])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff',
        opacity: leaving ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: leaving ? 'none' : 'auto',
      }}
    >
      <p
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          fontSize: '1.4rem',
          color: '#1a1a1a',
          letterSpacing: '-0.02em',
          marginBottom: '32px',
        }}
      >
        NK
      </p>

      {/* Minimal progress line */}
      <div style={{ width: '120px', height: '1.5px', background: '#ebebeb', borderRadius: '2px', overflow: 'hidden' }}>
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: '#1a1a1a',
            transition: 'width 0.1s linear',
            borderRadius: '2px',
          }}
        />
      </div>
    </div>
  )
}
