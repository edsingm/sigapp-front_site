import { Geist_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google"
import type { Metadata, Viewport } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CookieBanner } from "@/components/landing/client/CookieBanner"
import { AnalyticsScripts } from "@/components/landing/client/AnalyticsScripts"
import { cn } from "@/lib/utils"
import { SITE, SITE_URL } from "@/lib/landing-data"

// Space Grotesk (títulos) · IBM Plex Sans (corpo técnico) · Geist Mono (dados)
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f8f2",
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE.title,
    template: "%s · SIGAPP",
  },
  description: SITE.description,
  applicationName: SITE.name,
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.svg", type: "image/svg+xml" }],
  },
  keywords: [
    "viabilidade imobiliária",
    "incorporação imobiliária",
    "estudo de viabilidade",
    "DRE imobiliário",
    "TIR projeto imobiliário",
    "software para incorporadoras",
    "gestão de terrenos",
    "SIG imobiliário",
  ],
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.legalName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE_URL,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        ibmPlexSans.variable,
        spaceGrotesk.variable
      )}
    >
      <body suppressHydrationWarning>
        <ThemeProvider>
          <a href="#conteudo-principal" className="skip-link">
            Pular para o conteúdo
          </a>
          {children}
          <CookieBanner />
          <AnalyticsScripts />
        </ThemeProvider>
      </body>
    </html>
  )
}
