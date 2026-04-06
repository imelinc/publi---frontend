import { CTASection } from "@/components/publi/CTASection";
import { FeatureTabs } from "@/components/publi/FeatureTabs";
import { FeaturesGrid } from "@/components/publi/FeaturesGrid";
import { Footer } from "@/components/publi/Footer";
import { Hero } from "@/components/publi/Hero";
import { MultiPlatform } from "@/components/publi/MultiPlatform";
import { Navbar } from "@/components/publi/Navbar";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeatureTabs />
      <MultiPlatform />
      <FeaturesGrid />
      <CTASection />
      <Footer />
    </main>
  );
}
