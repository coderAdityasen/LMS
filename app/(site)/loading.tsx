import { Skeleton, SkeletonCard, SkeletonText } from "@/components/ui/skeleton";
import { containerClass } from "@/lib/utils";

export default function HomeLoading() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Skeleton */}
      <div className={`${containerClass} grid gap-8 lg:grid-cols-2 items-center`}>
        <div className="space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-4/5" />
          <SkeletonText lines={3} className="max-w-lg" />
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-12 w-36 rounded-xl" />
            <Skeleton className="h-12 w-32 rounded-xl" />
          </div>
        </div>
        <Skeleton className="aspect-[4/3] w-full rounded-3xl" />
      </div>

      {/* Featured Courses Grid Skeleton */}
      <div className={containerClass}>
        <div className="flex justify-between items-end mb-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-64" />
          </div>
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
