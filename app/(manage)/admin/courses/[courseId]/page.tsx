import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { CourseForm } from "@/components/admin/course-form";
import { ConfirmForm } from "@/components/ui/confirm-form";
import { SubmitButton } from "@/components/ui/submit-button";
import { deleteCourseAction, updateCourseAction } from "@/lib/actions/courses";
import { getCourse } from "@/lib/data/repository";

export const metadata = { title: "Edit Course · Admin" };

export default async function EditCoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = await getCourse(courseId);
  if (!course) notFound();
  const action = updateCourseAction.bind(null, course.id);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/admin/courses"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Courses</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href={`/admin/courses/${course.id}/pdfs`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-50 border border-indigo-200/80 px-3.5 py-2 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition-colors"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Manage PDF Readings</span>
          </Link>
          <Link
            href={`/courses/${course.id}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            <span>Storefront Preview</span>
          </Link>
        </div>
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Edit Course
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {course.title} · {course.metadata.partner}
        </p>
      </div>

      <CourseForm course={course} action={action} />

      {/* Danger Zone */}
      <div className="rounded-2xl border border-red-200 bg-red-50/40 p-6 shadow-xs">
        <h3 className="text-sm font-bold text-red-900">Danger Zone</h3>
        <p className="mt-1 text-xs text-red-700">
          Permanently delete this course, all its attached PDF lessons from storage, and associated records.
        </p>
        <div className="mt-4">
          <ConfirmForm action={deleteCourseAction} message="Are you sure you want to delete this course and all its PDF readings?">
            <input type="hidden" name="id" value={course.id} />
            <SubmitButton variant="danger" pendingLabel="Deleting Course...">
              Delete Course
            </SubmitButton>
          </ConfirmForm>
        </div>
      </div>
    </div>
  );
}
