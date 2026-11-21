"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  CreditCard,
  UserRound,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  BriefcaseBusiness,
  Settings,
  ShieldCheck,
  Wallet,
  UserCheck,
  ClipboardCheck,
  TrendingUp,
  Ban,
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

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

/* Admin Dashboard Navigation */
const navigation = [
  {
    label: "Overview",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Manage Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    label: "Tuition Approvals",
    href: "/dashboard/admin/tuitions",
    icon: BookOpen,
  },
  {
    label: "Applications",
    href: "/dashboard/admin/applications",
    icon: FileText,
  },
  {
    label: "Payments",
    href: "/dashboard/admin/payments",
    icon: CreditCard,
  },
  {
    label: "My Profile",
    href: "/dashboard/admin/profile",
    icon: UserRound,
  },
];

/* Admin Dashboard Statistics */
const stats = [
  {
    title: "Total Users",
    description: "All registered platform users",
    icon: Users,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Total Tutors",
    description: "Registered tutor accounts",
    icon: GraduationCap,
    color: "bg-violet-50 text-violet-600",
  },
  {
    title: "Pending Approvals",
    description: "Tuitions waiting for review",
    icon: Clock,
    color: "bg-amber-50 text-amber-600",
  },
  {
    title: "Total Tuitions",
    description: "All submitted tuition posts",
    icon: BookOpen,
    color: "bg-emerald-50 text-emerald-600",
  },
];

const managementStats = [
  {
    title: "Total Applications",
    description: "Applications submitted by students",
    icon: FileText,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Pro Subscribers",
    description: "Users with active Pro plans",
    icon: Sparkles,
    color: "bg-violet-50 text-violet-600",
  },
  {
    title: "Total Transactions",
    description: "Recorded payment transactions",
    icon: Wallet,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Platform Revenue",
    description: "Revenue from Pro subscriptions",
    icon: TrendingUp,
    color: "bg-amber-50 text-amber-600",
  },
];

/* Reusable Skeleton List */
function EmptySkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 rounded-lg bg-slate-50 p-4"
        >
          <Skeleton className="h-11 w-11 rounded-lg border-0" />

          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3 border-0" />
            <Skeleton className="h-3 w-1/3 border-0" />
          </div>

          <Skeleton className="h-6 w-20 shrink-0 rounded-full border-0" />
        </div>
      ))}
    </div>
  );
}

