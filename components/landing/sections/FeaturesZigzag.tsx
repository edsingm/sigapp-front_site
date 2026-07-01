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
    <section id="funcionalidades" className="py-24 md:py-32">
      <div className="container-landing">
        <ScrollReveal
          stagger
          className="mb-16 grid gap-6 md:mb-24 lg:grid-cols-12 lg:items-end"
        >
          <div className="flex flex-col gap-4 lg:col-span-5">
            <SectionLabel>Funcionalidades</SectionLabel>
            <h2 className="font-heading text-3xl leading-[1.05] font-bold tracking-tight text-balance text-foreground md:text-4xl lg:text-5xl">
              Do primeiro contato ao contrato assinado
            </h2>
          </div>
          <p className="max-w-[58ch] text-muted-foreground md:text-lg lg:col-span-7 lg:justify-self-end">
            Quatro módulos conectados para levar contexto territorial, análise e
            governança da prospecção inicial até a negociação final.
          </p>
        </ScrollReveal>

        {/* Features */}
        <div className="flex flex-col gap-20 md:gap-32">
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
                <div
                  className={`flex flex-col gap-5 ${isRight ? "" : "lg:order-last"}`}
                >
                  <EyebrowBadge variant="brand">{feature.eyebrow}</EyebrowBadge>
                  <h3 className="font-heading text-2xl leading-[1.1] font-bold tracking-tight text-balance text-foreground md:text-3xl lg:text-4xl">
                    {feature.title}
                  </h3>
                  <p className="max-w-[52ch] leading-relaxed text-muted-foreground md:text-lg">
                    {feature.description}
                  </p>
                  <ul className="mt-1 flex flex-col gap-3">
                    {feature.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                          <Check className="size-3" strokeWidth={2.5} />
                        </span>
                        <span className="text-sm leading-relaxed text-foreground/80">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mock — moldura double-bezel */}
                <div className={`relative ${isRight ? "lg:order-last" : ""}`}>
                  <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(60%_60%_at_50%_40%,rgba(11,30,57,0.06),transparent_72%)]" />
                  <div className="card-bezel relative">
                    <div className="card-bezel__core overflow-hidden p-2">
                      <MockReveal mockClass={MOCK_CLASSES[feature.mock]}>
                        <MockComponent />
                      </MockReveal>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
