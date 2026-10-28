import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { containerClass } from "@/lib/utils";

export default function CourseDetailLoading() {
  return (
    <div className="space-y-12 py-8">
      {/* Hero Banner Skeleton */}
      <div className="bg-navy py-12 text-white">
        <div className={`${containerClass} grid gap-8 lg:grid-cols-[1fr_360px]`}>
          <div className="space-y-4">
            <Skeleton className="h-4 w-32 bg-white/20" />
            <Skeleton className="h-10 w-4/5 bg-white/20" />
            <SkeletonText lines={3} className="max-w-xl text-white/30" />
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-6 w-24 rounded-full bg-white/20" />
              <Skeleton className="h-6 w-24 rounded-full bg-white/20" />
            </div>
          </div>
          <div className="rounded-2xl bg-white/10 p-5 space-y-4">
            <Skeleton className="aspect-[16/9] w-full rounded-xl bg-white/20" />
            <Skeleton className="h-8 w-28 bg-white/20" />
            <Skeleton className="h-12 w-full rounded-xl bg-white/30" />
          </div>
        </div>
      </div>

      {/* Curriculum & Outcomes Skeleton */}
      <div className={`${containerClass} grid gap-8 lg:grid-cols-[1fr_360px]`}>
        <div className="space-y-8">
          <div className="rounded-2xl border border-slate-200 p-6 space-y-4">
            <Skeleton className="h-6 w-48" />
            <div className="grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-xl" />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6 space-y-4">
            <Skeleton className="h-6 w-48" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-slate-100 p-4 space-y-3">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
