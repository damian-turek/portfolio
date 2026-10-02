'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const TEXT_SELECTOR =
  'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]), textarea, [contenteditable="true"]'

const POINTER_SELECTOR =
  'a, button, select, label, summary, [role="button"], [data-cursor="pointer"]'

type Mode = 'default' | 'pointer' | 'text'

export const CustomCursor = () => {
  const ringWrapRef = useRef<HTMLDivElement>(null)
  const dotWrapRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!canHover.matches) return

    const ringWrap = ringWrapRef.current
    const dotWrap = dotWrapRef.current
    const ring = ringRef.current
    const dot = dotRef.current
    if (!ringWrap || !dotWrap || !ring || !dot) return

    const style = document.createElement('style')
    style.textContent = 'html, html * { cursor: none !important; }'
    document.head.appendChild(style)

    gsap.set([ringWrap, dotWrap], { autoAlpha: 0 })

    const ringX = gsap.quickTo(ringWrap, 'x', {
      duration: 0.35,
      ease: 'power3.out',
    })
    const ringY = gsap.quickTo(ringWrap, 'y', {
      duration: 0.35,
      ease: 'power3.out',
    })

    let visible = false

    const setMode = (mode: Mode) => {
      ring.dataset.mode = mode
      dot.dataset.mode = mode
    }

    const handleMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true
        gsap.set(ringWrap, { x: e.clientX, y: e.clientY })
        gsap.to([ringWrap, dotWrap], { autoAlpha: 1, duration: 0.3 })
      }
      gsap.set(dotWrap, { x: e.clientX, y: e.clientY })
      ringX(e.clientX)
      ringY(e.clientY)
    }

    const handleOver = (e: MouseEvent) => {
      const target = e.target as Element | null
      if (!target || !target.closest) return
      if (target.closest(TEXT_SELECTOR)) setMode('text')
      else if (target.closest(POINTER_SELECTOR)) setMode('pointer')
      else setMode('default')
    }

    const handleDown = () => {
      ring.dataset.pressed = 'true'
    }

    const handleUp = () => {
      ring.dataset.pressed = 'false'
    }

    const handleLeave = () => {
      visible = false
      gsap.to([ringWrap, dotWrap], { autoAlpha: 0, duration: 0.2 })
    }

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseover', handleOver)
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)
    document.documentElement.addEventListener('mouseleave', handleLeave)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleOver)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
      style.remove()
    }
  }, [])

  return (
    <>
      <div
        ref={ringWrapRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-9999 h-0 w-0"
      >
        <div
          ref={ringRef}
          data-mode="default"
          data-pressed="false"
          className="absolute left-0 top-0 size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/70 transition-[width,height,scale,background-color,border-radius,border-color] duration-300 ease-out
                     data-[mode=pointer]:scale-[1.7] data-[mode=pointer]:border-primary data-[mode=pointer]:bg-primary/15
                     data-[mode=text]:h-7 data-[mode=text]:w-0.5 data-[mode=text]:rounded-xs data-[mode=text]:border-primary data-[mode=text]:bg-primary
                     data-[pressed=true]:scale-90 data-[pressed=true]:data-[mode=pointer]:scale-[1.35]"
        />
      </div>

      <div
        ref={dotWrapRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-9999 h-0 w-0"
      >
        <div
          ref={dotRef}
          data-mode="default"
          className="absolute left-0 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-[scale] duration-200
                     data-[mode=pointer]:scale-0 data-[mode=text]:scale-0"
        />
      </div>
    </>
  )
}
