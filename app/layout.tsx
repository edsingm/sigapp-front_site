import { Geist_Mono, Manrope, Space_Grotesk } from "next/font/google"
import type { Metadata, Viewport } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CookieBanner } from "@/components/landing/client/CookieBanner"
import { AnalyticsScripts } from "@/components/landing/client/AnalyticsScripts"
import { cn } from "@/lib/utils"
import { PLANS, SITE, SITE_URL } from "@/lib/landing-data"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin"],
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
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE.title,
    template: "%s · SIGAPP",
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: {
    canonical: "/",
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

// Dados estruturados (JSON-LD) — Organization + SoftwareApplication com offers dos planos
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE.name,
      legalName: SITE.legalName,
      url: SITE_URL,
      logo: `${SITE_URL}/icon`,
      contactPoint: {
        "@type": "ContactPoint",
        email: SITE.email,
        contactType: "sales",
        areaServed: "BR",
        availableLanguage: "Portuguese",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: SITE.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: SITE.description,
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      offers: PLANS.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        price: plan.monthlyPrice,
        priceCurrency: "BRL",
        category: "subscription",
      })),
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        manrope.variable,
        spaceGrotesk.variable
      )}
    >
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          {children}
          <CookieBanner />
          <AnalyticsScripts />
        </ThemeProvider>
      </body>
    </html>
  )
}
