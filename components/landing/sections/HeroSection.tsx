import Link from "next/link"
import {
  ArrowDown,
  ArrowRight,
  Check,
  Crosshair,
  MapPinned,
  Sparkles,
} from "lucide-react"

import { HERO_COPY, HERO_PROOF_ITEMS, LINKS } from "@/lib/landing-data"

type StageNodeProps = {
  index: number
  label: string
  state: string
}

function StageNode({ index, label, state }: StageNodeProps) {
  const status = index < 2 ? "complete" : index === 2 ? "active" : "next"

  return (
    <li className="hero-stage-node" data-status={status}>
      <span className="hero-stage-marker" aria-hidden="true">
        {status === "complete" ? <Check /> : `0${index + 1}`}
      </span>
      <span className="min-w-0">
        <strong>{label}</strong>
        <small className="hidden sm:block">{state}</small>
      </span>
    </li>
  )
}

function DecisionInstrument() {
  const { panel } = HERO_COPY

  return (
    <aside className="hero-instrument" aria-label={panel.eyebrow}>
      <div className="hero-instrument-heading">
        <div>
          <p className="hero-instrument-kicker">
            <Crosshair aria-hidden="true" />
            {panel.eyebrow}
          </p>
          <h2>{panel.sectorName}</h2>
        </div>
        <span className="hero-live-status">
          <span aria-hidden="true" />
          {panel.status}
        </span>
      </div>

      <div className="hero-map-window">
        <div className="hero-map-grid" aria-hidden="true" />
        <div className="hero-scan-beam" aria-hidden="true" />

        <svg
          viewBox="0 0 720 380"
          preserveAspectRatio="xMidYMid slice"
          className="hero-map-drawing"
          aria-hidden="true"
          fill="none"
        >
          <path d="M-40 92C95 32 188 98 294 60s208-48 319 9 187 21 220-11" />
          <path d="M-28 286c134-43 219 11 339-35 115-44 205-25 319 25 89 39 154 33 202 9" />
          <path d="m92 68 142-33 95 73-42 128-148 35-94-76Z" />
          <path d="m330 107 165-46 118 91-49 151-174 32-104-98Z" />
          <path d="m495 61-43 131 112 111M330 107l122 85-62 143M45 195l156-27 86 68" />
          <path
            className="hero-map-route"
            d="M112 222C214 158 286 238 374 178c85-59 132-36 208-7"
            strokeDasharray="5 12"
          />
          <circle className="hero-map-halo" cx="374" cy="178" r="34" />
          <circle className="hero-map-point" cx="374" cy="178" r="6" />
          <circle
            className="hero-map-point hero-map-point--secondary"
            cx="112"
            cy="222"
            r="4"
          />
          <circle
            className="hero-map-point hero-map-point--secondary"
            cx="582"
            cy="171"
            r="4"
          />
        </svg>

        <div className="hero-decision-signal">
          <span>
            <Sparkles aria-hidden="true" />
            {panel.signal}
          </span>
          <strong>{panel.tir}</strong>
          <small>{panel.metrics[0].label}</small>
        </div>

        <div className="hero-map-caption">
          <MapPinned aria-hidden="true" />
          {panel.coords}
        </div>
      </div>

      <dl className="hero-signal-metrics">
        {panel.metrics.map((metric) => (
          <div key={metric.label}>
            <dt>{metric.label}</dt>
            <dd>{metric.value}</dd>
          </div>
        ))}
      </dl>

      <div className="hero-progress-heading">
        <span>{panel.progress}</span>
        <span>{panel.progressIndex}</span>
      </div>
      <ol className="hero-stage-list">
        {panel.stages.map((stage, index) => (
          <StageNode
            key={stage.label}
            index={index}
            label={stage.label}
            state={stage.state}
          />
        ))}
      </ol>
    </aside>
  )
}

export function HeroSection() {
  return (
    <section id="hero" className="hero-stage">
      <div className="hero-ambient hero-ambient--lime" aria-hidden="true" />
      <div className="hero-ambient hero-ambient--cyan" aria-hidden="true" />
      <div className="hero-background-grid" aria-hidden="true" />
      <div className="hero-noise" aria-hidden="true" />

      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="hero-background-routes"
        aria-hidden="true"
        fill="none"
      >
        <path d="M-80 744C244 568 394 741 675 570c263-160 424-78 622-218 110-78 188-130 253-254" />
        <path d="M-65 798C259 622 434 816 718 635c249-159 407-86 621-249" />
      </svg>

      <div className="container-landing relative z-10 flex min-h-[100svh] flex-col pt-24 pb-6 sm:pt-28 sm:pb-8 lg:pt-32">
        <div className="grid flex-1 items-center gap-12 py-8 lg:grid-cols-[minmax(0,0.94fr)_minmax(27rem,0.86fr)] lg:gap-12 lg:py-10 xl:gap-20">
          <div className="hero-copy max-w-[44rem]">
            <p className="hero-eyebrow hero-enter">
              <span aria-hidden="true" />
              {HERO_COPY.eyebrow}
            </p>

            <h1 className="hero-title hero-enter hero-enter--delay-1">
              <span>{HERO_COPY.titleLine1}</span>
              <strong>{HERO_COPY.titleLine2}</strong>
            </h1>

            <p className="hero-description hero-enter hero-enter--delay-2">
              {HERO_COPY.description}
            </p>

            <div className="hero-actions hero-enter hero-enter--delay-3">
              <Link
                href={LINKS.demo}
                data-analytics-event="demo_request"
                data-analytics-location="hero"
                className="hero-primary-action"
              >
                {HERO_COPY.primaryCta}
                <span aria-hidden="true">
                  <ArrowRight />
                </span>
              </Link>

              <Link
                href="/#como-funciona"
                data-analytics-event="features_view_click"
                data-analytics-location="hero"
                className="hero-secondary-action"
              >
                {HERO_COPY.secondaryCta}
                <ArrowDown aria-hidden="true" />
              </Link>
            </div>

            <p className="hero-audience hero-enter hero-enter--delay-4">
              <span aria-hidden="true" />
              {HERO_COPY.audience}
            </p>
          </div>

          <div className="hero-visual hero-enter hero-enter--visual mx-auto w-full max-w-[38rem] lg:max-w-none">
            <DecisionInstrument />
          </div>
        </div>

        <div className="hero-bottom-rail hidden lg:flex">
          <dl className="hero-proof-list">
            {HERO_PROOF_ITEMS.map((item, index) => (
              <div key={item.label}>
                <dt>0{index + 1}</dt>
                <dd>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </dd>
              </div>
            ))}
          </dl>

          <Link href="/#como-funciona" className="hero-scroll-action">
            {HERO_COPY.scrollLabel}
            <ArrowDown aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
