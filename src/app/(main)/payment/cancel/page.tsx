"use client";

import Link from "next/link";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-slate-50/60 px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/50">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-100 text-amber-600 shadow-md shadow-amber-500/10">
          <XCircle size={44} />
        </div>

        <h1 className="mt-6 text-2xl font-black text-slate-900">
          Payment Cancelled
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Your Stripe checkout session was cancelled. No charges were made to your card or account.
        </p>

        <div className="mt-8 space-y-3">
          <Link href="/pricing" className="block w-full">
            <Button className="w-full rounded-xl bg-blue-600 font-bold hover:bg-blue-700 py-6">
              <RefreshCw size={16} className="mr-2" />
              Return to Pricing Plans
            </Button>
          </Link>

          <Link href="/" className="block w-full">
            <Button variant="outline" className="w-full rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold">
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
