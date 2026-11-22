"use client";

import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import {
  Camera,
  CheckCircle2,
  Mail,
  Phone,
  Save,
  Shield,
  Upload,
  User,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { uploadImageToImgBB } from "@/lib/uploadImage";
import type { UserProfile } from "@/types";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const sessionUser = session?.user;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch current user details from backend
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await apiFetch<{ success: boolean; user: UserProfile }>("/users/me");
        if (res.success && res.user) {
          setName(res.user.name || "");
          setPhone(res.user.phone || "");
          setBio(res.user.bio || "");
          setImage(res.user.image || "");
          setPreviewUrl(res.user.image || "");
        }
      } catch (err: unknown) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    setSaving(true);
    let finalImageUrl = image;

    try {
      // 1. If user selected a new file, upload to ImgBB
      if (selectedFile) {
        try {
          finalImageUrl = await uploadImageToImgBB(selectedFile);
        } catch (uploadErr: unknown) {
          const errMsg =
            uploadErr instanceof Error ? uploadErr.message : "Failed to upload image";
          toast.error(errMsg);
          setSaving(false);
          return;
        }
      }

      // 2. Send PATCH to backend
      const res = await apiFetch<{ success: boolean; message: string }>("/users/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          bio: bio.trim(),
          image: finalImageUrl,
        }),
      });

      if (res.success) {
        setImage(finalImageUrl);
        setSelectedFile(null);
        toast.success("Profile updated successfully!");
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Failed to update profile";
      toast.error(errMsg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-8 w-48 rounded-xl bg-slate-100 dark:bg-slate-800" />
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Skeleton className="h-72 w-full rounded-2xl bg-slate-100 dark:bg-slate-800" />
          </div>
          <div className="lg:col-span-8">
            <Skeleton className="h-96 w-full rounded-2xl bg-slate-100 dark:bg-slate-800" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Account Profile</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your personal information, contact phone, and avatar.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Side: Avatar Card */}
        <div className="lg:col-span-4">
          <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center shadow-sm">
            <div className="relative mx-auto h-32 w-32">
              <Avatar className="h-32 w-32 border-4 border-slate-100 dark:border-slate-700 shadow-md">
                <AvatarImage src={previewUrl || image} alt={name || "User"} />
                <AvatarFallback className="bg-indigo-600 text-3xl font-extrabold text-white">
                  {(name || "U").charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-transform hover:scale-105 hover:bg-indigo-700"
                title="Change Photo"
              >
                <Camera size={18} />
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{name || "User Name"}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{sessionUser?.email}</p>

            <div className="mt-3 flex items-center justify-center gap-2">
              <Badge className="capitalize text-xs font-bold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                {sessionUser?.role || "student"}
              </Badge>
              <Badge className="capitalize text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                Plan: {sessionUser?.plan || "free"}
              </Badge>
            </div>

            <p className="mt-6 text-xs text-slate-400">
              Photos uploaded directly to ImgBB CDN (JPEG, PNG, WebP up to 5MB).
            </p>
          </Card>
        </div>

        {/* Right Side: Profile Details Form */}
        <div className="lg:col-span-8">
          <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <UserRound size={18} className="text-indigo-600 dark:text-indigo-400" />
              Personal Information
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Full Name
                </label>
                <Input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="mt-1.5 h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Email Address
                </label>
                <Input
                  type="email"
                  disabled
                  value={sessionUser?.email || ""}
                  className="mt-1.5 h-11 rounded-xl bg-slate-50 dark:bg-slate-800/60 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Email is locked to your authenticated login.
                </span>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +880 1700-000000"
                  className="mt-1.5 h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Bio / Academic Summary
                </label>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell students or tutors about your background, achievements, and subject interests..."
                  className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 p-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {selectedFile && (
                <div className="rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50/60 dark:bg-indigo-950/60 p-3 text-xs text-indigo-700 dark:text-indigo-300 flex items-center justify-between">
                  <span>Selected file: <strong>{selectedFile.name}</strong></span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(image);
                    }}
                    className="text-red-500 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}

              <div className="pt-3">
                <Button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-indigo-600 px-6 py-5 font-semibold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700"
                >
                  <Save size={16} className="mr-2" />
                  {saving ? "Saving Changes..." : "Save Profile Changes"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
