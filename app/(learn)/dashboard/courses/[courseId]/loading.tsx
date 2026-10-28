import { Navbar } from "@/components/layout/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { containerClass } from "@/lib/utils";

export default function CourseHomeLoading() {
  return (
    <>
      <Navbar />
      <main id="content" className="min-h-[70vh] bg-canvas">
        <div className={`${containerClass} py-8`}>
          <Skeleton className="h-4 w-48" />
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-8 w-72" />
              <Skeleton className="h-4 w-96 max-w-full" />
            </div>
            <Skeleton className="h-10 w-44 rounded-md" />
          </div>
          <div className="mt-8 space-y-4">
            {Array.from({ length: 2 }).map((_, mIdx) => (
              <div key={mIdx} className="overflow-hidden rounded-lg border border-line bg-white">
                <div className="border-b border-line px-4 py-3">
                  <Skeleton className="h-4 w-52" />
                </div>
                <div className="divide-y divide-line">
                  {Array.from({ length: 3 }).map((_, lIdx) => (
                    <div key={lIdx} className="flex items-start gap-3 px-4 py-3">
                      <Skeleton className="mt-0.5 h-4 w-4 rounded-full shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-60" />
                        <Skeleton className="h-3 w-4/5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
