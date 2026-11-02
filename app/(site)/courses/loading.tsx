import { containerClass } from "@/lib/utils";
import { CourseCardSkeleton } from "@/components/courses/course-card-skeleton";

export default function CoursesLoading() {
  return (
    <div className="bg-white min-h-screen pb-20 pt-6">
      <div className={`${containerClass} space-y-6`}>
        {/* "More to explore" tags skeleton */}
        <div className="flex items-center gap-2 overflow-hidden pb-1 text-xs">
          <div className="h-4 w-28 rounded bg-slate-200 animate-pulse" />
          <div className="flex items-center gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-7 w-28 rounded-full border border-slate-200 bg-slate-100 animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Title skeleton */}
        <div className="pt-2">
          <div className="h-8 w-44 rounded-lg bg-slate-200 animate-pulse" />
        </div>

        {/* Horizontal filters bar skeleton */}
        <div className="flex flex-wrap items-center gap-2 pt-1 pb-3">
          <div className="h-9 w-28 rounded-full bg-slate-200 animate-pulse" />
          <div className="h-9 w-24 rounded-full bg-slate-200 animate-pulse" />
          <div className="h-9 w-20 rounded-full bg-slate-200 animate-pulse" />
          <div className="h-9 w-22 rounded-full bg-slate-200 animate-pulse" />
          <div className="h-9 w-36 rounded-full bg-slate-200 animate-pulse ml-auto" />
        </div>

        {/* 4-Column Course Cards Grid Skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
