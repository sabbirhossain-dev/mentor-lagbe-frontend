"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  GraduationCap,
  Menu,
  X,
  BookOpen,
  Home,
  CreditCard,
  Info,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";

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

  // Check whether a navigation link is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  // Navigate and close mobile menu
  const handleNavigation = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  const { data: session } = authClient.useSession();

  const user = session?.user;
  //   console.log(user);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <GraduationCap size={26} />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Mentor<span className="text-blue-600">Lagbe</span>
            </h1>

            <p className="text-[11px] font-medium tracking-wide text-slate-500">
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
                  ? "text-blue-600"
                  : "text-slate-600 hover:text-blue-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Authentication Buttons */}
        {user ? (
          <>
            <div className="border border-slate-200 py-2 px-5 ">
              <p className="font-semibold">{user.name}</p>
            </div>
          </>
        ) : (
          <div className="hidden items-center gap-3 md:flex">
            <Button
              variant="ghost"
              className="rounded-xl font-semibold cursor-pointer text-slate-700 hover:text-blue-600"
              onClick={() => router.push("/sign-in")}
            >
              Sign In
            </Button>

            <Button
              className="rounded-xl bg-blue-600 px-5 py-5 font-semibold cursor-pointer text-white shadow-md shadow-blue-600/20 hover:bg-blue-700"
              onClick={() => router.push("/sign-up")}
            >
              Get Started
            </Button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl border-slate-200"
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
          className="w-[300px] border-l border-slate-200 bg-white p-0 sm:w-[350px]"
        >
          {/* Mobile Menu Header */}
          <SheetHeader className="border-b border-slate-100 p-5 text-left">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <GraduationCap size={24} />
              </div>

              <div>
                <SheetTitle className="text-lg font-bold text-slate-900">
                  Mentor<span className="text-blue-600">Lagbe</span>
                </SheetTitle>

                <p className="text-xs text-slate-500">
                  Smart Tuition & Mentorship
                </p>
              </div>
            </div>
          </SheetHeader>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col gap-2 p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              Navigation
            </p>

            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <button
                  key={link.href}
                  onClick={() => handleNavigation(link.href)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors ${
                    isActive(link.href)
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                  }`}
                >
                  <Icon size={19} />
                  {link.name}
                </button>
              );
            })}

            {/* Mobile Authentication Buttons */}
            <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5">
              <Button
                variant="outline"
                className="w-full rounded-xl border-slate-200 font-semibold"
                onClick={() => handleNavigation("/sign-in")}
              >
                Sign In
              </Button>

              <Button
                className="w-full rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700"
                onClick={() => handleNavigation("/sign-up")}
              >
                Get Started
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
