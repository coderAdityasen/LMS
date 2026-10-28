import Link from "next/link";
import { Check, Clock, FileText, Globe, Library } from "lucide-react";
import { Cover } from "@/components/courses/cover";
import { PurchaseButton } from "@/components/courses/purchase-button";
import { Rating } from "@/components/courses/rating";
import { Syllabus } from "@/components/courses/syllabus";
import type { CourseView, LessonLink, SessionUser } from "@/lib/types";
import { formatCount, formatPrice, groupLessons } from "@/lib/utils";

export function CourseDetail({
  course,
  lessons,
  user,
  purchased,
}: {
  course: CourseView;
  lessons: LessonLink[];
  user: SessionUser | null;
  purchased: boolean;
}) {
  const modules = groupLessons(lessons);
  const points = course.metadata.learning_points;

  return (
    <article>
      <section className="border-b border-line bg-[#f5f8fc]">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_340px] lg:py-10">
          <div>
            <p className="text-sm text-muted">
              <Link href="/courses" className="font-semibold text-brand">Catalog</Link>
              <span> / {course.metadata.category}</span>
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{course.title}</h1>
            <p className="mt-3 max-w-3xl text-lg leading-7 text-ink/80">{course.metadata.subtitle}</p>
            <div className="mt-4">
              <Rating value={course.metadata.rating} count={course.metadata.review_count} />
            </div>
            <p className="mt-3 text-sm">
              {formatCount(course.learner_count)} learners · Offered by <strong>{course.metadata.partner}</strong>
            </p>
            <p className="mt-1 text-sm text-muted">
              Taught by {course.metadata.instructor_name}, {course.metadata.instructor_title}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {course.metadata.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink ring-1 ring-line">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <aside className="h-fit rounded-lg border border-line bg-white p-4 shadow-[0_12px_32px_rgba(15,23,42,0.06)] lg:sticky lg:top-24">
            <div className="aspect-[16/9] overflow-hidden rounded-md bg-canvas">
              <Cover src={course.thumbnail_url} alt="" category={course.metadata.category} />
            </div>
            <p className="mt-4 text-3xl font-bold">{formatPrice(course.price)}</p>
            <p className="text-sm text-muted">{course.price <= 0 ? "Free enrollment" : "One-time enrollment"}</p>
            <div className="mt-4">
              <PurchaseButton courseId={course.id} price={course.price} purchased={purchased} loggedIn={Boolean(user)} />
            </div>
            <ul className="mt-4 grid gap-2 text-sm text-ink/80">
              <li className="flex items-center gap-2"><Library className="h-4 w-4 text-brand" /> {modules.length} modules</li>
              <li className="flex items-center gap-2"><FileText className="h-4 w-4 text-brand" /> {lessons.length} PDF readings</li>
              <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-brand" /> {course.metadata.duration_label}, self-paced</li>
              <li className="flex items-center gap-2"><Globe className="h-4 w-4 text-brand" /> {course.metadata.language}</li>
            </ul>
          </aside>
        </div>
      </section>
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_340px]">
        <div className="grid gap-10">
          <section className="rounded-lg border border-line p-5">
            <h2 className="text-xl font-bold">What you will learn</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {points.map((point) => (
                <li key={point} className="flex gap-2 text-sm leading-6">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-brand" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold">About this course</h2>
            <div className="mt-3 max-w-3xl whitespace-pre-line text-sm leading-7 text-ink/80">{course.description}</div>
          </section>
          <section>
            <h2 className="mb-3 text-xl font-bold">Syllabus</h2>
            {modules.length === 0 ? (
              <p className="rounded-lg border border-dashed border-line px-4 py-8 text-sm text-muted">Readings will appear here once an instructor adds them.</p>
            ) : (
              <Syllabus modules={modules} />
            )}
          </section>
          <section className="flex gap-4 rounded-lg border border-line p-5">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand text-lg font-bold text-white">
              {course.metadata.instructor_name.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-muted">Instructor</p>
              <h2 className="text-lg font-bold">{course.metadata.instructor_name}</h2>
              <p className="text-sm text-brand">{course.metadata.instructor_title}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{course.metadata.instructor_bio}</p>
            </div>
          </section>
        </div>
        <div className="hidden lg:block" />
      </div>
    </article>
  );
}
