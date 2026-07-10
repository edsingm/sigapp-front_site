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
    const footer = document.querySelector("footer")

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
    <div className="fixed inset-x-0 bottom-4 z-50 px-4 sm:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-border/70 bg-background/95 p-2 pl-4 shadow-2xl shadow-black/10 backdrop-blur-xl">
        <div className="min-w-0 flex-1">
          <p className="coord text-muted-foreground">
            {STICKY_MOBILE_CTA.badge}
          </p>
          <div>
            <p className="mt-1 truncate text-sm font-semibold text-foreground">
              {STICKY_MOBILE_CTA.title}
            </p>
          </div>
        </div>

        <Button
          size="lg"
          className="h-11 shrink-0 gap-1.5 rounded-xl px-4 text-sm"
          nativeButton={false}
          render={
            <Link
              href={LINKS.demo}
              data-analytics-event="demo_request"
              data-analytics-location="sticky-mobile"
            />
          }
        >
          Demonstração
          <ArrowRight className="size-3.5" />
        </Button>
      </div>
    </div>
  )
}
