import type { CSSProperties } from "react"
import { ArrowDownRight, Check, Layers3 } from "lucide-react"

import { FeatureStack } from "@/components/landing/client/FeatureStack"
import { MockReveal } from "@/components/landing/client/MockReveal"
import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { ChatMock } from "@/components/landing/mocks/ChatMock"
import { PermissionsMock } from "@/components/landing/mocks/PermissionsMock"
import { ViabilityMock } from "@/components/landing/mocks/ViabilityMock"
import { WorkflowMock } from "@/components/landing/mocks/WorkflowMock"
import { FEATURES, FEATURES_COPY } from "@/lib/landing-data"
import { cn } from "@/lib/utils"

const MOCK_COMPONENTS = {
  viability: ViabilityMock,
  chat: ChatMock,
  workflow: WorkflowMock,
  permissions: PermissionsMock,
}

const MOCK_CLASSES: Record<string, string> = {
  viability: "mock-viability",
  chat: "mock-chat",
  workflow: "mock-workflow",
  permissions: "mock-permissions",
}

export function FeaturesZigzag() {
  return (
    <section
      id="funcionalidades"
      className="feature-stage"
      aria-labelledby="features-title"
    >
      <div className="feature-stage-grid" aria-hidden="true" />
      <div className="container-landing feature-shell">
        <ScrollReveal
          stagger
          className="feature-intro lg:grid-cols-12 lg:items-end"
        >
          <div className="feature-intro-copy lg:col-span-8">
            <span className="feature-eyebrow">
              <Layers3 aria-hidden="true" />
              {FEATURES_COPY.eyebrow}
            </span>
            <h2 id="features-title" className="feature-heading">
              <span>{FEATURES_COPY.titleLine1}</span>
              <strong>{FEATURES_COPY.titleLine2}</strong>
            </h2>
          </div>
          <p className="feature-description lg:col-span-4">
            {FEATURES_COPY.description}
          </p>
        </ScrollReveal>

        <div className="feature-system lg:grid-cols-12">
          <aside
            className="feature-rail lg:sticky lg:top-24 lg:col-span-3 lg:self-start"
            aria-label={FEATURES_COPY.railLabel}
          >
            <p className="feature-rail-label">{FEATURES_COPY.railLabel}</p>
            <ol>
              {FEATURES.map((feature, index) => (
                <li key={feature.id}>
                  <a href={`#feature-${feature.id}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {feature.eyebrow}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <FeatureStack className="lg:col-span-9">
            {FEATURES.map((feature, index) => {
              const MockComponent = MOCK_COMPONENTS[feature.mock]
              const isReversed = feature.side === "left"

              return (
                <div
                  key={feature.id}
                  data-feature-layer
                  className={cn(
                    "feature-layer",
                    `feature-layer--${feature.id}`,
                    isReversed && "feature-layer--reversed"
                  )}
                  style={
                    {
                      "--stack-index": index,
                    } as CSSProperties
                  }
                >
                  <article id={`feature-${feature.id}`}>
                    <header className="feature-layer-head">
                      <div className="feature-layer-index">
                        <span>{FEATURES_COPY.layerLabel}</span>
                        <strong>{String(index + 1).padStart(2, "0")}</strong>
                      </div>
                      <div className="feature-layer-title">
                        <p>{feature.eyebrow}</p>
                        <h3>{feature.title}</h3>
                      </div>
                      <ArrowDownRight aria-hidden="true" />
                    </header>

                    <div className="feature-layer-body lg:grid-cols-12">
                      <div
                        className={cn(
                          "feature-layer-copy lg:col-span-4",
                          isReversed && "lg:order-2"
                        )}
                      >
                        <p>{feature.description}</p>
                        <div className="feature-evidence">
                          <span>{FEATURES_COPY.evidenceLabel}</span>
                          <ul>
                            {feature.bullets.map((bullet) => (
                              <li key={bullet}>
                                <Check aria-hidden="true" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div
                        className={cn(
                          "feature-visual lg:col-span-8",
                          isReversed && "lg:order-1"
                        )}
                      >
                        <div className="feature-visual-chrome">
                          <span />
                          <span />
                          <span />
                        </div>
                        <MockReveal mockClass={MOCK_CLASSES[feature.mock]}>
                          <MockComponent />
                        </MockReveal>
                      </div>
                    </div>
                  </article>
                </div>
              )
            })}
          </FeatureStack>
        </div>
      </div>
    </section>
  )
}
