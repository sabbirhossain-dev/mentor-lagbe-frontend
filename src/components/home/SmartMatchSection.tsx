"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calculator,
  CheckCircle2,
  Filter,
  GraduationCap,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SmartMatchSection() {
  const router = useRouter();

  const [classLevel, setClassLevel] = useState("Class 11-12");
  const [subject, setSubject] = useState("Higher Math");
  const [mode, setMode] = useState<"Online" | "Offline">("Online");

  // Dynamic estimate calculation based on selection
  const getEstimatedFee = () => {
    let base = 3000;
    if (classLevel === "Class 9-10") base = 2500;
    if (classLevel === "Class 11-12") base = 3500;
    if (classLevel === "University / Career") base = 5000;
    if (classLevel === "Higher Study / Adult") base = 4500;

    if (subject === "Programming") base += 1000;
    if (subject === "IELTS") base += 800;
    if (mode === "Offline") base += 700;

    return base;
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (subject) params.append("subject", subject);
    if (classLevel) params.append("classLevel", classLevel);
    if (mode) params.append("mode", mode);

    router.push(`/tuitions?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-slate-50/80 dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950 py-24 transition-colors">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 rounded-full bg-blue-100/50 dark:bg-blue-900/10 blur-3xl -z-10" />
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-indigo-100/40 dark:bg-indigo-900/10 blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Context & Guarantees */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 dark:border-blue-900/60 dark:bg-blue-950/60 px-3.5 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300">
              <Zap size={14} className="text-amber-500 fill-amber-500" />
              Smart Matching Engine
            </div>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight dark:text-white">
              Know Your Budget & Match With Verified Mentors.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
              No more guessing tuition fees. Use our interactive estimator to gauge expected monthly rates across subjects and modes, then jump straight into verified matching tutors.
            </p>

            {/* Feature Highlights */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">100% Verified Tutors</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Every tutor profile undergoes academic credential and phone verification.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Zero Commission for Students</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Free browsing, instant applications, and transparent direct communication.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Tailored 1-on-1 & Batch Modes</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Choose between flexible Online interactive classes or dedicated Home Tuitions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Estimator Card */}
          <div className="lg:col-span-6">
            <Card className="overflow-hidden border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-blue-500/10 rounded-3xl bg-white dark:bg-slate-900">
              <div className="bg-slate-900 dark:bg-slate-950 p-6 text-white sm:p-8 border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calculator className="text-blue-400" size={20} />
                    <span className="text-sm font-semibold tracking-wide uppercase text-blue-200">Instant Estimator</span>
                  </div>
                  <Badge variant="secondary" className="bg-blue-600/30 text-blue-300 border-0">Live Calculator</Badge>
                </div>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold sm:text-4xl text-white">
                    ৳{getEstimatedFee().toLocaleString()}
                  </span>
                  <span className="text-sm text-slate-300">/ estimated month</span>
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  Based on current tutor averages for {subject} ({classLevel}) in {mode} mode.
                </p>
              </div>

              <CardContent className="p-6 sm:p-8 space-y-6">
                {/* 1. Target Level */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    1. Select Class Level
                  </label>
                  <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {["Class 9-10", "Class 11-12", "University / Career", "Higher Study / Adult"].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setClassLevel(lvl)}
                        className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                          classLevel === lvl
                            ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-500"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:border-slate-700"
                        }`}
                      >
                        {lvl === "University / Career" ? "Uni / Career" : lvl === "Higher Study / Adult" ? "Higher Study" : lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Subject */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    2. Select Subject
                  </label>
                  <div className="mt-2.5 grid grid-cols-3 gap-2">
                    {["Higher Math", "Physics", "Chemistry", "Programming", "IELTS", "English"].map((sub) => (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => setSubject(sub)}
                        className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                          subject === sub
                            ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-500"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:border-slate-700"
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Mode */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    3. Learning Mode
                  </label>
                  <div className="mt-2.5 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setMode("Online")}
                      className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition-all ${
                        mode === "Online"
                          ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-500"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:border-slate-700"
                      }`}
                    >
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Online (Google Meet/Zoom)
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode("Offline")}
                      className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition-all ${
                        mode === "Offline"
                          ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-500"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:border-slate-700"
                      }`}
                    >
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                      Offline (Home Tuition)
                    </button>
                  </div>
                </div>

                {/* Search Button */}
                <Button
                  onClick={handleSearch}
                  className="w-full rounded-xl bg-blue-600 py-6 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-xl"
                >
                  <Search size={18} className="mr-2" />
                  Find Matching Tutors For This Spec
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
