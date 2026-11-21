"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  BadgeCheck,
  Bookmark,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  GraduationCap,
  Info,
  Lock,
  Mail,
  MapPin,
  Send,
  Shield,
  Sparkles,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import type { Tuition } from "@/types/tuition";

export default function TuitionDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [tuition, setTuition] = useState<Tuition | null>(null);
  const [loading, setLoading] = useState(true);

  // Application modal state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [studentPhone, setStudentPhone] = useState("");
  const [preferredSchedule, setPreferredSchedule] = useState("");
  const [studentNote, setStudentNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTuition = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/tuitions/${id}`);
        const data = await res.json();
        if (data.success && data.tuition) {
          setTuition(data.tuition);
        } else {
          toast.error("Tuition post not found");
        }
      } catch (err) {
        console.error("Failed to fetch tuition:", err);
        toast.error("Failed to load tuition details");
      } finally {
        setLoading(false);
      }
    };

    fetchTuition();
  }, [id]);

  const handleApplyClick = () => {
    if (!user) {
      toast("Please sign in as a student to apply", { icon: "🔒" });
      router.push("/sign-in");
      return;
    }

    if (user.role !== "student") {
      toast.error(`Only students can apply. Your account role is "${user.role}".`);
      return;
    }

    setIsApplyModalOpen(true);
  };

  const handleBookmarkToggle = async () => {
    if (!user) {
      toast("Please sign in as a student to bookmark", { icon: "🔒" });
      router.push("/sign-in");
      return;
    }

    try {
      const res = await apiFetch<{ success: boolean; message: string; isBookmarked: boolean }>(
        `/tuitions/${id}/bookmark`,
        { method: "POST" }
      );
      if (res.success) {
        toast.success(res.message);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to bookmark tuition");
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentPhone.trim()) {
      toast.error("Please provide your phone number so the tutor can contact you.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await apiFetch<{ success: boolean; message: string }>("/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tuitionId: id,
          studentPhone,
          preferredSchedule: preferredSchedule || "Flexible evening slots",
          studentNote: studentNote || "Interested in joining this tuition batch.",
        }),
      });

      if (res.success) {
        toast.success("Application submitted successfully!");
        setIsApplyModalOpen(false);
        setStudentPhone("");
        setPreferredSchedule("");
        setStudentNote("");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <Skeleton className="h-8 w-32 mb-6 rounded-lg" />
        <Skeleton className="h-72 w-full rounded-3xl mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4 rounded-lg" />
          <Skeleton className="h-6 w-1/2 rounded-lg" />
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!tuition) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Tuition Not Found</h2>
        <p className="mt-2 text-slate-500">The tuition listing you are looking for does not exist or has been removed.</p>
        <Link href="/tuitions" className="mt-6">
          <Button className="rounded-xl bg-blue-600">Back to All Tuitions</Button>
        </Link>
      </div>
    );
  }

  const isStudent = user?.role === "student";

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 pb-24 pt-10 transition-colors">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/tuitions"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Browse Tuitions
        </Link>

        {/* Hero Banner Section */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 shadow-xl shadow-slate-900/10">
          <img
            src={tuition.bannerImage}
            alt={tuition.title}
            className="h-64 sm:h-80 md:h-96 w-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Overlay Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge className="bg-blue-600 font-bold hover:bg-blue-600">{tuition.subject}</Badge>
              <Badge variant="outline" className="border-white/30 text-white font-semibold">
                {tuition.classLevel}
              </Badge>
              <span
                className={`rounded-md px-2.5 py-0.5 text-xs font-bold ${
                  tuition.mode === "Online" ? "bg-emerald-500 text-white" : "bg-purple-600 text-white"
                }`}
              >
                {tuition.mode}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
              {tuition.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-slate-300">
              <div className="flex items-center gap-1.5">
                <User size={15} className="text-blue-400" />
                <span className="font-semibold text-white">{tuition.tutorName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={15} className="text-blue-400" />
                <span>{tuition.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={15} className="text-blue-400" />
                <span>{tuition.daysPerWeek}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content & Action Bar Grid */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* Main Content (Left 8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Description Card */}
            <Card className="rounded-2xl border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Info size={18} className="text-blue-600 dark:text-blue-400" />
                Batch & Curriculum Overview
              </h3>
              <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-line">
                {tuition.description}
              </p>
            </Card>

            {/* Program Specs Highlights */}
            <Card className="rounded-2xl border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Sparkles size={18} className="text-blue-600 dark:text-blue-400" />
                Mentorship Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/60 p-4">
                  <Clock className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={18} />
                  <div>
                    <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">Weekly Schedule</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{tuition.daysPerWeek}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/60 p-4">
                  <MapPin className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={18} />
                  <div>
                    <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">Session Mode</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{tuition.mode} ({tuition.location})</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/60 p-4">
                  <BadgeCheck className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" size={18} />
                  <div>
                    <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">Verified Mentor</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Admin-reviewed qualifications</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/60 p-4">
                  <Shield className="text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" size={18} />
                  <div>
                    <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">Student Protection</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Free application & direct status tracking</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Tutor Profile Summary */}
            <Card className="rounded-2xl border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-extrabold text-xl">
                  {tuition.tutorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">{tuition.tutorName}</h4>
                    <span className="rounded-full bg-blue-50 dark:bg-blue-950 px-2.5 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                      Verified Tutor
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                    <Mail size={13} />
                    {tuition.tutorEmail}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sticky Application Action Card (Right 4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-5">
              <Card className="overflow-hidden rounded-2xl border-2 border-blue-600/30 bg-white dark:bg-slate-900 shadow-lg shadow-blue-500/5">
                <div className="bg-slate-900 dark:bg-slate-950 p-6 text-white text-center">
                  <p className="text-xs uppercase font-semibold text-blue-300 tracking-wider">Tuition Fee</p>
                  <p className="text-3xl font-extrabold text-white mt-1">
                    ৳{tuition.monthlyFee.toLocaleString()}{" "}
                    <span className="text-sm font-normal text-slate-400">/ month</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Billed monthly directly with tutor</p>
                </div>

                <div className="p-6 space-y-4">
                  {/* Role validation notice */}
                  {user && user.role !== "student" ? (
                    <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 p-4 text-xs text-amber-800 dark:text-amber-200">
                      <div className="flex items-center gap-1.5 font-bold mb-1">
                        <Lock size={14} />
                        Student Role Only
                      </div>
                      You are signed in as a <span className="capitalize font-bold">{user.role}</span>. Only students can submit applications for tuition posts.
                    </div>
                  ) : null}

                  <Button
                    onClick={handleApplyClick}
                    disabled={user?.role === "tutor" || user?.role === "admin"}
                    className="w-full rounded-xl bg-blue-600 py-6 text-base font-bold shadow-md shadow-blue-600/20 hover:bg-blue-700"
                  >
                    <Send size={16} className="mr-2" />
                    Apply for Tuition
                  </Button>

                  {user?.role === "student" && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBookmarkToggle}
                      className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      <Bookmark size={15} className="mr-2 text-blue-600 dark:text-blue-400" />
                      Save to My Bookmarks
                    </Button>
                  )}

                  <div className="space-y-2 pt-2 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      <span>Instant confirmation to your dashboard</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      <span>No upfront payment required to apply</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      <span>Cancel anytime while status is pending</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Student Application Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Apply for Tuition</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate max-w-xs">{tuition.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(false)}
                className="h-8 w-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitApplication} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                  Student Name
                </label>
                <Input
                  type="text"
                  value={user?.name || ""}
                  disabled
                  className="mt-1.5 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                  Student Email
                </label>
                <Input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="mt-1.5 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <Input
                  type="tel"
                  placeholder="e.g., 01700-000000"
                  required
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  className="mt-1.5 h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                  Preferred Schedule / Timing
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Sun-Tue-Thu 6:00 PM or Flexible"
                  value={preferredSchedule}
                  onChange={(e) => setPreferredSchedule(e.target.value)}
                  className="mt-1.5 h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                  Note to Tutor
                </label>
                <textarea
                  rows={3}
                  placeholder="Briefly mention your academic goal, current grade, or topics you need help with..."
                  value={studentNote}
                  onChange={(e) => setStudentNote(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 text-sm text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-blue-600 font-semibold hover:bg-blue-700 px-6"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
