"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-[#F0F7FF] dark:bg-slate-950">
      {/* Decorative Background */}
      <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-900/20" />
      <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-sky-200/50 blur-3xl dark:bg-sky-900/20" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 md:py-28 lg:grid-cols-2 lg:px-8">
        {/* Hero Content */}
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-700 dark:border-blue-900 dark:bg-slate-900 dark:text-blue-300">
            <Sparkles size={16} />
            Your Learning Journey Starts Here
          </div>

          <h1 className="max-w-2xl text-4xl leading-[1.15] font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            Find Your Ideal Tutor &{" "}
            <span className="text-blue-600">Learn Without Limits.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
            Connect with experienced tutors, discover quality tuition
            opportunities, and take the next step toward your learning goals.
          </p>

          {/* Hero CTA */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button
              onClick={() => router.push("/tuitions")}
              className="inline-flex h-auto items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-1 hover:bg-blue-700"
            >
              Browse Tuitions
              <ArrowRight size={19} />
            </Button>

            <Button
              variant="outline"
              onClick={() => router.push("/sign-up")}
              className="inline-flex h-auto items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-4 font-semibold text-slate-800 transition hover:border-blue-500 hover:bg-white hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-900"
            >
              Become a Tutor
            </Button>
          </div>

          {/* Hero Benefits */}
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
            {["Verified Tutors", "Flexible Learning", "Easy Application"].map(
              (item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300"
                >
                  <CheckCircle2 size={17} className="text-blue-600" />
                  {item}
                </div>
              ),
            )}
          </div>
        </div>

        {/* Hero Illustration - Static visual, no API data */}
        <div className="relative mx-auto w-full max-w-lg">
          <div className="relative flex aspect-square items-center justify-center rounded-[3rem] bg-gradient-to-br from-blue-200 via-sky-100 to-white p-8 dark:from-blue-950 dark:via-slate-900 dark:to-slate-800">
            <div className="absolute inset-5 rounded-[2.5rem] border border-white/70 dark:border-white/10" />

            <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-blue-600 shadow-2xl shadow-blue-600/30 sm:h-80 sm:w-80">
              <GraduationCap
                size={150}
                strokeWidth={1.2}
                className="text-white sm:h-48 sm:w-48"
              />

              <div className="absolute -right-5 top-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-xl dark:bg-slate-800">
                <BookOpen size={30} />
              </div>

              <div className="absolute -bottom-4 -left-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-xl dark:bg-slate-800">
                <Users size={30} />
              </div>
            </div>

            {/* Floating decorative cards */}
            <div className="absolute left-0 top-12 rounded-2xl bg-white p-4 shadow-xl dark:bg-slate-800">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-100 p-2 text-blue-600 dark:bg-blue-900">
                  <BookOpen size={22} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">
                    Quality Learning
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Learn from experts
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-12 right-0 rounded-2xl bg-white p-4 shadow-xl dark:bg-slate-800">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-green-100 p-2 text-green-600 dark:bg-green-900">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">
                    Your Next Step
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Starts right here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
