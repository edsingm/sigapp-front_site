import { Check } from "lucide-react"

import { MockReveal } from "@/components/landing/client/MockReveal"
import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { ChatMock } from "@/components/landing/mocks/ChatMock"
import { PermissionsMock } from "@/components/landing/mocks/PermissionsMock"
import { ViabilityMock } from "@/components/landing/mocks/ViabilityMock"
import { WorkflowMock } from "@/components/landing/mocks/WorkflowMock"
import { EyebrowBadge } from "@/components/landing/ui/EyebrowBadge"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { FEATURES } from "@/lib/landing-data"
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
      className="relative overflow-hidden py-16 sm:py-20 md:py-28"
    >
      <div className="container-landing relative">
        <ScrollReveal
          stagger
          className="mb-14 grid gap-5 md:mb-20 lg:grid-cols-12 lg:items-end"
        >
          <div className="flex min-w-0 flex-col gap-4 lg:col-span-5">
            <SectionLabel>Capacidades</SectionLabel>
            <h2 className="section-display text-foreground">
              O que o dossiê carrega do primeiro contato ao registro
            </h2>
          </div>
          <p className="max-w-[48ch] text-muted-foreground md:text-lg lg:col-span-7 lg:justify-self-end">
            Viabilidade, assistente de domínio, pipeline e permissões — o
            necessário para a equipe decidir sem repassar contexto.
          </p>
        </ScrollReveal>

        <div className="flex flex-col gap-8 md:gap-12">
          {FEATURES.map((feature, index) => {
            const MockComponent = MOCK_COMPONENTS[feature.mock]
            const isRight = feature.side === "right"
            const isAnchor = index === 0

            return (
              <ScrollReveal
                key={feature.id}
                className={cn(
                  "grid items-center gap-8 border-t border-border pt-10 sm:gap-10 lg:grid-cols-2 lg:gap-14 lg:pt-14",
                  index === 0 && "border-t-0 pt-0 lg:pt-0"
                )}
              >
                <div
                  className={cn(
                    "flex min-w-0 flex-col gap-4",
                    !isRight && "lg:order-last"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="data-mono text-[11px] font-bold text-muted-foreground/50">
                      0{index + 1}
                    </span>
                    <EyebrowBadge variant="brand">{feature.eyebrow}</EyebrowBadge>
                  </div>
                  <h3 className="font-heading text-2xl leading-[1.1] font-bold tracking-tight text-balance text-foreground md:text-3xl">
                    {feature.title}
                  </h3>
                  <p className="max-w-[46ch] leading-relaxed text-muted-foreground md:text-lg">
                    {feature.description}
                  </p>
                  <ul className="mt-1 flex flex-col gap-2.5">
                    {feature.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Check className="size-3" strokeWidth={2.5} />
                        </span>
                        <span className="text-sm leading-relaxed text-foreground/80">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={cn(
                    "relative min-w-0",
                    isRight ? "lg:order-last" : ""
                  )}
                >
                  {isAnchor ? (
                    <div className="card-bezel relative shadow-float">
                      <div className="card-bezel__core overflow-hidden p-2">
                        <MockReveal mockClass={MOCK_CLASSES[feature.mock]}>
                          <MockComponent />
                        </MockReveal>
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-panel">
                      <MockReveal mockClass={MOCK_CLASSES[feature.mock]}>
                        <MockComponent />
                      </MockReveal>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
