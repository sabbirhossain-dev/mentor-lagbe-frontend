"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/60 px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-red-500/5">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-600 shadow-md shadow-red-500/10">
          <AlertTriangle size={42} />
        </div>

        <span className="mt-6 inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-extrabold text-red-700">
          Application Error
        </span>

        <h1 className="mt-3 text-2xl font-black text-slate-900">
          Something Went Wrong
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {error.message || "An unexpected error occurred. Please try again or return to the home page."}
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Button
            onClick={() => reset()}
            className="w-full rounded-xl bg-blue-600 py-6 font-bold hover:bg-blue-700"
          >
            <RefreshCw size={18} className="mr-2" />
            Try Again
          </Button>

          <Link href="/">
            <Button variant="outline" className="w-full rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold">
              <Home size={18} className="mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
