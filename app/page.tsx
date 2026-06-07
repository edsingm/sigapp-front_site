import { LandingNav } from "@/components/landing/layout/LandingNav"
import { LandingFooter } from "@/components/landing/layout/LandingFooter"
import { HeroSection } from "@/components/landing/sections/HeroSection"
import { SocialProofBar } from "@/components/landing/sections/SocialProofBar"
import { ProblemSection } from "@/components/landing/sections/ProblemSection"
import { FeaturesZigzag } from "@/components/landing/sections/FeaturesZigzag"
import { BentoSection } from "@/components/landing/sections/BentoSection"
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
        <ProblemSection />
        <FeaturesZigzag />
        <BentoSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTAFinalSection />
      </main>
      <LandingFooter />
    </>
  )
}
