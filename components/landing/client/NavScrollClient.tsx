"use client"

import { useScrollPosition } from "@/hooks/use-scroll-position"
import { cn } from "@/lib/utils"

type NavScrollClientProps = {
  children: React.ReactNode
}

export function NavScrollClient({ children }: NavScrollClientProps) {
  const scrolled = useScrollPosition(12)

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-white/8 bg-nav-bg/96 transition-all duration-300",
        scrolled
          ? "bg-nav-bg/90 shadow-lg shadow-black/10 backdrop-blur-xl"
          : "shadow-sm shadow-black/5"
      )}
    >
      {children}
    </header>
  )
}
