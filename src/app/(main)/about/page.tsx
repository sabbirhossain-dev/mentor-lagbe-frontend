import Link from "next/link";
import {
  Award,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="bg-slate-50/50 pb-24 pt-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700">
            About MentorLagbe
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Democratizing Personalized Academic Mentorship.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Connecting qualified tutors who love teaching with enthusiastic students seeking real academic clarity.
          </p>
        </div>

        {/* Mission Card */}
        <div className="mt-14 rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Why We Built MentorLagbe</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Finding a trusted, capable tutor in Bangladesh traditionally relies on word of mouth or unstructured social media groups without verification. Parents worry about safety and qualifications, while passionate tutors struggle to find students matching their subject expertise.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                MentorLagbe was built to solve both challenges in a single, transparent EdTech ecosystem. Every tutor is verified, listings are moderated, and students apply with zero platform fee.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-blue-50/80 p-5 border border-blue-100 text-center">
                <Users size={28} className="mx-auto text-blue-600" />
                <h4 className="mt-2 text-xl font-bold text-slate-900">1,500+</h4>
                <p className="text-xs text-slate-500">Students Guided</p>
              </div>
              <div className="rounded-2xl bg-emerald-50/80 p-5 border border-emerald-100 text-center">
                <ShieldCheck size={28} className="mx-auto text-emerald-600" />
                <h4 className="mt-2 text-xl font-bold text-slate-900">100%</h4>
                <p className="text-xs text-slate-500">Verified Tutors</p>
              </div>
              <div className="rounded-2xl bg-purple-50/80 p-5 border border-purple-100 text-center">
                <BookOpen size={28} className="mx-auto text-purple-600" />
                <h4 className="mt-2 text-xl font-bold text-slate-900">20+</h4>
                <p className="text-xs text-slate-500">Subject Domains</p>
              </div>
              <div className="rounded-2xl bg-amber-50/80 p-5 border border-amber-100 text-center">
                <Award size={28} className="mx-auto text-amber-600" />
                <h4 className="mt-2 text-xl font-bold text-slate-900">0%</h4>
                <p className="text-xs text-slate-500">Commission on Tuitions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-14">
          <h3 className="text-xl font-bold text-slate-900 text-center mb-8">Our Guiding Principles</h3>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
                <ShieldCheck size={20} />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Transparency & Trust</h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Clear schedules, transparent monthly fees, and honest reviews. No hidden charges or surprise deductions.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 mb-4">
                <GraduationCap size={20} />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Quality First</h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Every listing is vetted for academic clarity. We prioritize tutors with demonstrated concept-clearing ability.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-4">
                <HeartHandshake size={20} />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Student-Centric</h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Empowering students to find the learning style that matches their pace, whether online or home tuition.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 rounded-3xl bg-slate-900 p-8 sm:p-12 text-center text-white">
          <h3 className="text-2xl sm:text-3xl font-extrabold">Ready to Start Learning or Teaching?</h3>
          <p className="mt-2 text-sm text-slate-300 max-w-xl mx-auto">
            Join hundreds of tutors and students building academic confidence every day.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/tuitions">
              <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 px-6 font-semibold">
                Browse Tuitions
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="outline" className="rounded-xl border-white/20 text-white hover:bg-white/10 font-semibold">
                Join as Tutor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
