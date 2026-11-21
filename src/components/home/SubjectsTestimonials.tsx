import Link from "next/link";
import {
  ArrowRight,
  Atom,
  BookOpen,
  Code2,
  Languages,
  MessageSquareQuote,
  Star,
  Users,
  Award,
  CheckCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SubjectsTestimonials = () => {
  const subjects = [
    {
      name: "Higher Mathematics",
      description: "Build strong analytical & problem-solving skills for board and admissions.",
      icon: Atom,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-950/80 dark:text-blue-400",
    },
    {
      name: "Physics & Chemistry",
      description: "Master fundamentals and formulas with practical concept breakdowns.",
      icon: BookOpen,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-950/80 dark:text-purple-400",
    },
    {
      name: "Programming & CS",
      description: "Develop hands-on coding skills in Python, JavaScript, and algorithms.",
      icon: Code2,
      color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-400",
    },
    {
      name: "IELTS & Spoken English",
      description: "Achieve your target band score with guided speaking and writing drills.",
      icon: Languages,
      color: "bg-amber-100 text-amber-600 dark:bg-amber-950/80 dark:text-amber-400",
    },
  ];

  const testimonials = [
    {
      name: "Tahsin Ahmed",
      role: "HSC Science Candidate (Dhaka)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      initials: "TA",
      rating: 5,
      subject: "Higher Math & Physics",
      quote:
        "MentorLagbe helped me connect with an experienced BUET senior for HSC preparation. My problem-solving speed and concept clarity improved dramatically within 2 months!",
    },
    {
      name: "Nusrat Jahan",
      role: "Verified Tutor (Dhaka University)",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      initials: "NJ",
      rating: 5,
      subject: "Economics & English",
      quote:
        "Posting batches on MentorLagbe has been a breeze. The verified badge immediately earns parents' trust, and managing applicants directly from my dashboard saves hours of hassle.",
    },
    {
      name: "Farhan Tanvir",
      role: "Undergraduate (NSU)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      initials: "FT",
      rating: 5,
      subject: "Web Development & Python",
      quote:
        "The 1-on-1 coding mentorship helped me build real-world projects and land my first internship. Having a mentor review my code weekly made all the difference.",
    },
  ];

  return (
    <>
      {/* Popular Subjects Section */}
      <section className="bg-slate-50/70 py-24 dark:bg-slate-900/50 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                EXPLORE DOMAINS
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
                Learn What Inspires You
              </h2>

              <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-400">
                Explore popular academic tracks and find mentors ready to guide you step-by-step.
              </p>
            </div>

            <Link
              href="/tuitions"
              className="inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:gap-3 dark:text-blue-400"
            >
              Explore Tuitions
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Static Subject Categories */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {subjects.map((subject) => {
              const Icon = subject.icon;

              return (
                <Link
                  key={subject.name}
                  href={`/tuitions?subject=${encodeURIComponent(subject.name.split(" ")[0])}`}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${subject.color}`}
                  >
                    <Icon size={28} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900 transition group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {subject.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {subject.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                    Browse Tutors
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Statistics Section */}
      <section className="bg-white py-20 dark:bg-slate-950 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-6 py-14 sm:px-12 sm:py-16 shadow-xl shadow-blue-500/10">
            <div className="mx-auto max-w-2xl text-center">
              <Award className="mx-auto text-blue-200" size={38} />

              <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
                Growing Together, Learning Together
              </h2>

              <p className="mt-3 leading-7 text-blue-100 text-sm sm:text-base">
                Join thousands of students and tutors transforming academic mentorship across Bangladesh.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
              {[
                { number: "1,200+", label: "Active Students" },
                { number: "350+", label: "Verified Tutors" },
                { number: "98%", label: "Satisfaction Rate" },
                { number: "40+", label: "Subjects Covered" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/20 bg-white/10 p-5 sm:p-6 text-center backdrop-blur-sm"
                >
                  <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {stat.number}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm font-medium text-blue-100">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-slate-50/70 py-24 dark:bg-slate-900/40 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              COMMUNITY VOICES
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
              What Students & Mentors Say
            </h2>

            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Real feedback from learners and educators building brighter futures with MentorLagbe.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3.5 border-t border-slate-100 dark:border-slate-800 pt-5">
                  <Avatar className="h-11 w-11 border border-blue-100 dark:border-blue-900">
                    <AvatarImage src={t.avatar} alt={t.name} />
                    <AvatarFallback className="bg-blue-600 text-white font-bold text-xs">
                      {t.initials}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {t.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SubjectsTestimonials;
