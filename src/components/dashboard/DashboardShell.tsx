"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bookmark,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  CreditCard,
  FileText,
  GraduationCap,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  PlusCircle,
  Receipt,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sun,
  Moon,
  UserCheck,
  UserRound,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { clearAuthToken } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import BrandLogo from "@/components/shared/BrandLogo";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Protect dashboard routes - redirect if not logged in
  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/sign-in");
    }
  }, [isPending, user, router]);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      clearAuthToken();
      router.push("/");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const role = user?.role || "student";

  // Navigation items tailored to each role
  const getNavItems = (): NavItem[] => {
    if (role === "admin") {
      return [
        { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
        { label: "User Management", href: "/dashboard/admin/users", icon: Users },
        { label: "Tuition Approvals", href: "/dashboard/admin/tuitions", icon: ClipboardList },
        { label: "Transactions", href: "/dashboard/admin/transactions", icon: Receipt },
        { label: "Update Profile", href: "/dashboard/profile", icon: UserRound },
      ];
    }

    if (role === "tutor") {
      return [
        { label: "Overview", href: "/dashboard/tutor", icon: LayoutDashboard },
        { label: "Post a Tuition", href: "/dashboard/tutor/post-tuition", icon: PlusCircle },
        { label: "My Created Tuitions", href: "/dashboard/tutor/my-tuitions", icon: BookOpen },
        { label: "Manage Applicants", href: "/dashboard/tutor/applicants", icon: Users },
        { label: "Update Profile", href: "/dashboard/profile", icon: UserRound },
      ];
    }

    // Default: student
    return [
      { label: "Overview", href: "/dashboard/student", icon: LayoutDashboard },
      { label: "My Applications", href: "/dashboard/student/my-applications", icon: FileText },
      { label: "Saved Tuitions", href: "/dashboard/student/saved", icon: Bookmark },
      { label: "Browse Tuitions", href: "/tuitions", icon: Search },
      { label: "Update Profile", href: "/dashboard/profile", icon: UserRound },
    ];
  };

  const navItems = getNavItems();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col lg:flex-row transition-colors duration-200">
      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 shadow-sm">
        <Link href="/">
          <BrandLogo size="sm" />
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </Button>
        </div>
      </header>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 dark:border-slate-800 px-6">
          <Link href="/">
            <BrandLogo size="sm" />
          </Link>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Card */}
        <div className="m-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 border-2 border-white dark:border-slate-700 shadow-sm">
              <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
              <AvatarFallback className="bg-indigo-600 text-white font-bold text-sm">
                {(user?.name || "U").charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-bold text-slate-900 dark:text-white">{user?.name || "User"}</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
              <div className="mt-1 flex items-center gap-1.5">
                <Badge
                  className={`capitalize text-[10px] py-0 px-2 font-bold ${
                    role === "admin"
                      ? "bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                      : role === "tutor"
                      ? "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800"
                      : "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                  }`}
                >
                  {role}
                </Badge>
                {user?.plan === "pro" && (
                  <Badge className="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700 text-[10px] py-0 px-1.5 font-bold">
                    PRO
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 space-y-1.5 px-4 py-2 overflow-y-auto">
          <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Navigation
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon size={18} className={isActive ? "text-white" : "text-slate-500 dark:text-slate-400"} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="border-t border-slate-100 dark:border-slate-800 p-4 space-y-2.5">
          {/* Appearance / Theme Toggle Row */}
          <div className="flex items-center justify-between rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-3.5 py-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <Sun size={15} className="text-amber-500 dark:hidden" />
              <Moon size={15} className="text-indigo-400 hidden dark:block" />
              <span>Appearance</span>
            </div>
            <ThemeToggle className="h-8 w-8" />
          </div>

          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Home size={16} className="text-slate-500 dark:text-slate-400" />
            <span>Back to Public Website</span>
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto min-h-screen flex flex-col">
        {/* Desktop Top Header Bar */}
        <header className="hidden lg:flex sticky top-0 z-30 h-16 items-center justify-between border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 px-8 backdrop-blur-md">
          <div className="flex items-center gap-2.5 text-sm">
            <span className="font-bold text-slate-900 dark:text-white capitalize">
              {navItems.find((item) => item.href === pathname)?.label || "Dashboard Overview"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <Home size={14} />
              Public Website
            </Link>
          </div>
        </header>

        <div className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
