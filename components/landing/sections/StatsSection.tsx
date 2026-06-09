"use client"

import { useEffect, useRef, useState } from "react"
import { METRICS } from "@/lib/landing-data"

// Quebra "R$ 2,4B" / "98,3%" / "12.800+" em prefixo, número e sufixo
function parseMetric(value: string) {
  const match = value.match(/^(\D*)([\d.,]+)(\D*)$/)
  if (!match) return null
  const [, prefix, numStr, suffix] = match
  const decimals = numStr.includes(",") ? numStr.split(",")[1].length : 0
  const numeric = parseFloat(numStr.replace(/\./g, "").replace(",", "."))
  if (Number.isNaN(numeric)) return null
  return { prefix, suffix, decimals, target: numeric }
}

function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, inView }
}

function CountUp({ value, active }: { value: string; active: boolean }) {
  const parsed = parseMetric(value)
  const [display, setDisplay] = useState(parsed ? parsed.prefix + "0" + parsed.suffix : value)

  useEffect(() => {
    if (!parsed || !active) return
    const duration = 1400
    const start = performance.now()
    let raf = 0
    const format = (n: number) =>
      parsed.prefix +
      n.toLocaleString("pt-BR", {
        minimumFractionDigits: parsed.decimals,
        maximumFractionDigits: parsed.decimals,
      }) +
      parsed.suffix

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(format(parsed.target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  return <span>{display}</span>
}

export function StatsSection() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section className="py-16 md:py-24">
      <div className="container-landing">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-blue-700 px-6 py-16 text-center shadow-xl shadow-primary/20 sm:px-12"
        >
          <div className="bg-dot-pattern absolute inset-0 opacity-[0.15]" />
          <div className="relative mx-auto mb-12 max-w-2xl">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
              Juntos, impulsionamos o mercado imobiliário
            </h2>
            <p className="mt-3 text-primary-foreground/80 md:text-lg">
              Números reais de quem trocou planilhas por decisões com confiança.
            </p>
          </div>
          <div className="relative grid grid-cols-2 gap-8 md:grid-cols-4">
            {METRICS.map((metric) => (
              <div key={metric.label} className="flex flex-col gap-1">
                <span className="font-mono text-3xl font-bold tracking-tight text-white md:text-5xl">
                  <CountUp value={metric.value} active={inView} />
                </span>
                <span className="text-sm text-primary-foreground/75">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
