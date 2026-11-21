"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Bookmark,
  BookOpen,
  Calendar,
  ExternalLink,
  MapPin,
  Search,
  Trash2,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { apiFetch } from "@/lib/api";
import type { Tuition } from "@/types/tuition";

export default function SavedTuitionsPage() {
  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSaved = async () => {
    try {
      const res = await apiFetch<{ success: boolean; tuitions: Tuition[] }>(
        "/student/saved-tuitions"
      );
      if (res.success) {
        setTuitions(res.tuitions || []);
      }
    } catch (err: any) {
      console.error("Failed to load saved tuitions:", err);
      toast.error(err.message || "Failed to load saved tuitions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  const handleRemoveBookmark = async (id: string) => {
    try {
      const res = await apiFetch<{ success: boolean; message: string; isBookmarked: boolean }>(
        `/tuitions/${id}/bookmark`,
        { method: "POST" }
      );
      if (res.success) {
        toast.success("Tuition removed from bookmarks");
        setTuitions((prev) => prev.filter((t) => t._id !== id));
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to remove bookmark");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Saved Tuitions</h1>
          <p className="mt-1 text-sm text-slate-500">
            Bookmarked tuition opportunities you want to apply for later.
          </p>
        </div>

        <Link href="/tuitions">
          <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold text-white">
            <Search size={16} className="mr-2" />
            Browse More Tuitions
          </Button>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-2xl bg-slate-100" />
          ))
        ) : tuitions.length > 0 ? (
          tuitions.map((item) => (
            <div
              key={item._id}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.bannerImage}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveBookmark(item._id)}
                  className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-500 shadow-sm backdrop-blur hover:bg-white"
                  title="Remove from bookmarks"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs font-bold text-blue-600">{item.subject}</span>
                <h3 className="mt-1 line-clamp-1 font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-xs text-slate-500">
                  {item.tutorName} • {item.mode}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="font-extrabold text-blue-600">
                    ৳{item.monthlyFee?.toLocaleString()}/mo
                  </span>
                  <Link href={`/tuitions/${item._id}`}>
                    <Button size="sm" className="rounded-xl bg-blue-600 text-xs">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center rounded-3xl border border-dashed border-slate-200 bg-white p-12">
            <Bookmark size={42} className="mx-auto text-slate-300" />
            <h3 className="mt-4 text-base font-bold text-slate-800">No saved tuitions</h3>
            <p className="mt-1 text-xs text-slate-500">
              Bookmark tuitions from the browse page to review them here.
            </p>
            <Link href="/tuitions" className="mt-4 inline-block">
              <Button size="sm" className="rounded-xl bg-blue-600">Browse Catalog</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
