"use client"

import { useEffect, useState } from "react"
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

    if (!hero || !pricing || !finalCta) return

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        setPastHero(!entry.isIntersecting)
      },
      { threshold: 0.2 }
    )

    const stopObserver = new IntersectionObserver(
      (entries) => {
        setNearConversion(entries.some((entry) => entry.isIntersecting))
      },
      { threshold: 0.12 }
    )

    heroObserver.observe(hero)
    stopObserver.observe(pricing)
    stopObserver.observe(finalCta)

    return () => {
      heroObserver.disconnect()
      stopObserver.disconnect()
    }
  }, [])

  if (!pastHero || nearConversion) return null

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 px-4 sm:hidden">
      <div className="mx-auto max-w-md rounded-2xl border border-border/70 bg-background/95 p-3 shadow-2xl shadow-black/10 backdrop-blur-xl">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
              {STICKY_MOBILE_CTA.badge}
            </p>
            <p className="mt-1 text-sm font-semibold text-foreground">
              {STICKY_MOBILE_CTA.title}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {STICKY_MOBILE_CTA.description}
            </p>
          </div>
        </div>

        <Button
          size="lg"
          className="h-11 w-full gap-2 rounded-md"
          nativeButton={false}
          render={
            <a
              href={LINKS.demo}
              data-analytics-event="demo_request"
              data-analytics-location="sticky-mobile"
            />
          }
        >
          {STICKY_MOBILE_CTA.cta}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
