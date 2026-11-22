"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
  Mail,
  Phone,
  Search,
  Users,
  X,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { apiFetch } from "@/lib/api";
import type { Application } from "@/types/tuition";

export default function ManageApplicantsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchApplicants = async () => {
    try {
      const res = await apiFetch<{ success: boolean; applications: Application[] }>(
        "/tutor/applicants"
      );
      if (res.success) {
        setApplications(res.applications || []);
      }
    } catch (err: any) {
      console.error("Failed to load applicants:", err);
      toast.error(err.message || "Failed to load student applicants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleUpdateStatus = async (id: string, status: "accepted" | "rejected") => {
    setUpdatingId(id);
    try {
      const res = await apiFetch<{ success: boolean; message: string }>(
        `/applications/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (res.success) {
        toast.success(`Application marked as ${status}!`);
        setApplications((prev) =>
          prev.map((a) => (a._id === id ? { ...a, status } : a))
        );
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update applicant status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Manage Applicants</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Review incoming student enrollment requests, verify details, and accept or reject.
        </p>
      </div>

      {/* Applicants Table */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-2xl bg-slate-100 dark:bg-slate-800" />
            ))}
          </div>
        ) : applications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4">Student Info</th>
                  <th className="px-6 py-4">Applied Tuition</th>
                  <th className="px-6 py-4">Schedule & Note</th>
                  <th className="px-6 py-4 text-center">Current Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-5">
                      <p className="font-bold text-slate-900 dark:text-white">{app.studentName}</p>
                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Mail size={12} />
                        {app.studentEmail}
                      </p>
                      <p className="mt-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                        <Phone size={12} />
                        {app.studentPhone}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <Link
                        href={`/tuitions/${app.tuitionId}`}
                        className="font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1"
                      >
                        {app.tuitionTitle}
                        <ExternalLink size={12} className="text-slate-400" />
                      </Link>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mt-0.5">
                        {app.subject} • ৳{app.monthlyFee?.toLocaleString()}/mo
                      </span>
                    </td>

                    <td className="px-6 py-5 text-xs text-slate-600 dark:text-slate-300 max-w-xs">
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        Schedule: {app.preferredSchedule || "Flexible"}
                      </p>
                      {app.studentNote && (
                        <p className="mt-1 text-slate-500 dark:text-slate-400 italic line-clamp-2">
                          "{app.studentNote}"
                        </p>
                      )}
                    </td>

                    <td className="px-6 py-5 text-center">
                      <Badge
                        className={`capitalize text-xs font-bold py-1 px-3 ${
                          app.status === "accepted"
                            ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                            : app.status === "rejected"
                            ? "bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 border-red-300 dark:border-red-800"
                            : "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                        }`}
                      >
                        {app.status}
                      </Badge>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          disabled={updatingId === app._id || app.status === "accepted"}
                          onClick={() => handleUpdateStatus(app._id, "accepted")}
                          className="h-8 rounded-lg bg-emerald-600 text-xs font-bold text-white hover:bg-emerald-700"
                        >
                          <Check size={14} className="mr-1" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={updatingId === app._id || app.status === "rejected"}
                          onClick={() => handleUpdateStatus(app._id, "rejected")}
                          className="h-8 rounded-lg border-red-200 dark:border-red-900/60 dark:bg-slate-800 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40"
                        >
                          <X size={14} className="mr-1" />
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center">
            <Users size={42} className="mx-auto text-slate-300 dark:text-slate-700" />
            <h3 className="mt-4 text-base font-bold text-slate-800 dark:text-slate-200">No applicants yet</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              When students apply to your active tuitions, they will appear here for review.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
