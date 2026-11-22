import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center transition-colors">
      <div className="relative flex h-16 w-16 items-center justify-center">
        {/* Outer spinning gradient ring */}
        <div className="absolute inset-0 rounded-2xl border-2 border-indigo-500/20 border-t-indigo-600 animate-spin" />
        
        {/* Pulsing glow */}
        <div className="absolute inset-1 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 animate-pulse" />
        
        {/* Center icon badge */}
        <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25">
          <Sparkles size={22} className="animate-pulse" />
        </div>
      </div>
      
      <p className="mt-5 text-sm font-bold text-slate-800 dark:text-slate-200 tracking-wide">
        Loading MentorLagbe...
      </p>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Fetching personalized educational resources
      </p>
    </div>
  );
}
