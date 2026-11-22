"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Edit3,
  ExternalLink,
  MapPin,
  PlusCircle,
  Power,
  Trash2,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { apiFetch } from "@/lib/api";
import type { Tuition } from "@/types/tuition";

export default function MyTuitionsPage() {
  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit Modal State
  const [editingTuition, setEditingTuition] = useState<Tuition | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editMonthlyFee, setEditMonthlyFee] = useState<number | "">("");
  const [editLocation, setEditLocation] = useState("");
  const [editDaysPerWeek, setEditDaysPerWeek] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  const fetchTuitions = async () => {
    try {
      const res = await apiFetch<{ success: boolean; tuitions: Tuition[] }>("/tutor/my-tuitions");
      if (res.success) {
        setTuitions(res.tuitions || []);
      }
    } catch (err: any) {
      console.error("Failed to load tutor tuitions:", err);
      toast.error(err.message || "Failed to load your tuitions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTuitions();
  }, []);

  const handleToggleStatus = async (id: string) => {
    try {
      const res = await apiFetch<{ success: boolean; message: string; isActive: boolean }>(
        `/tuitions/${id}/toggle-status`,
        { method: "PATCH" }
      );
      if (res.success) {
        toast.success(res.message);
        setTuitions((prev) =>
          prev.map((t) => (t._id === id ? { ...t, isActive: res.isActive } : t))
        );
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tuition listing?")) return;

    try {
      const res = await apiFetch<{ success: boolean; message: string }>(`/tuitions/${id}`, {
        method: "DELETE",
      });
      if (res.success) {
        toast.success("Tuition listing deleted successfully");
        setTuitions((prev) => prev.filter((t) => t._id !== id));
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete tuition");
    }
  };

  const openEditModal = (t: Tuition) => {
    setEditingTuition(t);
    setEditTitle(t.title);
    setEditMonthlyFee(t.monthlyFee);
    setEditLocation(t.location);
    setEditDaysPerWeek(t.daysPerWeek);
    setEditDescription(t.description || "");
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTuition) return;

    setSavingEdit(true);
    try {
      const res = await apiFetch<{ success: boolean; message: string }>(
        `/tuitions/${editingTuition._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: editTitle,
            monthlyFee: Number(editMonthlyFee),
            location: editLocation,
            daysPerWeek: editDaysPerWeek,
            description: editDescription,
          }),
        }
      );

      if (res.success) {
        toast.success("Tuition updated successfully!");
        setTuitions((prev) =>
          prev.map((t) =>
            t._id === editingTuition._id
              ? {
                  ...t,
                  title: editTitle,
                  monthlyFee: Number(editMonthlyFee),
                  location: editLocation,
                  daysPerWeek: editDaysPerWeek,
                  description: editDescription,
                }
              : t
          )
        );
        setEditingTuition(null);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update tuition");
    } finally {
      setSavingEdit(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">My Created Tuitions</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Full management of your active tuition batches, status toggles, and updates.
          </p>
        </div>

        <Link href="/dashboard/tutor/post-tuition">
          <Button className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 font-semibold text-white shadow-md shadow-indigo-500/20">
            <PlusCircle size={16} className="mr-2" />
            Post New Tuition
          </Button>
        </Link>
      </div>

      {/* Tuitions List Table */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-2xl bg-slate-100 dark:bg-slate-800" />
            ))}
          </div>
        ) : tuitions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4">Title & Subject</th>
                  <th className="px-6 py-4">Fee / Month</th>
                  <th className="px-6 py-4">Approval</th>
                  <th className="px-6 py-4">Visibility</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {tuitions.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-5">
                      <Link
                        href={`/tuitions/${t._id}`}
                        className="font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5"
                      >
                        {t.title}
                        <ExternalLink size={13} className="text-slate-400" />
                      </Link>
                      <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">{t.subject}</span>
                        <span>•</span>
                        <span>{t.classLevel}</span>
                        <span>•</span>
                        <span>{t.mode}</span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span className="font-black text-indigo-600 dark:text-indigo-400 text-base">
                        ৳{t.monthlyFee?.toLocaleString()}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <Badge
                        className={`capitalize text-xs font-bold py-1 px-3 ${
                          t.approvalStatus === "approved"
                            ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                            : t.approvalStatus === "rejected"
                            ? "bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 border-red-300 dark:border-red-800"
                            : "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                        }`}
                      >
                        {t.approvalStatus}
                      </Badge>
                    </td>

                    <td className="px-6 py-5">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(t._id)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all ${
                          t.isActive
                            ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        <Power size={12} className={t.isActive ? "text-emerald-600" : "text-slate-400"} />
                        {t.isActive ? "Active (Listed)" : "Closed (Hidden)"}
                      </button>
                    </td>

                    <td className="px-6 py-5 text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditModal(t)}
                        className="h-8 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        <Edit3 size={13} className="mr-1" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(t._id)}
                        className="h-8 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50"
                      >
                        <Trash2 size={13} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center">
            <BookOpen size={42} className="mx-auto text-slate-300 dark:text-slate-700" />
            <h3 className="mt-4 text-base font-bold text-slate-800 dark:text-slate-200">No tuitions posted yet</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Create your first tuition batch to start receiving applications from students.
            </p>
            <Link href="/dashboard/tutor/post-tuition" className="mt-4 inline-block">
              <Button size="sm" className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white">Post a Tuition</Button>
            </Link>
          </div>
        )}
      </div>

      {/* Edit Tuition Modal */}
      {editingTuition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Edit Tuition Post</h3>
              <button
                type="button"
                onClick={() => setEditingTuition(null)}
                className="h-8 w-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                  Title
                </label>
                <Input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="mt-1.5 h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                  Monthly Fee (BDT)
                </label>
                <Input
                  type="number"
                  required
                  value={editMonthlyFee}
                  onChange={(e) => setEditMonthlyFee(e.target.value ? Number(e.target.value) : "")}
                  className="mt-1.5 h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                  Location / Platform
                </label>
                <Input
                  type="text"
                  required
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="mt-1.5 h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                  Schedule (Days / Week)
                </label>
                <Input
                  type="text"
                  required
                  value={editDaysPerWeek}
                  onChange={(e) => setEditDaysPerWeek(e.target.value)}
                  className="mt-1.5 h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white p-3 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingTuition(null)}
                  className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={savingEdit}
                  className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 font-semibold text-white px-6 shadow-md"
                >
                  {savingEdit ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
