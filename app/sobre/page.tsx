import type { Metadata } from "next"
import { LandingNav } from "@/components/landing/layout/LandingNav"
import { LandingFooter } from "@/components/landing/layout/LandingFooter"
import { SecondaryPageHero } from "@/components/landing/layout/SecondaryPageHero"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Target, Zap, Shield, Users } from "lucide-react"
import { LINKS } from "@/lib/landing-data"

export const metadata: Metadata = {
  title: "Sobre — SIGAPP",
  description:
    "Conheça a história do SIGAPP, o sistema de inteligência de incorporação criado para decisões de terreno com clareza financeira.",
}

const TEAM = [
  {
    name: "Eduardo Carvalho",
    role: "Co-fundador & CEO",
    bio: "15 anos no mercado imobiliário. Ex-Incorporadora Nacional, onde liderou análise de mais de R$ 1,2B em projetos.",
    initials: "EC",
    color: "bg-primary/10 text-primary",
  },
  {
    name: "Rafael Torres",
    role: "Co-fundador & CTO",
    bio: "Engenheiro de software com passagem pelo Nubank e Quinto Andar. Especialista em sistemas financeiros e multi-tenancy.",
    initials: "RT",
    color: "bg-muted text-foreground/72",
  },
  {
    name: "Carla Mendes",
    role: "Head de Produto",
    bio: "Ex-gestora de incorporação no Grupo Habitare. Traz a perspectiva do usuário para cada decisão de produto.",
    initials: "CM",
    color: "bg-accent text-primary",
  },
  {
    name: "Luciana Faria",
    role: "Engenheira de IA",
    bio: "PhD em Ciência da Computação pela USP. Arquitetou o sistema de ferramentas da SIG_IA e o pipeline de embeddings.",
    initials: "LF",
    color: "bg-primary/12 text-primary",
  },
  {
    name: "Bruno Alves",
    role: "Head de Vendas",
    bio: "15 anos em mercado imobiliário. Conhece a dor de quem ainda usa Excel para análise de viabilidade em 2026.",
    initials: "BA",
    color: "bg-muted text-foreground/72",
  },
]

const VALUES = [
  {
    icon: Target,
    title: "Precisão antes de velocidade",
    description:
      "Um cálculo de TIR errado custa milhões. Cada número que o SIGAPP produz é verificável, rastreável e auditável.",
  },
  {
    icon: Users,
    title: "Construído por quem conhece o mercado",
    description:
      "Nossa equipe tem décadas combinadas de experiência em incorporação, análise financeira e tecnologia imobiliária.",
  },
  {
    icon: Shield,
    title: "Seus dados são seus",
    description:
      "Banco de dados isolado por empresa, exportação completa a qualquer momento. Nunca usamos seus dados para treinar modelos.",
  },
  {
    icon: Zap,
    title: "IA com propósito, não IA por modismo",
    description:
      "A SIG_IA existe porque resolve problemas reais de análise imobiliária — não para ser um diferencial de marketing.",
  },
]

const TIMELINE = [
  {
    year: "2022",
    event: "Fundação",
    description:
      "Eduardo e Rafael saem dos seus empregos para construir a plataforma de viabilidade imobiliária que eles sempre quiseram ter.",
  },
  {
    year: "2023",
    event: "Motor de Viabilidade",
    description:
      "Lançamento do motor de cálculo com 50+ parâmetros. Primeiros 12 clientes em beta fechado.",
  },
  {
    year: "2024",
    event: "SIG_IA e Workflow",
    description:
      "Integração da SIG_IA com 25+ ferramentas especializadas. Módulos de Comitê, Negociação e Legalização.",
  },
  {
    year: "2025",
    event: "Escala Nacional",
    description:
      "Expansão para todos os estados. 200+ incorporadoras ativas. Série A de investimento.",
  },
  {
    year: "2026",
    event: "Hoje",
    description:
      "340+ incorporadoras. R$ 2,4B em terrenos analisados. Plataforma líder em viabilidade imobiliária no Brasil.",
  },
]

