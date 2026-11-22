"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { dashboardPathFor } from "@/lib/roles";
import { GoogleAuthButton } from "@/components/auth/SocialAuthButton";
import BrandLogo, { BrandLogoIcon } from "@/components/shared/BrandLogo";

export default function SignInPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  // Redirect authenticated users.
  useEffect(() => {
    if (!isPending && session?.user) {
      router.replace(dashboardPathFor(session.user.role));
    }
  }, [isPending, session, router]);

  // Google OAuth Handler
  const handleGoogleSignIn = async () => {
    if (googleLoading || submitting) return;
    setError(null);
    setGoogleLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err: unknown) {
      console.error("Google sign in failed:", err);
      const msg = err instanceof Error ? err.message : "Failed to connect to Google. Please try again.";
      setError(msg);
      toast.error(msg);
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitting || googleLoading) return;

    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
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
        toast.error(signInError.message || "Invalid credentials");
        return;
      }

      let role = data?.user?.role;
      if (!role) {
        const { data: sessionData } = await authClient.getSession();
        role = sessionData?.user?.role;
      }

      toast.success("Welcome back!");
      router.replace(dashboardPathFor(role));
      router.refresh();
    } catch (err) {
      console.error("Sign in failed:", err);
      setError("Unable to sign in right now. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Prevent authenticated users from seeing the login form.
  if (isPending || session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <p className="text-sm text-slate-500 dark:text-slate-400">Preparing your account...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-6 sm:px-6 sm:py-10 transition-colors">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl sm:rounded-3xl lg:min-h-[650px] lg:grid-cols-2">
        {/* Branding Section */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-900 p-10 text-white lg:flex xl:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-indigo-500/30 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-violet-900/40 blur-3xl" />

          <Link href="/" className="relative z-10 inline-flex w-fit items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white p-2 text-indigo-600 shadow-md">
              <BrandLogoIcon className="h-full w-full" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">MentorLagbe</span>
          </Link>

          <div className="relative z-10 my-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-indigo-500/30 px-4 py-1.5 text-xs font-semibold backdrop-blur">
              <GraduationCap size={15} />
              Concept-Driven Academic Mentorship
            </div>

            <h1 className="max-w-lg text-4xl leading-tight font-extrabold xl:text-5xl">
              Welcome Back To Your Learning Journey.
            </h1>

            <p className="mt-5 max-w-md leading-relaxed text-indigo-100 text-sm sm:text-base">
              Continue learning, connect with verified tutors, and manage your tuition batches with ease.
            </p>

            <div className="mt-8 space-y-3.5">
              {[
                "Connect with 100% verified academic tutors",
                "Direct application tracking with real-time updates",
                "Flexible 1-on-1 home tuition and online sessions",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-indigo-300 shrink-0" />
                  <span className="text-xs sm:text-sm text-indigo-50">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-3 border-t border-white/20 pt-6">
            <ShieldCheck size={20} className="shrink-0 text-indigo-200" />
            <p className="text-xs text-indigo-100">
              Trusted by 1,200+ students & educators across Bangladesh.
            </p>
          </div>
        </section>

        {/* Login Section */}
        <section className="flex items-center justify-center px-5 py-8 sm:px-10 sm:py-12 lg:px-12 xl:px-16">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-8 lg:hidden">
              <Link href="/">
                <BrandLogo size="md" />
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-7">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Choose your preferred sign-in method to continue.
              </p>
            </div>

            {/* Google Social Button */}
            <div className="space-y-5">
              <GoogleAuthButton
                onClick={handleGoogleSignIn}
                loading={googleLoading}
                disabled={submitting}
                text="Continue with Google"
              />

              <div className="relative flex items-center justify-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                <span className="bg-white dark:bg-slate-900 px-3 text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold absolute">
                  Or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              {/* Error Message */}
              {error && (
                <Alert variant="destructive" role="alert" aria-live="polite" className="rounded-xl">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs font-medium">{error}</AlertDescription>
                </Alert>
              )}

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  disabled={submitting || googleLoading}
                  className="h-11 w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/20"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 transition hover:underline"
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
                    disabled={submitting || googleLoading}
                    className="h-11 w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 pr-11 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/20"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2 pt-1">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  disabled={submitting || googleLoading}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <Label htmlFor="remember" className="cursor-pointer text-xs text-slate-600 dark:text-slate-400">
                  Remember me for 30 days
                </Label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={submitting || googleLoading}
                className="h-11 w-full rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In with Email
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Sign Up Link */}
            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="font-bold text-indigo-600 dark:text-indigo-400 transition hover:underline"
              >
                Create an account
              </Link>
            </p>

            {/* Footer */}
            <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
              By continuing, you agree to MentorLagbe's{" "}
              <Link href="/terms" className="underline hover:text-slate-600 dark:hover:text-slate-300">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-slate-600 dark:hover:text-slate-300">
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
