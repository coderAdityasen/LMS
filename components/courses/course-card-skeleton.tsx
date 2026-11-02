export function CourseCardSkeleton() {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white animate-pulse">
      <div>
        {/* Top Thumbnail Skeleton */}
        <div className="aspect-[16/10] w-full bg-slate-200/80" />
        {/* Body */}
        <div className="p-4 sm:p-5 space-y-3">
          {/* Partner Row */}
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-md bg-slate-200" />
            <div className="h-3.5 w-24 rounded bg-slate-200" />
          </div>
          {/* Title */}
          <div className="space-y-1.5">
            <div className="h-4 w-full rounded bg-slate-200" />
            <div className="h-4 w-3/4 rounded bg-slate-200" />
          </div>
          {/* Skills */}
          <div className="h-3 w-5/6 rounded bg-slate-200/70" />
          {/* Meta */}
          <div className="h-3 w-40 rounded bg-slate-200/70" />
          {/* Badge */}
          <div className="h-5 w-32 rounded-md bg-purple-100/60" />
        </div>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-4 sm:px-5 py-3">
        <div className="h-6 w-16 rounded bg-slate-200" />
        <div className="h-7 w-20 rounded-xl bg-purple-200" />
      </div>
    </div>
  );
}
