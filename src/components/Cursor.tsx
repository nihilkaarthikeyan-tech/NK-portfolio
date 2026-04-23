import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    const xToCursor = gsap.quickTo(cursor, "x", {duration: 0.35, ease: "power3"})
    const yToCursor = gsap.quickTo(cursor, "y", {duration: 0.35, ease: "power3"})

    const xToDot = gsap.quickTo(dot, "x", {duration: 0, ease: "none"})
    const yToDot = gsap.quickTo(dot, "y", {duration: 0, ease: "none"})

    const moveCursor = (e: MouseEvent) => {
      xToCursor(e.clientX)
      yToCursor(e.clientY)
      xToDot(e.clientX)
      yToDot(e.clientY)
    }

    const onEnterLink = () => {
      if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1.8)'
      if (cursor) cursor.style.borderColor = '#1a1a1a'
      if (cursor) cursor.style.background = 'rgba(26,26,26,0.04)'
    }
    const onLeaveLink = () => {
      if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)'
      if (cursor) cursor.style.borderColor = 'rgba(26,26,26,0.35)'
      if (cursor) cursor.style.background = 'transparent'
    }

    const addLinkListeners = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })
    }
    addLinkListeners()

    window.addEventListener("mousemove", moveCursor)
    const observer = new MutationObserver(addLinkListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          border: '1.5px solid rgba(26,26,26,0.35)',
          transition: 'border-color 0.2s, background 0.2s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ background: '#1a1a1a' }}
      />
    </>
  )
}
