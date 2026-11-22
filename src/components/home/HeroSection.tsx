"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Compass,
  GraduationCap,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogoIcon } from "@/components/shared/BrandLogo";

const quickBadges = [
  { label: "HSC 2026", subject: "Higher Math" },
  { label: "SSC Science", subject: "Physics" },
  { label: "BUET & Engg Prep", subject: "Higher Math" },
  { label: "Medical Admission", subject: "Chemistry" },
  { label: "IELTS & Spoken", subject: "IELTS" },
  { label: "Programming & Code", subject: "Programming" },
];

export default function HeroSection() {
  const router = useRouter();

  // Multi-segment search states
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedMode, setSelectedMode] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedSubject) params.append("search", selectedSubject);
    if (selectedClass) params.append("classLevel", selectedClass);
    if (selectedMode) params.append("mode", selectedMode);

    router.push(`/tuitions?${params.toString()}`);
  };

  const handleQuickTagClick = (subject: string) => {
    router.push(`/tuitions?search=${encodeURIComponent(subject)}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950 pt-16 pb-10 lg:pt-16 lg:pb-12 transition-colors">
      {/* Background Radial Glow & Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.04] dark:opacity-[0.07] pointer-events-none" />
      <div className="absolute top-12 left-1/2 -translate-x-1/2 h-96 w-96 sm:w-[680px] rounded-full bg-gradient-to-tr from-indigo-500/15 via-violet-500/15 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Centered Header Content */}
        <div className="mx-auto max-w-4xl text-center space-y-6">
          {/* Top Live Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-indigo-200/80 bg-white/90 dark:border-indigo-900/60 dark:bg-indigo-950/70 px-4 py-1.5 shadow-sm backdrop-blur">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Verified Mentorship Platform
            </span>
            <span className="rounded-full bg-indigo-100 dark:bg-indigo-900/80 px-2 py-0.5 text-[10px] font-extrabold text-indigo-700 dark:text-indigo-300">
              0% Commission
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08]">
            Master Any Subject With{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 dark:from-indigo-400 dark:via-violet-400 dark:to-indigo-300 bg-clip-text text-transparent">
              Top Mentors.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Directly connect with 100% verified educators from BUET, Dhaka
            University, Medical & top institutions. Small batches, personalized
            1-on-1 learning, and zero middleman fees.
          </p>

          {/* Multi-Segment Command Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="mx-auto mt-8 max-w-4xl rounded-3xl border-2 border-indigo-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 sm:p-4 shadow-2xl shadow-indigo-950/10 backdrop-blur-xl"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-12 items-center">
              {/* Segment 1: Subject / Topic */}
              <div className="sm:col-span-4 flex items-center gap-3 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-100 dark:border-slate-800">
                <Search
                  size={18}
                  className="text-indigo-600 dark:text-indigo-400 shrink-0"
                />
                <div className="w-full text-left">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    Subject or Goal
                  </label>
                  <input
                    type="text"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    placeholder="e.g. Higher Math, Physics, IELTS"
                    className="w-full bg-transparent text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
                  />
                </div>
              </div>

              {/* Segment 2: Class Level */}
              <div className="sm:col-span-3 flex items-center gap-3 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-100 dark:border-slate-800">
                <GraduationCap
                  size={18}
                  className="text-indigo-600 dark:text-indigo-400 shrink-0"
                />
                <div className="w-full text-left">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    Academic Level
                  </label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-900 dark:text-white outline-none cursor-pointer"
                  >
                    <option value="" className="dark:bg-slate-900">
                      Any Level
                    </option>
                    <option value="Class 9-10" className="dark:bg-slate-900">
                      Class 9-10 (SSC)
                    </option>
                    <option value="Class 11-12" className="dark:bg-slate-900">
                      Class 11-12 (HSC)
                    </option>
                    <option
                      value="University / Career"
                      className="dark:bg-slate-900"
                    >
                      University / Admission
                    </option>
                    <option
                      value="Higher Study / Adult"
                      className="dark:bg-slate-900"
                    >
                      English Medium / IELTS
                    </option>
                  </select>
                </div>
              </div>

              {/* Segment 3: Session Mode */}
              <div className="sm:col-span-3 flex items-center gap-3 px-3 py-2">
                <Compass
                  size={18}
                  className="text-indigo-600 dark:text-indigo-400 shrink-0"
                />
                <div className="w-full text-left">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    Session Mode
                  </label>
                  <select
                    value={selectedMode}
                    onChange={(e) => setSelectedMode(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-900 dark:text-white outline-none cursor-pointer"
                  >
                    <option value="" className="dark:bg-slate-900">
                      All Modes
                    </option>
                    <option value="Online" className="dark:bg-slate-900">
                      Online Live Session
                    </option>
                    <option value="Offline" className="dark:bg-slate-900">
                      Offline / In-Person
                    </option>
                  </select>
                </div>
              </div>

              {/* Segment 4: Search Action Button */}
              <div className="sm:col-span-2">
                <Button
                  type="submit"
                  className="w-full h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 transition-transform hover:scale-[1.02]"
                >
                  Search
                  <ArrowRight size={16} className="ml-1.5" />
                </Button>
              </div>
            </div>
          </form>

          {/* Quick Badges Filter Row */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
            <span className="font-bold text-slate-400">Popular Focus:</span>
            {quickBadges.map((badge) => (
              <button
                key={badge.label}
                type="button"
                onClick={() => handleQuickTagClick(badge.subject)}
                className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-3 py-1.5 font-semibold text-slate-600 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-xs transition-all"
              >
                {badge.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 High-Impact Proof & Feature Bento Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Proof 1: Verification */}
          <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 mb-4">
              <ShieldCheck size={26} />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              100% Verified Educators
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every mentor undergoes credential review with university identity
              and transcript validation.
            </p>
          </div>

          {/* Proof 2: Direct 0% Commission */}
          <div className="rounded-3xl border border-indigo-200/90 dark:border-indigo-900/60 bg-gradient-to-br from-indigo-50/70 to-white dark:from-indigo-950/40 dark:to-slate-900 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30 mb-4">
              <Sparkles size={24} />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Zero Middleman Commission
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Students apply for free. No 50%-100% agency salary cuts or hidden
              brokerage fees.
            </p>
          </div>

          {/* Proof 3: Fast Matching */}
          <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mb-4">
              <Zap size={26} />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Instant Application & Tracking
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Apply in one click, align timing preferences, and track tutor
              approval directly on your dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
