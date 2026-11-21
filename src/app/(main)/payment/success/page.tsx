"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight, Sparkles, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-slate-50/60 px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-emerald-500/5">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600 shadow-md shadow-emerald-500/20">
          <CheckCircle2 size={44} />
        </div>

        <h1 className="mt-6 text-2xl font-black text-slate-900">
          Subscription Upgraded!
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Thank you for subscribing to MentorLagbe Pro. Your account features, badges, and limits have been updated.
        </p>

        <div className="mt-6 rounded-2xl bg-emerald-50/80 p-4 border border-emerald-100 text-xs text-emerald-800 font-semibold flex items-center justify-center gap-2">
          <Sparkles size={16} className="text-emerald-600" />
          Pro Plan Activated Successfully
        </div>

        <div className="mt-8 space-y-3">
          <Link href="/dashboard/student" className="block w-full">
            <Button className="w-full rounded-xl bg-blue-600 font-bold hover:bg-blue-700 py-6">
              Go to My Dashboard
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>

          <Link href="/tuitions" className="block w-full">
            <Button variant="outline" className="w-full rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold">
              Browse Tuitions
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
