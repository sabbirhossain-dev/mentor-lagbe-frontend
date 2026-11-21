"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { CheckCircle2, ArrowRight, Sparkles, Loader2, ShieldCheck, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import type { PaymentRecord } from "@/types";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [verifying, setVerifying] = useState(true);
  const [paymentData, setPaymentData] = useState<PaymentRecord | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setVerifying(false);
      return;
    }

    const verify = async () => {
      try {
        const res = await apiFetch<{ success: boolean; message: string; payment: any }>(
          "/payments/verify-session",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId }),
          }
        );

        if (res.success) {
          setPaymentData(res.payment);
          toast.success("Pro subscription verified & activated!");
        }
      } catch (err: any) {
        console.error("Verification failed:", err);
        setError(err.message || "Could not automatically verify session");
      } finally {
        setVerifying(false);
      }
    };

    verify();
  }, [sessionId]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-slate-50/60 px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-emerald-500/5">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600 shadow-md shadow-emerald-500/20">
          {verifying ? (
            <Loader2 size={36} className="animate-spin text-emerald-600" />
          ) : (
            <CheckCircle2 size={44} />
          )}
        </div>

        <h1 className="mt-6 text-2xl font-black text-slate-900">
          {verifying ? "Verifying Subscription..." : "Subscription Upgraded!"}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {verifying
            ? "Syncing your payment confirmation with our database..."
            : "Thank you for subscribing to MentorLagbe Pro. Your account features, badges, and limits have been activated."}
        </p>

        {paymentData && (
          <div className="mt-6 rounded-2xl bg-emerald-50/80 p-4 border border-emerald-100 text-left space-y-1.5 text-xs text-emerald-900">
            <div className="flex items-center justify-between font-bold">
              <span>{paymentData.planName}</span>
              <span className="text-emerald-700">${paymentData.amount} {paymentData.currency}</span>
            </div>
            <p className="text-[11px] text-emerald-700 font-mono truncate">
              Tx: {paymentData.transactionId}
            </p>
          </div>
        )}

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

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[75vh] flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-blue-600" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
