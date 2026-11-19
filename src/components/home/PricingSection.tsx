"use client";

import { useRouter } from "next/navigation";
import { Check, Crown, GraduationCap, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

const PricingSection = () => {
  const router = useRouter();

  const plans = [
    {
      role: "For Students",
      icon: GraduationCap,
      description: "Find the right tutor and make learning easier.",
      freePrice: "$0",
      proPrice: "$10",
      freeFeatures: [
        "Browse approved tuitions",
        "Apply for tuition opportunities",
        "Track application status",
      ],
      proFeatures: [
        "Everything in Free",
        "Enhanced learning experience",
        "Priority support",
      ],
    },
    {
      role: "For Tutors",
      icon: Users,
      description: "Grow your teaching career with more opportunities.",
      freePrice: "$0",
      proPrice: "$15",
      freeFeatures: [
        "Create up to 2 tuition posts",
        "Manage tuition applications",
        "Basic tutor profile",
      ],
      proFeatures: [
        "Everything in Free",
        "Unlimited tuition posts",
        "Enhanced tutor visibility",
      ],
    },
  ];

  return (
    <section className="bg-[#F0F7FF] py-20 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="font-semibold text-blue-600">
            SIMPLE & TRANSPARENT
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
            Plans That Fit Your Goals
          </h2>

          <p className="mt-4 leading-7 text-slate-500 dark:text-slate-400">
            Start for free and upgrade whenever you are ready for more
            opportunities.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-2">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.role}
                className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-9 dark:border-slate-700 dark:bg-slate-950"
              >
                {/* Plan Header */}
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950">
                    <Icon size={29} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {plan.role}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {plan.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {/* Free Plan */}
                  <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
                    <h4 className="font-bold text-slate-800 dark:text-white">
                      Free
                    </h4>

                    <p className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white">
                      {plan.freePrice}
                      <span className="text-sm font-medium text-slate-400">
                        {" "}
                        / month
                      </span>
                    </p>

                    <ul className="mt-6 space-y-4">
                      {plan.freeFeatures.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                        >
                          <Check
                            size={17}
                            className="mt-0.5 shrink-0 text-green-500"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pro Plan */}
                  <div className="relative rounded-2xl border-2 border-blue-500 bg-blue-50/70 p-5 dark:bg-blue-950/30">
                    <span className="absolute -top-3 right-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                      PRO
                    </span>

                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 dark:text-white">
                        Pro
                      </h4>
                      <Crown size={17} className="text-amber-500" />
                    </div>

                    <p className="mt-3 text-3xl font-extrabold text-blue-600">
                      {plan.proPrice}
                      <span className="text-sm font-medium text-slate-400">
                        {" "}
                        / month
                      </span>
                    </p>

                    <ul className="mt-6 space-y-4">
                      {plan.proFeatures.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200"
                        >
                          <Check
                            size={17}
                            className="mt-0.5 shrink-0 text-blue-600"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/*
                      STRIPE INTEGRATION PLACEHOLDER:
                      Later connect this CTA to the Stripe Checkout API.
                    */}
                    <Button
                      onClick={() => router.push("/pricing")}
                      className="mt-7 flex h-auto w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                    >
                      <Crown size={17} />
                      Explore Pro Plan
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
