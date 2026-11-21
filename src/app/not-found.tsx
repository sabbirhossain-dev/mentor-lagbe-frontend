import Link from "next/link";
import { ArrowLeft, FileQuestion, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/60 px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/50">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600 shadow-md shadow-blue-500/10">
          <FileQuestion size={42} />
        </div>

        <span className="mt-6 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-extrabold text-blue-700">
          Error 404
        </span>

        <h1 className="mt-3 text-3xl font-black text-slate-900">
          Page Not Found
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Sorry, the page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link href="/">
            <Button className="w-full rounded-xl bg-blue-600 py-6 font-bold hover:bg-blue-700">
              <Home size={18} className="mr-2" />
              Back to Home
            </Button>
          </Link>

          <Link href="/tuitions">
            <Button variant="outline" className="w-full rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold">
              Browse Tuitions
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