/* Reusable Statistics Card */
function StatCard({
  title,
  description,
  icon: Icon,
  color,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <Card className="group gap-4 rounded-2xl border-0 bg-white shadow-[0_4px_25px_rgba(15,23,42,0.035)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/5">
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color} transition-transform duration-300 group-hover:scale-110`}
          >
            <Icon size={23} />
          </div>

          <span className="text-3xl font-bold text-slate-200">—</span>
        </div>

        <div className="mt-5">
          <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
          <p className="mt-2 text-xs leading-5 text-slate-400">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

/* Reusable Quick Action Card */
function QuickAction({
  title,
  description,
  href,
  icon: Icon,
  color,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <Link href={href} className="group">
      <Card className="h-full gap-0 rounded-2xl border-0 bg-white shadow-[0_4px_25px_rgba(15,23,42,0.035)] transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50/40 hover:shadow-lg">
        <CardContent className="flex items-center gap-4 p-5">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}
          >
            <Icon size={22} />
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-bold text-slate-800">{title}</h3>
            <p className="mt-1 text-xs text-slate-400">{description}</p>
          </div>

          <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-1" />
        </CardContent>
      </Card>
    </Link>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <SidebarProvider
      defaultOpen={true}
      className="min-h-screen bg-slate-50"
      style={
        {
          "--sidebar-width": "16rem",
          "--sidebar-width-icon": "4rem",
        } as React.CSSProperties
      }
    >
      {/* Admin Sidebar */}
      <Sidebar collapsible="icon" className="border-0 bg-white">
        <SidebarHeader className="p-5">
          <Link href="/" className="flex items-center gap-2 overflow-hidden">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
              <GraduationCap size={24} />
            </div>

            <span className="whitespace-nowrap text-xl font-bold text-slate-900 group-data-[collapsible=icon]:hidden">
              Mentor<span className="text-blue-600">Lagbe</span>
            </span>
          </Link>
        </SidebarHeader>

        <SidebarContent className="px-3">
          <SidebarGroup>
            <SidebarGroupLabel className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Admin Menu
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {navigation.map(({ label, href, icon: Icon }) => {
                  const isActive =
                    pathname === href ||
                    (href !== "/dashboard/admin" &&
                      pathname.startsWith(`${href}/`));

                  return (
                    <SidebarMenuItem key={label}>
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={label}
                        onClick={() => router.push(href)}
                        className={`h-11 rounded-lg px-3 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700"
                            : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                        }`}
                      >
                        <Icon className="size-[19px] shrink-0" />
                        <span>{label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Sidebar Footer */}
        <SidebarFooter className="p-4">
          <Separator className="mb-3 border-0 bg-slate-100" />

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Back to Website"
                onClick={() => router.push("/")}
                className="h-11 rounded-lg px-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              >
                <Settings className="size-[19px]" />
                <span>Back to Website</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Main Dashboard */}
      <SidebarInset className="min-w-0 bg-[#F8FAFC]">
        {/* Header */}
        <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between bg-white/90 px-4 shadow-[0_2px_15px_rgba(15,23,42,0.03)] backdrop-blur-xl sm:pl-1 sm:pr-5">
          <div className="flex min-w-0 items-center gap-3">
            <SidebarTrigger className="size-11 shrink-0 cursor-pointer rounded-xl border-0 text-slate-600 shadow-none hover:bg-blue-50 hover:text-blue-700 [&>svg]:!size-6 [&>svg]:!w-6 [&>svg]:!h-6" />

            <div className="min-w-0">
              <p className="text-xs font-medium tracking-wide text-slate-400">
                ADMIN DASHBOARD
              </p>
              <h1 className="truncate text-xl font-bold tracking-tight text-slate-900">
                Overview
              </h1>
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="ml-3 h-10 w-10 shrink-0 rounded-full border-0 bg-blue-50 text-blue-700 shadow-none hover:bg-blue-100"
            aria-label="Admin Profile"
            onClick={() => router.push("/dashboard/admin/profile")}
          >
            <UserRound className="h-8 w-8" />
          </Button>
        </header>

        <div className="space-y-9 p-4 sm:p-6 lg:p-8">
          {/* Welcome Banner */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 p-6 text-white shadow-xl shadow-blue-600/10 sm:p-10">
            <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-24 right-1/3 h-64 w-64 rounded-full bg-indigo-300/10 blur-3xl" />

            <div className="relative z-10 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
              <div className="max-w-xl">
                <Badge className="mb-5 border-0 bg-white/15 px-4 py-1.5 text-white hover:bg-white/20">
                  <ShieldCheck className="mr-2 h-3.5 w-3.5" />
                  Administrator Account
                </Badge>

                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Welcome, Administrator!
                </h2>

                <p className="mt-4 max-w-lg text-sm leading-7 text-blue-100 sm:text-base">
                  Manage users, review tuition posts, monitor applications, and
                  keep the MentorLagbe platform running smoothly.
                </p>

                <Button
                  className="mt-7 rounded-xl border-0 bg-white px-6 font-semibold text-blue-700 shadow-lg shadow-blue-950/10 hover:bg-blue-50"
                  onClick={() => router.push("/dashboard/admin/tuitions")}
                >
                  Review Tuitions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="hidden h-40 w-40 items-center justify-center rounded-3xl bg-white/10 shadow-inner backdrop-blur-md sm:flex">
                <ShieldCheck
                  size={90}
                  strokeWidth={1.2}
                  className="text-white"
                />
              </div>
            </div>
          </section>

          {/* Platform Overview */}
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Platform Overview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Monitor the overall activity of your platform.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <StatCard key={stat.title} {...stat} />
              ))}
            </div>
          </section>

          {/* Business Overview */}
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Business Overview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Monitor applications, subscriptions, and payment activity.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {managementStats.map((stat) => (
                <StatCard key={stat.title} {...stat} />
              ))}
            </div>
          </section>

          {/* Tuition Approvals and Admin Actions */}
          <section className="grid gap-6 xl:grid-cols-3">
            {/* Pending Tuition Approvals */}
            <Card className="gap-5 rounded-2xl border-0 bg-white shadow-[0_4px_25px_rgba(15,23,42,0.035)] xl:col-span-2">
              <CardHeader className="flex flex-col justify-between gap-3 px-6 pt-6 sm:flex-row sm:items-center">
                <div>
                  <CardTitle className="text-lg font-bold text-slate-900">
                    Pending Tuition Approvals
                  </CardTitle>
                  <CardDescription className="mt-1 text-slate-400">
                    Review tuition posts submitted by tutors.
                  </CardDescription>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-fit rounded-lg border-0 bg-blue-50 font-semibold text-blue-700 shadow-none hover:bg-blue-100"
                  onClick={() => router.push("/dashboard/admin/tuitions")}
                >
                  View All
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <EmptySkeleton />

                <p className="mt-5 text-center text-xs text-slate-400">
                  Tuition posts waiting for admin review will appear here.
                </p>
              </CardContent>
            </Card>

            {/* Admin Management Card */}
            <Card className="relative gap-5 overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-indigo-50 via-blue-50 to-white shadow-[0_4px_25px_rgba(15,23,42,0.035)]">
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-blue-200/30 blur-2xl" />

              <CardHeader className="relative z-10 px-6 pt-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                  <ShieldCheck size={23} />
                </div>

                <Badge className="mb-2 w-fit border-0 bg-blue-100 text-blue-700 hover:bg-blue-100">
                  ADMIN CONTROL
                </Badge>

                <CardTitle className="text-xl font-bold text-slate-900">
                  Platform Management
                </CardTitle>

                <CardDescription className="leading-6 text-slate-500">
                  Manage platform users and maintain a trusted learning
                  community.
                </CardDescription>
              </CardHeader>

              <CardContent className="relative z-10 px-6 pb-6">
                <ul className="mb-6 space-y-4 text-sm text-slate-600">
                  {[
                    "Manage student and tutor accounts",
                    "Approve or reject tuition posts",
                    "Monitor platform activities",
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
                  onClick={() => router.push("/dashboard/admin/users")}
                >
                  Manage Users
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </section>

          {/* Recent Users */}
          <section className="grid gap-6 xl:grid-cols-2">
            <Card className="gap-5 rounded-2xl border-0 bg-white shadow-[0_4px_25px_rgba(15,23,42,0.035)]">
              <CardHeader className="flex flex-col justify-between gap-3 px-6 pt-6 sm:flex-row sm:items-center">
                <div>
                  <CardTitle className="text-lg font-bold text-slate-900">
                    Recent Users
                  </CardTitle>
                  <CardDescription className="mt-1 text-slate-400">
                    Recently registered students and tutors.
                  </CardDescription>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-fit rounded-lg border-0 bg-blue-50 font-semibold text-blue-700 shadow-none hover:bg-blue-100"
                  onClick={() => router.push("/dashboard/admin/users")}
                >
                  Manage Users
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <EmptySkeleton />

                <p className="mt-5 text-center text-xs text-slate-400">
                  Newly registered users will appear here.
                </p>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="gap-5 rounded-2xl border-0 bg-white shadow-[0_4px_25px_rgba(15,23,42,0.035)]">
              <CardHeader className="flex flex-col justify-between gap-3 px-6 pt-6 sm:flex-row sm:items-center">
                <div>
                  <CardTitle className="text-lg font-bold text-slate-900">
                    Recent Transactions
                  </CardTitle>
                  <CardDescription className="mt-1 text-slate-400">
                    Monitor recent Pro subscription payments.
                  </CardDescription>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-fit rounded-lg border-0 bg-blue-50 font-semibold text-blue-700 shadow-none hover:bg-blue-100"
                  onClick={() => router.push("/dashboard/admin/payments")}
                >
                  View Payments
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <EmptySkeleton />

                <p className="mt-5 text-center text-xs text-slate-400">
                  Payment transaction records will appear here.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Applications Monitoring */}
          <section>
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  Application Monitoring
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Monitor applications submitted by students.
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-fit rounded-lg border-0 bg-white font-semibold text-blue-600 shadow-none hover:bg-blue-50"
                onClick={() => router.push("/dashboard/admin/applications")}
              >
                Browse Applications
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Button>
            </div>

            <Card className="gap-4 rounded-2xl border-0 bg-white shadow-[0_4px_25px_rgba(15,23,42,0.035)]">
              <CardContent className="p-5 sm:p-6">
                <div className="grid gap-5 sm:grid-cols-3">
                  {[
                    {
                      title: "Pending Applications",
                      icon: Clock,
                      color: "bg-amber-50 text-amber-600",
                    },
                    {
                      title: "Accepted Applications",
                      icon: CheckCircle2,
                      color: "bg-emerald-50 text-emerald-600",
                    },
                    {
                      title: "Rejected Applications",
                      icon: Ban,
                      color: "bg-rose-50 text-rose-600",
                    },
                  ].map(({ title, icon: Icon, color }) => (
                    <div
                      key={title}
                      className="flex items-center gap-4 rounded-xl bg-slate-50 p-4"
                    >
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}
                      >
                        <Icon size={21} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-700">
                          {title}
                        </p>
                        <p className="mt-1 text-xl font-bold text-slate-300">
                          —
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Quick Actions */}
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Quick Actions
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Quickly access your most-used admin features.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <QuickAction
                title="Manage Users"
                description="Manage platform accounts"
                href="/dashboard/admin/users"
                icon={Users}
                color="bg-blue-50 text-blue-600"
              />

              <QuickAction
                title="Review Tuitions"
                description="Approve or reject tuition posts"
                href="/dashboard/admin/tuitions"
                icon={ClipboardCheck}
                color="bg-emerald-50 text-emerald-600"
              />

              <QuickAction
                title="Applications"
                description="Monitor student applications"
                href="/dashboard/admin/applications"
                icon={BriefcaseBusiness}
                color="bg-violet-50 text-violet-600"
              />

              <QuickAction
                title="Payments"
                description="Monitor transactions"
                href="/dashboard/admin/payments"
                icon={Wallet}
                color="bg-amber-50 text-amber-600"
              />
            </div>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
