"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BadgeAlert,
  BadgeCheck,
  Check,
  CheckCircle2,
  Clock,
  Coins,
  FileCheck2,
  Lock,
  MessageSquare,
  Shield,
  ShieldAlert,
  Sparkles,
  UserCheck,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComparisonRow {
  feature: string;
  category: string;
  traditional: {
    title: string;
    description: string;
  };
  mentorlagbe: {
    title: string;
    description: string;
  };
}

const comparisonData: ComparisonRow[] = [
  {
    feature: "Commission & Middleman Fees",
    category: "Cost & Transparency",
    traditional: {
      title: "50% - 100% 1st Month Surcharge",
      description:
        "Brokers and media agencies deduct 50-100% of the tutor's first-month salary and charge extra registration fees from guardians.",
    },
    mentorlagbe: {
      title: "0% Middleman Commission",
      description:
        "100% free enrollment for students. Direct fee negotiations with zero hidden deductions or broker percentages.",
    },
  },
  {
    feature: "Tutor Authentication",
    category: "Security & Credibility",
    traditional: {
      title: "Unverified / Anonymous Profiles",
      description:
        "Anybody can post in Facebook groups. No NID checks, unverified graduation claims, and zero background screening.",
    },
    mentorlagbe: {
      title: "100% Admin-Verified Credentials",
      description:
        "University student IDs, official graduation certificates, and contact info are manually reviewed by admins.",
    },
  },
  {
    feature: "Matching & Scheduling Speed",
    category: "Efficiency",
    traditional: {
      title: "2 to 3 Weeks Slow Coordination",
      description:
        "Endless delays waiting for agency middlemen to answer phone calls and share numbers manually.",
    },
    mentorlagbe: {
      title: "Instant One-Click Application",
      description:
        "Select preferred days, specify curriculum requirements, and submit applications directly in under 60 seconds.",
    },
  },
  {
    feature: "Progress & Status Tracking",
    category: "Technology",
    traditional: {
      title: "Zero Tracking / Lost in WhatsApp",
      description:
        "Applications disappear into unorganized inbox messages with no confirmation, receipt, or status updates.",
    },
    mentorlagbe: {
      title: "Live Real-Time Dashboard",
      description:
        "Dedicated portal displaying pending, accepted, or scheduled sessions with live status badges.",
    },
  },
  {
    feature: "Safety & Student Protection",
    category: "Accountability",
    traditional: {
      title: "Zero Accountability if Tutor Leaves",
      description:
        "No refunds or replacement assistance if an unauthorized tutor suddenly discontinues classes after taking payment.",
    },
    mentorlagbe: {
      title: "Moderated & Protected Ecosystem",
      description:
        "Platform moderation, community feedback reviews, and direct reporting keep students and tutors secure.",
    },
  },
];

export default function ComparisonSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50/70 dark:bg-slate-950/80 py-10 sm:py-16 transition-colors">
      {/* Background Auras */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50 dark:border-indigo-900/60 dark:bg-indigo-950/60 px-4 py-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 shadow-xs mb-4">
            <Sparkles size={14} className="text-amber-500" />
            <span>THE MENTORLAGBE ADVANTAGE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Why Choose MentorLagbe Over{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 dark:from-indigo-400 dark:via-violet-400 dark:to-indigo-300 bg-clip-text text-transparent">
              Traditional Media?
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Compare our modern, transparent, and concept-driven platform against
            legacy tuition agencies and unverified Facebook groups.
          </p>
        </div>

        {/* Desktop Comparison Table View */}
        <div className="mt-14 hidden md:block overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-900/5">
          {/* Header Row */}
          <div className="grid grid-cols-12 border-b border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 p-6 text-sm font-bold">
            <div className="col-span-4 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs">
              Feature & Standard
            </div>
            <div className="col-span-4 text-slate-700 dark:text-slate-300 flex items-center gap-2 text-sm font-bold">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/70 text-red-600 dark:text-red-400 text-xs">
                ✕
              </span>
              Traditional Media / FB Groups
            </div>
            <div className="col-span-4 text-indigo-600 dark:text-indigo-400 flex items-center gap-2 text-sm font-extrabold">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white text-xs">
                ✓
              </span>
              MentorLagbe Platform
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {comparisonData.map((row, idx) => (
              <div
                key={row.feature}
                className={`grid grid-cols-12 p-6 transition-colors ${
                  idx % 2 === 1
                    ? "bg-slate-50/40 dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    : "bg-white dark:bg-slate-900 hover:bg-slate-50/70 dark:hover:bg-slate-800/40"
                }`}
              >
                {/* Feature Name */}
                <div className="col-span-4 pr-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                    {row.category}
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {row.feature}
                  </h4>
                </div>

                {/* Traditional Side */}
                <div className="col-span-4 pr-6">
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-sm">
                    <XCircle size={17} className="shrink-0" />
                    <span>{row.traditional.title}</span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {row.traditional.description}
                  </p>
                </div>

                {/* MentorLagbe Side (Highlighted) */}
                <div className="col-span-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 p-3.5 border border-indigo-100/80 dark:border-indigo-900/40">
                  <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-extrabold text-sm">
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-emerald-500"
                    />
                    <span>{row.mentorlagbe.title}</span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {row.mentorlagbe.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / Tablet Responsive Stack Cards */}
        <div className="mt-8 md:hidden space-y-5">
          {comparisonData.map((row) => (
            <div
              key={row.feature}
              className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-md overflow-hidden"
            >
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {row.category}
                </span>
                <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {row.feature}
                </h4>
              </div>

              {/* Stacked comparison */}
              <div className="mt-4 space-y-3">
                {/* Traditional */}
                <div className="rounded-2xl border border-red-100 dark:border-red-950/50 bg-red-50/50 dark:bg-red-950/20 p-3.5">
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-xs font-bold">
                    <XCircle size={15} />
                    <span>Legacy Media: {row.traditional.title}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {row.traditional.description}
                  </p>
                </div>

                {/* MentorLagbe */}
                <div className="rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/60 dark:bg-indigo-950/40 p-3.5">
                  <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span>MentorLagbe: {row.mentorlagbe.title}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {row.mentorlagbe.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-blue-950 via-indigo-950 to-violet-950 p-8 sm:p-10 text-white shadow-xl shadow-indigo-950/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold backdrop-blur">
              <BadgeCheck size={14} className="text-emerald-400" />
              <span>Free for Students & Guardians</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              Ready to find a verified mentor without the middleman fee?
            </h3>
            <p className="text-xs sm:text-sm text-indigo-200 max-w-xl">
              Browse available tuition batches, check tutor qualifications, and
              apply directly. No commission, ever.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/tuitions">
              <Button className="rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 font-bold px-6 py-5 shadow-lg">
                Browse Tuitions Now
                <ArrowRight size={15} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
