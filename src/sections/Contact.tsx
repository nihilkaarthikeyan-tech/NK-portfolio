import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID  = 'service_2otuxsl'
const EMAILJS_TEMPLATE_ID = 'template_hudgfpy'
const EMAILJS_PUBLIC_KEY  = 'SW8z1CTGUNveuU4NQ'

const INFO = [
  {
    icon: '📍',
    label: 'Location',
    value: 'Coimbatore, Tamil Nadu',
    href: null,
  },
  {
    icon: '📞',
    label: 'Phone',
    value: '+91-9585410890',
    href: 'tel:+919585410890',
  },
  {
    icon: '✉️',
    label: 'Email',
    value: 'nihilkaarthikeyan@gmail.com',
    href: 'mailto:nihilkaarthikeyan@gmail.com',
  },
]

const SOCIALS = [
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/nihilkaarthikeyanv', icon: 'in' },
  { label: 'GitHub',    href: 'https://github.com/Nihilkarthik12',               icon: 'GH' },
  { label: 'LeetCode',  href: 'https://leetcode.com/u/karthi12/',                icon: 'LC' },
  { label: 'Instagram', href: 'https://www.instagram.com/karthik.xo/',           icon: 'IG' },
]

type Status = 'idle' | 'sending' | 'sent' | 'error'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '10px',
  border: '1px solid #ebebeb',
  background: '#faf9f7',
  fontSize: '0.88rem',
  color: '#1a1a1a',
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '0.78rem', fontWeight: 500, color: '#555', letterSpacing: '0.01em' }}>
        {label}{required && <span style={{ color: '#b0b0b0', marginLeft: '2px' }}>*</span>}
      </label>
      {children}
    </div>
  )
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const getFocusStyle = (name: string): React.CSSProperties =>
    focusedField === name
      ? { borderColor: '#1a1a1a', boxShadow: '0 0 0 3px rgba(26,26,26,0.06)', background: '#ffffff' }
      : {}

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    setStatus('sending')
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      setStatus('sent')
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" style={{ background: '#ffffff', padding: '120px 28px 80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '56px' }}
        >
          <p className="chapter-label" style={{ marginBottom: '16px' }}>07 — Contact</p>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#1a1a1a', lineHeight: 1.1 }}>
            Let's talk.
          </h2>
          <p style={{ fontSize: '1rem', color: '#888', marginTop: '12px', lineHeight: 1.6 }}>
            Got a project in mind, or just want to say hi? I'm currently available for work.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)', gap: '32px', alignItems: 'start' }}>

          {/* ── LEFT: Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: '#faf9f7', borderRadius: '20px', padding: '36px', border: '1px solid #ebebeb' }}
          >
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '28px', letterSpacing: '-0.01em' }}>
              Send me a message
            </h3>

            <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Name + Email row */}
              <div className="contact-name-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Field label="Name" required>
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    style={{ ...inputStyle, ...getFocusStyle('name') }}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    style={{ ...inputStyle, ...getFocusStyle('email') }}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                  />
                </Field>
              </div>

              <Field label="Subject" required>
                <input
                  name="title"
                  required
                  placeholder="What's this about?"
                  style={{ ...inputStyle, ...getFocusStyle('subject') }}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                />
              </Field>

              <Field label="Message" required>
                <textarea
                  name="message"
                  required
                  placeholder="Tell me about your project..."
                  rows={6}
                  style={{ ...inputStyle, ...getFocusStyle('message'), resize: 'vertical', minHeight: '140px' }}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                />
              </Field>

              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '10px',
                  background: status === 'sent' ? '#1a1a1a' : '#1a1a1a',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  fontFamily: 'Inter, sans-serif',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  border: 'none',
                  opacity: status === 'sending' ? 0.6 : 1,
                  transition: 'opacity 0.2s, transform 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.opacity = '0.85' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                {status === 'sending' && '⏳ Sending...'}
                {status === 'sent'    && '✓ Message sent!'}
                {status === 'error'   && '✕ Failed — try again'}
                {status === 'idle'    && (<>↗ Send Message</>)}
              </button>

              {status === 'sent' && (
                <p style={{ fontSize: '0.8rem', color: '#888', textAlign: 'center' }}>
                  Thanks! I'll get back to you soon.
                </p>
              )}
            </form>
          </motion.div>

          {/* ── RIGHT: Info + Socials ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Contact info card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: '#faf9f7', borderRadius: '20px', padding: '32px', border: '1px solid #ebebeb' }}
            >
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '24px', letterSpacing: '-0.01em' }}>
                Contact Information
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {INFO.map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#ffffff', border: '1px solid #ebebeb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#b0b0b0', marginBottom: '3px' }}>
                        {item.label}
                      </p>
                      {item.href ? (
                        <a href={item.href} style={{ fontSize: '0.88rem', color: '#1a1a1a', fontWeight: 500, transition: 'color 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#555'}
                          onMouseLeave={e => e.currentTarget.style.color = '#1a1a1a'}>
                          {item.value}
                        </a>
                      ) : (
                        <p style={{ fontSize: '0.88rem', color: '#1a1a1a', fontWeight: 500 }}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Socials card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: '#faf9f7', borderRadius: '20px', padding: '32px', border: '1px solid #ebebeb' }}
            >
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '20px', letterSpacing: '-0.01em' }}>
                Follow Me
              </h3>
              <div style={{ display: 'flex', gap: '12px' }}>
                {SOCIALS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    style={{
                      width: '44px', height: '44px', borderRadius: '10px',
                      background: '#ffffff', border: '1px solid #ebebeb',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.75rem', fontWeight: 700, color: '#555',
                      transition: 'all 0.2s', textDecoration: 'none',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#1a1a1a' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = '#ebebeb' }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
