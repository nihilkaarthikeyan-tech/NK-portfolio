const ITEMS = [
  'FULL STACK DEVELOPER',
  'AI BUILDER',
  'MECHATRONICS ENGINEER',
  'REACT & NEXT.JS',
  'PYTHON',
  'OPEN TO WORK',
]

const SEP = <span style={{ margin: '0 32px', color: '#444', fontSize: '0.75rem', fontWeight: 300 }}>/</span>

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div
      style={{
        overflow: 'hidden',
        background: '#1a1a1a',
        padding: '15px 0',
        position: 'relative',
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 400,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#ffffff',
                whiteSpace: 'nowrap',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {item}
            </span>
            {SEP}
          </span>
        ))}
      </div>
    </div>
  )
}
