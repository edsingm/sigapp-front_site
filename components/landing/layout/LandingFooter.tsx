import Link from "next/link"
import { CookiePreferencesButton } from "@/components/landing/client/CookiePreferencesButton"
import { SigappLogoMark } from "@/components/branding/SigappLogoMark"
import { LINKS } from "@/lib/landing-data"

type FooterLink = { label: string; href: string }
type FooterGroup = { group: string; links: FooterLink[] }

function isExternal(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:")
}

const FOOTER_GROUPS: FooterGroup[] = [
  {
    group: "Produto",
    links: [
      { label: "Funcionalidades", href: "/#funcionalidades" },
      { label: "Planos", href: "/#precos" },
      { label: "Perguntas frequentes", href: "/#faq" },
      { label: "Entrar", href: LINKS.login },
    ],
  },
  {
    group: "Empresa",
    links: [
      { label: "Sobre", href: "/sobre" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    group: "Contato",
    links: [
      { label: "Falar com vendas", href: LINKS.sales },
      { label: "Agendar demonstração", href: LINKS.demo },
    ],
  },
  {
    group: "Legal",
    links: [
      { label: "Termos de Uso", href: "/legal/termos-de-uso" },
      { label: "Privacidade", href: "/legal/privacidade" },
      { label: "LGPD", href: "/legal/lgpd" },
      { label: "Cookies", href: "/legal/cookies" },
    ],
  },
]

function SigappLogo() {
  return (
    <Link href="/" className="inline-flex min-h-11 items-center gap-2.5">
      <div className="flex size-8 items-center justify-center rounded-xl bg-primary shadow-sm shadow-black/10">
        <SigappLogoMark className="size-4 text-primary-foreground" />
      </div>
      <span className="font-heading text-lg font-bold tracking-tight text-foreground">
        SIGAPP
      </span>
    </Link>
  )
}

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="container-landing py-16 md:py-18">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <SigappLogo />
            <p className="max-w-[30ch] text-sm leading-relaxed text-foreground/82">
              Plataforma SaaS para prospecção, viabilidade e gestão imobiliária B2B.
            </p>
          </div>

          {/* Link groups */}
          {FOOTER_GROUPS.map(({ group, links }) => (
            <div key={group} className="flex flex-col gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/88">
                {group}
              </p>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {isExternal(link.href) ? (
                      <a
                        href={link.href}
                        {...(link.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="inline-flex min-h-11 items-center text-sm text-foreground/84 transition-colors hover:text-primary"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="inline-flex min-h-11 items-center text-sm text-foreground/84 transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-foreground/76">
            © 2026 SIGAPP Tecnologia Ltda. CNPJ 00.000.000/0001-00
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-xs text-foreground/76">
              Feito no Brasil para o mercado imobiliário brasileiro
            </p>
            <CookiePreferencesButton />
          </div>
        </div>
      </div>
    </footer>
  )
}
