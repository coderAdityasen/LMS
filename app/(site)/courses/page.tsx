import { Catalog } from "@/components/courses/catalog";
import { listPublishedCourses } from "@/lib/data/repository";
import { containerClass } from "@/lib/utils";

export const metadata = {
  title: "Courses | Eminence Career Solution",
  description:
    "Explore instructor-led certification programs in Cloud Computing, Cybersecurity, DevOps, and Project Management.",
};

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; price?: string }>;
}) {
  const params = await searchParams;
  const courses = await listPublishedCourses();

  return (
    <div className="bg-white min-h-screen pb-20 pt-6">
      <div className={containerClass}>
        <Catalog
          courses={courses}
          initialQuery={params.q ?? ""}
          initialCategory={params.category ?? ""}
          initialPrice={params.price ?? "all"}
        />
      </div>
    </div>
  );
}
