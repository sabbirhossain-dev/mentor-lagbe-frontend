import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-12 shadow-sm">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 mb-6 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Home
        </Link>

        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 mb-3">
          <Lock size={22} />
          <span className="text-xs font-bold uppercase tracking-wider">Privacy & Security</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="mt-2 text-xs text-slate-400">Last updated: November 2026</p>

        <div className="mt-8 space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when creating an account, such as your full name, email address, role (Student or Tutor), profile photo, phone number, and academic qualifications.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">2. How We Use Information</h2>
            <p>
              Your information is used exclusively to facilitate tuition matchmaking, verify tutor credentials, process premium memberships securely via Stripe, and ensure the safety of communication between students and tutors.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">3. Third-Party Services</h2>
            <p>
              We integrate trusted third-party providers including Google OAuth for secure single sign-on authentication and Stripe for encrypted payment processing. We do not sell or monetize personal data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">4. Contact & Data Rights</h2>
            <p>
              You have the right to inspect, update, or request the deletion of your account information at any time from your account settings or by contacting our support team.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
