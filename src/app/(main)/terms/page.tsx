import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-12 shadow-sm">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 mb-6 transition-colors">
          <ArrowLeft size={15} />
          Back to Home
        </Link>

        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 mb-3">
          <ShieldCheck size={24} />
          <span className="text-xs font-bold uppercase tracking-wider">Legal Terms</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Terms of Service
        </h1>
        <p className="mt-2 text-xs text-slate-400">Last updated: November 2026</p>

        <div className="mt-8 space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">1. Overview of Platform</h2>
            <p>
              MentorLagbe is an online platform facilitating connections between students seeking academic tuition and verified educators/mentors offering individual or batch coaching.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">2. User Accounts & Responsibilities</h2>
            <p>
              Users registering as Students or Tutors must provide accurate contact and credential details. Accounts misrepresenting credentials or engaging in academic dishonesty are subject to immediate suspension.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">3. Subscriptions & Payments</h2>
            <p>
              MentorLagbe offers optional Pro tier subscriptions processed securely via Stripe. Tuition fees between students and tutors are coordinated according to the terms specified on individual batches.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
