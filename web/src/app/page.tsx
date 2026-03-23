import { HeroBanner } from "@/components/sections/HeroBanner";
import { FeatureBadges } from "@/components/sections/FeatureBadges";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { TrendingProducts } from "@/components/sections/TrendingProducts";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { PromoBanner } from "@/components/sections/PromoBanner";
import { TrustBanner } from "@/components/sections/TrustBanner";
import { Testimonials } from "@/components/sections/Testimonials";
import { NewsletterSignup } from "@/components/sections/NewsletterSignup";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <FeatureBadges />
      <CategoryGrid />
      <TrendingProducts />
      <ServiceCards />
      <PromoBanner />
      <TrustBanner />
      <Testimonials />
      <NewsletterSignup />
      <CTASection />
    </>
  );
}
