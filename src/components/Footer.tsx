export default function Footer() {
  return (
    <footer style={{ background: '#ffffff', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 28px' }}>
        <div style={{ height: '1px', background: '#ebebeb' }} />

        {/* Editorial closing */}
        <div style={{ padding: '80px 0 64px' }}>
          <p style={{
            fontSize: '0.68rem',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#b0b0b0',
            marginBottom: '36px',
            fontFamily: 'Inter, sans-serif',
          }}>
            Let's collaborate
          </p>

          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: '#1a1a1a',
            marginBottom: '52px',
          }}>
            Let's create<br />
            <em style={{ fontStyle: 'italic', fontWeight: 300 }}>something</em><br />
            extraordinary.
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <a href="#contact" className="btn-primary" style={{ fontSize: '0.85rem' }}>
              Start a conversation ↗
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '24px', height: '1px', background: '#c9a96e', flexShrink: 0 }} />
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                color: '#c9a96e',
                fontFamily: 'Inter, sans-serif',
              }}>
                nihilkaarthikeyan@gmail.com
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #ebebeb',
          padding: '24px 0 40px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
        }}>
          <span style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '1.05rem',
            fontWeight: 400,
            color: '#b0b0b0',
            letterSpacing: '0.02em',
          }}>
            Nihil Kaarthikeyan V — {new Date().getFullYear()}
          </span>
          <span style={{
            fontSize: '0.65rem',
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#d4d4d4',
            fontFamily: 'Inter, sans-serif',
          }}>
            Designed & Built with precision
          </span>
        </div>
      </div>
    </footer>
  )
}
