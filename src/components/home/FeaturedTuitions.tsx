"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedTuitions = () => {
  const router = useRouter();

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <Badge className="mb-4 rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-blue-700 hover:bg-blue-50">
              Featured Opportunities
            </Badge>

            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Explore Latest Tuitions
            </h2>

            <p className="mt-3 max-w-xl text-slate-500">
              Discover available tuition opportunities and connect with the
              right tutor for your learning needs.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => router.push("/tuitions")}
            className="h-auto p-2 rounded-xl border-gray-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            See All Tuitions
            <ArrowRight className="ml-2" size={17} />
          </Button>
        </div>

        {/* Tuition Cards - API Data Will Be Connected Later */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-md"
            >
              <CardContent className="p-0">
                {/* Banner Image Placeholder */}
                <Skeleton className="h-44 w-full rounded-none bg-gray-100" />

                <div className="p-5">
                  {/* Title and Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <Skeleton className="h-6 w-2/3 bg-gray-100" />
                    <Skeleton className="h-6 w-16 rounded-full bg-gray-100" />
                  </div>

                  {/* Subject */}
                  <div className="mt-5 flex items-center gap-2">
                    <Skeleton className="h-4 w-28 bg-gray-100" />
                  </div>

                  {/* Location */}
                  <div className="mt-3 flex items-center gap-2">
                    <Skeleton className="h-4 w-36 bg-gray-100" />
                  </div>

                  {/* Schedule */}
                  <div className="mt-3 flex items-center gap-2">
                    <Skeleton className="h-4 w-24 bg-gray-100" />
                  </div>

                  <div className="my-5 border-t border-gray-100" />

                  {/* Fee and Details */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Skeleton className="h-3 w-20 bg-gray-100" />
                      <Skeleton className="mt-2 h-6 w-24 bg-gray-100" />
                    </div>

                    <Skeleton className="h-10 w-28 rounded-xl bg-gray-100" />
                  </div>
                </div>
              </CardContent>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTuitions;
