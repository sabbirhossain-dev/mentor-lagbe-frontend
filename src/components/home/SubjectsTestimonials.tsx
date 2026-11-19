import Link from "next/link";
import {
  ArrowRight,
  Atom,
  BookOpen,
  Code2,
  Languages,
  MessageSquareQuote,
  Users,
} from "lucide-react";

const SubjectsTestimonials = () => {
  const subjects = [
    {
      name: "Mathematics",
      description: "Build strong problem-solving skills.",
      icon: Atom,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-950",
    },
    {
      name: "Physics",
      description: "Understand the world through science.",
      icon: BookOpen,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-950",
    },
    {
      name: "Programming",
      description: "Develop practical coding skills.",
      icon: Code2,
      color: "bg-green-100 text-green-600 dark:bg-green-950",
    },
    {
      name: "IELTS",
      description: "Improve your English proficiency.",
      icon: Languages,
      color: "bg-orange-100 text-orange-600 dark:bg-orange-950",
    },
  ];

  return (
    <>
      {/* Popular Subjects Section */}
      <section className="bg-[#F0F7FF] py-20 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <span className="font-semibold text-blue-600">
                EXPLORE SUBJECTS
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
                Learn What You Love
              </h2>

              <p className="mt-3 max-w-xl text-slate-500 dark:text-slate-400">
                Explore popular subjects and find tutors who can help you
                achieve your goals.
              </p>
            </div>

            <Link
              href="/tuitions"
              className="inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:gap-3"
            >
              Explore Tuitions
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Static Subject Categories */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {subjects.map((subject) => {
              const Icon = subject.icon;

              return (
                <Link
                  key={subject.name}
                  href={`/tuitions?subject=${encodeURIComponent(subject.name)}`}
                  className="group rounded-2xl border border-white bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${subject.color}`}
                  >
                    <Icon size={28} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900 transition group-hover:text-blue-600 dark:text-white">
                    {subject.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {subject.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-600">
                    Explore Subject
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
      <section className="bg-white py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="rounded-3xl bg-blue-600 px-6 py-12 sm:px-12 sm:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <Users className="mx-auto text-blue-200" size={38} />

              <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl">
                Growing Together, Learning Together
              </h2>

              <p className="mt-4 leading-7 text-blue-100">
                Every connection creates a new opportunity to learn, teach, and
                grow.
              </p>
            </div>

            {/*
              API INTEGRATION PLACEHOLDER:
              Student count, Tutor count and Approved Tuition count
              will be fetched from backend statistics API.
            */}
            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {["Students", "Expert Tutors", "Active Tuitions"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm"
                >
                  <div className="mx-auto mb-4 h-8 w-20 animate-pulse rounded-lg bg-white/20" />

                  <p className="text-sm font-medium text-blue-100">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#F0F7FF] py-20 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-semibold text-blue-600">
              COMMUNITY FEEDBACK
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
              What Our Community Says
            </h2>

            <p className="mt-4 text-slate-500 dark:text-slate-400">
              Discover experiences and feedback from our learning community.
            </p>
          </div>

          {/*
            API INTEGRATION PLACEHOLDER:
            Render verified student/tutor testimonials here.
            Keep this empty until a testimonials API is available.
          */}
          <div className="mx-auto mt-12 flex min-h-56 max-w-2xl flex-col items-center justify-center rounded-3xl border-2 border-dashed border-blue-200 bg-white/70 px-6 text-center dark:border-slate-700 dark:bg-slate-950/50">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950">
              <MessageSquareQuote size={28} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-800 dark:text-white">
              Community Stories
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
              Verified feedback from students and tutors will appear here.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SubjectsTestimonials;
