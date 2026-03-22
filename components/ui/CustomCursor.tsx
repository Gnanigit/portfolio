'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [isTouch, setIsTouch] = useState(true)
  const pos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const rafId = useRef<number>(0)

  useEffect(() => {
    const noHover = window.matchMedia('(hover: none)').matches
    const coarse  = window.matchMedia('(pointer: coarse)').matches
    setIsTouch(noHover || coarse)
  }, [])

  useEffect(() => {
    // Only show custom cursor on true pointer devices
    const noHover = window.matchMedia('(hover: none)').matches
    const coarse  = window.matchMedia('(pointer: coarse)').matches
    if (noHover || coarse) return

    // If user touches at any point, permanently hide the cursor
    function onTouch() { setIsTouch(true) }
    window.addEventListener('touchstart', onTouch, { passive: true, once: true })

    function onMouseMove(e: MouseEvent) {
      pos.current = { x: e.clientX, y: e.clientY }
      // Update spotlight CSS variables
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
    }

    function onMouseEnterInteractive() { setHovered(true) }
    function onMouseLeaveInteractive() { setHovered(false) }

    function attachListeners() {
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [tabindex], .card'
      )
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive)
        el.addEventListener('mouseleave', onMouseLeaveInteractive)
      })
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    attachListeners()

    // Observe DOM changes for dynamic elements
    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    let lastTimestamp = 0
    function animate(timestamp: number) {
      if (timestamp - lastTimestamp < 8) {
        rafId.current = requestAnimationFrame(animate)
        return
      }
      lastTimestamp = timestamp

      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`
        dotRef.current.style.top = `${pos.current.y}px`
      }

      // Lerp ring towards dot
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12

      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`
        ringRef.current.style.top = `${ringPos.current.y}px`
      }

      rafId.current = requestAnimationFrame(animate)
    }
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchstart', onTouch)
      cancelAnimationFrame(rafId.current)
      observer.disconnect()
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      <div ref={dotRef} className={`cursor-dot ${hovered ? 'hover' : ''}`} aria-hidden="true" />
      <div ref={ringRef} className={`cursor-ring ${hovered ? 'hover' : ''}`} aria-hidden="true" />
    </>
  )
}
