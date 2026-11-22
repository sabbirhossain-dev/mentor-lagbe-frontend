"use client";

import React from "react";

interface BrandLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export function BrandLogoIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="ml-cap-grad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="0.5" stopColor="#4F46E5" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>

      {/* Outer Ring Emblem */}
      <circle
        cx="32"
        cy="32"
        r="26"
        stroke="url(#ml-cap-grad)"
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* Mortarboard Diamond Top */}
      <path
        d="M32 17L46 24L32 31L18 24L32 17Z"
        stroke="url(#ml-cap-grad)"
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Lower Headband U-curve */}
      <path
        d="M22.5 28.5V31.5C22.5 36.5 26.5 40.5 32 40.5C37.5 40.5 41.5 36.5 41.5 31.5V28.5"
        stroke="url(#ml-cap-grad)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Right Hanging Tassel */}
      <path
        d="M46 24V32.5"
        stroke="url(#ml-cap-grad)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="46" cy="33.5" r="1.5" fill="#8B5CF6" />
      <path
        d="M44.5 35L46 38.5L47.5 35"
        stroke="url(#ml-cap-grad)"
        strokeWidth="2"
        strokeLinejoin="round"
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
    <div className={`inline-flex items-center gap-3 ${className} cursor-pointer`}>
      <div
        className={`flex ${iconSizes[size]} items-center justify-center shrink-0 drop-shadow-md transition-transform duration-200 hover:scale-105`}
      >
        <BrandLogoIcon className="h-full w-full" />
      </div>

      {!iconOnly && (
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className={`${textSizes[size]} font-black tracking-tight text-slate-900 dark:text-white leading-none`}>
              Mentor
            </span>
            <span className={`${textSizes[size]} font-black tracking-tight bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent leading-none ml-0.5`}>
              Lagbe
            </span>
          </div>
          <span className="text-[9.5px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-1">
            Mentorship Platform
          </span>
        </div>
      )}
    </div>
  );
}
