"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  FileText,
  Bookmark,
  CreditCard,
  UserRound,
  GraduationCap,
  Bell,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  BriefcaseBusiness,
  Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const navigation = [
  { label: "Overview", href: "/dashboard/student", icon: LayoutDashboard },
  { label: "Find Tuition", href: "/tuitions", icon: Search },
  {
    label: "My Applications",
    href: "/dashboard/student/applications",
    icon: FileText,
  },
  {
    label: "Saved Tuitions",
    href: "/dashboard/student/saved",
    icon: Bookmark,
  },
  {
    label: "Subscription",
    href: "/dashboard/student/subscription",
    icon: CreditCard,
  },
  {
    label: "My Profile",
    href: "/dashboard/student/profile",
    icon: UserRound,
  },
];

const stats = [
  {
    title: "Total Applications",
    description: "All submitted applications",
    icon: FileText,
  },
  {
    title: "Pending Applications",
    description: "Waiting for tutor response",
    icon: Clock,
  },
  {
    title: "Accepted Applications",
    description: "Successfully accepted",
    icon: CheckCircle2,
  },
  {
    title: "Saved Tuitions",
    description: "Your saved opportunities",
    icon: Bookmark,
  },
];

function EmptySkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 rounded-lg bg-slate-50 p-4"
        >
          <Skeleton className="h-11 w-11 rounded-lg border-0" />

          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3 border-0" />
            <Skeleton className="h-3 w-1/3 border-0" />
          </div>

          <Skeleton className="h-6 w-20 rounded-full border-0" />
        </div>
      ))}
    </div>
  );
}

