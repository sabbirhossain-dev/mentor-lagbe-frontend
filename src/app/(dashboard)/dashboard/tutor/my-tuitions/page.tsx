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
import { Card } from "@/components/ui/card";
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
            title: editTitle.trim(),
            monthlyFee: Number(editMonthlyFee),
            location: editLocation.trim(),
            daysPerWeek: editDaysPerWeek.trim(),
            description: editDescription.trim(),
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
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">My Created Tuitions</h1>
          <p className="mt-1 text-sm text-slate-500">
            Full management of your active tuition batches, status toggles, and updates.
          </p>
        </div>

        <Link href="/dashboard/tutor/post-tuition">
          <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold text-white">
            <PlusCircle size={16} className="mr-2" />
            Post New Tuition
          </Button>
        </Link>
      </div>

      {/* Tuitions List Table */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-2xl bg-slate-100" />
            ))}
          </div>
        ) : tuitions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50/70 text-xs font-bold uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4">Title & Subject</th>
                  <th className="px-6 py-4">Fee / Month</th>
                  <th className="px-6 py-4">Approval</th>
                  <th className="px-6 py-4">Visibility</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tuitions.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <Link
                        href={`/tuitions/${t._id}`}
                        className="font-bold text-slate-900 hover:text-blue-600 flex items-center gap-1.5"
                      >
                        {t.title}
                        <ExternalLink size={13} className="text-slate-400" />
                      </Link>
                      <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-semibold text-blue-600">{t.subject}</span>
                        <span>•</span>
                        <span>{t.classLevel}</span>
                        <span>•</span>
                        <span>{t.mode}</span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span className="font-extrabold text-blue-600 text-base">
                        ৳{t.monthlyFee?.toLocaleString()}
                      </span>
                    </td>

                    <td className="px-6 py-5">
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

                    <td className="px-6 py-5">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(t._id)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all ${
                          t.isActive
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-300"
                        }`}
                        title="Click to toggle Active / Closed"
                      >
                        <Power size={12} />
                        {t.isActive ? "Active" : "Closed"}
                      </button>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(t)}
                          className="h-8 rounded-lg text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Edit3 size={14} className="mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(t._id)}
                          className="h-8 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 size={14} />
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
            <h3 className="mt-4 text-base font-bold text-slate-800">No tuitions posted yet</h3>
            <p className="mt-1 text-xs text-slate-500">
              Create your first tuition listing to start receiving student applications.
            </p>
            <Link href="/dashboard/tutor/post-tuition" className="mt-5 inline-block">
              <Button className="rounded-xl bg-blue-600 font-semibold text-white">
                Post Tuition Now
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Edit Tuition Modal */}
      {editingTuition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-extrabold text-slate-900">Edit Tuition Post</h3>
              <button
                type="button"
                onClick={() => setEditingTuition(null)}
                className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Title
                </label>
                <Input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="mt-1.5 h-11 rounded-xl border-slate-200"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Monthly Fee (BDT)
                </label>
                <Input
                  type="number"
                  required
                  value={editMonthlyFee}
                  onChange={(e) => setEditMonthlyFee(e.target.value ? Number(e.target.value) : "")}
                  className="mt-1.5 h-11 rounded-xl border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Location / Platform
                </label>
                <Input
                  type="text"
                  required
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="mt-1.5 h-11 rounded-xl border-slate-200"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Schedule (Days / Week)
                </label>
                <Input
                  type="text"
                  required
                  value={editDaysPerWeek}
                  onChange={(e) => setEditDaysPerWeek(e.target.value)}
                  className="mt-1.5 h-11 rounded-xl border-slate-200"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingTuition(null)}
                  className="rounded-xl border-slate-200"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={savingEdit}
                  className="rounded-xl bg-blue-600 font-semibold hover:bg-blue-700 px-6"
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
