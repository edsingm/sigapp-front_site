"use client"

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Menu, X } from "lucide-react"

import { NavScrollClient } from "@/components/landing/client/NavScrollClient"
import { ThemeToggleButton } from "@/components/landing/client/ThemeToggleButton"
import { cn } from "@/lib/utils"
import { LINKS, NAV_COPY, NAV_LINKS, SITE } from "@/lib/landing-data"

function NavBrand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      aria-label={`${SITE.name} ${NAV_COPY.productLabel} — início`}
      onClick={onNavigate}
      className="landing-nav-brand"
    >
      <span className="landing-nav-wordmark">
        <Image
          src="/landing-logo-mark.svg"
          alt=""
          width={188}
          height={58}
          className="landing-nav-logo-img"
          priority
        />
        <small className="hidden sm:block">{NAV_COPY.productLabel}</small>
      </span>
    </Link>
  )
}

export function LandingNav({ overlay = false }: { overlay?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuTriggerRef = useRef<HTMLButtonElement>(null)
  const close = () => setMobileOpen(false)

  const trapMenuFocus = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return

    const focusableElements = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])"
      )
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements.at(-1)

    if (!firstElement || !lastElement) return

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }

  useEffect(() => {
    if (!mobileOpen) return

    const previousOverflow = document.body.style.overflow
    const menuTrigger = menuTriggerRef.current
    const menuClose = document.querySelector<HTMLButtonElement>(
      "#mobile-nav .landing-mobile-close"
    )
    const backgroundElements = [
      document.querySelector<HTMLElement>(".landing-nav-host"),
      document.querySelector<HTMLElement>("main"),
      document.querySelector<HTMLElement>("footer"),
    ].filter((element): element is HTMLElement => element !== null)

    document.body.style.overflow = "hidden"
    backgroundElements.forEach((element) => {
      element.inert = true
    })
    const focusFrame = window.requestAnimationFrame(() => {
      menuClose?.focus()
    })

    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.body.style.overflow = previousOverflow
      backgroundElements.forEach((element) => {
        element.inert = false
      })
      menuTrigger?.focus()
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false)
    }

    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [mobileOpen])

  return (
    <>
      <NavScrollClient overlay={overlay}>
        <div className="container-landing landing-nav-container">
          <div className="landing-nav-row">
            <NavBrand onNavigate={close} />

            <nav
              aria-label="Principal"
              className="landing-nav-links hidden xl:flex"
            >
              {NAV_LINKS.map((link, index) => (
                <Link key={link.label} href={link.href}>
                  <span>0{index + 1}</span>
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="landing-nav-actions">
              <a
                href={LINKS.login}
                data-analytics-event="login_click"
                data-analytics-location="nav"
                className="landing-nav-login hidden md:inline-flex"
              >
                {NAV_COPY.login}
              </a>
              <ThemeToggleButton className="landing-nav-theme hidden sm:flex" />
              <Link
                href={LINKS.demo}
                data-analytics-event="demo_request"
                data-analytics-location="nav"
                className="landing-nav-demo hidden sm:inline-flex"
              >
                {NAV_COPY.demo}
                <ArrowUpRight aria-hidden="true" />
              </Link>

              <button
                ref={menuTriggerRef}
                type="button"
                onClick={() => setMobileOpen((current) => !current)}
                className="landing-nav-trigger flex xl:hidden"
                aria-label={mobileOpen ? NAV_COPY.closeMenu : NAV_COPY.openMenu}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
              >
                {mobileOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </NavScrollClient>

      <div
        id="mobile-nav"
        className={cn("landing-mobile-menu xl:hidden", mobileOpen && "is-open")}
        role="dialog"
        aria-modal="true"
        aria-label={NAV_COPY.menuLabel}
        aria-hidden={!mobileOpen}
        onKeyDown={trapMenuFocus}
      >
        <div className="landing-mobile-orbit" aria-hidden="true" />
        <div className="landing-mobile-grid" aria-hidden="true" />

        <div className="container-landing landing-mobile-shell">
          <div className="landing-mobile-header">
            <NavBrand onNavigate={close} />
            <button
              type="button"
              onClick={close}
              className="landing-mobile-close"
              aria-label={NAV_COPY.closeMenu}
            >
              <X aria-hidden="true" />
            </button>
          </div>

          <div className="landing-mobile-content">
            <p className="landing-mobile-label">{NAV_COPY.menuLabel}</p>
            <nav aria-label="Mobile" className="landing-mobile-links">
              {NAV_LINKS.map((link, index) => (
                <Link key={link.label} href={link.href} onClick={close}>
                  <span>0{index + 1}</span>
                  <strong>{link.label}</strong>
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="landing-mobile-footer">
            <p>{NAV_COPY.mobileKicker}</p>
            <div>
              <a
                href={LINKS.login}
                data-analytics-event="login_click"
                data-analytics-location="nav-mobile"
                onClick={close}
                className="landing-mobile-login"
              >
                {NAV_COPY.mobileLogin}
              </a>
              <ThemeToggleButton className="landing-mobile-theme" />
            </div>
            <Link
              href={LINKS.demo}
              data-analytics-event="demo_request"
              data-analytics-location="nav-mobile"
              onClick={close}
              className="landing-mobile-demo"
            >
              {NAV_COPY.demo}
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
