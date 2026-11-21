"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  const { data: session } = authClient.useSession();
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
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-800 p-6 sm:p-8 text-white shadow-xl shadow-blue-500/10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            <GraduationCap size={14} />
            Tutor Workspace
          </div>
          <h1 className="mt-3 text-2xl sm:text-3xl font-black">
            Welcome, {user?.name || "Tutor"}!
          </h1>
          <p className="mt-1 text-sm text-blue-100 max-w-lg">
            Manage your teaching batches, review incoming student enrollments, and launch new tuition sessions.
          </p>
        </div>

        <Link href="/dashboard/tutor/post-tuition">
          <Button className="rounded-xl bg-white text-blue-800 font-bold hover:bg-blue-50 shadow-md">
            <PlusCircle size={16} className="mr-2" />
            Post New Tuition
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* 1. Total Tuitions Posted */}
        <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Posted
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <BookOpen size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black text-slate-900">{stats.totalPosted}</h3>
            <p className="text-xs text-slate-400 mt-1">
              {stats.plan === "pro" ? "Unlimited allowed (PRO)" : `${stats.totalPosted}/2 free posts used`}
            </p>
          </div>
        </Card>

        {/* 2. Active & Approved */}
        <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Live & Active
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black text-emerald-600">{stats.activeApproved}</h3>
            <p className="text-xs text-slate-400 mt-1">Visible on catalog</p>
          </div>
        </Card>

        {/* 3. Total Applicants */}
        <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Applicants Received
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Users size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black text-purple-600">{stats.totalApplicants}</h3>
            <p className="text-xs text-slate-400 mt-1">Student applications</p>
          </div>
        </Card>

        {/* 4. Current Plan */}
        <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Current Plan
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Sparkles size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <h3 className="text-3xl font-black capitalize text-slate-900">
                {stats.plan}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {stats.plan === "pro" ? "Verified badge + unlimited" : "Max 2 tuition posts"}
              </p>
            </div>
            {stats.plan !== "pro" && (
              <Link href="/pricing">
                <Button size="sm" variant="outline" className="rounded-lg text-xs font-bold text-blue-600 border-blue-200 hover:bg-blue-50">
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
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">My Tuitions</h3>
              <p className="text-xs text-slate-500">Overview of your posted batches</p>
            </div>
            <Link href="/dashboard/tutor/my-tuitions">
              <Button variant="ghost" size="sm" className="text-xs font-bold text-blue-600 hover:bg-blue-50">
                Manage All
                <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-16 w-full rounded-2xl bg-slate-100" />
              <Skeleton className="h-16 w-full rounded-2xl bg-slate-100" />
            </div>
          ) : myTuitions.length > 0 ? (
            <div className="space-y-3">
              {myTuitions.map((t) => (
                <div
                  key={t._id}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="min-w-0 pr-4">
                    <p className="truncate text-sm font-bold text-slate-900">{t.title}</p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                      <span>{t.subject}</span>
                      <span>•</span>
                      <span className="font-semibold text-blue-600">৳{t.monthlyFee?.toLocaleString()}/mo</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Badge
                      className={`capitalize text-[11px] font-bold ${
                        t.approvalStatus === "approved"
                          ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                          : t.approvalStatus === "rejected"
                          ? "bg-red-100 text-red-700 border-red-200"
                          : "bg-amber-100 text-amber-700 border-amber-200"
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
              <p className="text-xs text-slate-500">You haven't posted any tuitions yet.</p>
              <Link href="/dashboard/tutor/post-tuition" className="mt-3 inline-block">
                <Button size="sm" className="rounded-xl bg-blue-600 text-xs">Post First Tuition</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Right: Recent Applicants */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Recent Applicants</h3>
              <p className="text-xs text-slate-500">Students awaiting your review</p>
            </div>
            <Link href="/dashboard/tutor/applicants">
              <Button variant="ghost" size="sm" className="text-xs font-bold text-blue-600 hover:bg-blue-50">
                View All
                <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-16 w-full rounded-2xl bg-slate-100" />
              <Skeleton className="h-16 w-full rounded-2xl bg-slate-100" />
            </div>
          ) : recentApplicants.length > 0 ? (
            <div className="space-y-3">
              {recentApplicants.map((app) => (
                <div
                  key={app._id}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="min-w-0 pr-4">
                    <p className="truncate text-sm font-bold text-slate-900">{app.studentName}</p>
                    <p className="text-xs text-slate-500 truncate">{app.tuitionTitle}</p>
                  </div>

                  <Badge
                    className={`capitalize text-[11px] font-bold ${
                      app.status === "accepted"
                        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                        : app.status === "rejected"
                        ? "bg-red-100 text-red-700 border-red-200"
                        : "bg-amber-100 text-amber-700 border-amber-200"
                    }`}
                  >
                    {app.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-xs text-slate-500">No student applicants yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
