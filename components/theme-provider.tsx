"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

const THEME_COLOR = {
  light: "#f5f8f2",
  dark: "#071514",
} as const

function ThemeColorSync() {
  const { resolvedTheme } = useTheme()

  React.useEffect(() => {
    const themeColor = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]'
    )

    if (themeColor && (resolvedTheme === "light" || resolvedTheme === "dark")) {
      themeColor.content = THEME_COLOR[resolvedTheme]
    }
  }, [resolvedTheme])

  return null
}

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      enableColorScheme
      disableTransitionOnChange
      storageKey="sigapp-theme"
      themes={["light", "dark"]}
      {...props}
    >
      <ThemeColorSync />
      {children}
    </NextThemesProvider>
  )
}

export { ThemeProvider }
