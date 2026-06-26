"use client"

import { useScrollPosition } from "@/hooks/use-scroll-position"
import { cn } from "@/lib/utils"

type NavScrollClientProps = {
  children: React.ReactNode
}

// Shell de posicionamento da nav: pill flutuante de vidro, destacado do topo.
export function NavScrollClient({ children }: NavScrollClientProps) {
  const scrolled = useScrollPosition(12)

  return (
    <div className="fixed inset-x-0 top-0 z-40 flex justify-center px-3 sm:px-4">
      <header
        className={cn(
          "mt-3 w-full max-w-6xl rounded-2xl border transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] sm:mt-4",
          scrolled
            ? "border-border/80 bg-background/92 shadow-[0_14px_38px_-24px_rgba(11,30,57,0.45)] backdrop-blur-xl dark:border-white/12 dark:bg-nav-bg/94 dark:shadow-[0_10px_34px_-12px_rgba(0,0,0,0.55)]"
            : "border-border/70 bg-background/72 backdrop-blur-md dark:border-white/10 dark:bg-nav-bg/90"
        )}
      >
        {children}
      </header>
    </div>
  )
}
