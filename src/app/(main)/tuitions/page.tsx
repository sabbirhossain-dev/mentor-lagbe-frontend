"use client";

import { useEffect, useState, useTransition, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter,
  GraduationCap,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { apiFetch } from "@/lib/api";
import type { Tuition } from "@/types/tuition";

const SUBJECTS = [
  "All",
  "Higher Math",
  "General Math",
  "Physics",
  "Chemistry",
  "Biology",
  "Programming",
  "IELTS",
  "English",
  "ICT",
  "Accounting",
  "Economics",
];

const CLASS_LEVELS = [
  "All",
  "Class 6-8",
  "Class 9-10",
  "Class 11-12",
  "University / Career",
  "Higher Study / Adult",
];

const MODES = ["All", "Online", "Offline"];

function BrowseTuitionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL state
  const initialSearch = searchParams.get("search") || "";
  const initialSubject = searchParams.get("subject") || "All";
  const initialClassLevel = searchParams.get("classLevel") || "All";
  const initialMode = searchParams.get("mode") || "All";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const initialSort = searchParams.get("sort") || "newest";

  const [search, setSearch] = useState(initialSearch);
  const [subject, setSubject] = useState(initialSubject);
  const [classLevel, setClassLevel] = useState(initialClassLevel);
  const [mode, setMode] = useState(initialMode);
  const [sort, setSort] = useState(initialSort);
  const [page, setPage] = useState(initialPage);

  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch data whenever filters change
  const fetchTuitions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (search.trim()) params.append("search", search.trim());
      if (subject !== "All") params.append("subject", subject);
      if (classLevel !== "All") params.append("classLevel", classLevel);
      if (mode !== "All") params.append("mode", mode);
      if (sort) params.append("sort", sort);
      params.append("page", String(page));
      params.append("limit", "9");

      const data = await apiFetch<{
        success: boolean;
        tuitions: Tuition[];
        total: number;
        totalPages: number;
      }>(`/tuitions?${params.toString()}`);

      if (data.success) {
        setTuitions(data.tuitions || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
      }
    } catch (err) {
      console.error("Failed to fetch tuitions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTuitions();
  }, [search, subject, classLevel, mode, sort, page]);

  // Sync URL query string
  useEffect(() => {
    const params = new URLSearchParams();
    if (search.trim()) params.append("search", search.trim());
    if (subject !== "All") params.append("subject", subject);
    if (classLevel !== "All") params.append("classLevel", classLevel);
    if (mode !== "All") params.append("mode", mode);
    if (sort !== "newest") params.append("sort", sort);
    if (page > 1) params.append("page", String(page));

    const queryString = params.toString();
    router.replace(`/tuitions${queryString ? `?${queryString}` : ""}`, { scroll: false });
  }, [search, subject, classLevel, mode, sort, page, router]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchTuitions();
  };

  const handleResetFilters = () => {
    setSearch("");
    setSubject("All");
    setClassLevel("All");
    setMode("All");
    setSort("newest");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-24 pt-12 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-10 text-center sm:text-left">
          <Badge className="mb-3 rounded-full border border-indigo-200 bg-indigo-50 dark:border-indigo-900/60 dark:bg-indigo-950/60 px-3.5 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
            Tuition Catalog
          </Badge>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Browse Approved Tuitions & Mentors
          </h1>
          <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
            Find the perfect academic mentor or subject batch with direct filters.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
          {/* Top Search Input */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
              />
              <Input
                type="text"
                placeholder="Search by title, subject (e.g., Higher Math, Physics), or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 rounded-2xl pl-10 border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus-visible:ring-indigo-500 text-sm"
              />
            </div>
            <Button
              type="submit"
              className="h-11 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-6 font-semibold shadow-md shadow-indigo-600/20"
            >
              Search
            </Button>
          </form>

          {/* Filter Dropdowns Grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 items-center pt-2 border-t border-slate-100 dark:border-slate-800">
            {/* Subject Filter */}
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Subject</label>
              <select
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  setPage(1);
                }}
                className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 focus:border-indigo-500 focus:outline-none"
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s === "All" ? "All Subjects" : s}
                  </option>
                ))}
              </select>
            </div>

            {/* Class Level Filter */}
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Class Level</label>
              <select
                value={classLevel}
                onChange={(e) => {
                  setClassLevel(e.target.value);
                  setPage(1);
                }}
                className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 focus:border-indigo-500 focus:outline-none"
              >
                {CLASS_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl === "All" ? "All Class Levels" : lvl}
                  </option>
                ))}
              </select>
            </div>

            {/* Mode Filter */}
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Mode</label>
              <select
                value={mode}
                onChange={(e) => {
                  setMode(e.target.value);
                  setPage(1);
                }}
                className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 focus:border-indigo-500 focus:outline-none"
              >
                {MODES.map((m) => (
                  <option key={m} value={m}>
                    {m === "All" ? "All Modes" : m}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Sort By</label>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 focus:border-indigo-500 focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="fee-low">Fee: Low to High</option>
                <option value="fee-high">Fee: High to Low</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            {/* Reset Button */}
            <div className="sm:col-span-2 md:col-span-4 lg:col-span-1 flex items-end">
              <Button
                type="button"
                variant="ghost"
                onClick={handleResetFilters}
                className="mt-5 w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
              >
                <RotateCcw size={13} className="mr-1.5" />
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <p>
            Showing <span className="font-bold text-slate-800 dark:text-slate-200">{tuitions.length}</span> of{" "}
            <span className="font-bold text-slate-800 dark:text-slate-200">{total}</span> approved tuitions
          </p>
        </div>

        {/* Tuitions Card Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
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
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10"
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

                  <h3 className="mt-2 line-clamp-2 text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <User size={13} className="text-slate-400" />
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{item.tutorName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={13} className="text-slate-400" />
                      <span>{item.daysPerWeek}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={13} className="text-slate-400" />
                      <span className="truncate max-w-[130px]">{item.location}</span>
                    </div>
                  </div>

                  {/* Footer Fee & CTA */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                    <div>
                      <p className="text-[11px] font-medium text-slate-400">Monthly Fee</p>
                      <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                        ৳{item.monthlyFee?.toLocaleString()}{" "}
                        <span className="text-xs font-normal text-slate-400">/mo</span>
                      </p>
                    </div>

                    <Link href={`/tuitions/${item._id}`}>
                      <Button size="sm" className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-16 text-center">
              <BookOpen size={40} className="mx-auto text-slate-300 dark:text-slate-600" />
              <h3 className="mt-4 text-lg font-bold text-slate-800 dark:text-white">No tuitions match your criteria</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Try adjusting your search terms or resetting the filters.</p>
              <Button
                onClick={handleResetFilters}
                variant="outline"
                className="mt-5 rounded-xl border-slate-300 dark:border-slate-700 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Reset All Filters
              </Button>
            </div>
          )}
        </div>

        {/* Server-Side Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-14 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1 || loading}
              onClick={() => {
                setPage((prev) => Math.max(1, prev - 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <ChevronLeft size={16} className="mr-1" />
              Previous
            </Button>

            <div className="flex items-center gap-1 px-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <span>Page</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{page}</span>
              <span>of</span>
              <span>{totalPages}</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages || loading}
              onClick={() => {
                setPage((prev) => Math.min(totalPages, prev + 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              Next
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BrowseTuitionsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50/50 dark:bg-slate-950">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
        </div>
      }
    >
      <BrowseTuitionsContent />
    </Suspense>
  );
}
