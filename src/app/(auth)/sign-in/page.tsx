"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
  ShieldCheck,
} from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { dashboardPathFor } from "@/lib/roles";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  // Already signed in? Go straight to the user's own dashboard.
  const { data: session, isPending } = authClient.useSession();
  useEffect(() => {
    if (!isPending && session?.user) {
      router.replace(dashboardPathFor(session.user.role));
    }
  }, [isPending, session, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitting) return;

    setError(null);
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const email = (formData.get("email") as string | null)?.trim() ?? "";
    const password = (formData.get("password") as string | null) ?? "";

    try {
      const { data, error: signInError } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
      });

      if (signInError) {
        setError(signInError.message || "Invalid email or password.");
        return;
      }

      // First check the user returned by sign-in.
      let role = data?.user?.role;

      // If role is missing, fetch the latest authenticated session.
      if (!role) {
        const { data: sessionData } = await authClient.getSession();
        role = sessionData?.user?.role;
      }

      console.log("Signed-in user:", data?.user);
      console.log("User role:", role);

      if (!role) {
        setError("User role not found. Please contact support.");
        return;
      }

      router.replace(dashboardPathFor(role));
    } catch (error) {
      console.error("Sign in failed:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 sm:px-6">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/60 lg:min-h-[650px] lg:grid-cols-2">
        {/* Left Side - Branding */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-blue-600 p-10 text-white lg:flex xl:p-14">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-500 opacity-50" />
          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-blue-700 opacity-50" />

          {/* Logo */}
          <Link
            href="/"
            className="relative z-10 inline-flex items-center gap-2"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600">
              <GraduationCap size={27} />
            </div>
            <span className="text-2xl font-bold">MentorLagbe</span>
          </Link>

          {/* Content */}
          <div className="relative z-10 my-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400 bg-blue-500/40 px-4 py-2 text-sm font-medium">
              <GraduationCap size={17} />
              Your Learning Journey Starts Here
            </div>

            <h1 className="max-w-lg text-4xl leading-tight font-bold xl:text-5xl">
              Welcome Back To Your Learning Journey.
            </h1>

            <p className="mt-6 max-w-md leading-7 text-blue-100">
              Continue learning, connect with tutors, and discover new
              opportunities to grow with MentorLagbe.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Connect with qualified tutors",
                "Find learning opportunities easily",
                "Learn at your own pace",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-blue-200" />
                  <span className="text-sm text-blue-50">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-3 border-t border-blue-400/50 pt-6">
            <ShieldCheck size={22} className="text-blue-200" />
            <p className="text-sm text-blue-100">
              A smarter way to learn and teach.
            </p>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-16">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <Link
              href="/"
              className="mb-10 inline-flex items-center gap-2 lg:hidden"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <GraduationCap size={25} />
              </div>
              <span className="text-xl font-bold text-slate-900">
                MentorLagbe
              </span>
            </Link>

            {/* Heading */}
            <div className="mb-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <GraduationCap size={25} />
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Welcome back!
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter your credentials to access your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Error */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Email */}
              <div>
                <Label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
                </Label>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="h-12 w-full rounded-xl border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </Label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="h-12 w-full rounded-xl border-slate-200 bg-white px-4 pr-12 text-sm text-slate-900 placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10"
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-slate-400 hover:bg-transparent hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </Button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <Label
                  htmlFor="remember"
                  className="cursor-pointer text-sm text-slate-500"
                >
                  Remember me
                </Label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={submitting}
                className="h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
              >
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2" size={18} />
                  </>
                )}
              </Button>
            </form>

            {/* Sign Up Link */}
            <p className="mt-8 text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Create an account
              </Link>
            </p>

            <p className="mt-8 text-center text-xs text-slate-400">
              By continuing, you agree to MentorLagbe&apos;s Terms of Service
              and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
