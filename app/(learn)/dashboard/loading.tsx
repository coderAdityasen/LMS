import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";
import { containerClass } from "@/lib/utils";

export default function DashboardLoading() {
  return (
    <>
      <Navbar />
      <main id="content" className="min-h-[70vh] bg-canvas">
        <div className={`${containerClass} py-8`}>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-2 h-9 w-64" />
          <Skeleton className="mt-2 h-4 w-96 max-w-full" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
