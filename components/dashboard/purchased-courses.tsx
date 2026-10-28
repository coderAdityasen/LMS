"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Cover } from "@/components/courses/cover";
import type { LearningItem } from "@/lib/types";
import { buttonClass } from "@/lib/ui";

function readCompleted(courseId: string) {
  try {
    const value = JSON.parse(localStorage.getItem(`meridian-complete:${courseId}`) || "[]");
    return Array.isArray(value) ? value.map(String) : [];
  } catch {
    return [];
  }
}

function readLast(courseId: string) {
  return localStorage.getItem(`meridian-last:${courseId}`);
}

export function PurchasedCourses({ courses }: { courses: LearningItem[] }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (courses.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-line bg-white px-6 py-16 text-center">
        <h2 className="text-2xl font-bold">Your library is empty</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
          Enroll in a course and the readings will stay here. The free AI briefing is a short place to start.
        </p>
        <Link href="/courses" className={`${buttonClass("primary", "md")} mt-6`}>Browse the catalog</Link>
      </div>
    );
  }

  const progress = courses.map((course) => {
    const done = ready ? readCompleted(course.id).filter((id) => course.lessonIds.includes(id)).length : 0;
    const total = course.lessonIds.length;
    const last = ready ? readLast(course.id) : null;
    const resume = last && course.lessonIds.includes(last) ? last : course.firstLessonId;
    return { ...course, done, total, percent: total ? Math.round((done / total) * 100) : 0, resume };
  });
  const current = progress.find((course) => course.percent > 0 && course.percent < 100) ?? progress.find((course) => course.resume) ?? progress[0];

  return (
    <div className="grid gap-8">
      {current?.resume ? (
        <section className="grid overflow-hidden rounded-lg border border-line bg-white md:grid-cols-[280px_1fr]">
          <div className="aspect-[16/9] md:aspect-auto">
            <Cover src={current.thumbnail_url} alt="" category="Product" />
          </div>
          <div className="p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-brand">Continue learning</p>
            <h2 className="mt-2 text-2xl font-bold">{current.title}</h2>
            <p className="mt-1 text-sm text-muted">{current.partner}</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-canvas">
              <div className="h-full rounded-full bg-brand" style={{ width: `${current.percent}%` }} />
            </div>
            <p className="mt-2 text-sm text-muted">{current.percent}% of readings opened</p>
            <Link href={`/dashboard/courses/${current.id}/${current.resume}`} className={`${buttonClass("primary", "md")} mt-5`}>
              {current.percent > 0 ? "Resume" : "Start course"}
            </Link>
          </div>
        </section>
      ) : null}
      <section>
        <h2 className="mb-4 text-xl font-bold">All courses</h2>
        <div className="grid gap-4">
          {progress.map((course) => (
            <Link key={course.id} href={`/dashboard/courses/${course.id}`} className="grid gap-4 rounded-lg border border-line bg-white p-3 transition hover:border-brand sm:grid-cols-[180px_1fr] sm:items-center">
              <div className="aspect-[16/9] overflow-hidden rounded-md">
                <Cover src={course.thumbnail_url} alt="" category="Product" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-brand">{course.partner}</p>
                <h3 className="mt-1 font-bold">{course.title}</h3>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-canvas">
                  <div className="h-full bg-brand" style={{ width: `${course.percent}%` }} />
                </div>
                <p className="mt-2 text-xs text-muted">{course.done} of {course.total} readings · {course.percent}%</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
