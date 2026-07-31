"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { LINKS, STICKY_MOBILE_CTA } from "@/lib/landing-data"

export function StickyMobileCTA() {
  const [pastHero, setPastHero] = useState(false)
  const [nearConversion, setNearConversion] = useState(false)

  useEffect(() => {
    const hero = document.getElementById("hero")
    const pricing = document.getElementById("precos")
    const finalCta = document.getElementById("cta-final")
    const footer = document.querySelector(".footer-stage")

    if (!hero || !pricing || !finalCta || !footer) return

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        setPastHero(!entry.isIntersecting)
      },
      { threshold: 0.2 }
    )

    const visibleStops = new Set<Element>()
    const stopObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleStops.add(entry.target)
          else visibleStops.delete(entry.target)
        })
        setNearConversion(visibleStops.size > 0)
      },
      { threshold: 0.12 }
    )

    heroObserver.observe(hero)
    stopObserver.observe(pricing)
    stopObserver.observe(finalCta)
    stopObserver.observe(footer)

    return () => {
      heroObserver.disconnect()
      stopObserver.disconnect()
    }
  }, [])

  if (!pastHero || nearConversion) return null

  return (
    <div className="sticky-mobile-cta sm:hidden">
      <div className="sticky-mobile-cta-shell">
        <div className="sticky-mobile-cta-copy">
          <p className="sticky-mobile-cta-badge">{STICKY_MOBILE_CTA.badge}</p>
          <p className="sticky-mobile-cta-title">{STICKY_MOBILE_CTA.title}</p>
        </div>

        <Button
          size="lg"
          className="sticky-mobile-cta-action"
          nativeButton={false}
          render={
            <Link
              href={LINKS.demo}
              data-analytics-event="demo_request"
              data-analytics-location="sticky-mobile"
            />
          }
        >
          {STICKY_MOBILE_CTA.shortCta}
          <ArrowRight className="sticky-mobile-cta-icon" />
        </Button>
      </div>
    </div>
  )
}
