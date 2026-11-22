"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  MapPin,
  Sparkles,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { apiFetch } from "@/lib/api";
import type { Tuition } from "@/types/tuition";

export default function FeaturedTuitions() {
  const router = useRouter();
  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await apiFetch<{ success: boolean; tuitions: Tuition[] }>(
          "/tuitions/featured",
        );
        if (data.success && Array.isArray(data.tuitions)) {
          setTuitions(data.tuitions);
        }
      } catch (err) {
        console.error("Failed to load featured tuitions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="bg-slate-50/70 py-10 sm:py-16 dark:bg-slate-900/40 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-14 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/60 dark:text-indigo-300">
              <Sparkles size={14} className="text-amber-500 fill-amber-500" />
              Verified & Handpicked
            </div>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Featured Mentorship Batches
            </h2>

            <p className="mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-400">
              Explore recent verified tuition batches and 1-on-1 mentorship
              programs posted by qualified tutors.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => router.push("/tuitions")}
            className="rounded-xl border-slate-300 bg-white font-medium text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Browse All Tuitions
            <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>

        {/* Tuition Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <Skeleton className="h-48 w-full rounded-none bg-slate-100 dark:bg-slate-800" />
                <div className="flex flex-1 flex-col p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-24 rounded-full bg-slate-100 dark:bg-slate-800" />
                    <Skeleton className="h-5 w-16 rounded-full bg-slate-100 dark:bg-slate-800" />
                  </div>
                  <Skeleton className="h-6 w-4/5 bg-slate-100 dark:bg-slate-800" />
                  <Skeleton className="h-12 w-full bg-slate-100 dark:bg-slate-800" />
                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <Skeleton className="h-6 w-24 bg-slate-100 dark:bg-slate-800" />
                    <Skeleton className="h-9 w-24 rounded-lg bg-slate-100 dark:bg-slate-800" />
                  </div>
                </div>
              </div>
            ))
          ) : tuitions.length > 0 ? (
            tuitions.map((item) => (
              <div
                key={item._id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-slate-800 dark:bg-slate-900"
              >
                {/* Banner Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={item.bannerImage}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-lg bg-white/95 dark:bg-slate-900/90 px-2.5 py-1 text-xs font-semibold text-slate-800 dark:text-slate-100 shadow-sm backdrop-blur">
                      {item.classLevel}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span
                      className={`rounded-lg px-2.5 py-1 text-xs font-bold shadow-sm backdrop-blur ${
                        item.mode === "Online"
                          ? "bg-emerald-500 text-white"
                          : "bg-indigo-600 text-white"
                      }`}
                    >
                      {item.mode}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    <BookOpen size={14} />
                    <span>{item.subject}</span>
                  </div>

                  <h3 className="mt-2 line-clamp-2 text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors dark:text-white dark:group-hover:text-indigo-400">
                    {item.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <User size={13} className="text-slate-400" />
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {item.tutorName}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={13} className="text-slate-400" />
                      <span>{item.daysPerWeek}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={13} className="text-slate-400" />
                      <span className="truncate max-w-[130px]">
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Footer Fee & CTA */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                    <div>
                      <p className="text-[11px] font-medium text-slate-400">
                        Monthly Fee
                      </p>
                      <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                        ৳{item.monthlyFee.toLocaleString()}{" "}
                        <span className="text-xs font-normal text-slate-400">
                          /mo
                        </span>
                      </p>
                    </div>

                    <Link href={`/tuitions/${item._id}`}>
                      <Button
                        size="sm"
                        className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold shadow-xs"
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center">
              <p className="text-slate-500 dark:text-slate-400">
                No featured tuitions available right now.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
