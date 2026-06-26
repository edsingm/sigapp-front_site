import type { Metadata } from "next"
import { LandingNav } from "@/components/landing/layout/LandingNav"

export const metadata: Metadata = {
  title: "SIGAPP — Decisões que ganham território",
  description:
    "Plataforma de gestão territorial inteligente para conectar mapas, dados, viabilidade e processo em uma única fonte de decisão.",
}
import { LandingFooter } from "@/components/landing/layout/LandingFooter"
import { StickyMobileCTA } from "@/components/landing/client/StickyMobileCTA"
import { HeroSection } from "@/components/landing/sections/HeroSection"
import { SocialProofBar } from "@/components/landing/sections/SocialProofBar"
import { ProblemSection } from "@/components/landing/sections/ProblemSection"
import { HowItWorksSection } from "@/components/landing/sections/HowItWorksSection"
import { FeaturesZigzag } from "@/components/landing/sections/FeaturesZigzag"
import { BentoSection } from "@/components/landing/sections/BentoSection"
import { ComparisonSection } from "@/components/landing/sections/ComparisonSection"
import { PricingSection } from "@/components/landing/sections/PricingSection"
import { TestimonialsSection } from "@/components/landing/sections/TestimonialsSection"
import { FAQSection } from "@/components/landing/sections/FAQSection"
import { CTAFinalSection } from "@/components/landing/sections/CTAFinalSection"

export default function Page() {
  return (
    <>
      <LandingNav />
      <StickyMobileCTA />
      <main>
        <HeroSection />
        <SocialProofBar />
        <ProblemSection />
        <HowItWorksSection />
        <FeaturesZigzag />
        <BentoSection />
        <ComparisonSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTAFinalSection />
      </main>
      <LandingFooter />
    </>
  )
}
