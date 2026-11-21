"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Plus,
  BookOpen,
  Users,
  CreditCard,
  UserRound,
  ArrowRight,
  MapPin,
  Clock,
  GraduationCap,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  FileText,
  Sparkles,
  Settings,
  LogOut,
  Bell,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const navigationItems = [
  {
    title: "Overview",
    url: "/dashboard/tutor",
    icon: LayoutDashboard,
  },
  {
    title: "Post Tuition",
    url: "/dashboard/tutor/post-tuition",
    icon: Plus,
  },
  {
    title: "My Tuitions",
    url: "/dashboard/tutor/my-tuitions",
    icon: BookOpen,
  },
  {
    title: "Applications",
    url: "/dashboard/tutor/applications",
    icon: Users,
  },
  {
    title: "Subscription",
    url: "/dashboard/tutor/subscription",
    icon: CreditCard,
  },
  {
    title: "My Profile",
    url: "/dashboard/tutor/profile",
    icon: UserRound,
  },
];

const TutorDashboard = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r-0">
        {/* Sidebar Header */}
        <SidebarHeader className="px-4 py-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
              <GraduationCap className="size-6" />
            </div>

            <div className="grid flex-1 text-left leading-tight">
              <span className="truncate text-lg font-bold text-slate-900">
                MentorLagbe
              </span>
              <span className="truncate text-xs text-slate-500">
                Tutor Dashboard
              </span>
            </div>
          </div>
        </SidebarHeader>

        {/* Sidebar Navigation */}
        <SidebarContent className="px-3">
          <SidebarGroup>
            <SidebarGroupLabel className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Menu
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={item.title}
                        onClick={() => router.push(item.url)}
                        className={`h-11 rounded-lg px-3 ${
                          isActive
                            ? "bg-blue-50 font-semibold text-blue-700 hover:bg-blue-50 hover:text-blue-700"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        <item.icon className="size-5 shrink-0" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="mt-4">
            <SidebarGroupLabel className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Account
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="Back to Website"
                    onClick={() => router.push("/")}
                    className="h-11 rounded-lg px-3 text-slate-600 hover:bg-slate-100"
                  >
                    <ArrowRight className="size-5" />
                    <span>Back to Website</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="Settings"
                    onClick={() => router.push("/dashboard/tutor/settings")}
                    className="h-11 rounded-lg px-3 text-slate-600 hover:bg-slate-100"
                  >
                    <Settings className="size-5" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Sidebar Footer */}
        <SidebarFooter className="border-t border-slate-100 p-3">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
              T
            </div>

            <div className="grid flex-1 text-left leading-tight">
              <span className="truncate text-sm font-semibold text-slate-800">
                Tutor Account
              </span>
              <span className="truncate text-xs text-slate-500">Free Plan</span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="size-8 shrink-0 text-slate-500 hover:text-red-600"
              aria-label="Logout"
            >
              <LogOut className="size-4" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* Main Dashboard */}
      <SidebarInset className="min-w-0 bg-slate-50">
        <div className="min-h-screen">
          {/* Top Header */}
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <SidebarTrigger className="size-11 shrink-0 rounded-lg text-slate-600 hover:bg-slate-100 [&>svg]:!size-6 [&>svg]:!w-6 [&>svg]:!h-6 cursor-pointer" />

              <div className="hidden min-w-0 sm:block">
                <h1 className="truncate text-sm font-semibold text-slate-800">
                  Tutor Dashboard
                </h1>
                <p className="text-xs text-slate-500">
                  Manage your tuition activities
                </p>
              </div>
            </div>

            {/* <Button
                variant="ghost"
                size="icon"
                className="relative size-9 rounded-full text-slate-600 hover:bg-slate-100"
                aria-label="Notifications"
              >
                <Bell className="size-5" />
                <span className="absolute right-2 top-2 size-2 rounded-full bg-red-500" />
              </Button> */}

            <Button
              variant="outline"
              size="icon"
              className="ml-3 h-10 w-10 shrink-0 rounded-full border-0 bg-blue-50 text-blue-700 shadow-none hover:bg-blue-100"
              aria-label="Profile"
              onClick={() => router.push("/dashboard/student/profile")}
            >
              <UserRound className="h-8 w-8" />
            </Button>

            {/* <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-slate-800">
                    Tutor Account
                  </p>
                  <p className="text-xs text-slate-500">Tutor</p>
                </div> */}
          </header>

          {/* Dashboard Content */}
          <main className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
            {/* Welcome Section */}
            <section className="flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 p-5 text-white shadow-sm sm:flex-row sm:items-center sm:p-7">
              <div className="max-w-xl">
                <Badge className="mb-3 border border-white/20 bg-white/15 text-white hover:bg-white/15">
                  <Sparkles className="mr-1 size-3" />
                  Tutor Dashboard
                </Badge>

                <h2 className="text-xl font-bold sm:text-2xl lg:text-3xl">
                  Welcome back, Tutor!
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-blue-100 sm:text-base">
                  Manage your tuition posts, review student applications, and
                  grow your teaching career with MentorLagbe.
                </p>
              </div>

              <Button
                onClick={() => router.push("/dashboard/tutor/post-tuition")}
                className="w-full shrink-0 bg-white text-blue-700 hover:bg-blue-50 sm:w-auto"
              >
                <Plus className="mr-2 size-4" />
                Post New Tuition
              </Button>
            </section>

            {/* Statistics */}
            <section>
              <div className="mb-4">
                <h2 className="text-lg font-bold text-slate-800">
                  Dashboard Overview
                </h2>
                <p className="text-sm text-slate-500">
                  A quick overview of your teaching activities
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  title="Total Tuitions"
                  icon={BookOpen}
                  iconClass="bg-blue-50 text-blue-600"
                />

                <StatCard
                  title="Active Tuitions"
                  icon={CheckCircle2}
                  iconClass="bg-green-50 text-green-600"
                />

                <StatCard
                  title="Total Applicants"
                  icon={Users}
                  iconClass="bg-purple-50 text-purple-600"
                />

                <StatCard
                  title="Pending Applications"
                  icon={Clock3}
                  iconClass="bg-orange-50 text-orange-600"
                />
              </div>
            </section>

            {/* Recent Applications and Subscription */}
            <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              {/* Recent Applications */}
              <Card className="border-slate-200 shadow-sm xl:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle className="text-base font-bold text-slate-800">
                      Recent Applications
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Latest applications from students
                    </CardDescription>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/dashboard/tutor/applications")}
                    className="shrink-0"
                  >
                    View All
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </CardHeader>

                <CardContent className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <Skeleton className="size-11 shrink-0 rounded-full" />

                        <div className="min-w-0 flex-1 space-y-2">
                          <Skeleton className="h-4 w-32 max-w-full" />
                          <Skeleton className="h-3 w-48 max-w-full" />
                        </div>
                      </div>

                      <Skeleton className="h-7 w-24 rounded-full" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Subscription Card */}
              <Card className="overflow-hidden border-slate-200 shadow-sm">
                <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-5 text-white">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-white/15">
                      <Sparkles className="size-5" />
                    </div>

                    <Badge className="border border-white/20 bg-white/15 text-white hover:bg-white/15">
                      Free Plan
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold">Upgrade to Pro</h3>

                  <p className="mt-2 text-sm leading-relaxed text-blue-100">
                    Unlock premium features and get more opportunities to grow
                    your teaching career.
                  </p>
                </div>

                <CardContent className="space-y-4 p-5">
                  <div className="space-y-3">
                    <FeatureItem text="More tuition posting opportunities" />
                    <FeatureItem text="Enhanced profile visibility" />
                    <FeatureItem text="Premium support" />
                  </div>

                  <Button
                    onClick={() => router.push("/dashboard/tutor/subscription")}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Explore Pro Plan
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </CardContent>
              </Card>
            </section>

            {/* My Tuitions */}
            <section>
              <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    My Tuitions
                  </h2>
                  <p className="text-sm text-slate-500">
                    Manage your recently posted tuitions
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/dashboard/tutor/my-tuitions")}
                  className="w-full sm:w-auto"
                >
                  View All Tuitions
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <Card key={item} className="border-slate-200 shadow-sm">
                    <CardContent className="space-y-4 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <Skeleton className="size-11 rounded-xl" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </div>

                      <div className="space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>

                      <div className="space-y-3 border-t border-slate-100 pt-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="size-4 text-slate-400" />
                          <Skeleton className="h-3 w-32" />
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="size-4 text-slate-400" />
                          <Skeleton className="h-3 w-28" />
                        </div>

                        <div className="flex items-center gap-2">
                          <Users className="size-4 text-slate-400" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>

                      <Skeleton className="h-9 w-full rounded-md" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section>
              <div className="mb-4">
                <h2 className="text-lg font-bold text-slate-800">
                  Quick Actions
                </h2>
                <p className="text-sm text-slate-500">
                  Quickly access your frequently used features
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <QuickAction
                  icon={Plus}
                  title="Post New Tuition"
                  description="Create a new tuition post"
                  onClick={() => router.push("/dashboard/tutor/post-tuition")}
                />

                <QuickAction
                  icon={Users}
                  title="View Applications"
                  description="Manage student applications"
                  onClick={() => router.push("/dashboard/tutor/applications")}
                />

                <QuickAction
                  icon={BookOpen}
                  title="My Tuitions"
                  description="Manage your tuition posts"
                  onClick={() => router.push("/dashboard/tutor/my-tuitions")}
                />

                <QuickAction
                  icon={UserRound}
                  title="My Profile"
                  description="Update your tutor profile"
                  onClick={() => router.push("/dashboard/tutor/profile")}
                />
              </div>
            </section>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default TutorDashboard;

/* Statistics Card */
function StatCard({
  title,
  icon: Icon,
  iconClass,
}: {
  title: string;
  icon: React.ElementType;
  iconClass: string;
}) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="flex items-center justify-between gap-3 p-5">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <Skeleton className="mt-3 h-8 w-16" />
          <Skeleton className="mt-2 h-3 w-24" />
        </div>

        <div
          className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon className="size-6" />
        </div>
      </CardContent>
    </Card>
  );
}

/* Pro Plan Feature */
function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <CheckCircle2 className="size-4 shrink-0 text-green-500" />
      <span>{text}</span>
    </div>
  );
}

/* Quick Action Card */
function QuickAction({
  icon: Icon,
  title,
  description,
  onClick,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-blue-200 hover:shadow-sm"
    >
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
        <Icon className="size-5" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>

      <ArrowRight className="size-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600" />
    </button>
  );
}
