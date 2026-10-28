import { notFound, redirect } from "next/navigation";
import { PdfViewer } from "@/components/pdf/pdf-viewer";
import { getCurrentUser, requireUser } from "@/lib/auth/current-user";
import { getLessonForViewer } from "@/lib/data/repository";

export async function generateMetadata({ params }: { params: Promise<{ courseId: string; pdfId: string }> }) {
  const { courseId, pdfId } = await params;
  const user = await getCurrentUser();
  if (!user) return { title: "Reading" };
  const lesson = await getLessonForViewer(courseId, pdfId, user);
  return { title: lesson.ok ? lesson.lesson.title : "Reading" };
}

export default async function LessonPage({ params }: { params: Promise<{ courseId: string; pdfId: string }> }) {
  const { courseId, pdfId } = await params;
  const user = await requireUser();
  const result = await getLessonForViewer(courseId, pdfId, user);
  if (!result.ok && result.reason === "forbidden") redirect(`/courses/${courseId}`);
  if (!result.ok) notFound();
  return (
    <PdfViewer
      courseId={result.course.id}
      courseTitle={result.course.title}
      lesson={result.lesson}
      lessons={result.lessons}
      src={result.src}
    />
  );
}
