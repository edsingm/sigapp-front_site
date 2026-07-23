import {
  BotOff,
  FileSpreadsheet,
  FolderX,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react"

import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { PAIN_POINTS, PROBLEM_COPY } from "@/lib/landing-data"

const PAIN_ICONS: Record<string, LucideIcon> = {
  BotOff,
  FileSpreadsheet,
  FolderX,
}

export function ProblemSection() {
  return (
    <section className="problem-stage" aria-labelledby="problem-section-title">
      <div className="problem-stage-grid" aria-hidden="true" />
      <div className="problem-stage-orbit" aria-hidden="true" />

      <div className="container-landing relative py-20 sm:py-24 lg:py-32">
        <ScrollReveal
          stagger
          className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8"
        >
          <div className="problem-heading lg:col-span-8">
            <p className="problem-eyebrow">
              <TriangleAlert aria-hidden="true" />
              {PROBLEM_COPY.eyebrow}
            </p>
            <h2 id="problem-section-title">
              <span>{PROBLEM_COPY.titleLine1}</span>
              <strong>{PROBLEM_COPY.titleLine2}</strong>
            </h2>
          </div>

          <div className="problem-summary lg:col-span-4 lg:pb-2">
            <p>{PROBLEM_COPY.description}</p>
            <div>
              <span aria-hidden="true" />
              {PROBLEM_COPY.counter}
            </div>
          </div>
        </ScrollReveal>

        <div className="problem-matrix-heading">
          <span>{PROBLEM_COPY.matrixLabel}</span>
          <span aria-hidden="true">01 — 03</span>
        </div>

        <ScrollReveal stagger className="problem-matrix grid lg:grid-cols-3">
          {PAIN_POINTS.map((point, index) => {
            const Icon = PAIN_ICONS[point.icon] ?? TriangleAlert

            return (
              <article key={point.title} className="problem-fragment">
                <div className="problem-fragment-top">
                  <span>0{index + 1}</span>
                  <Icon aria-hidden="true" />
                </div>

                <div className="problem-fragment-copy">
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </div>

                <div className="problem-fragment-signal">
                  <span>{point.signal}</span>
                  <strong>
                    <i aria-hidden="true" />
                    {point.status}
                  </strong>
                </div>
              </article>
            )
          })}
        </ScrollReveal>
      </div>
    </section>
  )
}
