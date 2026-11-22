import PricingSection from "@/components/home/PricingSection";
import { HelpCircle } from "lucide-react";

export default function PricingPage() {
  const faqs = [
    {
      q: "Can I use MentorLagbe for free?",
      a: "Yes! Students can freely browse all approved tuitions and apply. Tutors can post up to 2 active tuition batches completely free.",
    },
    {
      q: "What benefits do I get with Tutor Pro Plan ($15)?",
      a: "Tutor Pro unlocks unlimited tuition postings, priority featured placement in the catalog, and a verified mentor badge on all your listings.",
    },
    {
      q: "What does the Student Pro Plan ($10) include?",
      a: "Student Pro members enjoy priority booking status when applying to competitive batches and unlimited saved tuitions.",
    },
    {
      q: "How does payment work for tuition sessions?",
      a: "Monthly tuition fees are paid directly between tutors and students according to their mutual schedule. MentorLagbe charges 0% commission on your session fees.",
    },
  ];

  return (
    <div className="bg-slate-50/50 dark:bg-slate-950 pb-24 pt-6 transition-colors">
      <PricingSection />

      {/* Pricing FAQs */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Everything you need to know about our plans.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
              <h5 className="font-bold text-slate-900 dark:text-white text-sm flex items-start gap-2">
                <HelpCircle size={16} className="text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                {faq.q}
              </h5>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 mt-2 pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
