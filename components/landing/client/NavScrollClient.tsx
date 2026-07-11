"use client"

import { useScrollPosition } from "@/hooks/use-scroll-position"
import { cn } from "@/lib/utils"

type NavScrollClientProps = {
  children: React.ReactNode
  overlay?: boolean
}

/**
 * N10 scroll-morph: full-bleed on top; denser floating surface after scroll.
 * data-scrolled drives child styles via group-data selectors.
 */
export function NavScrollClient({
  children,
  overlay = false,
}: NavScrollClientProps) {
  const scrolled = useScrollPosition(20)

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className={cn(
        "group/nav fixed inset-x-0 top-0 z-50 transition-[padding] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
        scrolled ? "px-3 pt-2 sm:px-4 sm:pt-3" : "px-0 pt-0"
      )}
    >
      <div
        className={cn(
          "nav-morph-shell mx-auto w-full",
          scrolled
            ? "max-w-[72rem] rounded-2xl border border-border/80 bg-background/92 shadow-raise backdrop-blur-xl dark:border-white/10 dark:bg-(--color-brand-navy)/94 dark:shadow-none"
            : overlay
              ? "max-w-none border border-transparent bg-transparent"
              : "max-w-none border-b border-border/60 bg-background/80 backdrop-blur-md dark:border-white/8 dark:bg-(--color-brand-navy)/78"
        )}
      >
        {children}
      </div>
    </header>
  )
}
