import type { Metadata } from "next"

import { BezelSpotlight } from "@/components/landing/client/BezelSpotlight"
import { StickyMobileCTA } from "@/components/landing/client/StickyMobileCTA"
import { LandingFooter } from "@/components/landing/layout/LandingFooter"
import { LandingNav } from "@/components/landing/layout/LandingNav"
import { BentoSection } from "@/components/landing/sections/BentoSection"
import { ComparisonSection } from "@/components/landing/sections/ComparisonSection"
import { CTAFinalSection } from "@/components/landing/sections/CTAFinalSection"
import { FAQSection } from "@/components/landing/sections/FAQSection"
import { FeaturesZigzag } from "@/components/landing/sections/FeaturesZigzag"
import { HeroSection } from "@/components/landing/sections/HeroSection"
import { HowItWorksSection } from "@/components/landing/sections/HowItWorksSection"
import { MatterStripSection } from "@/components/landing/sections/MatterStripSection"
import { PricingSection } from "@/components/landing/sections/PricingSection"
import { ProblemSection } from "@/components/landing/sections/ProblemSection"
import { SocialProofBar } from "@/components/landing/sections/SocialProofBar"
import { TestimonialsSection } from "@/components/landing/sections/TestimonialsSection"
import { fetchPlans } from "@/lib/api"
import { mapApiPlansToLandingPlans } from "@/lib/plan-display"
import {
  createPageMetadata,
  jsonLdGraph,
  organizationJsonLd,
  softwareApplicationJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "SIGAPP | Viabilidade imobiliária para incorporadoras",
  description:
    "Centralize terrenos, mapas, DRE, TIR, comitê e legalização em um único dossiê. Software de gestão territorial para incorporadoras brasileiras.",
  path: "/",
  absoluteTitle: true,
})

const homeJsonLd = jsonLdGraph([
  organizationJsonLd,
  websiteJsonLd,
  softwareApplicationJsonLd,
  webPageJsonLd({
    path: "/",
    name: "SIGAPP | Viabilidade imobiliária para incorporadoras",
    description:
      "Centralize terrenos, mapas, DRE, TIR, comitê e legalização em um único dossiê. Software de gestão territorial para incorporadoras brasileiras.",
  }),
])

export const revalidate = 300

export default async function Page() {
  const plans = await fetchPlans()
    .then(mapApiPlansToLandingPlans)
    .catch(() => [])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <LandingNav overlay />
      <StickyMobileCTA />
      <BezelSpotlight />
      <main id="conteudo-principal" tabIndex={-1}>
        {/* Map / Diagram landing sequence — spatial strata of the decision path */}
        <HeroSection />
        <SocialProofBar />
        <ProblemSection />
        <MatterStripSection />
        <HowItWorksSection />
        <FeaturesZigzag />
        <BentoSection />
        <ComparisonSection />
        <TestimonialsSection />
        <PricingSection plans={plans} />
        <FAQSection />
        <CTAFinalSection />
      </main>
      <LandingFooter />
    </>
  )
}
