"use client"

import { useEffect, useState } from "react"

type RotatingHeroTextProps = {
  items: readonly string[]
}

export function RotatingHeroText({ items }: RotatingHeroTextProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isChanging, setIsChanging] = useState(false)

  useEffect(() => {
    if (items.length < 2) return

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    )
    if (reducedMotion.matches) return

    let transitionTimer: number | undefined
    const rotationTimer = window.setInterval(() => {
      setIsChanging(true)
      transitionTimer = window.setTimeout(() => {
        setActiveIndex((current) => (current + 1) % items.length)
        setIsChanging(false)
      }, 220)
    }, 3200)

    return () => {
      window.clearInterval(rotationTimer)
      if (transitionTimer) window.clearTimeout(transitionTimer)
    }
  }, [items])

  return (
    <strong
      className="hero-rotating-text"
      data-changing={isChanging ? "true" : "false"}
    >
      {items[activeIndex]}
    </strong>
  )
}
