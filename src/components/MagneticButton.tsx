import { useRef, type ReactNode, type CSSProperties, type MouseEvent, type RefObject } from 'react'
import gsap from 'gsap'

interface Props {
  children: ReactNode
  href?: string
  className?: string
  style?: CSSProperties
  target?: string
  rel?: string
  onClick?: () => void
  strength?: number
}

export default function MagneticButton({
  children, href, className, style, target, rel, onClick, strength = 0.35,
}: Props) {
  const ref = useRef<HTMLElement>(null)

  const handleMouseMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    gsap.to(el, {
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
  }

  if (href) {
    return (
      <a
        ref={ref as RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={className}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref as RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={className}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  )
}
