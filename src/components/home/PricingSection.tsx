"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Check, Crown, GraduationCap, Loader2, Sparkles, Users, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

export default function PricingSection() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const plans = [
    {
      role: "For Students",
      planKey: "student_pro",
      icon: GraduationCap,
      description: "Find the right tutor and make learning easier.",
      freePrice: "$0",
      proPrice: "$10",
      freeFeatures: [
        "Browse all approved tuitions",
        "Apply for tuition opportunities",
        "Up to 5 saved tuition bookmarks",
        "Track application status in real-time",
      ],
      proFeatures: [
        "Everything in Free Plan",
        "Unlimited tuition bookmarks",
        "Priority application placement for tutors",
        "Direct verified badge access",
      ],
    },
    {
      role: "For Tutors",
      planKey: "tutor_pro",
      icon: Users,
      description: "Grow your teaching career with unlimited batches.",
      freePrice: "$0",
      proPrice: "$15",
      freeFeatures: [
        "Create up to 2 tuition posts",
        "Manage tuition applicants (Accept/Reject)",
        "Basic tutor profile in directory",
      ],
      proFeatures: [
        "Everything in Free Plan",
        "Unlimited tuition listings",
        "Verified Mentor Badge on all posts",
        "Top priority placement in tuition catalog",
      ],
    },
  ];

  const handleSubscribe = async (planKey: string) => {
    if (!user) {
      toast("Please sign in to upgrade your subscription", { icon: "🔒" });
      router.push("/sign-in");
      return;
    }

    setLoadingPlan(planKey);
    const toastId = toast.loading("Redirecting to Stripe Checkout...");

    try {
      const res = await apiFetch<{ success: boolean; url: string }>("/payments/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planType: planKey }),
      });

      if (res.success && res.url) {
        toast.dismiss(toastId);
        window.location.href = res.url;
      } else {
        toast.error("Failed to initiate checkout session", { id: toastId });
        setLoadingPlan(null);
      }
    } catch (err: any) {
      console.error("Stripe error:", err);
      toast.error(err.message || "Stripe checkout failed. Please try again.", { id: toastId });
      setLoadingPlan(null);
    }
  };

  return (
    <section className="bg-gradient-to-b from-indigo-50/40 via-white to-slate-50/50 py-24 dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-xs font-bold tracking-wider uppercase text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/60 dark:text-indigo-300">
            <Zap size={14} className="text-amber-500 fill-amber-500" />
            SIMPLE & TRANSPARENT PRICING
          </div>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Plans That Fit Your Academic Journey
          </h2>

          <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
            Start completely free and upgrade with encrypted Stripe processing whenever you are ready for unlimited capacity.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-2">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isUserPro = user?.plan === "pro";

            return (
              <div
                key={plan.role}
                className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-9 dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
              >
                <div>
                  {/* Plan Header */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300">
                      <Icon size={28} />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {plan.role}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {plan.description}
                      </p>
                    </div>
                  </div>

                  {/* Pricing Tiers Grid */}
                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    {/* Free Plan */}
                    <div className="rounded-2xl border border-slate-200/90 p-5 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                          Free Tier
                        </h4>

                        <p className="mt-3 text-3xl font-black text-slate-900 dark:text-white">
                          {plan.freePrice}
                          <span className="text-xs font-normal text-slate-400"> / mo</span>
                        </p>

                        <ul className="mt-6 space-y-3">
                          {plan.freeFeatures.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                            >
                              <Check size={15} className="mt-0.5 shrink-0 text-emerald-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 text-center">
                        <span className="text-xs font-semibold text-slate-400">
                          Included by default
                        </span>
                      </div>
                    </div>

                    {/* Pro Plan */}
                    <div className="relative rounded-2xl border-2 border-indigo-500 bg-gradient-to-b from-indigo-50/80 to-white dark:from-indigo-950/30 dark:to-slate-900 p-5 flex flex-col justify-between shadow-lg shadow-indigo-500/10">
                      <span className="absolute -top-3 right-4 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-0.5 text-xs font-bold text-white shadow-sm flex items-center gap-1">
                        <Crown size={12} className="text-amber-300" /> PRO
                      </span>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                            Pro Tier
                          </h4>
                        </div>

                        <p className="mt-3 text-3xl font-black text-indigo-600 dark:text-indigo-400">
                          {plan.proPrice}
                          <span className="text-xs font-normal text-slate-400"> / mo</span>
                        </p>

                        <ul className="mt-6 space-y-3">
                          {plan.proFeatures.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-2 text-xs font-medium text-slate-700 dark:text-slate-200"
                            >
                              <Check size={15} className="mt-0.5 shrink-0 text-indigo-600 dark:text-indigo-400" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Stripe Checkout CTA */}
                      <div className="mt-6">
                        {isUserPro ? (
                          <div className="rounded-xl bg-emerald-100 dark:bg-emerald-950/60 p-2.5 text-center text-xs font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                            ✓ Currently Active Plan
                          </div>
                        ) : (
                          <Button
                            onClick={() => handleSubscribe(plan.planKey)}
                            disabled={loadingPlan === plan.planKey}
                            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 py-5 text-xs font-bold text-white shadow-md shadow-indigo-600/25"
                          >
                            {loadingPlan === plan.planKey ? (
                              <>
                                <Loader2 size={15} className="animate-spin mr-2" />
                                Connecting to Stripe...
                              </>
                            ) : (
                              <>
                                <Crown size={15} className="mr-2 text-amber-300" />
                                Upgrade with Stripe ({plan.proPrice})
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
