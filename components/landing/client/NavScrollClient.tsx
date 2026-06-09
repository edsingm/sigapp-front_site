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
        "sticky top-0 z-40 w-full bg-nav-bg/85 backdrop-blur-md transition-all duration-200",
        scrolled && "bg-nav-bg/95 shadow-lg shadow-nav-bg/20"
      )}
    >
      {children}
    </header>
  )
}
