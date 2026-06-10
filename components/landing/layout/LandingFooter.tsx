import Link from "next/link"
import { CookiePreferencesButton } from "@/components/landing/client/CookiePreferencesButton"

type FooterLink = { label: string; href: string }
type FooterGroup = { group: string; links: FooterLink[] }

const FOOTER_GROUPS: FooterGroup[] = [
  {
    group: "Produto",
    links: [
      { label: "Funcionalidades", href: "/#funcionalidades" },
      { label: "Planos", href: "/#precos" },
      { label: "API", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    group: "Empresa",
    links: [
      { label: "Sobre", href: "/sobre" },
      { label: "Blog", href: "/blog" },
      { label: "Carreiras", href: "#" },
      { label: "Imprensa", href: "#" },
    ],
  },
  {
    group: "Suporte",
    links: [
      { label: "Documentação", href: "#" },
      { label: "Status", href: "#" },
      { label: "Contato", href: "#" },
      { label: "Ajuda", href: "#" },
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
    <Link href="/" className="flex items-center gap-2.5">
      <div className="flex size-8 items-center justify-center rounded-xl bg-primary shadow-sm shadow-black/10">
        <svg viewBox="0 0 24 24" className="size-4 text-primary-foreground" fill="none">
          <polygon
            points="12,2 22,7 22,17 12,22 2,17 2,7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            className="fill-primary-foreground/20"
          />
          <polygon
            points="12,6 18,9.5 18,14.5 12,18 6,14.5 6,9.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            className="fill-primary-foreground/40"
          />
        </svg>
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
            <p className="max-w-[30ch] text-sm leading-relaxed text-muted-foreground">
              Plataforma SaaS para prospecção, viabilidade e gestão imobiliária B2B.
            </p>
            <div className="flex items-center gap-3">
              {["Li", "Tw", "In"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex size-8 items-center justify-center rounded-xl border border-border bg-background text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {FOOTER_GROUPS.map(({ group, links }) => (
            <div key={group} className="flex flex-col gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/78">
                {group}
              </p>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © 2026 SIGAPP Tecnologia Ltda. CNPJ 00.000.000/0001-00
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-xs text-muted-foreground">
              Feito no Brasil para o mercado imobiliário brasileiro
            </p>
            <CookiePreferencesButton />
          </div>
        </div>
      </div>
    </footer>
  )
}
