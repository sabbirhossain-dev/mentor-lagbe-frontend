"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  Search,
  User,
  X,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { apiFetch } from "@/lib/api";
import type { Tuition } from "@/types/tuition";

export default function AdminTuitionsPage() {
  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchTuitions = async () => {
    try {
      const res = await apiFetch<{ success: boolean; tuitions: Tuition[] }>("/admin/tuitions");
      if (res.success) {
        setTuitions(res.tuitions || []);
      }
    } catch (err: any) {
      console.error("Failed to load tuitions for admin:", err);
      toast.error(err.message || "Failed to load tuitions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTuitions();
  }, []);

  const handleUpdateApproval = async (id: string, status: "approved" | "rejected") => {
    setUpdatingId(id);
    try {
      const res = await apiFetch<{ success: boolean; message: string }>(
        `/admin/tuitions/${id}/approval`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ approvalStatus: status }),
        }
      );

      if (res.success) {
        toast.success(`Tuition post marked as ${status}!`);
        setTuitions((prev) =>
          prev.map((t) => (t._id === id ? { ...t, approvalStatus: status } : t))
        );
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update approval status");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredTuitions = tuitions.filter((t) => {
    if (filterStatus === "all") return true;
    return t.approvalStatus === filterStatus;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Tuition Moderation</h1>
          <p className="mt-1 text-sm text-slate-500">
            Review tutor listings and approve them for public discovery on the catalog.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex rounded-xl border border-slate-200 bg-white p-1">
          {["all", "pending", "approved", "rejected"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilterStatus(tab)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold capitalize transition-all ${
                filterStatus === tab
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tuitions Moderation Table */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-2xl bg-slate-100" />
            ))}
          </div>
        ) : filteredTuitions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50/70 text-xs font-bold uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4">Tuition Listing</th>
                  <th className="px-6 py-4">Tutor</th>
                  <th className="px-6 py-4">Fee / Month</th>
                  <th className="px-6 py-4">Submitted Date</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTuitions.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <Link
                        href={`/tuitions/${t._id}`}
                        className="font-bold text-slate-900 hover:text-blue-600 flex items-center gap-1.5"
                      >
                        {t.title}
                        <ExternalLink size={12} className="text-slate-400" />
                      </Link>
                      <span className="text-xs font-semibold text-blue-600 block mt-0.5">
                        {t.subject} • {t.classLevel} • {t.mode}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-xs text-slate-600">
                      <p className="font-bold text-slate-800">{t.tutorName}</p>
                      <p className="text-slate-400">{t.tutorEmail}</p>
                    </td>

                    <td className="px-6 py-5 font-bold text-slate-900 text-sm">
                      ৳{t.monthlyFee?.toLocaleString()}
                    </td>

                    <td className="px-6 py-5 text-xs text-slate-500">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-5 text-center">
                      <Badge
                        className={`capitalize text-xs font-bold py-1 px-3 ${
                          t.approvalStatus === "approved"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : t.approvalStatus === "rejected"
                            ? "bg-red-100 text-red-800 border-red-300"
                            : "bg-amber-100 text-amber-800 border-amber-300"
                        }`}
                      >
                        {t.approvalStatus}
                      </Badge>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          disabled={updatingId === t._id || t.approvalStatus === "approved"}
                          onClick={() => handleUpdateApproval(t._id, "approved")}
                          className="h-8 rounded-lg bg-emerald-600 text-xs font-bold text-white hover:bg-emerald-700"
                        >
                          <Check size={14} className="mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={updatingId === t._id || t.approvalStatus === "rejected"}
                          onClick={() => handleUpdateApproval(t._id, "rejected")}
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
            <BookOpen size={42} className="mx-auto text-slate-300" />
            <h3 className="mt-4 text-base font-bold text-slate-800">No tuitions to display</h3>
            <p className="mt-1 text-xs text-slate-500">No tuition posts match this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
