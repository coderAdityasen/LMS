import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-shimmer rounded-xl bg-slate-200/80", className)}
      {...props}
    />
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2.5", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-3.5",
            i === lines - 1 ? "w-3/5" : i === 0 ? "w-full" : "w-5/6"
          )}
        />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
      <div>
        <Skeleton className="aspect-[16/9] w-full rounded-none" />
        <div className="p-5 space-y-3">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-5 w-4/5" />
          <SkeletonText lines={2} />
        </div>
      </div>
      <div className="border-t border-slate-100 bg-slate-50/50 p-4 flex items-center justify-between">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-10 w-10 rounded-xl" />
          </div>
          <Skeleton className="h-8 w-32" />
          <div className="border-t border-slate-100 pt-3 flex justify-between">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-14 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
      <div className="border-b border-slate-100 bg-slate-50/60 p-4 flex items-center justify-between">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="p-4 space-y-4">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex items-center justify-between gap-4 py-2 border-b border-slate-100 last:border-b-0">
            {Array.from({ length: cols }).map((_, c) => (
              <Skeleton
                key={c}
                className={cn(
                  "h-4",
                  c === 0 ? "w-36 h-5" : c === cols - 1 ? "w-20" : "w-28"
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonPdfViewer() {
  return (
    <div className="flex h-screen flex-col bg-[#1c1d1f] text-white">
      <header className="flex h-14 items-center justify-between border-b border-white/10 px-4">
        <Skeleton className="h-6 w-32 bg-white/20" />
        <Skeleton className="h-5 w-48 bg-white/20" />
        <Skeleton className="h-6 w-16 bg-white/20" />
      </header>
      <div className="grid min-h-0 flex-1 lg:grid-cols-[320px_1fr]">
        <aside className="hidden border-r border-white/10 bg-white p-4 space-y-4 lg:block">
          <Skeleton className="h-4 w-28 bg-slate-200" />
          <Skeleton className="h-5 w-44 bg-slate-200" />
          <div className="space-y-3 pt-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-lg bg-slate-100" />
            ))}
          </div>
        </aside>
        <main className="flex flex-col bg-[#2d2f31] p-4 space-y-4">
          <div className="rounded-xl bg-white p-5 space-y-2">
            <Skeleton className="h-3 w-24 bg-slate-200" />
            <Skeleton className="h-6 w-64 bg-slate-200" />
          </div>
          <div className="flex-1 rounded-xl bg-white/10 p-6 flex items-center justify-center">
            <div className="space-y-3 w-full max-w-xl text-center">
              <Skeleton className="h-8 w-48 mx-auto bg-white/20" />
              <Skeleton className="h-4 w-3/4 mx-auto bg-white/20" />
              <Skeleton className="h-64 w-full rounded-lg bg-white/20" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
