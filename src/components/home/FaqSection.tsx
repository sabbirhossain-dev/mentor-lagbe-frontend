"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    q: "How does MentorLagbe connect students and tutors?",
    a: "Verified tutors post their tuition batches and 1-on-1 mentorship programs detailing subject, class level, monthly fee, schedule, and mode (Online or Offline). Students can filter, inspect tutor credentials, and apply directly. Tutors review student applications on their dashboard and accept or reject with full transparency.",
  },
  {
    q: "How are tutors verified on the platform?",
    a: "Our administrative team reviews each tutor's academic institution credentials, contact verification, and tuition post quality before approving it to the public catalog. Verified mentors carry a verified badge on their tuition cards.",
  },
  {
    q: "Is there any commission taken from student fees?",
    a: "No! MentorLagbe charges zero commission from students. Browsing tuition listings, applying, and contacting matched tutors is 100% free.",
  },
  {
    q: "What benefits come with the Pro subscription?",
    a: "For students, Pro provides unlimited tuition bookmarks, priority application consideration, and direct mentor contact access. For tutors, Pro unlocks unlimited tuition listings, top catalog placement, and an exclusive Pro Mentor badge.",
  },
  {
    q: "Are Stripe subscription payments secure?",
    a: "Yes, all transactions are handled securely via Stripe's encrypted payment checkout. We never store credit card or payment credentials on our servers.",
  },
  {
    q: "Can I choose between Online and In-Person Home Tuition?",
    a: "Yes! Every tuition batch specifies its learning mode—either Online via interactive Google Meet/Zoom sessions, or Offline In-Person home tuition in specified locations.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-white py-24 dark:bg-slate-950 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/60 dark:text-blue-300">
            <HelpCircle size={14} />
            GOT QUESTIONS?
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Everything you need to know about finding tutors, applying for tuitions, and upgrading your plan.
          </p>
        </div>

        {/* FAQ Accordion Grid */}
        <div className="mx-auto mt-14 max-w-3xl space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/50 transition-all dark:border-slate-800 dark:bg-slate-900/50"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-slate-900 dark:text-white transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <span className="pr-4">{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300 border-t border-slate-200/40 dark:border-slate-800/60">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-20 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 sm:p-12 shadow-2xl shadow-blue-500/20 text-center relative">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-blue-400/20 blur-2xl" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              <Sparkles size={13} />
              Start Your Journey Today
            </span>

            <h3 className="mt-4 text-3xl font-black text-white sm:text-4xl tracking-tight">
              Ready to Accelerate Your Academic Growth?
            </h3>

            <p className="mt-3 text-sm sm:text-base text-blue-100 leading-relaxed">
              Find verified tutors in your area or start teaching and sharing knowledge with motivated students.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/tuitions" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto rounded-xl bg-white px-7 py-3 text-sm font-bold text-blue-700 shadow-lg hover:bg-blue-50 transition-all">
                  Browse Tuitions Now
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>

              <Link href="/sign-up" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto rounded-xl border border-white/40 bg-white/10 px-7 py-3 text-sm font-bold text-white hover:bg-white/20 transition-all"
                >
                  Join as a Tutor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
