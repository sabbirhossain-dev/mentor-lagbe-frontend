"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Check, Crown, GraduationCap, Loader2, Sparkles, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

const PricingSection = () => {
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
    <section className="bg-[#F0F7FF] py-20 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="font-semibold text-blue-600 text-xs tracking-wider uppercase">
            SIMPLE & TRANSPARENT PRICING
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
            Plans That Fit Your Academic Goals
          </h2>

          <p className="mt-4 leading-7 text-slate-500 dark:text-slate-400">
            Start for free and upgrade with Stripe whenever you are ready for unlimited opportunities.
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
                className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-9 dark:border-slate-700 dark:bg-slate-950 flex flex-col justify-between"
              >
                <div>
                  {/* Plan Header */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950">
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
                    <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">
                          Free Tier
                        </h4>

                        <p className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white">
                          {plan.freePrice}
                          <span className="text-sm font-medium text-slate-400"> / mo</span>
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

                      <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                        <span className="text-xs font-semibold text-slate-400">
                          Included by default
                        </span>
                      </div>
                    </div>

                    {/* Pro Plan */}
                    <div className="relative rounded-2xl border-2 border-blue-500 bg-blue-50/70 p-5 dark:bg-blue-950/30 flex flex-col justify-between shadow-md shadow-blue-500/5">
                      <span className="absolute -top-3 right-4 rounded-full bg-blue-600 px-3 py-0.5 text-xs font-bold text-white shadow-sm">
                        PRO
                      </span>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-slate-900 dark:text-white">
                            Pro Tier
                          </h4>
                          <Crown size={16} className="text-amber-500 fill-amber-500" />
                        </div>

                        <p className="mt-3 text-3xl font-extrabold text-blue-600">
                          {plan.proPrice}
                          <span className="text-sm font-medium text-slate-400"> / mo</span>
                        </p>

                        <ul className="mt-6 space-y-3">
                          {plan.proFeatures.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-2 text-xs font-medium text-slate-700 dark:text-slate-200"
                            >
                              <Check size={15} className="mt-0.5 shrink-0 text-blue-600" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Stripe Checkout CTA */}
                      <div className="mt-6">
                        {isUserPro ? (
                          <div className="rounded-xl bg-emerald-100 p-2.5 text-center text-xs font-bold text-emerald-800">
                            ✓ Currently Active Plan
                          </div>
                        ) : (
                          <Button
                            onClick={() => handleSubscribe(plan.planKey)}
                            disabled={loadingPlan === plan.planKey}
                            className="w-full rounded-xl bg-blue-600 py-5 text-xs font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700"
                          >
                            {loadingPlan === plan.planKey ? (
                              <>
                                <Loader2 size={15} className="animate-spin mr-2" />
                                Connecting to Stripe...
                              </>
                            ) : (
                              <>
                                <Crown size={15} className="mr-2" />
                                Subscribe with Stripe ({plan.proPrice})
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
};

export default PricingSection;
