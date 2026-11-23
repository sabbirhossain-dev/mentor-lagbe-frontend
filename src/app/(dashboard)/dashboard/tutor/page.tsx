"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { dashboardPathFor } from "@/lib/roles";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  GraduationCap,
  Plus,
  PlusCircle,
  Sparkles,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import type { Tuition, Application } from "@/types/tuition";

interface TutorStats {
  totalPosted: number;
  activeApproved: number;
  totalApplicants: number;
  plan: string;
}

export default function TutorOverviewPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [stats, setStats] = useState<TutorStats>({
    totalPosted: 0,
    activeApproved: 0,
    totalApplicants: 0,
    plan: "free",
  });
  const [myTuitions, setMyTuitions] = useState<Tuition[]>([]);
  const [recentApplicants, setRecentApplicants] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;
    if (!user) return;

    // Role guard: if not tutor, redirect to correct role dashboard
    if (user.role && user.role !== "tutor") {
      router.replace(dashboardPathFor(user.role));
      return;
    }

    const loadDashboard = async () => {
      try {
        const [statsRes, tuitionsRes, applicantsRes] = await Promise.all([
          apiFetch<{ success: boolean; stats: TutorStats }>("/stats/tutor"),
          apiFetch<{ success: boolean; tuitions: Tuition[] }>("/tutor/my-tuitions"),
          apiFetch<{ success: boolean; applications: Application[] }>("/tutor/applicants"),
        ]);

        if (statsRes.success) setStats(statsRes.stats);
        if (tuitionsRes.success) setMyTuitions(tuitionsRes.tuitions.slice(0, 4));
        if (applicantsRes.success) setRecentApplicants(applicantsRes.applications.slice(0, 4));
      } catch (err) {
        console.error("Failed to load tutor dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [user, isPending, router]);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-800 to-violet-900 p-6 sm:p-8 text-white shadow-xl shadow-indigo-500/10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            <GraduationCap size={14} />
            Tutor Workspace
          </div>
          <h1 className="mt-3 text-2xl sm:text-3xl font-black">
            Welcome, {user?.name || "Tutor"}!
          </h1>
          <p className="mt-1 text-sm text-indigo-100 max-w-lg">
            Manage your teaching batches, review incoming student enrollments, and launch new tuition sessions.
          </p>
        </div>

        <Link href="/dashboard/tutor/post-tuition">
          <Button className="rounded-xl bg-white text-indigo-800 font-bold hover:bg-indigo-50 shadow-md">
            <PlusCircle size={16} className="mr-2" />
            Post New Tuition
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* 1. Total Tuitions Posted */}
        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Posted
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
              <BookOpen size={20} />
            </div>
          </div>
          <div className="mt-4">
            {loading ? (
              <Skeleton className="h-9 w-16 rounded-lg bg-slate-100 dark:bg-slate-800" />
            ) : (
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{stats.totalPosted}</h3>
            )}
            <p className="text-xs text-slate-400 mt-1">
              {stats.plan === "pro" ? "Unlimited allowed (PRO)" : `${stats.totalPosted}/2 free posts used`}
            </p>
          </div>
        </Card>

        {/* 2. Active & Approved */}
        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Live & Active
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div className="mt-4">
            {loading ? (
              <Skeleton className="h-9 w-16 rounded-lg bg-slate-100 dark:bg-slate-800" />
            ) : (
              <h3 className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{stats.activeApproved}</h3>
            )}
            <p className="text-xs text-slate-400 mt-1">Visible on catalog</p>
          </div>
        </Card>

        {/* 3. Total Applicants */}
        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Applicants Received
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400">
              <Users size={20} />
            </div>
          </div>
          <div className="mt-4">
            {loading ? (
              <Skeleton className="h-9 w-16 rounded-lg bg-slate-100 dark:bg-slate-800" />
            ) : (
              <h3 className="text-3xl font-black text-violet-600 dark:text-violet-400">{stats.totalApplicants}</h3>
            )}
            <p className="text-xs text-slate-400 mt-1">Student applications</p>
          </div>
        </Card>

        {/* 4. Current Plan */}
        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Current Plan
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400">
              <Sparkles size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div>
              {loading ? (
                <Skeleton className="h-9 w-20 rounded-lg bg-slate-100 dark:bg-slate-800" />
              ) : (
                <h3 className="text-3xl font-black capitalize text-slate-900 dark:text-white">
                  {stats.plan}
                </h3>
              )}
              <p className="text-xs text-slate-400 mt-1">
                {stats.plan === "pro" ? "Verified badge + unlimited" : "Max 2 tuition posts"}
              </p>
            </div>
            {stats.plan !== "pro" && !loading && (
              <Link href="/pricing">
                <Button size="sm" variant="outline" className="rounded-lg text-xs font-bold text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900 hover:bg-indigo-50 dark:hover:bg-indigo-950">
                  Upgrade
                </Button>
              </Link>
            )}
          </div>
        </Card>
      </div>

      {/* Grid: My Created Tuitions + Recent Applicants */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: My Created Tuitions */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">My Tuitions</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Overview of your posted batches</p>
            </div>
            <Link href="/dashboard/tutor/my-tuitions">
              <Button variant="ghost" size="sm" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950">
                Manage All
                <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-16 w-full rounded-2xl bg-slate-100 dark:bg-slate-800" />
              <Skeleton className="h-16 w-full rounded-2xl bg-slate-100 dark:bg-slate-800" />
            </div>
          ) : myTuitions.length > 0 ? (
            <div className="space-y-3">
              {myTuitions.map((t) => (
                <div
                  key={t._id}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/60 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="min-w-0 pr-4">
                    <p className="truncate text-sm font-bold text-slate-900 dark:text-white">{t.title}</p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span>{t.subject}</span>
                      <span>•</span>
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">৳{t.monthlyFee?.toLocaleString()}/mo</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Badge
                      className={`capitalize text-[11px] font-bold ${
                        t.approvalStatus === "approved"
                          ? "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                          : t.approvalStatus === "rejected"
                          ? "bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
                          : "bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                      }`}
                    >
                      {t.approvalStatus}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400">You haven't posted any tuitions yet.</p>
              <Link href="/dashboard/tutor/post-tuition" className="mt-3 inline-block">
                <Button size="sm" className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold">Post First Tuition</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Right: Recent Applicants */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Applicants</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Students awaiting your review</p>
            </div>
            <Link href="/dashboard/tutor/applicants">
              <Button variant="ghost" size="sm" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950">
                View All
                <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-16 w-full rounded-2xl bg-slate-100 dark:bg-slate-800" />
              <Skeleton className="h-16 w-full rounded-2xl bg-slate-100 dark:bg-slate-800" />
            </div>
          ) : recentApplicants.length > 0 ? (
            <div className="space-y-3">
              {recentApplicants.map((app) => (
                <div
                  key={app._id}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/60 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="min-w-0 pr-4">
                    <p className="truncate text-sm font-bold text-slate-900 dark:text-white">{app.studentName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{app.tuitionTitle}</p>
                  </div>

                  <Badge
                    className={`capitalize text-[11px] font-bold ${
                      app.status === "accepted"
                        ? "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                        : app.status === "rejected"
                        ? "bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
                        : "bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                    }`}
                  >
                    {app.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400">No student applicants yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
