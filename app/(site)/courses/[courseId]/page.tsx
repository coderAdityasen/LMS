import { notFound } from "next/navigation";
import { CourseDetail } from "@/components/courses/course-detail";
import { getCurrentUser } from "@/lib/auth/current-user";
import { getCourse, hasCompletedPurchase, listSyllabus } from "@/lib/data/repository";

export async function generateMetadata({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = await getCourse(courseId);
  return { title: course?.title ?? "Course" };
}

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const [course, user] = await Promise.all([getCourse(courseId), getCurrentUser()]);
  if (!course) notFound();
  if (!course.is_published && user?.role !== "admin") notFound();
  const [lessons, purchased] = await Promise.all([
    listSyllabus(courseId),
    user ? hasCompletedPurchase(user.id, courseId) : Promise.resolve(false),
  ]);
  return <CourseDetail course={course} lessons={lessons} user={user} purchased={purchased} />;
}
