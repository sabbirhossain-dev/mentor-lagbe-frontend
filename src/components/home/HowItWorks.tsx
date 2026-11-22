"use client";

import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  Search,
  Sparkles,
  UserCheck,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Account",
      subtitle: "For Students & Tutors",
      description:
        "Quickly sign up or continue with Google as a Student or verified Tutor with custom academic profile credentials.",
      icon: UserCheck,
      badge: "Step 1",
    },
    {
      number: "02",
      title: "Discover or Post",
      subtitle: "Interactive Search",
      description:
        "Students filter batches by subject and budget; tutors post verified tuition listings with instant ImgBB banner upload.",
      icon: Search,
      badge: "Step 2",
    },
    {
      number: "03",
      title: "Direct Application",
      subtitle: "Schedule Alignment",
      description:
        "Students apply with preferred time slots and learning goals; tutors review contact info and accept or decline.",
      icon: FileCheck2,
      badge: "Step 3",
    },
    {
      number: "04",
      title: "Start Mentorship",
      subtitle: "Academic Excellence",
      description:
        "Begin structured 1-on-1 tutoring or online/offline batches with zero middleman commissions on student tuitions.",
      icon: CheckCircle2,
      badge: "Step 4",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-16 dark:bg-slate-950 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-3.5 py-1 text-xs font-bold text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/60 dark:text-indigo-300">
            <Sparkles size={14} className="text-amber-500 fill-amber-500" />
            CLEAR & TRANSPARENT ROADMAP
          </div>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            How MentorLagbe Works
          </h2>

          <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
            Our streamlined process bridges the gap between ambitious students
            and verified mentors in 4 simple steps.
          </p>
        </div>

        {/* Workflow Cards */}
        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative group">
                <div className="relative h-full rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-300 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:shadow-indigo-500/10">
                  {/* Step pill & icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="rounded-xl bg-indigo-100 dark:bg-indigo-950/80 px-3 py-1 text-xs font-black text-indigo-700 dark:text-indigo-300">
                      {step.number}
                    </span>

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm transition-transform group-hover:scale-110">
                      <Icon size={22} />
                    </div>
                  </div>

                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {step.subtitle}
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {step.description}
                  </p>
                </div>

                {/* Connecting arrow - Desktop only */}
                {index !== steps.length - 1 && (
                  <div className="absolute -right-3.5 top-1/2 z-10 hidden -translate-y-1/2 lg:flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-indigo-500 shadow-xs">
                    <ArrowRight size={14} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
