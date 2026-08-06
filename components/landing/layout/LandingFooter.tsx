import { ArrowUpRight, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { CookiePreferencesButton } from "@/components/landing/client/CookiePreferencesButton"
import { FOOTER_COPY, FOOTER_GROUPS, SITE } from "@/lib/landing-data"

function isExternal(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:")
}

export function LandingFooter() {
  return (
    <footer className="footer-stage">
      <div className="footer-stage-grid" aria-hidden="true" />
      <div className="container-landing footer-shell">
        <div className="footer-main lg:grid-cols-12">
          <div className="footer-brand lg:col-span-5">
            <Link
              href="/"
              aria-label={`${SITE.name} — página inicial`}
              className="footer-logo"
            >
              <Image
                src="/landing-logo-mark.svg"
                alt={`${SITE.name} — página inicial`}
                width={104}
                height={32}
              />
            </Link>
            <span className="footer-eyebrow">{FOOTER_COPY.eyebrow}</span>
            <p className="footer-heading">
              <span>{FOOTER_COPY.titleLine1}</span>
              <strong>{FOOTER_COPY.titleLine2}</strong>
            </p>
            <p className="footer-description">{FOOTER_COPY.description}</p>

            <a href={`mailto:${SITE.email}`} className="footer-contact">
              <span>
                <Mail aria-hidden="true" />
              </span>
              <div>
                <small>{FOOTER_COPY.contactLabel}</small>
                <strong>{SITE.email}</strong>
              </div>
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>

          <nav
            aria-label={FOOTER_COPY.navigationLabel}
            className="footer-navigation sm:grid-cols-2 lg:col-span-7 xl:grid-cols-4"
          >
            {FOOTER_GROUPS.map((group, groupIndex) => (
              <div key={group.group} className="footer-group">
                <header>
                  <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                  <strong>{group.group}</strong>
                </header>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {isExternal(link.href) ? (
                        <a
                          href={link.href}
                          {...(link.href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {link.label}
                          <ArrowUpRight aria-hidden="true" />
                        </a>
                      ) : (
                        <Link href={link.href}>
                          {link.label}
                          <ArrowUpRight aria-hidden="true" />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="footer-wordmark" aria-hidden="true">
          {FOOTER_COPY.wordmark}
        </div>

        <div className="footer-bottom">
          <div>
            <p>{FOOTER_COPY.copyright}</p>
            <span />
            <p>CNPJ: {SITE.cnpj}</p>
            <span />
            <p>{FOOTER_COPY.signature}</p>
          </div>
          <CookiePreferencesButton />
        </div>
      </div>
    </footer>
  )
}
