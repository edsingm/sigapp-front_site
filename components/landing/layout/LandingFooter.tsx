import Link from "next/link"
import Image from "next/image"
import { CookiePreferencesButton } from "@/components/landing/client/CookiePreferencesButton"
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

function FooterBrand() {
  return (
    <Link
      href="/"
      aria-label="SIGAPP"
      className="inline-flex min-h-11 w-fit items-center rounded-xl bg-white px-3.5 py-2 outline-none focus-visible:ring-2 focus-visible:ring-secondary/60"
    >
      <Image src="/logo-mark.svg" alt="SIGAPP" width={92} height={28} />
    </Link>
  )
}

export function LandingFooter() {
  return (
    <footer className="border-t border-white/8 bg-[#07182E] text-white">
      <div className="container-landing py-16 md:py-18">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <FooterBrand />
            <p className="max-w-[30ch] text-sm leading-relaxed text-white/62">
              Inteligência imobiliária para decidir cada terreno com clareza
              financeira.
            </p>
            <p className="coord text-white/40">
              Gestão territorial inteligente
            </p>
          </div>

          {/* Link groups */}
          {FOOTER_GROUPS.map(({ group, links }) => (
            <div key={group} className="flex flex-col gap-3">
              <p className="coord text-secondary">{group}</p>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {isExternal(link.href) ? (
                      <a
                        href={link.href}
                        {...(link.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="inline-flex min-h-11 items-center text-sm text-white/68 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="inline-flex min-h-11 items-center text-sm text-white/68 transition-colors hover:text-white"
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
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/48">
            © 2026 SIGAPP Tecnologia Ltda. CNPJ 00.000.000/0001-00
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-xs text-white/48">Do terreno ao retorno.</p>
            <CookiePreferencesButton />
          </div>
        </div>
      </div>
    </footer>
  )
}
