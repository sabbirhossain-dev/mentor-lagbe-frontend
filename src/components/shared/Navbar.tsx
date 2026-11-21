"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import {
  GraduationCap,
  Menu,
  Home,
  BookOpen,
  CreditCard,
  Info,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  UserRound,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

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

// Navbar navigation links
const navLinks = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Browse Tuitions",
    href: "/tuitions",
    icon: BookOpen,
  },
  {
    name: "Pricing",
    href: "/pricing",
    icon: CreditCard,
  },
  {
    name: "About",
    href: "/about",
    icon: Info,
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

  console.log(user);

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
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <GraduationCap size={26} />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Mentor<span className="text-blue-600">Lagbe</span>
            </h1>

            <p className="text-[11px] font-medium tracking-wide text-slate-500 dark:text-slate-400">
              Smart Tuition & Mentorship
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors ${
                isActive(link.href)
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Authentication & Theme Toggle */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          {isPending ? (
            <div className="h-10 w-32 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
          ) : user ? (
            <DropdownMenu>
              {/* User Profile Trigger */}
              <DropdownMenuTrigger className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-2 outline-none ring-0 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus-visible:outline-none focus-visible:ring-0">
                <Avatar className="h-10 w-10 border border-blue-100 dark:border-blue-900">
                  <AvatarImage
                    src={user.image || ""}
                    alt={user.name || "User"}
                  />

                  <AvatarFallback className="bg-blue-50 font-semibold text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>

                <div className="text-left">
                  <p className="max-w-32 truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {user.name}
                  </p>

                  <p className="text-xs capitalize text-slate-500 dark:text-slate-400">
                    {user.role || "Member"}
                  </p>
                </div>

                <ChevronDown size={16} className="text-slate-500 dark:text-slate-400" />
              </DropdownMenuTrigger>

              {/* User Dropdown */}
              <DropdownMenuContent
                align="end"
                className="w-56 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-xl ring-0 outline-none"
              >
                <DropdownMenuGroup>
                  {/* User Information */}
                  <div className="px-2 py-2">
                    <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {user.name}
                    </p>

                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {user.email}
                    </p>

                    <p className="mt-1 text-xs font-medium capitalize text-blue-600 dark:text-blue-400">
                      {user.role || "student"}
                    </p>
                  </div>

                  <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />

                  {/* Dashboard */}
                  <DropdownMenuItem
                    onClick={handleDashboard}
                    className="cursor-pointer gap-2 rounded-lg py-2 text-slate-700 dark:text-slate-200 focus:bg-blue-50 dark:focus:bg-blue-950/60 focus:text-blue-600 dark:focus:text-blue-400"
                  >
                    <LayoutDashboard size={17} />
                    <span>Dashboard</span>
                  </DropdownMenuItem>

                  {/* Update Profile */}
                  <DropdownMenuItem
                    onClick={() => router.push("/dashboard/profile")}
                    className="cursor-pointer gap-2 rounded-lg py-2 text-slate-700 dark:text-slate-200 focus:bg-blue-50 dark:focus:bg-blue-950/60 focus:text-blue-600 dark:focus:text-blue-400"
                  >
                    <UserRound size={17} />
                    <span>Update Profile</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />

                  {/* Logout */}
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    disabled={isLoggingOut}
                    className="cursor-pointer gap-2 rounded-lg py-2 text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/40 focus:text-red-600"
                  >
                    <LogOut size={17} />
                    {isLoggingOut ? "Signing out..." : "Sign Out"}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-blue-700"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu & Theme Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-xl border-slate-200 dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="w-[300px] border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-0 sm:w-[350px]"
        >
          {/* Mobile Menu Header */}
          <SheetHeader className="border-b border-slate-100 dark:border-slate-800 p-5 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <GraduationCap size={24} />
                </div>

                <div>
                  <SheetTitle className="text-lg font-bold text-slate-900 dark:text-white">
                    Mentor<span className="text-blue-600">Lagbe</span>
                  </SheetTitle>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Smart Tuition & Mentorship
                  </p>
                </div>
              </div>

              <ThemeToggle />
            </div>
          </SheetHeader>

          <div className="flex flex-col gap-2 p-5">
            {/* Navigation Links */}
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              Navigation
            </p>

            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    isActive(link.href)
                      ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  <Icon size={19} />
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Authentication */}
            <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 dark:border-slate-800 pt-5">
              {isPending ? (
                <div className="h-20 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
              ) : user ? (
                <>
                  {/* User Information */}
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 p-3">
                    <Avatar className="h-11 w-11 border border-blue-100 dark:border-blue-900">
                      <AvatarImage
                        src={user.image || ""}
                        alt={user.name || "User"}
                      />

                      <AvatarFallback className="bg-blue-50 font-semibold text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {user.name}
                      </p>

                      <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                        {user.email}
                      </p>

                      <p className="mt-1 text-xs font-medium capitalize text-blue-600 dark:text-blue-400">
                        {user.role || "Member"}
                      </p>
                    </div>
                  </div>

                  {/* Dashboard Button */}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start gap-2 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 font-semibold"
                    onClick={handleDashboard}
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Button>

                  {/* Update Profile Button */}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start gap-2 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 font-semibold"
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/dashboard/profile");
                    }}
                  >
                    <UserRound size={18} />
                    Update Profile
                  </Button>

                  {/* Logout Button */}
                  <Button
                    type="button"
                    variant="destructive"
                    className="w-full justify-start gap-2 rounded-xl font-semibold"
                    onClick={handleSignOut}
                    disabled={isLoggingOut}
                  >
                    <LogOut size={18} />
                    {isLoggingOut ? "Signing out..." : "Sign Out"}
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    onClick={() => setIsOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 dark:text-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/sign-up"
                    onClick={() => setIsOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
