"use client"

import { useEffect, useRef } from "react"

type Props = {
  stagger?: boolean
  className?: string
  children: React.ReactNode
}

export function ScrollReveal({ stagger = false, className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const targets = stagger
      ? (Array.from(el.children) as HTMLElement[])
      : [el]

    const viewportH = window.innerHeight
    const toObserve: HTMLElement[] = []

    targets.forEach((t, i) => {
      const rect = t.getBoundingClientRect()
      if (rect.top >= viewportH - 40) {
        t.classList.add("reveal-item")
        if (stagger) t.style.transitionDelay = `${i * 70}ms`
        toObserve.push(t)
      }
    })

    if (toObserve.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
    )

    toObserve.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [stagger])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
