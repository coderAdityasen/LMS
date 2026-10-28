import Link from "next/link";
import { Cover } from "@/components/courses/cover";
import { Rating } from "@/components/courses/rating";
import type { CourseView } from "@/lib/types";
import { formatCount, formatPrice } from "@/lib/utils";

export function CourseCard({ course }: { course: CourseView }) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-canvas">
        <Cover src={course.thumbnail_url} alt="" category={course.metadata.category} />
        {course.price <= 0 ? (
          <span className="absolute left-3 top-3 rounded bg-white px-2 py-0.5 text-xs font-bold text-brand">Free</span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-bold uppercase tracking-wide text-brand">{course.metadata.partner}</p>
        <h3 className="mt-1 line-clamp-2 text-base font-bold leading-snug group-hover:underline">{course.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted">{course.metadata.subtitle}</p>
        <div className="mt-3">
          <Rating value={course.metadata.rating} count={course.metadata.review_count} />
        </div>
        <p className="mt-2 text-xs text-muted">
          {course.metadata.level} · {course.metadata.duration_label} · {formatCount(course.learner_count)} learners
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-sm font-bold">{formatPrice(course.price)}</span>
          <span className="truncate pl-3 text-xs text-muted">{course.metadata.skills[0]}</span>
        </div>
      </div>
    </Link>
  );
}
