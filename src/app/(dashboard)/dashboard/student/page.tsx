"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { dashboardPathFor } from "@/lib/roles";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  GraduationCap,
  Plus,
  Search,
  Sparkles,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import type { Application } from "@/types/tuition";

interface StudentStats {
  totalApplied: number;
  accepted: number;
  pending: number;
  rejected: number;
  plan: string;
}

export default function StudentOverviewPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [stats, setStats] = useState<StudentStats>({
    totalApplied: 0,
    accepted: 0,
    pending: 0,
    rejected: 0,
    plan: "free",
  });
  const [recentApplications, setRecentApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;
    if (!user) return;

    // Role guard: if user is not student, redirect to their role dashboard
    if (user.role && user.role !== "student") {
      router.replace(dashboardPathFor(user.role));
      return;
    }

    const loadDashboard = async () => {
      try {
        const [statsRes, appsRes] = await Promise.all([
          apiFetch<{ success: boolean; stats: StudentStats }>("/stats/student"),
          apiFetch<{ success: boolean; applications: Application[] }>("/student/my-applications"),
        ]);

        if (statsRes.success) setStats(statsRes.stats);
        if (appsRes.success) setRecentApplications(appsRes.applications.slice(0, 5));
      } catch (err) {
        console.error("Failed to load student dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [user, isPending, router]);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-800 p-6 sm:p-8 text-white shadow-xl shadow-indigo-500/10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            <GraduationCap size={14} />
            Student Workspace
          </div>
          <h1 className="mt-3 text-2xl sm:text-3xl font-black">
            Welcome back, {user?.name || "Student"}!
          </h1>
          <p className="mt-1 text-sm text-indigo-100 max-w-lg">
            Track your applied mentorship batches, monitor tutor approvals, and explore new learning opportunities.
          </p>
        </div>

        <Link href="/tuitions">
          <Button className="rounded-xl bg-white text-indigo-700 font-bold hover:bg-indigo-50 shadow-md">
            <Search size={16} className="mr-2" />
            Find New Tuitions
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* 1. Total Applied */}
        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Applied
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
              <FileText size={20} />
            </div>
          </div>
          <div className="mt-4">
            {loading ? (
              <Skeleton className="h-9 w-16 rounded-lg bg-slate-100 dark:bg-slate-800" />
            ) : (
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{stats.totalApplied}</h3>
            )}
            <p className="text-xs text-slate-400 mt-1">Submitted applications</p>
          </div>
        </Card>

        {/* 2. Accepted */}
        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Accepted
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div className="mt-4">
            {loading ? (
              <Skeleton className="h-9 w-16 rounded-lg bg-slate-100 dark:bg-slate-800" />
            ) : (
              <h3 className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{stats.accepted}</h3>
            )}
            <p className="text-xs text-slate-400 mt-1">Confirmed by tutors</p>
          </div>
        </Card>

        {/* 3. Pending */}
        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Pending
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400">
              <Clock size={20} />
            </div>
          </div>
          <div className="mt-4">
            {loading ? (
              <Skeleton className="h-9 w-16 rounded-lg bg-slate-100 dark:bg-slate-800" />
            ) : (
              <h3 className="text-3xl font-black text-amber-600 dark:text-amber-400">{stats.pending}</h3>
            )}
            <p className="text-xs text-slate-400 mt-1">Under tutor review</p>
          </div>
        </Card>

        {/* 4. Current Plan */}
        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Current Plan
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400">
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
              <p className="text-xs text-slate-400 mt-1">Student tier</p>
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

      {/* Recent Applications Section */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Applications</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Latest batches you have applied for</p>
          </div>
          <Link href="/dashboard/student/my-applications">
            <Button variant="ghost" size="sm" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950">
              View All Applications
              <ArrowRight size={14} className="ml-1" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-xl bg-slate-100 dark:bg-slate-800" />
            ))}
          </div>
        ) : recentApplications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 dark:border-slate-800 text-xs font-bold uppercase text-slate-400">
                <tr>
                  <th className="pb-3">Tuition Batch</th>
                  <th className="pb-3">Tutor</th>
                  <th className="pb-3">Monthly Fee</th>
                  <th className="pb-3">Applied On</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {recentApplications.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="py-4 font-semibold text-slate-900 dark:text-white">
                      <Link href={`/tuitions/${app.tuitionId}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                        {app.tuitionTitle}
                      </Link>
                      <span className="block text-xs font-normal text-slate-400">{app.subject}</span>
                    </td>
                    <td className="py-4 text-slate-700 dark:text-slate-300">{app.tutorName}</td>
                    <td className="py-4 font-bold text-indigo-600 dark:text-indigo-400">৳{app.monthlyFee?.toLocaleString()}</td>
                    <td className="py-4 text-slate-500 dark:text-slate-400 text-xs">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 text-right">
                      <Badge
                        className={`capitalize text-xs font-bold ${
                          app.status === "accepted"
                            ? "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                            : app.status === "rejected"
                            ? "bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
                            : "bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                        }`}
                      >
                        {app.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center">
            <FileText size={36} className="mx-auto text-slate-300 dark:text-slate-600" />
            <h4 className="mt-3 text-sm font-bold text-slate-800 dark:text-white">No applications submitted yet</h4>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Browse verified tuitions and apply for mentorship.</p>
            <Link href="/tuitions" className="mt-4 inline-block">
              <Button size="sm" className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">Browse Tuitions</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
