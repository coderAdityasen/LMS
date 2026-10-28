import { Catalog } from "@/components/courses/catalog";
import { listPublishedCourses } from "@/lib/data/repository";
import { containerClass } from "@/lib/utils";

export const metadata = { title: "Catalog" };

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; price?: string }>;
}) {
  const params = await searchParams;
  const courses = await listPublishedCourses();
  const price = params.price === "free" || params.price === "paid" ? params.price : "all";
  return (
    <div className={`${containerClass} py-8`}>
      <p className="text-sm font-bold uppercase tracking-wide text-brand">Catalog</p>
      <h1 className="mt-1 text-3xl font-bold">Find your next course</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
        Filter by subject, level, and price. Every course opens with a syllabus before you enroll.
      </p>
      <div className="mt-8">
        <Catalog courses={courses} initialQuery={params.q ?? ""} initialCategory={params.category ?? ""} initialPrice={price} />
      </div>
    </div>
  );
}
