"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
import { Card, CardContent } from "@/components/ui/card";
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
  const { data: session } = authClient.useSession();
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
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 text-white shadow-xl shadow-blue-500/10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            <GraduationCap size={14} />
            Student Workspace
          </div>
          <h1 className="mt-3 text-2xl sm:text-3xl font-black">
            Welcome back, {user?.name || "Student"}!
          </h1>
          <p className="mt-1 text-sm text-blue-100 max-w-lg">
            Track your applied mentorship batches, monitor tutor approvals, and explore new learning opportunities.
          </p>
        </div>

        <Link href="/tuitions">
          <Button className="rounded-xl bg-white text-blue-700 font-bold hover:bg-blue-50 shadow-md">
            <Search size={16} className="mr-2" />
            Find New Tuitions
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* 1. Total Applied */}
        <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Applied
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FileText size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black text-slate-900">{stats.totalApplied}</h3>
            <p className="text-xs text-slate-400 mt-1">Submitted applications</p>
          </div>
        </Card>

        {/* 2. Accepted */}
        <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Accepted
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black text-emerald-600">{stats.accepted}</h3>
            <p className="text-xs text-slate-400 mt-1">Confirmed by tutors</p>
          </div>
        </Card>

        {/* 3. Pending */}
        <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Pending
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black text-amber-600">{stats.pending}</h3>
            <p className="text-xs text-slate-400 mt-1">Under tutor review</p>
          </div>
        </Card>

        {/* 4. Current Plan */}
        <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Current Plan
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Sparkles size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <h3 className="text-3xl font-black capitalize text-slate-900">
                {stats.plan}
              </h3>
              <p className="text-xs text-slate-400 mt-1">Student tier</p>
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

      {/* Recent Applications Section */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recent Applications</h3>
            <p className="text-xs text-slate-500">Latest batches you have applied for</p>
          </div>
          <Link href="/dashboard/student/my-applications">
            <Button variant="ghost" size="sm" className="text-xs font-bold text-blue-600 hover:bg-blue-50">
              View All Applications
              <ArrowRight size={14} className="ml-1" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-xl bg-slate-100" />
            ))}
          </div>
        ) : recentApplications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 text-xs font-bold uppercase text-slate-400">
                <tr>
                  <th className="pb-3">Tuition Batch</th>
                  <th className="pb-3">Tutor</th>
                  <th className="pb-3">Monthly Fee</th>
                  <th className="pb-3">Applied On</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentApplications.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 font-semibold text-slate-900">
                      <Link href={`/tuitions/${app.tuitionId}`} className="hover:text-blue-600">
                        {app.tuitionTitle}
                      </Link>
                      <span className="block text-xs font-normal text-slate-400">{app.subject}</span>
                    </td>
                    <td className="py-4 text-slate-700">{app.tutorName}</td>
                    <td className="py-4 font-bold text-blue-600">৳{app.monthlyFee?.toLocaleString()}</td>
                    <td className="py-4 text-slate-500 text-xs">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 text-right">
                      <Badge
                        className={`capitalize text-xs font-bold ${
                          app.status === "accepted"
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                            : app.status === "rejected"
                            ? "bg-red-100 text-red-700 border-red-200"
                            : "bg-amber-100 text-amber-700 border-amber-200"
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
            <FileText size={36} className="mx-auto text-slate-300" />
            <h4 className="mt-3 text-sm font-bold text-slate-800">No applications submitted yet</h4>
            <p className="mt-1 text-xs text-slate-500">Browse verified tuitions and apply for mentorship.</p>
            <Link href="/tuitions" className="mt-4 inline-block">
              <Button size="sm" className="rounded-xl bg-blue-600">Browse Tuitions</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
