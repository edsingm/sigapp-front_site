import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NavScrollClient } from "@/components/landing/client/NavScrollClient"
import { ThemeToggleButton } from "@/components/landing/client/ThemeToggleButton"
import { ArrowRight } from "lucide-react"

const NAV_LINKS = [
  { label: "Produto", href: "#funcionalidades" },
  { label: "Planos", href: "#precos" },
  { label: "FAQ", href: "#faq" },
]

function SigappLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 focus:outline-none">
      <div className="flex size-8 items-center justify-center rounded-lg bg-primary shadow-sm">
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

export function LandingNav() {
  return (
    <NavScrollClient>
      <div className="container-landing flex h-16 items-center justify-between gap-6">
        <SigappLogo />

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggleButton />
          <a
            href="#"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:block"
          >
            Entrar
          </a>
          <Button variant="amber" size="sm" className="gap-1.5 font-semibold">
            Trial grátis
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
      </div>
    </NavScrollClient>
  )
}
