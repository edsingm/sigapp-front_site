import Image from "next/image"
import Link from "next/link"
import { Mail } from "lucide-react"

import { CookiePreferencesButton } from "@/components/landing/client/CookiePreferencesButton"
import { FOOTER_GROUPS, SITE } from "@/lib/landing-data"

function isExternal(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:")
}

/** Flatten groups for Ft5 compact index — statement first, links second. */
const FOOTER_LINKS = FOOTER_GROUPS.flatMap((g) => g.links)

export function LandingFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-(--color-brand-navy) text-white">
      <div className="grain-overlay opacity-[0.055]" />
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-12" />

      <div className="container-landing relative pt-16 pb-8 md:pt-20">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-xl">
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

            <p className="mt-8 font-heading text-3xl leading-[1.05] font-bold tracking-[-0.04em] text-balance text-white sm:text-4xl md:text-5xl">
              Decisões que ganham território.
            </p>
            <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-white/55 md:text-base">
              Gestão territorial inteligente para analisar, aprovar e conduzir
              cada oportunidade com critério.
            </p>
          </div>

          <a
            href={`mailto:${SITE.email}`}
            className="group inline-flex min-h-11 shrink-0 items-center gap-3 self-start rounded-full border border-white/12 bg-white/6 py-2 pr-5 pl-2 text-sm whitespace-nowrap text-white/72 transition-colors hover:bg-white/10 hover:text-white lg:self-end"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-white/8 text-secondary">
              <Mail className="size-3.5" />
            </span>
            {SITE.email}
          </a>
        </div>

        <nav
          aria-label="Rodapé"
          className="flex flex-wrap gap-x-1 gap-y-1 border-b border-white/10 py-6"
        >
          {FOOTER_LINKS.map((link) => {
            const className =
              "inline-flex min-h-10 items-center px-3 text-sm whitespace-nowrap text-white/55 transition-colors hover:text-white"

            if (isExternal(link.href)) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={className}
                >
                  {link.label}
                </a>
              )
            }

            return (
              <Link key={link.label} href={link.href} className={className}>
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
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
