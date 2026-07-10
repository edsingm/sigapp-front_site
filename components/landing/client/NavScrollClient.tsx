"use client"

import { useScrollPosition } from "@/hooks/use-scroll-position"
import { cn } from "@/lib/utils"

type NavScrollClientProps = {
  children: React.ReactNode
  overlay?: boolean
}

/** Barra full-width: transparente no topo, sólida ao rolar. */
export function NavScrollClient({
  children,
  overlay = false,
}: NavScrollClientProps) {
  const scrolled = useScrollPosition(16)

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className={cn(
        "group/nav fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
        scrolled
          ? "border-b border-border/80 bg-background/90 shadow-[0_1px_0_0_color-mix(in_oklch,var(--color-brand-navy)_6%,transparent)] backdrop-blur-xl dark:border-white/10 dark:bg-(--color-brand-navy)/92 dark:shadow-none"
          : overlay
            ? "border-b border-white/8 bg-(--color-brand-navy)/10 backdrop-blur-[2px]"
            : "border-b border-transparent bg-background/70 backdrop-blur-md dark:bg-(--color-brand-navy)/70"
      )}
    >
      {children}
    </header>
  )
}
