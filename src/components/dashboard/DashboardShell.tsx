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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-sm font-medium text-slate-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold">
            <GraduationCap size={20} />
          </div>
          <span className="text-lg font-extrabold text-slate-900">MentorLagbe</span>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-xl text-slate-700"
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
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <GraduationCap size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-slate-900">MentorLagbe</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600">
                {role} portal
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Card */}
        <div className="m-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 border-2 border-white shadow-sm">
              <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
              <AvatarFallback className="bg-blue-600 text-white font-bold text-sm">
                {(user?.name || "U").charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-bold text-slate-900">{user?.name || "User"}</p>
              <p className="truncate text-xs text-slate-500">{user?.email}</p>
              <div className="mt-1 flex items-center gap-1.5">
                <Badge
                  className={`capitalize text-[10px] py-0 px-2 font-bold ${
                    role === "admin"
                      ? "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100"
                      : role === "tutor"
                      ? "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100"
                      : "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                  }`}
                >
                  {role}
                </Badge>
                {user?.plan === "pro" && (
                  <Badge className="bg-amber-100 text-amber-800 border-amber-300 text-[10px] py-0 px-1.5 font-bold">
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
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon size={18} className={isActive ? "text-white" : "text-slate-500"} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="border-t border-slate-100 p-4 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Home size={16} className="text-slate-500" />
            <span>Back to Public Website</span>
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto min-h-screen">
        <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
