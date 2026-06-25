"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NavScrollClient } from "@/components/landing/client/NavScrollClient"
import { SigappLogoMark } from "@/components/branding/SigappLogoMark"
import { ArrowRight, Menu, X } from "lucide-react"
import { LINKS } from "@/lib/landing-data"

const NAV_LINKS = [
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Funcionalidades", href: "/#funcionalidades" },
  { label: "Planos", href: "/#precos" },
  { label: "FAQ", href: "/#faq" },
  { label: "Sobre", href: "/sobre" },
]

function SigappLogo() {
  return (
    <Link
      href="/"
      className="inline-flex min-h-11 items-center gap-3 focus:outline-none"
    >
      <SigappLogoMark className="size-7 text-secondary" />
      <span className="font-heading text-base font-bold tracking-[0.14em] text-white">
        SIGAPP
      </span>
    </Link>
  )
}

export function LandingNav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <NavScrollClient>
      <>
        <div className="container-landing flex h-16 items-center justify-between gap-3 sm:gap-6">
          <SigappLogo />

          {/* Desktop nav links */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="inline-flex min-h-11 items-center rounded-md px-4 py-2 text-sm font-semibold text-white/85 transition-colors hover:bg-white/8 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <a
              href={LINKS.login}
              data-analytics-event="login_click"
              data-analytics-location="nav"
              className="hidden min-h-11 items-center rounded-md px-4 py-2 text-sm font-semibold text-white/85 transition-colors hover:text-white md:inline-flex"
            >
              Entrar
            </a>
            <Button
              size="sm"
              className="hidden min-h-11 gap-1.5 rounded-md bg-primary px-4 font-semibold text-white shadow-sm shadow-black/10 hover:bg-primary/90 active:scale-[0.98] sm:inline-flex"
              nativeButton={false}
              render={
                <a
                  href={LINKS.signup}
                  data-analytics-event="trial_signup_click"
                  data-analytics-location="nav"
                />
              }
            >
              7 dias grátis
              <ArrowRight className="size-3.5" />
            </Button>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex size-11 items-center justify-center rounded-md border border-white/14 bg-white/8 text-white transition-colors hover:bg-white/12 hover:text-white md:hidden"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-white/10 bg-nav-bg/92 backdrop-blur-xl md:hidden">
            <nav className="container-landing flex flex-col gap-1 py-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3.5 text-base font-medium text-white/85 transition-colors hover:bg-white/8 hover:text-secondary"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-white/15 pt-3">
                <a
                  href={LINKS.login}
                  data-analytics-event="login_click"
                  data-analytics-location="nav-mobile"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3.5 text-base font-medium text-white/85 transition-colors hover:bg-white/8 hover:text-secondary"
                >
                  Entrar
                </a>
                <Button
                  className="h-12 w-full gap-2 rounded-xl bg-white font-semibold text-primary hover:bg-white/90"
                  onClick={() => setMobileOpen(false)}
                  nativeButton={false}
                  render={
                    <a
                      href={LINKS.signup}
                      data-analytics-event="trial_signup_click"
                      data-analytics-location="nav-mobile"
                    />
                  }
                >
                  Começar 7 dias grátis
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </nav>
          </div>
        )}
      </>
    </NavScrollClient>
  )
}
