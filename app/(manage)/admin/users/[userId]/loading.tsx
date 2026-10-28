import { Skeleton, SkeletonTable } from "@/components/ui/skeleton";

export default function UserDetailLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-4 w-28" />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Profile Card */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs text-center space-y-4">
            <Skeleton className="mx-auto h-16 w-16 rounded-2xl" />
            <Skeleton className="mx-auto h-5 w-36" />
            <Skeleton className="mx-auto h-4 w-48" />
            <div className="border-t border-slate-100 pt-5 grid grid-cols-2 gap-3">
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
            <Skeleton className="h-5 w-40" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        </div>

        {/* Right Column: Purchases */}
        <div className="lg:col-span-2">
          <SkeletonTable rows={5} cols={5} />
        </div>
      </div>
    </div>
  );
}
