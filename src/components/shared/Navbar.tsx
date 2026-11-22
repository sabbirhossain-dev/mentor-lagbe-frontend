"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import {
  Menu,
  Home,
  BookOpen,
  CreditCard,
  Info,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  UserRound,
  Compass,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import BrandLogo from "@/components/shared/BrandLogo";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { authClient } from "@/lib/auth-client";
import { clearAuthToken } from "@/lib/api";
import { dashboardPathFor } from "@/lib/roles";

// Distinct modern navigation links
const navLinks = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Find a Mentor",
    href: "/tuitions",
    icon: Compass,
    badge: "Active",
  },
  {
    name: "Pro Membership",
    href: "/pricing",
    icon: Sparkles,
  },
  {
    name: "Why Us",
    href: "/about",
    icon: ShieldCheck,
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Better Auth session
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  // Check active navigation link
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  // Dashboard navigation
  const handleDashboard = () => {
    if (!user) return;

    setIsOpen(false);
    router.push(dashboardPathFor(user?.role));
  };

  // User initials
  const userInitials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  // Logout handler
  const handleSignOut = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);

      await authClient.signOut();

      clearAuthToken();

      setIsOpen(false);

      router.replace("/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/90 dark:border-slate-800 dark:bg-slate-900/90 backdrop-blur-xl transition-colors duration-200">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group">
          <BrandLogo size="md" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1.5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-3.5 py-2 rounded-xl text-sm transition-all flex items-center gap-1.5 ${
                isActive(link.href)
                  ? "font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50/90 dark:bg-indigo-950/50 shadow-xs"
                  : "font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/60"
              }`}
            >
              <span>{link.name}</span>
              {/* {link.badge && (
                <span className="rounded-full bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.2 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                  {link.badge}
                </span>
              )} */}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-2xl border border-slate-200/80 px-2.5 py-1.5 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/80 transition-all outline-none cursor-pointer">
                <Avatar className="h-8 w-8 border border-indigo-200 dark:border-indigo-800">
                  <AvatarImage
                    src={user?.image || ""}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback className="bg-indigo-600 text-xs font-bold text-white">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>

                <div className="hidden text-left lg:block">
                  <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                    {user?.name || "User"}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {user?.role}
                  </p>
                </div>

                <ChevronDown size={14} className="text-slate-400" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 rounded-2xl border-slate-200 p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="px-3 py-2">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {user?.name}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {user?.email}
                  </p>
                </div>

                <DropdownMenuSeparator className="dark:bg-slate-800" />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={handleDashboard}
                    className="cursor-pointer rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <LayoutDashboard
                      size={15}
                      className="mr-2 text-indigo-600 dark:text-indigo-400"
                    />
                    Dashboard
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => router.push("/dashboard/profile")}
                    className="cursor-pointer rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <UserRound
                      size={15}
                      className="mr-2 text-indigo-600 dark:text-indigo-400"
                    />
                    Account Profile
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="dark:bg-slate-800" />

                <DropdownMenuItem
                  onClick={handleSignOut}
                  disabled={isLoggingOut}
                  className="cursor-pointer rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                >
                  <LogOut size={15} className="mr-2" />
                  {isLoggingOut ? "Signing out..." : "Sign Out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  className="rounded-xl px-4 text-xs font-bold text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400"
                >
                  Sign In
                </Button>
              </Link>

              <Link href="/sign-up">
                <Button className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:from-indigo-700 hover:to-violet-700">
                  Get Started Free
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger & Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(true)}
            className="rounded-sm text-slate-700 dark:text-slate-200 border border-blue-950 p-1"
          >
            <Menu size={26} />
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="w-80 border-slate-200 bg-white p-0 dark:border-slate-800 dark:bg-slate-900"
        >
          <SheetHeader className="border-b border-slate-100 p-6 text-left dark:border-slate-800">
            <SheetTitle>
              <BrandLogo size="sm" />
            </SheetTitle>
          </SheetHeader>

          {/* User Status Card */}
          {user && (
            <div className="m-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-800/60">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-indigo-200 dark:border-indigo-800">
                  <AvatarImage
                    src={user?.image || ""}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback className="bg-indigo-600 text-xs font-bold text-white">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-slate-900 dark:text-white">
                    {user?.name}
                  </p>
                  <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                    {user?.email}
                  </p>
                  <span className="inline-block mt-0.5 rounded-full bg-indigo-100 px-2 py-0.2 text-[10px] font-bold capitalize text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    {user?.role}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="space-y-1 p-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    isActive(link.href)
                      ? "bg-indigo-50 font-bold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={18}
                      className="text-indigo-600 dark:text-indigo-400"
                    />
                    <span>{link.name}</span>
                  </div>
                  {/* {link.badge && (
                    <span className="rounded-full bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                      {link.badge}
                    </span>
                  )} */}
                </Link>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="border-t border-slate-100 p-6 dark:border-slate-800 space-y-3">
            {user ? (
              <>
                <Button
                  onClick={handleDashboard}
                  className="w-full rounded-xl bg-indigo-600 font-semibold text-white hover:bg-indigo-700"
                >
                  <LayoutDashboard size={16} className="mr-2" />
                  Go to Dashboard
                </Button>

                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  disabled={isLoggingOut}
                  className="w-full rounded-xl border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/40"
                >
                  <LogOut size={16} className="mr-2" />
                  {isLoggingOut ? "Signing out..." : "Sign Out"}
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  <Button
                    variant="outline"
                    className="w-full rounded-xl font-bold dark:border-slate-800"
                  >
                    Sign In
                  </Button>
                </Link>

                <Link
                  href="/sign-up"
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  <Button className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 font-bold text-white">
                    Create Free Account
                  </Button>
                </Link>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
