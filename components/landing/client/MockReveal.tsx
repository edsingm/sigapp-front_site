"use client"

import { useEffect, useRef } from "react"

type Props = {
  mockClass: string
  className?: string
  children: React.ReactNode
}

export function MockReveal({ mockClass, className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view")
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={mockClass + (className ? ` ${className}` : "")}>
      {children}
    </div>
  )
}
