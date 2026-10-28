import { AdminCoursesView } from "@/components/admin/admin-courses-view";
import { listAllCourses } from "@/lib/data/repository";

export const metadata = { title: "Courses & PDF Readings · Admin" };

export default async function AdminCoursesPage() {
  const courses = await listAllCourses();

  return <AdminCoursesView courses={courses} />;
}
