import FeaturedTuitions from "@/components/home/FeaturedTuitions";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import PricingSection from "@/components/home/PricingSection";
import SmartMatchSection from "@/components/home/SmartMatchSection";
import SubjectsTestimonials from "@/components/home/SubjectsTestimonials";

export default function Home() {
  return (
    <div>
      {/* ================= HERO SECTION ================= */}
      <HeroSection />

      {/* ================= SMART MATCH ESTIMATOR (UNIQUE SECTION) ================= */}
      <SmartMatchSection />

      {/* ================= FEATURED TUITIONS ================= */}
      <FeaturedTuitions />

      {/* ================= PRICING SECTION ================= */}
      <PricingSection />

      {/* ================= HOW IT WORKS ================= */}
      <HowItWorks />

      {/* ================= SUBJECTS, STATS & TESTIMONIALS ================= */}
      <SubjectsTestimonials />
    </div>
  );
}
