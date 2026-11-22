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

export default function SubjectsTestimonials() {
  const subjects = [
    {
      name: "Higher Mathematics",
      description: "Build strong analytical & problem-solving skills for board and engineering admissions.",
      icon: Atom,
      color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300",
    },
    {
      name: "Physics & Chemistry",
      description: "Master fundamentals and formulas with practical concept breakdowns and numerical drills.",
      icon: BookOpen,
      color: "bg-violet-100 text-violet-700 dark:bg-violet-950/80 dark:text-violet-300",
    },
    {
      name: "Programming & CS",
      description: "Develop hands-on coding skills in Python, JavaScript, data structures, and algorithms.",
      icon: Code2,
      color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300",
    },
    {
      name: "IELTS & Spoken English",
      description: "Achieve your target band score with guided speaking, vocabulary, and writing feedback.",
      icon: Languages,
      color: "bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300",
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
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                EXPLORE DOMAINS
              </span>

              <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl dark:text-white">
                Learn What Inspires You
              </h2>

              <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-400">
                Explore popular academic tracks and find mentors ready to guide you step-by-step.
              </p>
            </div>

            <Link
              href="/tuitions"
              className="inline-flex items-center gap-2 font-bold text-indigo-600 transition hover:gap-3 dark:text-indigo-400"
            >
              Browse All Categories
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {subjects.map((sub) => {
              const Icon = sub.icon;
              return (
                <Link
                  key={sub.name}
                  href={`/tuitions?subject=${encodeURIComponent(sub.name)}`}
                  className="group rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-500/5"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${sub.color} transition-transform group-hover:scale-105`}>
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {sub.name}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {sub.description}
                  </p>

                  <div className="mt-5 flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    <span>View Batches</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-24 dark:bg-slate-950 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              COMMUNITY VOICES
            </span>

            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl dark:text-white">
              Trusted by Thousands of Learners & Mentors
            </h2>

            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Read how MentorLagbe makes academic tuition organized, transparent, and rewarding.
            </p>
          </div>

          <div className="grid gap-7 lg:grid-cols-3">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-8 shadow-sm transition hover:shadow-md"
              >
                <div>
                  {/* Rating Stars & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} size={16} className="fill-amber-400" />
                      ))}
                    </div>
                    <span className="rounded-full bg-indigo-100 dark:bg-indigo-950/80 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700 dark:text-indigo-300">
                      {item.subject}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 italic">
                    "{item.quote}"
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-slate-200/60 dark:border-slate-800 pt-5">
                  <Avatar className="h-11 w-11 border border-indigo-200 dark:border-indigo-900">
                    <AvatarImage src={item.avatar} alt={item.name} />
                    <AvatarFallback className="bg-indigo-50 font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                      {item.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.role}
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
}
