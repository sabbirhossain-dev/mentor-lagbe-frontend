import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Search,
  UserPlus,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description:
        "Sign up as a student or tutor and create your learning profile.",
      icon: UserPlus,
    },
    {
      number: "02",
      title: "Explore Opportunities",
      description:
        "Students browse available tuitions while tutors create tuition posts.",
      icon: Search,
    },
    {
      number: "03",
      title: "Connect & Apply",
      description:
        "Students apply for suitable tuition opportunities and tutors review applications.",
      icon: FileText,
    },
    {
      number: "04",
      title: "Start Learning",
      description:
        "Connect with the right match and begin your learning journey.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="bg-white py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="font-semibold text-blue-600">SIMPLE PROCESS</span>

          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
            How MentorLagbe Works
          </h2>

          <p className="mt-4 text-slate-500 dark:text-slate-400">
            Getting started is simple. Follow a few easy steps to find your
            ideal learning opportunity.
          </p>
        </div>

        {/* Workflow Cards */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative">
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950">
                      <Icon size={28} />
                    </div>

                    <span className="text-3xl font-black text-blue-100 dark:text-blue-950">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                    {step.description}
                  </p>
                </div>

                {/* Connector - Desktop only */}
                {index !== steps.length - 1 && (
                  <div className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 text-blue-400 lg:block">
                    <ArrowRight size={24} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
