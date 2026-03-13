import Navbar from "@/components/Navbar";
import ScrollSequence from "@/components/ScrollSequence";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import SecuritySection from "@/components/SecuritySection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: "#050505", minHeight: "100vh" }}>
      <Navbar />
      <ScrollSequence />
      <StatsSection />
      <FeaturesSection />
      <SecuritySection />
      <PricingSection />
      <Footer />
    </main>
  );
}
