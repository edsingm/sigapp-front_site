import { FEATURES } from "@/lib/landing-data"
import { EyebrowBadge } from "@/components/landing/ui/EyebrowBadge"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { MockReveal } from "@/components/landing/client/MockReveal"
import { Check } from "lucide-react"
import { ViabilityMock } from "@/components/landing/mocks/ViabilityMock"
import { ChatMock } from "@/components/landing/mocks/ChatMock"
import { WorkflowMock } from "@/components/landing/mocks/WorkflowMock"
import { PermissionsMock } from "@/components/landing/mocks/PermissionsMock"

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
    <section id="funcionalidades" className="py-20 md:py-28">
      <div className="container-landing">
        {/* Section header */}
        <ScrollReveal stagger className="mb-14 flex flex-col gap-4 text-center md:mb-20">
          <SectionLabel className="text-center">Funcionalidades</SectionLabel>
          <h2 className="font-heading mx-auto text-3xl font-semibold leading-tight tracking-tight text-foreground text-balance md:text-5xl">
            Do primeiro contato ao contrato assinado
          </h2>
          <p className="mx-auto max-w-[55ch] text-muted-foreground md:text-lg">
            Quatro módulos integrados que cobrem desde a prospecção inicial até a assinatura do contrato.
          </p>
        </ScrollReveal>

        {/* Features */}
        <div className="flex flex-col gap-16 md:gap-28">
          {FEATURES.map((feature) => {
            const MockComponent = MOCK_COMPONENTS[feature.mock]
            const isRight = feature.side === "right"

            return (
              <ScrollReveal
                key={feature.id}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  isRight ? "" : "lg:[&>*:first-child]:order-last"
                }`}
              >
                {/* Text */}
                <div className={`flex flex-col gap-5 ${isRight ? "" : "lg:order-last"}`}>
                  <EyebrowBadge variant="brand">{feature.eyebrow}</EyebrowBadge>
                  <h3 className="font-heading text-2xl font-semibold leading-tight tracking-tight text-foreground text-balance md:text-3xl lg:text-4xl">
                    {feature.title}
                  </h3>
                  <p className="max-w-[52ch] text-muted-foreground md:text-lg leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {feature.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5">
                        <Check className="mt-1 size-4 shrink-0 text-secondary" />
                        <span className="text-sm text-foreground/80">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mock */}
                <div className={`relative ${isRight ? "lg:order-last" : ""}`}>
                  <div className="absolute -inset-4 rounded-3xl bg-linear-to-br from-secondary/12 via-primary/5 to-transparent" />
                  <MockReveal mockClass={MOCK_CLASSES[feature.mock]}>
                    <MockComponent />
                  </MockReveal>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
