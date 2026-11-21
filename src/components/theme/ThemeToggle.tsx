"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`h-9 w-9 rounded-xl border border-slate-200 dark:border-slate-800 ${className}`} />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative h-9 w-9 rounded-xl border border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${className}`}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={17} className="text-amber-400 transition-transform rotate-0 scale-100" />
      ) : (
        <Moon size={17} className="text-slate-700 transition-transform rotate-0 scale-100" />
      )}
    </Button>
  );
}
