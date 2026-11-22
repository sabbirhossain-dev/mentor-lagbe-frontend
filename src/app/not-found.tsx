import Link from "next/link";
import { FileQuestion, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/70 dark:bg-slate-950 px-4 py-16 transition-colors duration-200">
      <div className="w-full max-w-md rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center shadow-xl shadow-slate-200/50 dark:shadow-none">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shadow-md shadow-indigo-500/10">
          <FileQuestion size={42} />
        </div>

        <span className="mt-6 inline-block rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 px-3 py-1 text-xs font-extrabold text-indigo-700 dark:text-indigo-300">
          Error 404
        </span>

        <h1 className="mt-3 text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Page Not Found
        </h1>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Sorry, the page you are looking for doesn&apos;t exist, has been removed, or is temporarily unavailable.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link href="/">
            <Button className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white py-6 font-bold cursor-pointer shadow-md shadow-indigo-600/20">
              <Home size={18} className="mr-2" />
              Back to Home
            </Button>
          </Link>

          <Link href="/tuitions">
            <Button variant="outline" className="w-full rounded-xl border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold cursor-pointer">
              Browse Tuitions
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
