import FeaturedTuitions from "@/components/home/FeaturedTuitions";
import HeroSection from "@/components/home/HeroSection";
import ComparisonSection from "@/components/home/ComparisonSection";
import HowItWorks from "@/components/home/HowItWorks";
import PricingSection from "@/components/home/PricingSection";
import SmartMatchSection from "@/components/home/SmartMatchSection";
import SubjectsTestimonials from "@/components/home/SubjectsTestimonials";
import FaqSection from "@/components/home/FaqSection";

export default function Home() {
  return (
    <div>
      {/* ================= HERO SECTION (NEW COMMAND CENTER UI) ================= */}
      <HeroSection />

      {/* ================= SMART MATCH ESTIMATOR ================= */}
      <SmartMatchSection />

      {/* ================= FEATURED TUITIONS ================= */}
      <FeaturedTuitions />

      {/* ================= PRICING SECTION ================= */}
      <PricingSection />

      {/* ================= HOW IT WORKS ================= */}
      <HowItWorks />

      {/* ================= SUBJECTS, STATS & TESTIMONIALS ================= */}
      {/* <SubjectsTestimonials /> */}

      {/* ================= COMPARISON MATRIX: MENTORLAGBE VS TRADITIONAL MEDIA ================= */}
      <ComparisonSection />
      {/* ================= FAQ & CTA SECTION ================= */}
      <FaqSection />
    </div>
  );
}
