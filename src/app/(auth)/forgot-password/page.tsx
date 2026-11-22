"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft, CheckCircle2, GraduationCap, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Password reset instructions sent!");
    }, 800);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12 transition-colors">
      <div className="w-full max-w-md rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl">
        <Link href="/sign-in" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 mb-6 transition-colors">
          <ArrowLeft size={15} />
          Back to Sign In
        </Link>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 mb-5">
          <Mail size={24} />
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Reset Your Password
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Enter the email associated with your MentorLagbe account and we'll send you recovery instructions.
        </p>

        {submitted ? (
          <div className="mt-6 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/40 p-5 text-center">
            <CheckCircle2 size={36} className="mx-auto text-emerald-600 dark:text-emerald-400" />
            <h3 className="mt-3 font-bold text-slate-900 dark:text-white text-base">Check Your Inbox</h3>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
              We have dispatched recovery details to <strong className="text-slate-900 dark:text-white">{email}</strong>.
            </p>
            <Link href="/sign-in" className="mt-5 inline-block">
              <Button size="sm" className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">Return to Sign In</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-xl bg-indigo-600 font-bold text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/20"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        )}
      </div>
    </main>
  );
}
