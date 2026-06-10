"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NavScrollClient } from "@/components/landing/client/NavScrollClient"
import { ThemeToggleButton } from "@/components/landing/client/ThemeToggleButton"
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
    <Link href="/" className="flex items-center gap-2.5 focus:outline-none">
      <div className="flex size-8 items-center justify-center rounded-lg border border-white/18 bg-white/12 shadow-sm shadow-black/10 backdrop-blur-sm">
        <svg viewBox="0 0 24 24" className="size-4 text-white" fill="none">
          <polygon
            points="12,2 22,7 22,17 12,22 2,17 2,7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            className="fill-white/20"
          />
          <polygon
            points="12,6 18,9.5 18,14.5 12,18 6,14.5 6,9.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            className="fill-white/40"
          />
        </svg>
      </div>
      <span className="font-heading text-lg font-extrabold tracking-tight text-white">
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
                className="rounded-full px-3.5 py-2 text-sm font-semibold text-white/86 transition-colors hover:bg-white/8 hover:text-secondary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <ThemeToggleButton className="border border-white/10 bg-white/6 text-white shadow-sm shadow-black/5 hover:bg-white/10 hover:text-white" />
            <a
              href={LINKS.login}
              data-analytics-event="login_click"
              data-analytics-location="nav"
              className="hidden rounded-full px-3.5 py-2 text-sm font-semibold text-white/88 transition-colors hover:text-secondary md:block"
            >
              Entrar
            </a>
            <Button
              size="sm"
              className="hidden gap-1.5 rounded-full bg-white font-semibold text-primary shadow-sm shadow-black/10 hover:bg-white/90 active:scale-[0.98] sm:inline-flex"
              nativeButton={false}
              render={<a href={LINKS.signup} data-analytics-event="trial_signup_click" data-analytics-location="nav" />}
            >
              Trial grátis
              <ArrowRight className="size-3.5" />
            </Button>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/90 transition-colors hover:bg-white/10 hover:text-white md:hidden"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
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
                  className="h-12 w-full rounded-xl gap-2 bg-white font-semibold text-primary hover:bg-white/90"
                  onClick={() => setMobileOpen(false)}
                  nativeButton={false}
                  render={<a href={LINKS.signup} data-analytics-event="trial_signup_click" data-analytics-location="nav-mobile" />}
                >
                  Começar trial grátis
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
