import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Pencil } from "lucide-react";
import { PdfList } from "@/components/admin/pdf-list";
import { PdfUpload } from "@/components/admin/pdf-upload";
import { getCourse, listCoursePdfs } from "@/lib/data/repository";

export const metadata = { title: "Manage Course PDFs · Admin" };

export default async function CoursePdfsPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = await getCourse(courseId);
  if (!course) notFound();
  const pdfs = await listCoursePdfs(courseId);

  return (
    <div className="space-y-8">
      {/* Header and Breadcrumb */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-6">
        <div>
          <Link
            href="/admin/courses"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Courses</span>
          </Link>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            {course.title}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 flex items-center gap-2">
            <span>{course.metadata.partner || "Meridian"}</span>
            <span>·</span>
            <span className="font-semibold text-indigo-600">{course.metadata.category}</span>
            <span>·</span>
            <span>{pdfs.length} PDF Readings</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/admin/courses/${course.id}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
          >
            <Pencil className="h-3.5 w-3.5 text-slate-400" />
            <span>Edit Info</span>
          </Link>

          <Link
            href={`/courses/${course.id}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            <span>View on Site</span>
          </Link>
        </div>
      </div>

      {/* Upload Box */}
      <PdfUpload courseId={course.id} />

      {/* Curriculum PDF List */}
      <PdfList courseId={course.id} pdfs={pdfs} />
    </div>
  );
}
