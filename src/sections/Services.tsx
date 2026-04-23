import { motion } from 'framer-motion'

const SERVICES = [
  {
    number: '01',
    title: 'Web Development',
    description: 'Full-stack web applications built to perform — from landing pages to complex platforms with auth, dashboards, and APIs.',
    tags: ['React', 'Next.js', 'Laravel', 'Django', 'MySQL', 'MongoDB'],
    from: '₹8,000',
    turnaround: '1 – 4 weeks',
  },
  {
    number: '02',
    title: 'Mobile Development',
    description: 'Native Android apps with clean UI, offline support, and backend integration — built for real users on real devices.',
    tags: ['Kotlin', 'Android', 'Firebase', 'REST APIs', 'Media3'],
    from: '₹12,000',
    turnaround: '2 – 6 weeks',
  },
  {
    number: '03',
    title: 'AI Agent Building',
    description: 'Custom AI pipelines, chatbots, and intelligent automation workflows that save time and scale with your business.',
    tags: ['OpenAI', 'LangChain', 'Python', 'RAG', 'API Integration'],
    from: '₹10,000',
    turnaround: '1 – 3 weeks',
  },
  {
    number: '04',
    title: 'Software Solutions',
    description: 'Scripts, tools, embedded firmware, automation, or any custom software — if it can be built, I can build it.',
    tags: ['Python', 'C/C++', 'Arduino', 'ESP32', 'Automation'],
    from: 'Custom quote',
    turnaround: 'Depends on scope',
  },
]

export default function Services() {
  return (
    <section id="services" style={{ background: '#faf9f7', padding: '120px 28px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '64px' }}
        >
          <p className="chapter-label" style={{ marginBottom: '16px' }}>06 — Services</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px' }}>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: '#1a1a1a',
              lineHeight: 1.1,
            }}>
              What I build
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#888', maxWidth: '380px', lineHeight: 1.7, textAlign: 'right' }}>
              Open to freelance & contract work.<br />Let's build something together.
            </p>
          </div>
        </motion.div>

        {/* Service cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 520px), 1fr))',
          gap: '1px',
          background: '#ebebeb',
          borderRadius: '20px',
          overflow: 'hidden',
        }}>
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: '#ffffff',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'background 0.25s ease',
              }}
              whileHover={{ backgroundColor: '#faf9f7' } as never}
            >
              {/* Ghost number */}
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '24px',
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '5.5rem',
                fontWeight: 300,
                color: 'rgba(26,26,26,0.04)',
                lineHeight: 1,
                pointerEvents: 'none',
                userSelect: 'none',
              }}>
                {service.number}
              </div>

              {/* Gold accent */}
              <div style={{ width: '32px', height: '2px', background: '#c9a96e' }} />

              {/* Title */}
              <h3 style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 500,
                color: '#1a1a1a',
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
              }}>
                {service.title}
              </h3>

              {/* Description */}
              <p style={{ fontSize: '0.92rem', color: '#666', lineHeight: 1.75, maxWidth: '420px' }}>
                {service.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {service.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: '0.7rem',
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

              {/* Footer row */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 'auto',
                paddingTop: '20px',
                borderTop: '1px solid #ebebeb',
                flexWrap: 'wrap',
                gap: '12px',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#b0b0b0' }}>Starting from</span>
                  <span style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.4rem', fontWeight: 600, color: '#1a1a1a', letterSpacing: '-0.01em' }}>
                    {service.from}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'right' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#b0b0b0' }}>Turnaround</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#555' }}>{service.turnaround}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginTop: '48px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}
        >
          <a href="#contact" className="btn-primary" style={{ fontSize: '0.88rem' }}>
            Start a project ↗
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '24px', height: '1px', background: '#c9a96e' }} />
            <span style={{ fontSize: '0.75rem', color: '#888', letterSpacing: '0.05em' }}>
              All projects include source code & documentation
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
