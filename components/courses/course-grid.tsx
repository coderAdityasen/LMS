import { CourseCard } from "@/components/courses/course-card";
import type { CourseView } from "@/lib/types";

export function CourseGrid({ courses }: { courses: CourseView[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
