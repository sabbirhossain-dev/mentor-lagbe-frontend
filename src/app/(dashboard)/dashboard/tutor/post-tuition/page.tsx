"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  BookOpen,
  DollarSign,
  GraduationCap,
  ImageIcon,
  MapPin,
  PlusCircle,
  Sparkles,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { apiFetch } from "@/lib/api";
import { uploadImageToImgBB } from "@/lib/uploadImage";

const SUBJECTS = [
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
  "Bengali",
];

const CLASS_LEVELS = [
  "Class 6-8",
  "Class 9-10",
  "Class 11-12",
  "University / Career",
  "Higher Study / Adult",
  "All Levels",
];

export default function PostTuitionPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [classLevel, setClassLevel] = useState(CLASS_LEVELS[2]);
  const [mode, setMode] = useState<"Online" | "Offline">("Online");
  const [location, setLocation] = useState("Online (Google Meet)");
  const [monthlyFee, setMonthlyFee] = useState<number | "">("");
  const [daysPerWeek, setDaysPerWeek] = useState("3 Days / Week");
  const [description, setDescription] = useState("");

  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !monthlyFee) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    let uploadedBannerUrl =
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80";

    try {
      // 1. If banner file chosen, upload to ImgBB quietly
      if (bannerFile) {
        try {
          uploadedBannerUrl = await uploadImageToImgBB(bannerFile);
        } catch (uploadErr: unknown) {
          const errMsg =
            uploadErr instanceof Error ? uploadErr.message : "Banner upload failed";
          toast.error(errMsg);
          setSubmitting(false);
          return;
        }
      }

      // 2. Submit tuition post to backend
      const res = await apiFetch<{ success: boolean; message: string; tuitionId: string }>(
        "/tuitions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            subject,
            classLevel,
            mode,
            location: location.trim(),
            monthlyFee: Number(monthlyFee),
            daysPerWeek: daysPerWeek.trim(),
            bannerImage: uploadedBannerUrl,
            description: description.trim(),
          }),
        }
      );

      if (res.success) {
        toast.success("Tuition submitted successfully! Pending admin approval.");
        router.push("/dashboard/tutor/my-tuitions");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to post tuition");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Post a New Tuition</h1>
        <p className="mt-1 text-sm text-slate-500">
          Create a mentorship batch or 1-on-1 tuition listing for student enrollment.
        </p>
      </div>

      <Card className="rounded-3xl border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Title */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Tuition Title <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              required
              placeholder="e.g. HSC Higher Math & Calculus Special Crash Course"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1.5 h-11 rounded-xl border-slate-200 font-medium"
            />
          </div>

          {/* 2. Subject & Class Level Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Subject <span className="text-red-500">*</span>
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 focus:border-blue-500 focus:outline-none"
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Class Level <span className="text-red-500">*</span>
              </label>
              <select
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 focus:border-blue-500 focus:outline-none"
              >
                {CLASS_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Mode & Location Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Learning Mode <span className="text-red-500">*</span>
              </label>
              <select
                value={mode}
                onChange={(e) => {
                  const m = e.target.value as "Online" | "Offline";
                  setMode(m);
                  if (m === "Online" && location === "Dhanmondi, Dhaka") {
                    setLocation("Online (Google Meet)");
                  } else if (m === "Offline" && location.startsWith("Online")) {
                    setLocation("Dhanmondi, Dhaka");
                  }
                }}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 focus:border-blue-500 focus:outline-none"
              >
                <option value="Online">Online (Google Meet / Zoom)</option>
                <option value="Offline">Offline (Home / Physical Batch)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Location / Platform <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                required
                placeholder={mode === "Online" ? "Online (Google Meet)" : "e.g. Dhanmondi, Dhaka"}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1.5 h-11 rounded-xl border-slate-200"
              />
            </div>
          </div>

          {/* 4. Monthly Fee & Schedule Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Monthly Fee (BDT) <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                required
                min={500}
                placeholder="e.g. 3500"
                value={monthlyFee}
                onChange={(e) => setMonthlyFee(e.target.value ? Number(e.target.value) : "")}
                className="mt-1.5 h-11 rounded-xl border-slate-200 font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Weekly Schedule <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                required
                placeholder="e.g. 3 Days / Week (Sat, Mon, Wed)"
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(e.target.value)}
                className="mt-1.5 h-11 rounded-xl border-slate-200"
              />
            </div>
          </div>

          {/* 5. Banner Image (ImgBB Direct Upload) */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Banner Image (ImgBB Upload)
            </label>
            <div className="mt-1.5 flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-dashed border-slate-300 p-4 bg-slate-50/60">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Banner preview"
                  className="h-28 w-44 rounded-xl object-cover shadow-sm border border-slate-200"
                />
              ) : (
                <div className="flex h-28 w-44 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                  <ImageIcon size={32} />
                </div>
              )}

              <div className="space-y-2 flex-1 text-center sm:text-left">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-xl border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  <Upload size={14} className="mr-1.5" />
                  Select Image File
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <p className="text-xs text-slate-500">
                  Direct upload via ImgBB API. If omitted, a high-quality educational placeholder will be used.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Description */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Detailed Description & Batch Highlights
            </label>
            <textarea
              rows={4}
              placeholder="Outline what topics you will cover, prerequisite expectations, exam problem-solving techniques, and batch size..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Free plan allows up to 2 posts. Pro plan unlocks unlimited posts.
            </span>

            <Button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-blue-600 px-8 py-6 font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700"
            >
              <PlusCircle size={18} className="mr-2" />
              {submitting ? "Publishing..." : "Submit Tuition Listing"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
