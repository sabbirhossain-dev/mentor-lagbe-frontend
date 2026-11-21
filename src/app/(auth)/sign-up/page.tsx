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
  Users,
} from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { dashboardPathFor } from "@/lib/roles";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [terms, setTerms] = useState(false);
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

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string | null)?.trim() ?? "";
    const email = (formData.get("email") as string | null)?.trim() ?? "";
    const password = (formData.get("password") as string | null) ?? "";
    const confirmPassword =
      (formData.get("confirmPassword") as string | null) ?? "";

    // Client-side validation (the server re-validates everything).
    if (!role) {
      setError("Please select whether you are joining as a student or tutor.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!terms) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setSubmitting(true);
    try {
      const { data, error: signUpError } = await authClient.signUp.email({
        name,
        email,
        password,
        role,
        callbackURL: "/",
      });

      if (signUpError) {
        setError(signUpError.message || "Something went wrong. Please try again.");
        return;
      }

      // Role-based redirect (role comes from the server response, never from
      // what we typed — the server is authoritative).
      router.push(dashboardPathFor(data?.user?.role));
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 sm:px-6">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/60 lg:min-h-[700px] lg:grid-cols-2">
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
              <Users size={17} />
              Join Our Learning Community
            </div>

            <h1 className="max-w-lg text-4xl leading-tight font-bold xl:text-5xl">
              Build Your Future With The Right Mentor.
            </h1>

            <p className="mt-6 max-w-md leading-7 text-blue-100">
              Join MentorLagbe and connect with experienced tutors, explore
              learning opportunities, and achieve your goals.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Connect with qualified tutors",
                "Explore tuition opportunities",
                "Grow your skills and knowledge",
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

        {/* Right Side - Sign Up Form */}
        <div className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-16">
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
            <div className="mb-7">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Users size={25} />
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Create an account
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Get started with MentorLagbe and find your learning partner.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Error */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Full Name */}
              <div>
                <Label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full Name
                </Label>

                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  className="h-12 w-full rounded-xl border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10"
                />
              </div>

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

              {/* Role */}
              <div>
                <Label
                  htmlFor="role"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  I want to join as
                </Label>

                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger
                    id="role"
                    className="h-12 w-full rounded-xl border-slate-200 bg-white px-4 text-sm text-slate-600 hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10"
                  >
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="tutor">Tutor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Password */}
              <div>
                <Label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </Label>

                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    minLength={8}
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

                <p className="mt-2 text-xs text-slate-400">
                  Password must be at least 8 characters.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <Label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Confirm Password
                </Label>

                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className="h-12 w-full rounded-xl border-slate-200 bg-white px-4 pr-12 text-sm text-slate-900 placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10"
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-slate-400 hover:bg-transparent hover:text-slate-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </Button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2 pt-1">
                <Checkbox
                  id="terms"
                  checked={terms}
                  onCheckedChange={(checked) => setTerms(checked === true)}
                  className="mt-0.5"
                />

                <Label
                  htmlFor="terms"
                  className="block cursor-pointer text-xs leading-5 text-slate-500"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
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
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2" size={18} />
                  </>
                )}
              </Button>
            </form>

            {/* Sign In Link */}
            <p className="mt-7 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-semibold text-blue-600 transition hover:text-blue-700"
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
