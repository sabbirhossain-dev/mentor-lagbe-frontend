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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Manage Applicants</h1>
        <p className="mt-1 text-sm text-slate-500">
          Review incoming student enrollment requests, verify details, and accept or reject.
        </p>
      </div>

      {/* Applicants Table */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-2xl bg-slate-100" />
            ))}
          </div>
        ) : applications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50/70 text-xs font-bold uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4">Student Info</th>
                  <th className="px-6 py-4">Applied Tuition</th>
                  <th className="px-6 py-4">Schedule & Note</th>
                  <th className="px-6 py-4 text-center">Current Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <p className="font-bold text-slate-900">{app.studentName}</p>
                      <p className="mt-0.5 text-xs text-slate-500 flex items-center gap-1">
                        <Mail size={12} />
                        {app.studentEmail}
                      </p>
                      <p className="mt-0.5 text-xs font-semibold text-blue-600 flex items-center gap-1">
                        <Phone size={12} />
                        {app.studentPhone}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <Link
                        href={`/tuitions/${app.tuitionId}`}
                        className="font-bold text-slate-900 hover:text-blue-600 flex items-center gap-1"
                      >
                        {app.tuitionTitle}
                        <ExternalLink size={12} className="text-slate-400" />
                      </Link>
                      <span className="text-xs font-semibold text-slate-500 block mt-0.5">
                        {app.subject} • ৳{app.monthlyFee?.toLocaleString()}/mo
                      </span>
                    </td>

                    <td className="px-6 py-5 text-xs text-slate-600 max-w-xs">
                      <p className="font-semibold text-slate-800">
                        Schedule: {app.preferredSchedule || "Flexible"}
                      </p>
                      {app.studentNote && (
                        <p className="mt-1 text-slate-500 italic line-clamp-2">
                          "{app.studentNote}"
                        </p>
                      )}
                    </td>

                    <td className="px-6 py-5 text-center">
                      <Badge
                        className={`capitalize text-xs font-bold py-1 px-3 ${
                          app.status === "accepted"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : app.status === "rejected"
                            ? "bg-red-100 text-red-800 border-red-300"
                            : "bg-amber-100 text-amber-800 border-amber-300"
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
                          className="h-8 rounded-lg border-red-200 text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700"
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
            <Users size={42} className="mx-auto text-slate-300" />
            <h3 className="mt-4 text-base font-bold text-slate-800">No applicants yet</h3>
            <p className="mt-1 text-xs text-slate-500">
              When students apply to your active tuitions, they will appear here for review.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
