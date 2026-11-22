"use client";

import React from "react";

interface BrandLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "dark" | "light";
}

export function BrandLogoIcon({
  className = "h-7 w-7",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "dark" | "light";
}) {
  const strokeColor =
    variant === "dark"
      ? "stroke-indigo-400"
      : variant === "light"
      ? "stroke-indigo-600"
      : "stroke-indigo-600 dark:stroke-indigo-400";

  const fillColor =
    variant === "dark"
      ? "fill-indigo-300"
      : variant === "light"
      ? "fill-indigo-600"
      : "fill-indigo-600 dark:fill-indigo-300";

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0`}
    >
      {/* Outer Ring Emblem */}
      <circle
        cx="32"
        cy="32"
        r="26"
        stroke="#6366F1"
        className={strokeColor}
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* Mortarboard Diamond Top */}
      <path
        d="M32 17L46 24L32 31L18 24L32 17Z"
        stroke="#6366F1"
        className={strokeColor}
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Lower Headband U-curve */}
      <path
        d="M22.5 28.5V31.5C22.5 36.5 26.5 40.5 32 40.5C37.5 40.5 41.5 36.5 41.5 31.5V28.5"
        stroke="#6366F1"
        className={strokeColor}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Right Hanging Tassel */}
      <path
        d="M46 24V32.5"
        stroke="#6366F1"
        className={strokeColor}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle
        cx="46"
        cy="33.5"
        r="2"
        fill="#8B5CF6"
        className={fillColor}
      />
      <path
        d="M44 35.5L46 39.5L48 35.5"
        stroke="#6366F1"
        className={strokeColor}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BrandLogo({
  className = "",
  iconOnly = false,
  size = "md",
  variant = "default",
}: BrandLogoProps) {
  const iconSizes = {
    sm: "h-8 w-8",
    md: "h-9 w-9",
    lg: "h-11 w-11",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const mentorTextColor =
    variant === "dark"
      ? "text-white"
      : variant === "light"
      ? "text-slate-900"
      : "text-slate-900 dark:text-white";

  const lagbeTextColor =
    variant === "dark"
      ? "text-indigo-400"
      : variant === "light"
      ? "text-indigo-600"
      : "text-indigo-600 dark:text-indigo-400";

  const subtitleTextColor =
    variant === "dark"
      ? "text-slate-400"
      : variant === "light"
      ? "text-slate-500"
      : "text-slate-500 dark:text-slate-400";

  return (
    <div className={`inline-flex items-center gap-2.5 ${className} cursor-pointer select-none`}>
      <div
        className={`flex ${iconSizes[size]} items-center justify-center shrink-0 drop-shadow-sm transition-transform duration-200 hover:scale-105`}
      >
        <BrandLogoIcon className="h-full w-full" variant={variant} />
      </div>

      {!iconOnly && (
        <div className="flex flex-col select-none">
          <div className="flex items-center tracking-tight leading-normal">
            <span
              className={`${textSizes[size]} font-black ${mentorTextColor} transition-colors`}
            >
              Mentor
            </span>
            <span
              className={`${textSizes[size]} font-black ${lagbeTextColor} ml-1 transition-colors`}
            >
              Lagbe
            </span>
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${subtitleTextColor} -mt-0.5`}>
            Mentorship Platform
          </span>
        </div>
      )}
    </div>
  );
}
