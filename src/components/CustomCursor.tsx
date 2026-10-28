'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const TEXT_SELECTOR =
  'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]), textarea, [contenteditable="true"]'

const POINTER_SELECTOR =
  'a, button, select, label, summary, [role="button"], [data-cursor="pointer"]'

type Mode = 'default' | 'pointer' | 'text'

export const CustomCursor = () => {
  const frameWrapRef = useRef<HTMLDivElement>(null)
  const dotWrapRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!canHover.matches) return

    const frameWrap = frameWrapRef.current
    const dotWrap = dotWrapRef.current
    const frame = frameRef.current
    const dot = dotRef.current
    if (!frameWrap || !dotWrap || !frame || !dot) return

    const style = document.createElement('style')
    style.textContent = 'html, html * { cursor: none !important; }'
    document.head.appendChild(style)

    gsap.set([frameWrap, dotWrap], { autoAlpha: 0 })

    const frameX = gsap.quickTo(frameWrap, 'x', {
      duration: 0.5,
      ease: 'expo.out',
    })
    const frameY = gsap.quickTo(frameWrap, 'y', {
      duration: 0.5,
      ease: 'expo.out',
    })

    let visible = false

    const setMode = (mode: Mode) => {
      frame.dataset.mode = mode
      dot.dataset.mode = mode
    }

    const handleMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true
        gsap.set(frameWrap, { x: e.clientX, y: e.clientY })
        gsap.to([frameWrap, dotWrap], { autoAlpha: 1, duration: 0.3 })
      }
      gsap.set(dotWrap, { x: e.clientX, y: e.clientY })
      frameX(e.clientX)
      frameY(e.clientY)
    }

    const handleOver = (e: MouseEvent) => {
      const target = e.target as Element | null
      if (!target || !target.closest) return
      if (target.closest(TEXT_SELECTOR)) setMode('text')
      else if (target.closest(POINTER_SELECTOR)) setMode('pointer')
      else setMode('default')
    }

    const handleDown = () => {
      frame.dataset.pressed = 'true'
      dot.dataset.pressed = 'true'
    }

    const handleUp = () => {
      frame.dataset.pressed = 'false'
      dot.dataset.pressed = 'false'
    }

    const handleLeave = () => {
      visible = false
      gsap.to([frameWrap, dotWrap], { autoAlpha: 0, duration: 0.2 })
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

  const corner =
    'absolute size-2 border-foreground transition-opacity duration-200'

  return (
    <>
      <div
        ref={frameWrapRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-9999 h-0 w-0"
      >
        <div
          ref={frameRef}
          data-mode="default"
          data-pressed="false"
          className="group absolute left-0 top-0 size-10 -translate-x-1/2 -translate-y-1/2 rotate-0 transition-[width,height,rotate,scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                     data-[mode=pointer]:size-7 data-[mode=pointer]:rotate-90
                     data-[mode=text]:h-7 data-[mode=text]:w-0.5
                     data-[pressed=true]:scale-75"
        >
          <span
            className={`${corner} left-0 top-0 border-l-2 border-t-2 group-data-[mode=text]:opacity-0`}
          />
          <span
            className={`${corner} right-0 top-0 border-r-2 border-t-2 group-data-[mode=text]:opacity-0`}
          />
          <span
            className={`${corner} bottom-0 left-0 border-b-2 border-l-2 group-data-[mode=text]:opacity-0`}
          />
          <span
            className={`${corner} bottom-0 right-0 border-b-2 border-r-2 group-data-[mode=text]:opacity-0`}
          />
          <span className="absolute inset-0 bg-foreground opacity-0 transition-opacity duration-200 group-data-[mode=text]:opacity-100" />
        </div>
      </div>

      <div
        ref={dotWrapRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-9999 h-0 w-0"
      >
        <div
          ref={dotRef}
          data-mode="default"
          data-pressed="false"
          className="absolute left-0 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-foreground transition-[scale] duration-200
                     data-[mode=pointer]:scale-[2.2] data-[mode=text]:scale-0
                     data-[pressed=true]:scale-50"
        />
      </div>
    </>
  )
}
