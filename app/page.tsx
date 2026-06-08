import { LandingNav } from "@/components/landing/layout/LandingNav"
import { LandingFooter } from "@/components/landing/layout/LandingFooter"
import { HeroSection } from "@/components/landing/sections/HeroSection"
import { SocialProofBar } from "@/components/landing/sections/SocialProofBar"
import { FeatureGridSection } from "@/components/landing/sections/FeatureGridSection"
import { ProblemSection } from "@/components/landing/sections/ProblemSection"
import { StatsSection } from "@/components/landing/sections/StatsSection"
import { FeaturesZigzag } from "@/components/landing/sections/FeaturesZigzag"
import { BentoSection } from "@/components/landing/sections/BentoSection"
import { LiveActivitySection } from "@/components/landing/sections/LiveActivitySection"
import { ComparisonSection } from "@/components/landing/sections/ComparisonSection"
import { PricingSection } from "@/components/landing/sections/PricingSection"
import { TestimonialsSection } from "@/components/landing/sections/TestimonialsSection"
import { FAQSection } from "@/components/landing/sections/FAQSection"
import { CTAFinalSection } from "@/components/landing/sections/CTAFinalSection"

export default function Page() {
  return (
    <>
      <LandingNav />
      <main id="funcionalidades">
        <HeroSection />
        <SocialProofBar />
        <FeatureGridSection />
        <ProblemSection />
        <StatsSection />
        <FeaturesZigzag />
        <BentoSection />
        <LiveActivitySection />
        <ComparisonSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTAFinalSection />
      </main>
      <LandingFooter />
    </>
  )
}
