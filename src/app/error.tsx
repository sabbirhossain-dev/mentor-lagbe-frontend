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
    <div className="min-h-screen flex items-center justify-center bg-slate-50/70 dark:bg-slate-950 px-4 py-16 transition-colors duration-200">
      <div className="w-full max-w-md rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center shadow-xl shadow-red-500/5 dark:shadow-none">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 shadow-md shadow-red-500/10">
          <AlertTriangle size={42} />
        </div>

        <span className="mt-6 inline-block rounded-full bg-red-50 dark:bg-red-950/60 border border-red-200/60 dark:border-red-800/60 px-3 py-1 text-xs font-extrabold text-red-700 dark:text-red-300">
          Application Error
        </span>

        <h1 className="mt-3 text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Something Went Wrong
        </h1>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {error.message || "An unexpected error occurred. Please try again or return to the home page."}
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Button
            onClick={() => reset()}
            className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white py-6 font-bold cursor-pointer shadow-md shadow-indigo-600/20"
          >
            <RefreshCw size={18} className="mr-2" />
            Try Again
          </Button>

          <Link href="/">
            <Button variant="outline" className="w-full rounded-xl border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold cursor-pointer">
              <Home size={18} className="mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
