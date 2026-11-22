"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
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
  BookOpen,
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

export default function SignUpPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [role, setRole] = useState<"student" | "tutor">("student");
  const [terms, setTerms] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Prevent dashboard redirect during the signup process.
  const skipDashboardRedirect = useRef(false);

  const { data: session, isPending } = authClient.useSession();

  // Redirect already authenticated users.
  useEffect(() => {
    if (!isPending && session?.user && !skipDashboardRedirect.current) {
      router.replace(dashboardPathFor(session.user.role));
    }
  }, [isPending, session, router]);

  // Google OAuth Sign-Up Handler
  const handleGoogleSignUp = async () => {
    if (googleLoading || submitting) return;
    setError(null);
    setGoogleLoading(true);

    try {
      // Store chosen role in cookie so Better-Auth database hook picks it up
      const chosenRole = role || "student";
      document.cookie = `mentorlagbe_signup_role=${chosenRole}; path=/; max-age=600; SameSite=Lax`;

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err: unknown) {
      console.error("Google sign up failed:", err);
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

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    // Required field validation.
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (name.length < 2) {
      setError("Please enter your real full name (at least 2 characters).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Role validation.
    if (!role || !["student", "tutor"].includes(role)) {
      setError("Please select whether you are joining as a student or tutor.");
      return;
    }

    // Minimum password length.
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    // Password strength validation.
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least 8 characters with 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special symbol.",
      );
      return;
    }

    // Confirm password validation.
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Terms validation.
    if (!terms) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setSubmitting(true);
    skipDashboardRedirect.current = true;

    try {
      const { data, error: signUpError } = await authClient.signUp.email({
        name,
        email,
        password,
        role,
        callbackURL: "/",
      });

      if (signUpError) {
        skipDashboardRedirect.current = false;
        setError(signUpError.message || "Unable to create your account. Please try again.");
        toast.error(signUpError.message || "Account creation failed");
        return;
      }

      if (!data?.user) {
        skipDashboardRedirect.current = false;
        setError("Unable to verify your account creation. Please try again.");
        return;
      }

      toast.success("Account created successfully! Welcome to MentorLagbe.");
      router.replace(dashboardPathFor(role));
      router.refresh();
    } catch {
      skipDashboardRedirect.current = false;
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Prevent signup form flash while checking the session.
  if (isPending || session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="size-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 px-3 py-6 sm:px-6 sm:py-10 transition-colors">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl sm:rounded-3xl lg:min-h-[700px] lg:grid-cols-2">
        {/* Left Side - Branding */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-900 p-10 text-white lg:flex xl:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-indigo-500/30 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 size-96 rounded-full bg-violet-900/40 blur-3xl" />

          {/* Logo */}
          <Link href="/" className="relative z-10 inline-flex w-fit items-center gap-2.5">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-white p-2 text-indigo-600 shadow-md">
              <BrandLogoIcon className="h-full w-full" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">MentorLagbe</span>
          </Link>

          {/* Content */}
          <div className="relative z-10 my-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-indigo-500/30 px-4 py-1.5 text-xs font-semibold backdrop-blur">
              <CheckCircle2 size={15} />
              Join Our Verified Learning Community
            </div>

            <h1 className="max-w-lg text-4xl leading-tight font-extrabold xl:text-5xl">
              Build Your Future With The Right Mentor.
            </h1>

            <p className="mt-5 max-w-md leading-relaxed text-indigo-100 text-sm sm:text-base">
              Connect with top-tier academic tutors, explore active tuition batches, or offer your own 1-on-1 mentorship.
            </p>

            <div className="mt-8 space-y-3.5">
              {[
                "100% free account creation for students and tutors",
                "Verified badges for certified academic educators",
                "Secure messaging and instant application review",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-indigo-300 shrink-0" />
                  <span className="text-xs sm:text-sm text-indigo-50">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 flex items-center gap-3 border-t border-white/20 pt-6">
            <ShieldCheck size={20} className="shrink-0 text-indigo-200" />
            <p className="text-xs text-indigo-100">
              A smarter, safer way to learn and teach.
            </p>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="flex items-center justify-center px-4 py-8 sm:px-10 sm:py-10 lg:px-12 xl:px-16">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-8 lg:hidden">
              <Link href="/">
                <BrandLogo size="md" />
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Create your account
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Get started today in less than a minute.
              </p>
            </div>

            {/* Role Selection Tabs */}
            <div className="mb-5 space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                I am joining as
              </Label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition-all ${
                    role === "student"
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm dark:border-indigo-500 dark:bg-indigo-950/70 dark:text-indigo-300"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400"
                  }`}
                >
                  <GraduationCap size={16} />
                  <span>Student / Learner</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("tutor")}
                  className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition-all ${
                    role === "tutor"
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm dark:border-indigo-500 dark:bg-indigo-950/70 dark:text-indigo-300"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400"
                  }`}
                >
                  <BookOpen size={16} />
                  <span>Tutor / Mentor</span>
                </button>
              </div>
            </div>

            {/* Google Social Button */}
            <div className="space-y-5">
              <GoogleAuthButton
                onClick={handleGoogleSignUp}
                loading={googleLoading}
                disabled={submitting}
                text={`Sign up with Google as ${role === "tutor" ? "Tutor" : "Student"}`}
              />

              <div className="relative flex items-center justify-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                <span className="bg-white dark:bg-slate-900 px-3 text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold absolute">
                  Or register with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5" noValidate>
              {/* Error Message */}
              {error && (
                <Alert variant="destructive" role="alert" className="rounded-xl">
                  <AlertCircle className="size-4 shrink-0" />
                  <AlertDescription className="text-xs font-medium">{error}</AlertDescription>
                </Alert>
              )}

              {/* Full Name */}
              <div className="space-y-1">
                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. Tanvir Ahmed"
                  autoComplete="name"
                  required
                  disabled={submitting || googleLoading}
                  className="h-11 w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/20"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
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
              <div className="space-y-1">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
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

              {/* Confirm Password */}
              <div className="space-y-1">
                <Label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    required
                    disabled={submitting || googleLoading}
                    className="h-11 w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 pr-11 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  >
                    {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2 pt-1">
                <Checkbox
                  id="terms"
                  checked={terms}
                  disabled={submitting || googleLoading}
                  onCheckedChange={(checked) => {
                    setTerms(checked === true);
                    setError(null);
                  }}
                  className="mt-0.5 shrink-0"
                />
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                  <Label htmlFor="terms" className="cursor-pointer text-xs font-normal text-slate-600 dark:text-slate-400">
                    I agree to MentorLagbe's{" "}
                  </Label>
                  <Link href="/terms" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={submitting || googleLoading}
                className="h-11 w-full rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70 mt-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account as {role === "tutor" ? "Tutor" : "Student"}
                    <ArrowRight className="ml-2 size-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Sign In Link */}
            <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-bold text-indigo-600 dark:text-indigo-400 transition hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
