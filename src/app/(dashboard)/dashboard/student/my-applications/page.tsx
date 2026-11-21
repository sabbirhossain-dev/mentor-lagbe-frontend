"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  Mail,
  Search,
  Trash2,
  User,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { apiFetch } from "@/lib/api";
import type { Application } from "@/types/tuition";

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchApplications = async () => {
    try {
      const res = await apiFetch<{ success: boolean; applications: Application[] }>(
        "/student/my-applications"
      );
      if (res.success) {
        setApplications(res.applications || []);
      }
    } catch (err: any) {
      console.error("Failed to load applications:", err);
      toast.error(err.message || "Failed to load your applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleCancelApplication = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this application?")) return;

    setCancellingId(id);
    try {
      const res = await apiFetch<{ success: boolean; message: string }>(
        `/applications/${id}`,
        { method: "DELETE" }
      );

      if (res.success) {
        toast.success("Application cancelled successfully!");
        setApplications((prev) => prev.filter((a) => a._id !== id));
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to cancel application");
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">My Applications</h1>
          <p className="mt-1 text-sm text-slate-500">
            View all tuition enrollment applications and real-time status.
          </p>
        </div>

        <Link href="/tuitions">
          <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold text-white">
            <Search size={16} className="mr-2" />
            Apply For More Tuitions
          </Button>
        </Link>
      </div>

      {/* Applications List */}
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
                  <th className="px-6 py-4">Tuition Title & Subject</th>
                  <th className="px-6 py-4">Tutor Details</th>
                  <th className="px-6 py-4">Monthly Fee</th>
                  <th className="px-6 py-4">Applied Date</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <Link
                        href={`/tuitions/${app.tuitionId}`}
                        className="font-bold text-slate-900 hover:text-blue-600 flex items-center gap-1.5"
                      >
                        {app.tuitionTitle}
                        <ExternalLink size={13} className="text-slate-400" />
                      </Link>
                      <span className="mt-0.5 inline-block text-xs font-semibold text-blue-600">
                        {app.subject}
                      </span>
                      {app.studentNote && (
                        <p className="mt-1 text-xs text-slate-400 italic line-clamp-1">
                          Note: "{app.studentNote}"
                        </p>
                      )}
                    </td>

                    <td className="px-6 py-5 text-xs text-slate-600">
                      <p className="font-bold text-slate-800">{app.tutorName}</p>
                      <p className="text-slate-400 mt-0.5">{app.tutorEmail}</p>
                    </td>

                    <td className="px-6 py-5">
                      <span className="font-extrabold text-blue-600 text-base">
                        ৳{app.monthlyFee?.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-400"> /mo</span>
                    </td>

                    <td className="px-6 py-5 text-xs text-slate-500">
                      {new Date(app.appliedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
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
                      {app.status === "pending" ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={cancellingId === app._id}
                          onClick={() => handleCancelApplication(app._id)}
                          className="rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 size={14} className="mr-1" />
                          {cancellingId === app._id ? "Cancelling..." : "Cancel"}
                        </Button>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium italic">
                          Locked ({app.status})
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center">
            <FileText size={42} className="mx-auto text-slate-300" />
            <h3 className="mt-4 text-base font-bold text-slate-800">No applications found</h3>
            <p className="mt-1 text-xs text-slate-500">
              You haven't submitted any tuition applications yet.
            </p>
            <Link href="/tuitions" className="mt-5 inline-block">
              <Button className="rounded-xl bg-blue-600 font-semibold text-white">
                Find Tuitions Now
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
