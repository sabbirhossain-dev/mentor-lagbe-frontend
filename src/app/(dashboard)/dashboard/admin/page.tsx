"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  CreditCard,
  DollarSign,
  GraduationCap,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

interface AdminStats {
  totalUsers: number;
  totalTutors: number;
  totalStudents: number;
  pendingTuitions: number;
  approvedTuitions: number;
  totalRevenue: number;
}

export default function AdminOverviewPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalTutors: 0,
    totalStudents: 0,
    pendingTuitions: 0,
    approvedTuitions: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await apiFetch<{ success: boolean; stats: AdminStats }>("/stats/admin");
        if (res.success) setStats(res.stats);
      } catch (err) {
        console.error("Failed to load admin stats:", err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl bg-gradient-to-r from-violet-700 via-indigo-800 to-indigo-900 p-6 sm:p-8 text-white shadow-xl shadow-indigo-500/10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            <ShieldCheck size={14} />
            Administrator Control Center
          </div>
          <h1 className="mt-3 text-2xl sm:text-3xl font-black">
            System Moderation & Analytics
          </h1>
          <p className="mt-1 text-sm text-indigo-100 max-w-lg">
            Moderate tuition submissions, manage user roles across stakeholders, and monitor subscription transactions.
          </p>
        </div>

        <Link href="/dashboard/admin/tuitions">
          <Button className="rounded-xl bg-white text-indigo-800 font-bold hover:bg-indigo-50 shadow-md">
            Review Pending Tuitions ({loading ? "..." : stats.pendingTuitions})
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* 1. Total Registered Users */}
        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Users
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
              <Users size={20} />
            </div>
          </div>
          <div className="mt-4">
            {loading ? (
              <Skeleton className="h-9 w-16 rounded-lg bg-slate-100 dark:bg-slate-800" />
            ) : (
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{stats.totalUsers}</h3>
            )}
            <p className="text-xs text-slate-400 mt-1">
              {stats.totalStudents} Students • {stats.totalTutors} Tutors
            </p>
          </div>
        </Card>

        {/* 2. Total Tutors */}
        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Active Tutors
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400">
              <UserCheck size={20} />
            </div>
          </div>
          <div className="mt-4">
            {loading ? (
              <Skeleton className="h-9 w-16 rounded-lg bg-slate-100 dark:bg-slate-800" />
            ) : (
              <h3 className="text-3xl font-black text-violet-600 dark:text-violet-400">{stats.totalTutors}</h3>
            )}
            <p className="text-xs text-slate-400 mt-1">Qualified teaching mentors</p>
          </div>
        </Card>

        {/* 3. Pending vs Approved Tuitions */}
        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Tuition Catalog
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400">
              <Clock size={20} />
            </div>
          </div>
          <div className="mt-4">
            {loading ? (
              <Skeleton className="h-9 w-24 rounded-lg bg-slate-100 dark:bg-slate-800" />
            ) : (
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                {stats.approvedTuitions}{" "}
                <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                  ({stats.pendingTuitions} pending)
                </span>
              </h3>
            )}
            <p className="text-xs text-slate-400 mt-1">Approved & live listings</p>
          </div>
        </Card>

        {/* 4. Total Stripe Revenue */}
        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Stripe Revenue
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="mt-4">
            {loading ? (
              <Skeleton className="h-9 w-20 rounded-lg bg-slate-100 dark:bg-slate-800" />
            ) : (
              <h3 className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                ${stats.totalRevenue.toFixed(2)}
              </h3>
            )}
            <p className="text-xs text-slate-400 mt-1">Pro plan subscriptions</p>
          </div>
        </Card>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid gap-6 sm:grid-cols-3">
        <Link
          href="/dashboard/admin/tuitions"
          className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg transition-all"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <BookOpen size={24} />
          </div>
          <h4 className="mt-4 text-base font-bold text-slate-900 dark:text-white">Tuition Moderation</h4>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Review newly submitted tuition posts and grant approval or rejection.
          </p>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
            <span>Moderate posts</span>
            <ArrowRight size={14} />
          </div>
        </Link>

        <Link
          href="/dashboard/admin/users"
          className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-lg transition-all"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-colors">
            <Users size={24} />
          </div>
          <h4 className="mt-4 text-base font-bold text-slate-900 dark:text-white">User Role Management</h4>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Promote or reassign user roles between Student, Tutor, and Admin.
          </p>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-violet-600 dark:text-violet-400">
            <span>Manage accounts</span>
            <ArrowRight size={14} />
          </div>
        </Link>

        <Link
          href="/dashboard/admin/transactions"
          className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-lg transition-all"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <CreditCard size={24} />
          </div>
          <h4 className="mt-4 text-base font-bold text-slate-900 dark:text-white">Payment Transactions</h4>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Inspect all Stripe subscription payments and generated transaction IDs.
          </p>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <span>View transactions</span>
            <ArrowRight size={14} />
          </div>
        </Link>
      </div>
    </div>
  );
}
