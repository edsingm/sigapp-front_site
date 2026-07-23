"use client"

import { useSyncExternalStore } from "react"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

type ThemeToggleButtonProps = {
  className?: string
}

const subscribeToHydration = () => () => undefined

export function ThemeToggleButton({ className }: ThemeToggleButtonProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  )
  const darkMode = mounted && resolvedTheme === "dark"
  const actionLabel = darkMode ? "Ativar modo claro" : "Ativar modo escuro"

  return (
    <button
      type="button"
      onClick={() => setTheme(darkMode ? "light" : "dark")}
      disabled={!mounted}
      className={cn(
        "relative flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-wait disabled:opacity-70",
        className
      )}
      aria-label={actionLabel}
      aria-pressed={darkMode}
      title={actionLabel}
    >
      <Sun
        aria-hidden="true"
        className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
      />
      <Moon
        aria-hidden="true"
        className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
      />
    </button>
  )
}
