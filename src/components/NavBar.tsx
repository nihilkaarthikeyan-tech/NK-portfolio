import { useEffect, useState } from 'react'

const links = [
  { label: 'About',   href: '#about' },
  { label: 'Work',    href: '#work' },
  { label: 'Process', href: '#how-i-think' },
  { label: 'Skills',  href: '#skills' },
  { label: 'Journey', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid #ebebeb' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 28px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a
          href="#hero"
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: '1.15rem',
            color: '#1a1a1a',
            letterSpacing: '-0.02em',
          }}
        >
          NK
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }} className="hidden md:flex">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              style={{
                fontSize: '0.82rem',
                fontWeight: 450,
                color: '#888',
                letterSpacing: '0.01em',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex btn-primary"
          style={{ padding: '8px 20px', fontSize: '0.8rem', borderRadius: '100px' }}
        >
          Get in touch
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
          style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}
        >
          <span style={{ display: 'block', width: '20px', height: '1.5px', background: '#1a1a1a', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
          <span style={{ display: 'block', width: '20px', height: '1.5px', background: '#1a1a1a', borderRadius: '2px', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: '20px', height: '1.5px', background: '#1a1a1a', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden"
        style={{
          maxHeight: menuOpen ? '400px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
          background: '#fff',
          borderTop: menuOpen ? '1px solid #ebebeb' : 'none',
        }}
      >
        <div style={{ padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{ fontSize: '0.9rem', color: '#555', fontWeight: 450 }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary"
            style={{ textAlign: 'center', fontSize: '0.85rem', padding: '10px 20px', marginTop: '4px' }}
            onClick={() => setMenuOpen(false)}
          >
            Get in touch
          </a>
        </div>
      </div>
    </nav>
  )
}