export default function StudentDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-[1600px]">
        {/* Dashboard Sidebar */}
        <aside className="hidden w-64 shrink-0 border-0 bg-white lg:block">
          <div className="sticky top-0 flex h-screen flex-col p-5">
            <Link href="/" className="mb-9 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <GraduationCap size={24} />
              </div>

              <span className="text-xl font-bold text-slate-900">
                Mentor<span className="text-blue-600">Lagbe</span>
              </span>
            </Link>

            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Student Menu
            </p>

            <nav className="space-y-1">
              {navigation.map(({ label, href, icon: Icon }, index) => (
                <Link
                  key={label}
                  href={href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                    index === 0
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                  }`}
                >
                  <Icon size={19} />
                  {label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto">
              <Separator className="mb-4 h-px border-0 bg-slate-100" />

              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-600 hover:bg-slate-50"
              >
                <Settings size={19} />
                Back to Website
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Dashboard */}

        <main className="min-w-0 flex-1 bg-[#F8FAFC]">
          {/* Header */}
          <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between bg-white/90 px-5 shadow-[0_2px_15px_rgba(15,23,42,0.03)] backdrop-blur-xl sm:px-8">
            <div>
              <p className="text-xs font-medium tracking-wide text-slate-400">
                STUDENT DASHBOARD
              </p>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Overview
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-0 bg-blue-50 text-blue-700 shadow-none hover:bg-blue-100"
                aria-label="Profile"
                onClick={() => router.push("/dashboard/student/profile")}
              >
                <UserRound className="h-5 w-5" />
              </Button>
            </div>
          </header>

          <div className="space-y-9 p-5 sm:p-8">
            {/* Welcome Banner */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 p-7 text-white shadow-xl shadow-blue-600/10 sm:p-10">
              {/* Background Decoration */}
              <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-24 right-1/3 h-64 w-64 rounded-full bg-indigo-300/10 blur-3xl" />

              <div className="relative z-10 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
                <div className="max-w-xl">
                  <Badge className="mb-5 border-0 bg-white/15 px-4 py-1.5 text-white hover:bg-white/20">
                    <Sparkles className="mr-2 h-3.5 w-3.5" />
                    Student Account
                  </Badge>

                  <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    Welcome back!
                  </h2>

                  <p className="mt-4 max-w-lg text-sm leading-7 text-blue-100 sm:text-base">
                    Find your perfect tutor, manage your applications, and make
                    your learning journey more successful with MentorLagbe.
                  </p>

                  <Button
                    className="mt-7 rounded-xl border-0 bg-white px-6 font-semibold text-blue-700 shadow-lg shadow-blue-950/10 hover:bg-blue-50"
                    onClick={() => router.push("/tuitions")}
                  >
                    Find a Tuition
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="hidden h-40 w-40 items-center justify-center rounded-3xl bg-white/10 shadow-inner backdrop-blur-md sm:flex">
                  <GraduationCap
                    size={90}
                    strokeWidth={1.2}
                    className="text-white"
                  />
                </div>
              </div>
            </section>

            {/* Statistics */}
            <section>
              <div className="mb-6">
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  Your Activity
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Overview of your tuition activities and progress.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map(({ title, description, icon: Icon }, index) => {
                  const colors = [
                    "bg-blue-50 text-blue-600",
                    "bg-amber-50 text-amber-600",
                    "bg-emerald-50 text-emerald-600",
                    "bg-violet-50 text-violet-600",
                  ];

                  return (
                    <Card
                      key={title}
                      className="group gap-4 rounded-2xl border-0 bg-white shadow-[0_4px_25px_rgba(15,23,42,0.035)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/5"
                    >
                      <CardContent className="p-5 sm:p-6">
                        <div className="flex items-center justify-between">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colors[index]} transition-transform duration-300 group-hover:scale-110`}
                          >
                            <Icon size={23} />
                          </div>

                          <span className="text-3xl font-bold text-slate-200">
                            —
                          </span>
                        </div>

                        <div className="mt-5">
                          <h3 className="text-sm font-semibold text-slate-700">
                            {title}
                          </h3>

                          <p className="mt-2 text-xs leading-5 text-slate-400">
                            {description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* Applications and Pro */}
            <section className="grid gap-6 xl:grid-cols-3">
              {/* Recent Applications */}
              <Card className="gap-5 rounded-2xl border-0 bg-white shadow-[0_4px_25px_rgba(15,23,42,0.035)] xl:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between gap-3 px-6 pt-6">
                  <div>
                    <CardTitle className="text-lg font-bold text-slate-900">
                      Recent Applications
                    </CardTitle>
                    <CardDescription className="mt-1 text-slate-400">
                      Track your recent tuition applications.
                    </CardDescription>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg border-0 bg-blue-50 font-semibold text-blue-700 shadow-none hover:bg-blue-100"
                    onClick={() =>
                      router.push("/dashboard/student/applications")
                    }
                  >
                    View All
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </CardHeader>

                <CardContent className="px-6 pb-6">
                  <EmptySkeleton />

                  <p className="mt-5 text-center text-xs text-slate-400">
                    Your application activity will appear here.
                  </p>
                </CardContent>
              </Card>

              {/* Pro Subscription */}
              <Card className="relative gap-5 overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-indigo-50 via-blue-50 to-white shadow-[0_4px_25px_rgba(15,23,42,0.035)]">
                <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-blue-200/30 blur-2xl" />

                <CardHeader className="relative z-10 px-6 pt-6">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                    <Sparkles size={23} />
                  </div>

                  <Badge className="mb-2 w-fit border-0 bg-blue-100 text-blue-700 hover:bg-blue-100">
                    PREMIUM
                  </Badge>

                  <CardTitle className="text-xl font-bold text-slate-900">
                    Upgrade to Pro
                  </CardTitle>

                  <CardDescription className="leading-6 text-slate-500">
                    Unlock exclusive features and improve your tuition
                    experience.
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 px-6 pb-6">
                  <ul className="mb-6 space-y-4 text-sm text-slate-600">
                    {[
                      "Access premium features",
                      "Better tuition opportunities",
                      "Manage your subscription",
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100">
                          <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full rounded-xl border-0 bg-blue-600 py-6 font-semibold text-white shadow-lg shadow-blue-600/15 hover:bg-blue-700"
                    onClick={() =>
                      router.push("/dashboard/student/subscription")
                    }
                  >
                    Explore Pro
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </section>

            {/* Latest Tuitions */}
            <section>
              <div className="mb-6 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900">
                    Latest Tuition Opportunities
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Discover recently posted tuition opportunities.
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg border-0 bg-white font-semibold text-blue-600 shadow-none hover:bg-blue-50"
                  onClick={() => router.push("/tuitions")}
                >
                  Browse All
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <Card
                    key={item}
                    className="gap-4 rounded-2xl border-0 bg-white shadow-[0_4px_25px_rgba(15,23,42,0.035)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <CardContent className="p-5">
                      <div className="mb-5 flex items-center justify-between">
                        <Skeleton className="h-11 w-11 rounded-xl border-0" />
                        <Skeleton className="h-6 w-20 rounded-full border-0" />
                      </div>

                      <Skeleton className="mb-3 h-5 w-3/4 border-0" />
                      <Skeleton className="mb-5 h-3 w-1/2 border-0" />

                      <Separator className="mb-5 h-px border-0 bg-slate-100" />

                      <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-24 border-0" />
                        <Skeleton className="h-9 w-20 rounded-lg border-0" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <p className="mt-4 text-center text-xs text-slate-400">
                Approved and active tuition listings will appear here.
              </p>
            </section>

            {/* Quick Actions */}
            <section>
              <div className="mb-6">
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  Quick Actions
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Quickly access your most-used dashboard features.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    title: "Find Tuition",
                    description: "Explore opportunities",
                    href: "/tuitions",
                    icon: Search,
                    color: "bg-blue-50 text-blue-600",
                  },
                  {
                    title: "Applications",
                    description: "Check application status",
                    href: "/dashboard/student/applications",
                    icon: BriefcaseBusiness,
                    color: "bg-emerald-50 text-emerald-600",
                  },
                  {
                    title: "Saved Tuitions",
                    description: "View saved opportunities",
                    href: "/dashboard/student/saved",
                    icon: Bookmark,
                    color: "bg-violet-50 text-violet-600",
                  },
                  {
                    title: "My Profile",
                    description: "Update your information",
                    href: "/dashboard/student/profile",
                    icon: UserRound,
                    color: "bg-amber-50 text-amber-600",
                  },
                ].map(({ title, description, href, icon: Icon, color }) => (
                  <Link key={title} href={href}>
                    <Card className="h-full gap-0 rounded-2xl border-0 bg-white shadow-[0_4px_25px_rgba(15,23,42,0.035)] transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50/40 hover:shadow-lg">
                      <CardContent className="flex items-center gap-4 p-5">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}
                        >
                          <Icon size={22} />
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-slate-800">
                            {title}
                          </h3>

                          <p className="mt-1 text-xs text-slate-400">
                            {description}
                          </p>
                        </div>

                        <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-1" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
