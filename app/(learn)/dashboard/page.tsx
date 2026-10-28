import { PurchasedCourses } from "@/components/dashboard/purchased-courses";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { requireUser } from "@/lib/auth/current-user";
import { listMyLearning } from "@/lib/data/repository";
import { containerClass } from "@/lib/utils";

export const metadata = { title: "My learning" };

export default async function DashboardPage() {
  const user = await requireUser();
  const courses = await listMyLearning(user.id);
  return (
    <>
      <Navbar />
      <main id="content" className="min-h-[70vh] bg-canvas">
        <div className={`${containerClass} py-8`}>
          <p className="text-sm font-bold uppercase tracking-wide text-brand">My learning</p>
          <h1 className="mt-1 text-3xl font-bold">Welcome back{user.full_name ? `, ${user.full_name.split(" ")[0]}` : ""}</h1>
          <p className="mt-2 text-sm text-muted">Pick up where you left off. All your course readings are below.</p>
          <div className="mt-8">
            <PurchasedCourses courses={courses} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
