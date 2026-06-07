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
        "sticky top-0 z-40 w-full bg-background/90 backdrop-blur-md transition-all duration-200",
        scrolled && "border-b border-border shadow-sm"
      )}
    >
      {children}
    </header>
  )
}
