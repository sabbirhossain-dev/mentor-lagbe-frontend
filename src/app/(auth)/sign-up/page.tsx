"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
// import { Card } from "@/components/ui/card";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "/",
    });

    if (error) {
      console.log(error);
      return;
    }

    router.push("/");
    console.log(data);
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

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Role */}
              <div>
                <label
                  htmlFor="role"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  I want to join as
                </label>

                <select
                  id="role"
                  name="role"
                  defaultValue=""
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                >
                  <option value="" disabled>
                    Select your role
                  </option>
                  <option value="student">Student</option>
                  <option value="tutor">Tutor</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Password must be at least 8 characters.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-blue-600"
                />

                <label
                  htmlFor="terms"
                  className="text-xs leading-5 text-slate-500"
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
                </label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Create Account
                <ArrowRight className="ml-2" size={18} />
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
