"use client";

import React from "react";

interface BrandLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export function BrandLogoIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="ml-logo-grad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="0.5" stopColor="#4F46E5" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="ml-spark-grad" x1="14" y1="2" x2="18" y2="10" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="1" stopColor="#FBBF24" />
        </linearGradient>
      </defs>

      {/* Hexagonal Academic Crest Shield Background */}
      <path
        d="M16 3L27 9V17C27 23.5 16 29 16 29C16 29 5 23.5 5 17V9L16 3Z"
        fill="url(#ml-logo-grad)"
      />

      {/* Inner Stylized Interconnected "M" representing Mentorship & Learning */}
      <path
        d="M10 20V12.5L16 16.5L22 12.5V20"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Beacon Spark / Academic Star symbolizing Guidance */}
      <path
        d="M16 6.5L17.2 9.5L20 10.2L17.8 12L18.5 15L16 13.5L13.5 15L14.2 12L12 10.2L14.8 9.5L16 6.5Z"
        fill="url(#ml-spark-grad)"
      />
    </svg>
  );
}

export default function BrandLogo({
  className = "",
  iconOnly = false,
  size = "md",
}: BrandLogoProps) {
  const iconSizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div
        className={`flex ${iconSizes[size]} items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 p-2 text-white shadow-lg shadow-indigo-600/25 transition-transform hover:scale-105`}
      >
        <BrandLogoIcon className="h-full w-full" />
      </div>

      {!iconOnly && (
        <div className="flex flex-col">
          <span className={`${textSizes[size]} font-black tracking-tight text-slate-900 dark:text-white leading-none`}>
            Mentor<span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">Lagbe</span>
          </span>
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-0.5">
            Smart Mentorship Platform
          </span>
        </div>
      )}
    </div>
  );
}
