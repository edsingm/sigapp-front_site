"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NavScrollClient } from "@/components/landing/client/NavScrollClient"
import { ThemeToggleButton } from "@/components/landing/client/ThemeToggleButton"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { LINKS, NAV_LINKS } from "@/lib/landing-data"

function NavBrand() {
  return (
    <Link href="/" aria-label="SIGAPP">
      <Image
        src="/logo-mark.svg"
        alt="SIGAPP"
        width={92}
        height={32}
        priority
      />
    </Link>
  )
}

export function LandingNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const close = () => setMobileOpen(false)

  return (
    <>
      <NavScrollClient>
        <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-5">
          <NavBrand />

          {/* Desktop nav links */}
          <nav className="hidden items-center gap-0.5 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="inline-flex min-h-9 items-center rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground dark:text-white/80 dark:hover:bg-white/8 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <a
              href={LINKS.login}
              data-analytics-event="login_click"
              data-analytics-location="nav"
              className="hidden min-h-9 items-center rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-flex dark:text-white/80 dark:hover:text-white"
            >
              Entrar
            </a>
            <ThemeToggleButton className="hidden size-10 sm:flex" />
            <Button
              variant="brand"
              size="lg"
              className="group/cta hidden h-10 gap-2 rounded-full pr-1.5 pl-5 text-sm font-semibold sm:inline-flex"
              nativeButton={false}
              render={
                <a
                  href={LINKS.demo}
                  data-analytics-event="demo_request"
                  data-analytics-location="nav"
                />
              }
            >
              Solicitar demonstração
              <span className="flex size-7 items-center justify-center rounded-full bg-white/18 transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/cta:translate-x-0.5">
                <ArrowRight className="size-3.5" />
              </span>
            </Button>

            {/* Hambúrguer morphing */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="relative flex size-11 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-muted md:hidden dark:border-white/12 dark:bg-white/8 dark:text-white dark:hover:bg-white/12"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
            >
              <span
                className={cn(
                  "absolute h-px w-5 bg-current transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
                  mobileOpen ? "rotate-45" : "-translate-y-[5px]"
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-5 bg-current transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
                  mobileOpen ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-5 bg-current transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
                  mobileOpen ? "-rotate-45" : "translate-y-[5px]"
                )}
              />
            </button>
          </div>
        </div>
      </NavScrollClient>

      {/* Overlay mobile — vidro pesado, reveal escalonado.
          Fora do header (que tem backdrop-filter) para cobrir a viewport inteira. */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 flex flex-col bg-background/96 px-5 pt-24 pb-10 backdrop-blur-2xl md:hidden dark:bg-nav-bg/95">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={close}
                style={{ animationDelay: `${80 + i * 55}ms` }}
                className="nav-reveal border-b border-border py-4 font-heading text-2xl font-semibold tracking-tight text-foreground transition-colors hover:text-primary dark:border-white/8 dark:text-white/90 dark:hover:text-secondary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div
            className="nav-reveal mt-auto flex flex-col gap-3"
            style={{ animationDelay: `${80 + NAV_LINKS.length * 55}ms` }}
          >
            <a
              href={LINKS.login}
              data-analytics-event="login_click"
              data-analytics-location="nav-mobile"
              onClick={close}
              className="py-2 text-base font-medium text-muted-foreground transition-colors hover:text-foreground dark:text-white/80 dark:hover:text-white"
            >
              Entrar
            </a>
            <ThemeToggleButton className="self-start" />
            <Button
              className="h-13 w-full gap-2 rounded-full text-base font-semibold"
              onClick={close}
              nativeButton={false}
              render={
                <a
                  href={LINKS.demo}
                  data-analytics-event="demo_request"
                  data-analytics-location="nav-mobile"
                />
              }
            >
              Solicitar demonstração
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
