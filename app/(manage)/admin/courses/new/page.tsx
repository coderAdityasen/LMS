import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CourseForm } from "@/components/admin/course-form";
import { createCourseAction } from "@/lib/actions/courses";

export const metadata = { title: "Create New Course · Admin" };

export default function NewCoursePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        href="/admin/courses"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Courses</span>
      </Link>

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Create New Course
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Set up the syllabus details, pricing, and outcomes. You can attach PDF readings immediately after creating.
        </p>
      </div>

      <CourseForm action={createCourseAction} />
    </div>
  );
}
