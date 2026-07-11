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

export const metadata: Metadata = {
  title: "SIGAPP — Decisões que ganham território",
  description:
    "Plataforma de gestão territorial inteligente para conectar mapas, dados, viabilidade e processo em uma única fonte de decisão.",
}

export const revalidate = 300

export default async function Page() {
  const plans = await fetchPlans()
    .then(mapApiPlansToLandingPlans)
    .catch(() => [])

  return (
    <>
      <LandingNav overlay />
      <StickyMobileCTA />
      <BezelSpotlight />
      <main>
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
