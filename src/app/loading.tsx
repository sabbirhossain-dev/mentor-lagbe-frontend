import { GraduationCap } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-2xl bg-blue-400 opacity-20" />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
          <GraduationCap size={28} />
        </div>
      </div>
      <p className="mt-5 text-sm font-bold text-slate-800 tracking-wide">
        Loading MentorLagbe...
      </p>
      <p className="mt-1 text-xs text-slate-400">
        Fetching the latest mentorship data for you
      </p>
    </div>
  );
}
