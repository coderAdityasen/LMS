"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Loader2, Menu, X } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import type { LessonLink } from "@/lib/types";
import { buttonClass } from "@/lib/ui";
import { groupLessons } from "@/lib/utils";

function storageKey(courseId: string) {
  return `meridian-complete:${courseId}`;
}

export function PdfViewer({
  courseId,
  courseTitle,
  lesson,
  lessons,
  src,
}: {
  courseId: string;
  courseTitle: string;
  lesson: LessonLink;
  lessons: LessonLink[];
  src: string;
}) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState<string[]>([]);
  const [loadingPdf, setLoadingPdf] = useState(true);
  const modules = useMemo(() => groupLessons(lessons), [lessons]);
  const index = lessons.findIndex((item) => item.id === lesson.id);
  const previous = lessons[index - 1];
  const next = lessons[index + 1];
  const percent = lessons.length ? Math.round((done.filter((id) => lessons.some((item) => item.id === id)).length / lessons.length) * 100) : 0;

  useEffect(() => {
    setLoadingPdf(true);
  }, [lesson.id, src]);

  useEffect(() => {
    localStorage.setItem(`meridian-last:${courseId}`, lesson.id);
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey(courseId)) || "[]");
      setDone(Array.isArray(saved) ? saved.map(String) : []);
    } catch {
      setDone([]);
    }
  }, [courseId, lesson.id]);

  function toggleComplete() {
    const nextDone = done.includes(lesson.id) ? done.filter((id) => id !== lesson.id) : [...done, lesson.id];
    setDone(nextDone);
    localStorage.setItem(storageKey(courseId), JSON.stringify(nextDone));
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="border-b border-line px-4 py-4">
        <p className="text-xs font-bold uppercase tracking-wide text-muted">Course content</p>
        <p className="mt-1 text-sm font-bold leading-5">{courseTitle}</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-canvas">
          <div className="h-full bg-brand" style={{ width: `${percent}%` }} />
        </div>
        <p className="mt-1 text-xs text-muted">{percent}% complete on this device</p>
      </div>
      <div className="flex-1 overflow-auto">
        {modules.map((module) => (
          <section key={module.title}>
            <h2 className="bg-canvas px-4 py-2 text-xs font-bold uppercase tracking-wide text-muted">{module.title}</h2>
            <ul>
              {module.lessons.map((item) => {
                const active = item.id === lesson.id;
                const complete = done.includes(item.id);
                return (
                  <li key={item.id}>
                    <Link
                      href={`/dashboard/courses/${courseId}/${item.id}`}
                      className={`flex items-start gap-2 border-l-4 px-4 py-3 text-sm ${active ? "border-brand bg-brand-soft" : "border-transparent hover:bg-canvas"}`}
                      onClick={() => setOpen(false)}
                    >
                      <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border ${complete ? "border-brand bg-brand text-white" : "border-line"}`}>
                        {complete ? <Check className="h-3 w-3" /> : null}
                      </span>
                      <span className="font-semibold leading-5">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen flex-col bg-[#1c1d1f] text-white">
      <header className="flex h-14 items-center gap-3 px-3 sm:px-4">
        <button className="grid h-9 w-9 place-items-center rounded-md hover:bg-white/10 lg:hidden" onClick={() => setOpen(true)} aria-label="Open contents">
          <Menu className="h-5 w-5" />
        </button>
        <span className="hidden sm:block">
          <Logo tone="light" href={`/dashboard/courses/${courseId}`} />
        </span>
        <p className="min-w-0 flex-1 truncate text-sm font-semibold">{courseTitle}</p>
        <p className="hidden text-xs text-white/70 sm:block">{percent}%</p>
        <Link href="/dashboard" className="rounded-md px-2 py-1 text-sm font-semibold hover:bg-white/10">Exit</Link>
      </header>
      <div className="grid min-h-0 flex-1 lg:grid-cols-[320px_1fr]">
        <aside className="hidden overflow-hidden border-r border-white/10 bg-white text-ink lg:block">{sidebar}</aside>
        <main className="flex min-h-0 flex-col bg-[#2d2f31]">
          <div className="border-b border-white/10 bg-white px-4 py-4 text-ink sm:px-6">
            <p className="text-xs font-bold uppercase tracking-wide text-brand">{lesson.module_title}</p>
            <h1 className="mt-1 text-xl font-bold sm:text-2xl">{lesson.title}</h1>
            {lesson.summary ? <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{lesson.summary}</p> : null}
          </div>
          <div className="relative min-h-0 flex-1 p-3 sm:p-4">
            {loadingPdf && (
              <div className="absolute inset-3 sm:inset-4 z-10 flex flex-col items-center justify-center rounded-md border border-white/10 bg-[#1f2022] p-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-400">
                  <Loader2 className="h-7 w-7 animate-spin" />
                </div>
                <h3 className="mt-4 text-base font-bold text-white">Loading reading document</h3>
                <p className="mt-1 text-xs text-white/60">Fetching secure PDF stream from Supabase Storage...</p>
                <div className="mt-6 w-full max-w-sm space-y-2">
                  <div className="h-2 w-full animate-shimmer rounded bg-white/10" />
                  <div className="h-2 w-4/5 animate-shimmer rounded bg-white/10" />
                  <div className="h-2 w-3/5 animate-shimmer rounded bg-white/10" />
                </div>
              </div>
            )}
            <iframe
              title={lesson.title}
              src={src}
              onLoad={() => setLoadingPdf(false)}
              className={`h-full min-h-[60vh] w-full rounded-md bg-white transition-opacity duration-300 ${
                loadingPdf ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            />
          </div>
          <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-3 py-3 sm:px-4">
            {previous ? (
              <Link href={`/dashboard/courses/${courseId}/${previous.id}`} className={buttonClass("outline", "sm", "bg-white transition-transform active:scale-95")}>
                <ChevronLeft className="h-4 w-4" /> Previous
              </Link>
            ) : <span />}
            <button
              onClick={toggleComplete}
              className={buttonClass(
                done.includes(lesson.id) ? "secondary" : "primary",
                "sm",
                "transition-transform active:scale-95 shadow-xs"
              )}
            >
              <Check className="h-4 w-4" />
              {done.includes(lesson.id) ? "Completed" : "Mark complete"}
            </button>
            {next ? (
              <Link href={`/dashboard/courses/${courseId}/${next.id}`} className={buttonClass("outline", "sm", "bg-white transition-transform active:scale-95")}>
                Next <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link href={`/dashboard/courses/${courseId}`} className={buttonClass("outline", "sm", "bg-white transition-transform active:scale-95")}>Finish</Link>
            )}
          </footer>
        </main>
      </div>
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-black/50" aria-label="Close contents" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[min(100%,320px)] bg-white text-ink">
            <button className="absolute right-3 top-3" onClick={() => setOpen(false)} aria-label="Close">
              <X className="h-5 w-5" />
            </button>
            {sidebar}
          </div>
        </div>
      ) : null}
    </div>
  );
}
