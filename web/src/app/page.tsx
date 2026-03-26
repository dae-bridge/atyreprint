import { HeroBanner } from "@/components/sections/HeroBanner";
import { FeatureBadges } from "@/components/sections/FeatureBadges";
import { TriplePromoBanners } from "@/components/sections/TriplePromoBanners";
import { TwinPromoBanners } from "@/components/sections/TwinPromoBanners";
import { TopCategories } from "@/components/sections/TopCategories";
import { Activities } from "@/components/sections/Activities";
import { TrendingProducts } from "@/components/sections/TrendingProducts";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { Testimonials } from "@/components/sections/Testimonials";
import { BrandLogos } from "@/components/sections/BrandLogos";
import { NewsletterSignup } from "@/components/sections/NewsletterSignup";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <TwinPromoBanners />
      <TopCategories />
      <Activities />
      <TrendingProducts />
      <FeatureBadges />
      <TriplePromoBanners />
      <Testimonials />
      <BrandLogos />
      <NewsletterSignup />
    </>
  );
}
