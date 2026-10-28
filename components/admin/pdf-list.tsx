"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";
import {
  ArrowDown,
  ArrowUp,
  BookOpen,
  ExternalLink,
  FileCheck2,
  FileText,
  Loader2,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { deletePdfAction, movePdfAction, replacePdfAction } from "@/lib/actions/pdfs";
import { ConfirmForm } from "@/components/ui/confirm-form";
import type { CoursePdf } from "@/lib/types";
import { groupLessons } from "@/lib/utils";

function MoveButton({ direction, disabled }: { direction: "up" | "down"; disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={disabled || pending}
      title={`Move ${direction}`}
      className="grid h-7 w-7 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
    >
      {pending ? (
        <Loader2 className="h-3 w-3 animate-spin text-indigo-600" />
      ) : direction === "up" ? (
        <ArrowUp className="h-3.5 w-3.5" />
      ) : (
        <ArrowDown className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

function ReplaceControl() {
  const { pending } = useFormStatus();
  return (
    <label
      className={`cursor-pointer inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all active:scale-95 ${
        pending ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {pending ? (
        <Loader2 className="h-3 w-3 animate-spin text-indigo-600" />
      ) : (
        <RotateCcw className="h-3 w-3 text-slate-400" />
      )}
      <span>{pending ? "Uploading..." : "Replace"}</span>
      <input
        name="file"
        type="file"
        accept="application/pdf,.pdf"
        required
        disabled={pending}
        onChange={(e) => {
          if (e.target.files?.length) {
            e.target.form?.requestSubmit();
          }
        }}
        className="sr-only"
      />
    </label>
  );
}

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      title="Delete reading"
      className="grid h-7 w-7 place-items-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all active:scale-95 disabled:opacity-50"
    >
      {pending ? (
        <Loader2 className="h-3 w-3 animate-spin text-red-500" />
      ) : (
        <Trash2 className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

export function PdfList({ courseId, pdfs }: { courseId: string; pdfs: CoursePdf[] }) {
  const modules = groupLessons(pdfs);

  if (pdfs.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-xs">
        <FileText className="mx-auto h-10 w-10 text-slate-300" />
        <h3 className="mt-3 text-base font-bold text-slate-900">No PDF readings uploaded yet</h3>
        <p className="mt-1 text-xs text-slate-500">
          Upload your first lesson PDF above to populate this course curriculum.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-indigo-600" />
          <span>Curriculum Modules & Readings</span>
        </h2>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
          {pdfs.length} {pdfs.length === 1 ? "Reading" : "Readings"} Total
        </span>
      </div>

      <div className="space-y-5">
        {modules.map((module, mIdx) => (
          <section
            key={module.title}
            className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs"
          >
            {/* Module Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-6 py-3.5">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-700">
                  Module {mIdx + 1}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{module.title}</h3>
              </div>
              <span className="text-xs font-medium text-slate-400">
                {module.lessons.length} {module.lessons.length === 1 ? "lesson" : "lessons"}
              </span>
            </div>

            {/* Lessons List */}
            <ul className="divide-y divide-slate-100">
              {module.lessons.map((pdf, lIdx) => {
                const isStorage = pdf.file_path.startsWith("storage:");
                return (
                  <li
                    key={pdf.id}
                    className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 transition-colors hover:bg-slate-50/50"
                  >
                    {/* Left: Info */}
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-slate-100 text-xs font-bold text-slate-500">
                        {lIdx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-bold text-slate-900 text-sm">{pdf.title}</p>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold border ${
                              isStorage
                                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                : "bg-sky-50 text-sky-700 border-sky-100"
                            }`}
                          >
                            <FileCheck2 className="h-3 w-3" />
                            <span>{isStorage ? "Supabase Storage" : "Handout"}</span>
                          </span>
                        </div>
                        {pdf.summary ? (
                          <p className="mt-1 text-xs text-slate-500 line-clamp-1">{pdf.summary}</p>
                        ) : null}
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      {/* Preview in viewer */}
                      <Link
                        href={`/dashboard/courses/${courseId}/${pdf.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                        title="Preview reading"
                      >
                        <ExternalLink className="h-3 w-3 text-slate-400" />
                        <span>Preview</span>
                      </Link>

                      {/* Move Up */}
                      <form action={movePdfAction}>
                        <input type="hidden" name="course_id" value={courseId} />
                        <input type="hidden" name="pdf_id" value={pdf.id} />
                        <input type="hidden" name="direction" value="-1" />
                        <MoveButton direction="up" disabled={lIdx === 0} />
                      </form>

                      {/* Move Down */}
                      <form action={movePdfAction}>
                        <input type="hidden" name="course_id" value={courseId} />
                        <input type="hidden" name="pdf_id" value={pdf.id} />
                        <input type="hidden" name="direction" value="1" />
                        <MoveButton direction="down" disabled={lIdx === module.lessons.length - 1} />
                      </form>

                      {/* Replace PDF */}
                      <form action={replacePdfAction} className="inline-flex items-center gap-1.5">
                        <input type="hidden" name="course_id" value={courseId} />
                        <input type="hidden" name="pdf_id" value={pdf.id} />
                        <ReplaceControl />
                      </form>

                      {/* Delete PDF */}
                      <ConfirmForm action={deletePdfAction} message={`Delete “${pdf.title}”?`}>
                        <input type="hidden" name="course_id" value={courseId} />
                        <input type="hidden" name="pdf_id" value={pdf.id} />
                        <DeleteButton />
                      </ConfirmForm>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
