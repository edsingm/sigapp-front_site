import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Mail } from "lucide-react"

import { CookiePreferencesButton } from "@/components/landing/client/CookiePreferencesButton"
import { FOOTER_GROUPS, SITE } from "@/lib/landing-data"

function isExternal(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:")
}

function FooterBrand() {
  return (
    <Link
      href="/"
      aria-label="SIGAPP"
      className="inline-flex min-h-11 w-fit items-center rounded-xl bg-white px-3.5 py-2 shadow-lg shadow-black/10 outline-none focus-visible:ring-2 focus-visible:ring-secondary/60"
    >
      <Image
        src="/logo-mark.svg"
        alt="SIGAPP"
        width={104}
        height={32}
        style={{ width: "auto" }}
      />
    </Link>
  )
}

export function LandingFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-(--color-brand-navy) text-white">
      <div className="pointer-events-none absolute inset-0 bg-black/18" />
      <div className="grain-overlay opacity-[0.065]" />
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-15" />
      <div className="pointer-events-none absolute -right-48 bottom-0 size-[34rem] rounded-full bg-primary/10 blur-3xl" />

      <div className="container-landing relative pt-16 pb-8 md:pt-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col items-start lg:col-span-4 lg:pr-10">
            <FooterBrand />
            <p className="mt-7 max-w-[12ch] font-heading text-3xl leading-[1.05] font-bold tracking-[-0.035em] text-white sm:text-4xl">
              Do terreno ao retorno.
            </p>
            <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-white/55">
              Inteligência imobiliária para analisar, aprovar e conduzir cada
              oportunidade com clareza financeira e territorial.
            </p>

            <a
              href={`mailto:${SITE.email}`}
              className="group/mail mt-7 inline-flex min-h-11 items-center gap-3 rounded-full border border-white/12 bg-white/6 py-2 pr-4 pl-2 text-sm text-white/72 transition-colors hover:bg-white/10 hover:text-white"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-white/8 text-secondary">
                <Mail className="size-3.5" />
              </span>
              {SITE.email}
              <ArrowUpRight className="size-3.5 text-white/30 transition-transform group-hover/mail:translate-x-0.5 group-hover/mail:-translate-y-0.5 group-hover/mail:text-white/70" />
            </a>
          </div>

          <nav
            aria-label="Rodapé"
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8 lg:pl-6"
          >
            {FOOTER_GROUPS.map(({ group, links }, groupIndex) => (
              <div key={group}>
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <span className="data-mono text-[10px] text-white/28">
                    0{groupIndex + 1}
                  </span>
                  <p className="coord text-secondary">{group}</p>
                </div>
                <ul className="mt-3 flex flex-col">
                  {links.map((link) => {
                    const className =
                      "group/link inline-flex min-h-11 items-center justify-between gap-2 text-sm text-white/58 transition-colors hover:text-white"
                    const content = (
                      <>
                        <span>{link.label}</span>
                        <ArrowUpRight className="size-3.5 shrink-0 translate-y-1 text-white/0 transition-[color,transform] group-hover/link:translate-y-0 group-hover/link:text-white/45" />
                      </>
                    )

                    return (
                      <li key={link.label}>
                        {isExternal(link.href) ? (
                          <a
                            href={link.href}
                            {...(link.href.startsWith("http")
                              ? {
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                }
                              : {})}
                            className={className}
                          >
                            {content}
                          </a>
                        ) : (
                          <Link href={link.href} className={className}>
                            {content}
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div
          aria-hidden="true"
          className="mt-14 overflow-hidden border-y border-white/8 py-7 sm:mt-18 sm:py-9"
        >
          <p className="text-center font-heading text-[clamp(4.75rem,15vw,11rem)] leading-[0.7] font-black tracking-[-0.075em] text-white/[0.045] select-none">
            SIGAPP
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-xs text-white/38">
              © 2026 SIGAPP Tecnologia Ltda.
            </p>
            <span className="hidden size-1 rounded-full bg-white/15 sm:block" />
            <p className="coord text-white/28">
              Gestão territorial inteligente
            </p>
          </div>
          <CookiePreferencesButton />
        </div>
      </div>
    </footer>
  )
}
