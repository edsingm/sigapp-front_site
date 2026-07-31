import type { LucideIcon } from "lucide-react"
import {
  BellRing,
  ChartNoAxesCombined,
  FileDown,
  MapPinned,
  Radio,
} from "lucide-react"

import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import {
  BENTO_ALERTS,
  BENTO_COPY,
  BENTO_DRE,
  BENTO_EXPORT_FILES,
} from "@/lib/landing-data"

const MAP_PINS = [
  { x: 18, y: 30, active: true },
  { x: 40, y: 55, active: false },
  { x: 62, y: 25, active: true },
  { x: 75, y: 65, active: false },
  { x: 85, y: 40, active: true },
  { x: 30, y: 75, active: false },
  { x: 55, y: 80, active: true },
]

function ModuleHead({
  icon: Icon,
  eyebrow,
  title,
  description,
}: {
  icon: LucideIcon
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <header className="bento-module-head">
      <span className="bento-module-icon">
        <Icon aria-hidden="true" />
      </span>
      <div>
        <p>{eyebrow}</p>
        <h3>{title}</h3>
        <span>{description}</span>
      </div>
    </header>
  )
}

function MiniDRE() {
  const { project, receitas, custos, lucro, kpis } = BENTO_DRE

  return (
    <div className="bento-dre-table">
      <div className="bento-dre-project">
        <div>
          <span>{project.label}</span>
          <strong>{project.name}</strong>
        </div>
        <em>
          <i />
          {project.status}
        </em>
      </div>

      <div className="bento-dre-columns">
        <div>
          <p>{BENTO_COPY.dre.revenuesLabel}</p>
          {receitas.map((item) => (
            <span key={item.label}>
              <small>{item.label}</small>
              <strong>{item.value}</strong>
            </span>
          ))}
        </div>
        <div>
          <p>{BENTO_COPY.dre.costsLabel}</p>
          {custos.map((item) => (
            <span key={item.label}>
              <small>{item.label}</small>
              <strong>{item.value}</strong>
            </span>
          ))}
        </div>
      </div>

      <div className="bento-dre-result">
        <span>{lucro.label}</span>
        <strong>{lucro.value}</strong>
        <em>{lucro.margin}</em>
      </div>

      <div className="bento-dre-kpis">
        {kpis.map((kpi) => (
          <span key={kpi.label}>
            <small>{kpi.label}</small>
            <strong>{kpi.value}</strong>
          </span>
        ))}
      </div>
    </div>
  )
}

function TerritoryRadar() {
  return (
    <div className="bento-radar" aria-hidden="true">
      <div className="bento-radar-scan" />
      {MAP_PINS.map((pin, index) => (
        <span
          key={`${pin.x}-${pin.y}`}
          className={pin.active ? "is-active" : undefined}
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
        >
          <i>{String(index + 1).padStart(2, "0")}</i>
        </span>
      ))}
      <div className="bento-radar-legend">
        <span>
          <i className="is-active" />
          {BENTO_COPY.map.activeLabel}
        </span>
        <span>
          <i />
          {BENTO_COPY.map.prospectedLabel}
        </span>
        <strong>{BENTO_COPY.map.summary}</strong>
      </div>
    </div>
  )
}

export function BentoSection() {
  return (
    <section className="bento-stage" aria-labelledby="bento-title">
      <div className="bento-stage-orbit" aria-hidden="true" />
      <div className="container-landing bento-shell">
        <ScrollReveal
          stagger
          className="bento-intro lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <span className="bento-eyebrow">
              <Radio aria-hidden="true" />
              {BENTO_COPY.eyebrow}
            </span>
            <h2 id="bento-title" className="bento-heading">
              <span>{BENTO_COPY.titleLine1}</span>
              <strong>{BENTO_COPY.titleLine2}</strong>
            </h2>
          </div>
          <p className="lg:col-span-5">{BENTO_COPY.description}</p>
        </ScrollReveal>

        <ScrollReveal className="bento-console">
          <div className="bento-console-bar">
            <span>{BENTO_COPY.consoleLabel}</span>
            <strong>
              <i />
              {BENTO_COPY.consoleStatus}
            </strong>
          </div>

          <div className="bento-console-grid lg:grid-cols-12">
            <article className="bento-anchor lg:col-span-4 lg:row-span-2">
              <div>
                <p>{BENTO_COPY.anchor.eyebrow}</p>
                <h3>{BENTO_COPY.anchor.title}</h3>
                <span>{BENTO_COPY.anchor.description}</span>
              </div>
              <div className="bento-anchor-signal">
                <strong>{BENTO_COPY.anchor.metric}</strong>
                <span>{BENTO_COPY.anchor.metricLabel}</span>
                <em>{BENTO_COPY.anchor.signal}</em>
              </div>
            </article>

            <article className="bento-module bento-module--dre lg:col-span-8 lg:row-span-2">
              <ModuleHead
                icon={ChartNoAxesCombined}
                eyebrow={BENTO_COPY.dre.eyebrow}
                title={BENTO_COPY.dre.title}
                description={BENTO_COPY.dre.description}
              />
              <MiniDRE />
            </article>

            <article className="bento-module bento-module--map lg:col-span-5">
              <ModuleHead
                icon={MapPinned}
                eyebrow={BENTO_COPY.map.eyebrow}
                title={BENTO_COPY.map.title}
                description={BENTO_COPY.map.description}
              />
              <TerritoryRadar />
            </article>

            <article className="bento-module bento-module--exports lg:col-span-3">
              <ModuleHead
                icon={FileDown}
                eyebrow={BENTO_COPY.exports.eyebrow}
                title={BENTO_COPY.exports.title}
                description={BENTO_COPY.exports.description}
              />
              <div className="bento-files">
                {BENTO_EXPORT_FILES.map((file) => (
                  <div key={file.name}>
                    <span>{file.ext}</span>
                    <p>{file.name}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="bento-module bento-module--alerts lg:col-span-4">
              <ModuleHead
                icon={BellRing}
                eyebrow={BENTO_COPY.alerts.eyebrow}
                title={BENTO_COPY.alerts.title}
                description={BENTO_COPY.alerts.description}
              />
              <div className="bento-alerts">
                {BENTO_ALERTS.map((alert) => (
                  <div key={alert.msg} data-state={alert.type}>
                    <i />
                    <span>{alert.msg}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
