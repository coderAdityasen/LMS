import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { containerClass } from "@/lib/utils";

export default function CheckoutLoading() {
  return (
    <div className={`${containerClass} py-8 space-y-6`}>
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-9 w-48" />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Left Form Box */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6 shadow-xs">
          <Skeleton className="h-6 w-44" />
          <SkeletonText lines={2} />
          <div className="space-y-3 border-t border-slate-100 pt-4">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-36" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
          <Skeleton className="h-12 w-48 rounded-xl" />
        </div>

        {/* Right Summary Box */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
          <Skeleton className="aspect-[16/9] w-full rounded-xl" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-48" />
          <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-7 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
