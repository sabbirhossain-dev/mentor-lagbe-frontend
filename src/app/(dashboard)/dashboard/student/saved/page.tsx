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
import { authClient } from "@/lib/auth-client";
import type { Tuition } from "@/types/tuition";

export default function SavedTuitionsPage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

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
    if (isPending || !user) return;
    if (user.role && user.role !== "student") return;
    fetchSaved();
  }, [user, isPending]);

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
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Saved Tuitions</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Bookmarked tuition opportunities you want to apply for later.
          </p>
        </div>

        <Link href="/tuitions">
          <Button className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 font-semibold text-white shadow-md shadow-indigo-500/20">
            <Search size={16} className="mr-2" />
            Browse More Tuitions
          </Button>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden p-0">
              <Skeleton className="h-44 w-full rounded-none bg-slate-100 dark:bg-slate-800" />
              <div className="p-5 space-y-3">
                <Skeleton className="h-4 w-20 bg-slate-100 dark:bg-slate-800" />
                <Skeleton className="h-6 w-3/4 bg-slate-100 dark:bg-slate-800" />
                <Skeleton className="h-4 w-1/2 bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>
          ))
        ) : tuitions.length > 0 ? (
          tuitions.map((item) => (
            <div
              key={item._id}
              className="flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition hover:shadow-md"
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={item.bannerImage}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveBookmark(item._id)}
                  className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 dark:bg-slate-900/90 text-red-500 shadow-sm backdrop-blur hover:bg-white dark:hover:bg-slate-900"
                  title="Remove from bookmarks"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{item.subject}</span>
                <h3 className="mt-1 line-clamp-1 font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  {item.tutorName} • {item.mode}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
                  <span className="font-black text-indigo-600 dark:text-indigo-400">
                    ৳{item.monthlyFee?.toLocaleString()}/mo
                  </span>
                  <Link href={`/tuitions/${item._id}`}>
                    <Button size="sm" className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-xs text-white">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12">
            <Bookmark size={42} className="mx-auto text-slate-300 dark:text-slate-700" />
            <h3 className="mt-4 text-base font-bold text-slate-800 dark:text-slate-200">No saved tuitions</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Bookmark tuitions from the browse page to review them here.
            </p>
            <Link href="/tuitions" className="mt-4 inline-block">
              <Button size="sm" className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white">Browse Catalog</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
