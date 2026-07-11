"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { NavScrollClient } from "@/components/landing/client/NavScrollClient"
import { ThemeToggleButton } from "@/components/landing/client/ThemeToggleButton"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LINKS, NAV_LINKS } from "@/lib/landing-data"

function NavBrand({
  onNavigate,
  overlay,
}: {
  onNavigate?: () => void
  overlay?: boolean
}) {
  return (
    <Link
      href="/"
      aria-label="SIGAPP — início"
      onClick={onNavigate}
      className={cn(
        "relative z-10 shrink-0 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring",
        overlay &&
          "group-data-[scrolled=false]/nav:rounded-xl group-data-[scrolled=false]/nav:bg-white/94 group-data-[scrolled=false]/nav:px-2 group-data-[scrolled=false]/nav:py-1 group-data-[scrolled=false]/nav:shadow-lg group-data-[scrolled=false]/nav:shadow-black/10"
      )}
    >
      <Image
        src="/logo-mark.svg"
        alt="SIGAPP"
        width={104}
        height={32}
        priority
        className="h-8 w-auto sm:h-9"
        style={{ width: "auto" }}
      />
    </Link>
  )
}

export function LandingNav({ overlay = false }: { overlay?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const close = () => setMobileOpen(false)

  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [mobileOpen])

  return (
    <>
      <NavScrollClient overlay={overlay}>
        <div className="container-landing">
          <div className="flex h-14 items-center gap-3 sm:h-16 sm:gap-5">
            <NavBrand onNavigate={close} overlay={overlay} />

            <nav
              aria-label="Principal"
              className="hidden flex-1 items-center justify-center gap-0.5 lg:flex"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "group relative inline-flex h-10 items-center whitespace-nowrap px-3 text-[13px] font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground dark:text-white/70 dark:hover:text-white",
                    overlay &&
                      "group-data-[scrolled=false]/nav:text-white/72 group-data-[scrolled=false]/nav:hover:text-white"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute inset-x-3 bottom-2 h-px origin-left scale-x-0 bg-foreground/80 transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-x-100 dark:bg-white/80",
                      overlay && "group-data-[scrolled=false]/nav:bg-white/80"
                    )}
                  />
                </Link>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-1 sm:gap-2">
              <a
                href={LINKS.login}
                data-analytics-event="login_click"
                data-analytics-location="nav"
                className={cn(
                  "hidden h-10 items-center whitespace-nowrap px-3 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-flex dark:text-white/70 dark:hover:text-white",
                  overlay &&
                    "group-data-[scrolled=false]/nav:text-white/72 group-data-[scrolled=false]/nav:hover:text-white"
                )}
              >
                Entrar
              </a>
              <ThemeToggleButton
                className={cn(
                  "hidden size-10 sm:flex",
                  overlay &&
                    "group-data-[scrolled=false]/nav:text-white/72 group-data-[scrolled=false]/nav:hover:bg-white/10 group-data-[scrolled=false]/nav:hover:text-white"
                )}
              />
              <Button
                variant="brand"
                size="lg"
                className="group/cta hidden h-10 gap-2 rounded-full pr-1.5 pl-4 text-[13px] font-semibold whitespace-nowrap sm:inline-flex"
                nativeButton={false}
                render={
                  <Link
                    href={LINKS.demo}
                    data-analytics-event="demo_request"
                    data-analytics-location="nav"
                  />
                }
              >
                Demonstração
                <span className="flex size-7 items-center justify-center rounded-full bg-white/18 transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/cta:translate-x-0.5">
                  <ArrowRight className="size-3.5" />
                </span>
              </Button>

              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className={cn(
                  "relative z-10 flex size-11 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-muted lg:hidden dark:text-white dark:hover:bg-white/10",
                  overlay &&
                    "group-data-[scrolled=false]/nav:text-white group-data-[scrolled=false]/nav:hover:bg-white/10"
                )}
                aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
              >
                <span className="relative block size-5">
                  <span
                    className={cn(
                      "absolute top-1/2 left-0 h-px w-5 -translate-y-1/2 bg-current transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
                      mobileOpen ? "rotate-45" : "-translate-y-[5px]"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute top-1/2 left-0 h-px w-5 -translate-y-1/2 bg-current transition-opacity duration-200",
                      mobileOpen ? "opacity-0" : "opacity-100"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute top-1/2 left-0 h-px w-5 -translate-y-1/2 bg-current transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
                      mobileOpen ? "-rotate-45" : "translate-y-[4px]"
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </NavScrollClient>

      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-(--color-brand-navy) transition-[opacity,visibility] duration-300 lg:hidden",
          mobileOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="grain-overlay opacity-[0.06]" />
        <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-40" />

        <div className="container-landing relative flex h-16 items-center justify-between">
          <NavBrand onNavigate={close} overlay />
          <button
            type="button"
            onClick={close}
            className="flex size-11 items-center justify-center rounded-xl text-white/80 hover:bg-white/10 hover:text-white"
            aria-label="Fechar menu"
          >
            <span className="relative block size-5">
              <span className="absolute top-1/2 left-0 h-px w-5 -translate-y-1/2 rotate-45 bg-current" />
              <span className="absolute top-1/2 left-0 h-px w-5 -translate-y-1/2 -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        <nav
          aria-label="Mobile"
          className="container-landing relative flex flex-1 flex-col justify-center gap-1 pb-8"
        >
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={close}
              style={
                mobileOpen ? { animationDelay: `${70 + i * 50}ms` } : undefined
              }
              className={cn(
                "border-b border-white/10 py-4 font-heading text-3xl font-semibold tracking-tight text-white transition-colors hover:text-secondary",
                mobileOpen && "nav-reveal"
              )}
            >
              <span className="coord mr-4 text-white/35">0{i + 1}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="container-landing relative flex flex-col gap-3 pb-10">
          <div className="flex items-center justify-between gap-3">
            <a
              href={LINKS.login}
              data-analytics-event="login_click"
              data-analytics-location="nav-mobile"
              onClick={close}
              className="text-sm font-medium whitespace-nowrap text-white/70 transition-colors hover:text-white"
            >
              Entrar na conta
            </a>
            <ThemeToggleButton className="text-white/70 hover:bg-white/10 hover:text-white" />
          </div>
          <Button
            className="h-13 w-full gap-2 rounded-full bg-primary text-base font-semibold text-white hover:bg-primary/90"
            onClick={close}
            nativeButton={false}
            render={
              <Link
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
    </>
  )
}