export default function SobrePage() {
  return (
    <>
      <LandingNav />
      <main>
        {/* Hero */}
        <SecondaryPageHero
          eyebrow="Nossa história"
          title="Construído para incorporadoras que decidem com números"
          description="O SIGAPP nasceu da frustração de perder um comitê por causa de uma fórmula errada no Excel. Desde então, nosso foco é um só: transformar terreno, risco e retorno em decisão clara."
          meta={
            <div className="flex items-center justify-center gap-2 text-sm text-white/62">
              <MapPin className="size-4 text-secondary" />
              <span>São Paulo, Brasil · Fundado em 2022</span>
            </div>
          }
        />

        {/* Mission */}
        <section className="border-y border-border bg-muted/20 py-20">
          <div className="container-landing">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                  Nossa missão
                </p>
                <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Eliminar decisões imobiliárias baseadas em dados errados.
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                <p className="leading-relaxed text-muted-foreground">
                  No Brasil, mais de 90% das análises de viabilidade imobiliária
                  ainda são feitas em planilhas Excel sem controle de versão,
                  sem validação de premissas e sem histórico auditável. Isso
                  resulta em projetos aprovados com margem irreal, em comitês
                  que discutem dados diferentes e em incorporadoras que
                  descobrem o erro só na entrega.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  O SIGAPP existe para mudar isso. Não é sobre digitalizar o
                  Excel — é sobre reimaginar como análises financeiras
                  imobiliárias são feitas, com precisão de engenharia e
                  assistência de IA treinada para o domínio.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="container-landing">
            <div className="mb-12 text-center">
              <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                Nossos valores
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground">
                O que nos guia
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((value) => {
                const Icon = value.icon
                return (
                  <div
                    key={value.title}
                    className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
                  >
                    <div className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
                      <Icon className="size-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-heading text-base font-semibold text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-muted/20 py-20">
          <div className="container-landing">
            <div className="mb-12 text-center">
              <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                Nossa trajetória
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground">
                De uma ideia a uma plataforma nacional
              </h2>
            </div>
            <div className="relative mx-auto max-w-2xl">
              {/* Vertical line */}
              <div className="absolute top-0 bottom-0 left-[19px] w-px bg-border sm:left-1/2" />
              <div className="flex flex-col gap-8">
                {TIMELINE.map((item, i) => (
                  <div
                    key={item.year}
                    className={`relative flex gap-6 sm:gap-0 ${
                      i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-[11px] flex size-[17px] items-center justify-center rounded-full border-2 border-primary bg-background sm:left-1/2 sm:-translate-x-1/2">
                      <div className="size-2 rounded-full bg-primary" />
                    </div>
                    {/* Content */}
                    <div
                      className={`ml-12 flex flex-col gap-1 sm:ml-0 sm:w-[calc(50%-2rem)] ${
                        i % 2 === 0
                          ? "sm:pr-8 sm:text-right"
                          : "sm:pl-8 sm:text-left"
                      }`}
                    >
                      <span className="font-mono text-sm font-bold text-primary">
                        {item.year}
                      </span>
                      <h3 className="font-heading text-base font-semibold text-foreground">
                        {item.event}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="container-landing">
            <div className="mb-12 text-center">
              <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                Time fundador
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground">
                As pessoas por trás do SIGAPP
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {TEAM.map((member) => (
                <div
                  key={member.name}
                  className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5"
                >
                  <div
                    className={`flex size-12 items-center justify-center rounded-xl text-base font-semibold ${member.color}`}
                  >
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-xs text-primary">{member.role}</p>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-[#071529] py-20">
          <div className="bg-blueprint-grid absolute inset-0 opacity-60" />
          <div className="container-landing text-center">
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              Decisões de incorporação merecem um sistema à altura.
            </h2>
            <p className="mx-auto mt-4 max-w-[45ch] text-lg text-white/62">
              Junte-se a 340+ incorporadoras que já trocaram planilha dispersa
              por clareza financeira.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Button
                variant="brand"
                size="lg"
                className="h-12 gap-2 px-6 text-base font-semibold"
                nativeButton={false}
                render={
                  <a
                    href={LINKS.signup}
                    data-analytics-event="trial_signup_click"
                    data-analytics-location="about-cta"
                  />
                }
              >
                Começar 7 dias grátis
                <ArrowRight className="size-4" />
              </Button>
              <Button
                variant="ghost-white"
                size="lg"
                className="h-12 px-6 text-base"
                nativeButton={false}
                render={
                  <a
                    href={LINKS.sales}
                    data-analytics-event="sales_contact_click"
                    data-analytics-location="about-cta"
                  />
                }
              >
                Falar com a equipe
              </Button>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  )
}
