"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function SignInPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  // Redirect authenticated users.
  useEffect(() => {
    if (!isPending && session?.user) {
      router.replace(dashboardPathFor(session.user.role));
    }
  }, [isPending, session, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitting) return;

    setError(null);

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email") ?? "")
      .trim()
      .toLowerCase();

    const password = String(formData.get("password") ?? "");

    // Client-side validation.
    if (!email || !password) {
      setError("Please enter your email address and password.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

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

      let role = data?.user?.role;

      if (!role) {
        const { data: sessionData } = await authClient.getSession();

        role = sessionData?.user?.role;
      }

      if (!role) {
        setError(
          "Your account role could not be identified. Please contact support.",
        );
        return;
      }

      router.replace(dashboardPathFor(role));
    } catch (err) {
      console.error("Sign in failed:", err);

      setError(
        "Unable to sign in right now. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Prevent authenticated users from seeing the login form.
  if (isPending || session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm text-slate-500">Preparing your account...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-6 sm:px-6 sm:py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/60 sm:rounded-3xl lg:min-h-[650px] lg:grid-cols-2">
        {/* Branding Section */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-blue-600 p-10 text-white lg:flex xl:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-500/50" />

          <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-blue-700/50" />

          <Link
            href="/"
            className="relative z-10 inline-flex w-fit items-center gap-2"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600">
              <GraduationCap size={27} />
            </div>

            <span className="text-2xl font-bold">MentorLagbe</span>
          </Link>

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
            <ShieldCheck size={22} className="shrink-0 text-blue-200" />

            <p className="text-sm text-blue-100">
              A smarter way to learn and teach.
            </p>
          </div>
        </section>

        {/* Login Section */}
        <section className="flex items-center justify-center px-5 py-8 sm:px-10 sm:py-12 lg:px-12 xl:px-16">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 lg:hidden"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <GraduationCap size={25} />
              </div>

              <span className="text-xl font-bold text-slate-900">
                MentorLagbe
              </span>
            </Link>

            {/* Heading */}
            <div className="mb-7 sm:mb-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <GraduationCap size={25} />
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Welcome back!
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter your credentials to access your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Error Message */}
              {error && (
                <Alert variant="destructive" role="alert" aria-live="polite">
                  <AlertCircle className="h-4 w-4" />

                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-700"
                >
                  Email Address
                </Label>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  inputMode="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  required
                  disabled={submitting}
                  className="h-12 w-full rounded-xl border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 transition focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </Label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-blue-600 transition hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
                    disabled={submitting}
                    className="h-12 w-full rounded-xl border-slate-200 bg-white px-4 pr-12 text-sm text-slate-900 placeholder:text-slate-400 transition focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                    className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  disabled={submitting}
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
                className="h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Sign Up */}
            <p className="mt-7 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Create an account
              </Link>
            </p>

            {/* Footer */}
            <p className="mt-7 text-center text-xs leading-5 text-slate-400">
              By continuing, you agree to MentorLagbe's{" "}
              <Link
                href="/terms"
                className="underline underline-offset-2 hover:text-slate-600"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-2 hover:text-slate-600"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
