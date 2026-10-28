"use client";

import { useState } from "react";
import { ChevronDown, FileText } from "lucide-react";

export function Syllabus({
  modules,
}: {
  modules: { title: string; lessons: { id: string; title: string; summary: string | null }[] }[];
}) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
      {modules.map((module, index) => {
        const expanded = open === index;
        return (
          <section key={module.title}>
            <button
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? -1 : index)}
            >
              <span>
                <span className="block text-xs font-bold uppercase tracking-wide text-muted">Module {index + 1}</span>
                <span className="mt-1 block font-bold">{module.title}</span>
              </span>
              <span className="flex items-center gap-3 text-sm text-muted">
                {module.lessons.length} readings
                <ChevronDown className={`h-4 w-4 transition ${expanded ? "rotate-180" : ""}`} />
              </span>
            </button>
            {expanded ? (
              <ul className="border-t border-line bg-canvas/60">
                {module.lessons.map((lesson) => (
                  <li key={lesson.id} className="flex gap-3 border-b border-line px-4 py-3 last:border-b-0">
                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>
                      <span className="block text-sm font-semibold">{lesson.title}</span>
                      {lesson.summary ? <span className="mt-1 block text-sm leading-5 text-muted">{lesson.summary}</span> : null}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
