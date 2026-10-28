import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CheckCircle2, FileText } from "lucide-react";
import { Flash } from "@/components/feedback/flash";
import { Navbar } from "@/components/layout/navbar";
import { requireUser } from "@/lib/auth/current-user";
import { getCourse, hasCompletedPurchase, listSyllabus } from "@/lib/data/repository";
import { buttonClass } from "@/lib/ui";
import { containerClass, groupLessons } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = await getCourse(courseId);
  return { title: course ? `${course.title} home` : "Course" };
}

export default async function CourseHomePage({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<{ enrolled?: string }>;
}) {
  const { courseId } = await params;
  const { enrolled } = await searchParams;
  const user = await requireUser();
  const course = await getCourse(courseId);
  if (!course) notFound();
  const allowed = user.role === "admin" || (await hasCompletedPurchase(user.id, courseId));
  if (!allowed) redirect(`/courses/${courseId}`);
  const lessons = await listSyllabus(courseId);
  const modules = groupLessons(lessons);
  const first = lessons[0];

  return (
    <>
      <Navbar />
      <Flash message={enrolled ? `You are enrolled in ${course.title}` : undefined} />
      <main id="content" className="min-h-[70vh] bg-canvas">
        <div className={`${containerClass} py-8`}>
          <p className="text-sm text-muted">
            <Link href="/dashboard" className="font-semibold text-brand">My learning</Link>
            <span> / {course.title}</span>
          </p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-brand">{course.metadata.partner}</p>
              <h1 className="mt-1 text-3xl font-bold">{course.title}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{course.metadata.subtitle}</p>
            </div>
            {first ? (
              <Link href={`/dashboard/courses/${course.id}/${first.id}`} className={buttonClass("primary", "lg")}>
                Start first reading
              </Link>
            ) : null}
          </div>
          <div className="mt-8 grid gap-4">
            {modules.length === 0 ? (
              <p className="rounded-lg border border-dashed border-line bg-white px-4 py-10 text-sm text-muted">This course has no readings yet.</p>
            ) : (
              modules.map((module, index) => (
                <section key={module.title} className="overflow-hidden rounded-lg border border-line bg-white">
                  <h2 className="border-b border-line px-4 py-3 text-sm font-bold">Module {index + 1} · {module.title}</h2>
                  <ul>
                    {module.lessons.map((lesson) => (
                      <li key={lesson.id} className="border-b border-line last:border-b-0">
                        <Link href={`/dashboard/courses/${course.id}/${lesson.id}`} className="flex items-start gap-3 px-4 py-3 hover:bg-canvas">
                          <FileText className="mt-0.5 h-4 w-4 text-brand" />
                          <span>
                            <span className="block text-sm font-semibold">{lesson.title}</span>
                            {lesson.summary ? <span className="mt-1 block text-sm text-muted">{lesson.summary}</span> : null}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))
            )}
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-muted">
            <CheckCircle2 className="h-4 w-4 text-brand" />
            Mark each reading complete in the viewer. Progress is saved in your browser.
          </p>
        </div>
      </main>
    </>
  );
}
