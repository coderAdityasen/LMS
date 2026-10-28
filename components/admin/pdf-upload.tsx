"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, FileUp, UploadCloud } from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { uploadPdfAction } from "@/lib/actions/pdfs";

export function PdfUpload({ courseId }: { courseId: string }) {
  const [state, action] = useActionState(uploadPdfAction, {});
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) {
      toast.success(state.message ?? "Lesson added.");
      formRef.current?.reset();
      setSelectedFileName(null);
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={action}
      className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-5"
    >
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <UploadCloud className="h-5 w-5 text-indigo-600" />
            <span>Upload New PDF Reading</span>
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Files are uploaded to your private Supabase Storage bucket and secured by signed URLs.
          </p>
        </div>
        <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
          Max 15 MB
        </span>
      </div>

      {state.error ? (
        <p className="rounded-xl bg-red-50 p-3 text-xs font-medium text-red-800 border border-red-100">
          {state.error}
        </p>
      ) : null}

      <input type="hidden" name="course_id" value={courseId} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Module / Chapter Name">
          <Input name="module_title" required placeholder="e.g. Module 1 · Core Fundamentals" />
        </Field>
        <Field label="Lesson Reading Title">
          <Input name="title" required placeholder="e.g. Introduction to Architecture Patterns" />
        </Field>
      </div>

      <Field label="Lesson Summary & Notes" hint="Optional summary displayed above the PDF player for students.">
        <Textarea name="summary" placeholder="Key takeaways or instructions for this reading..." rows={2} />
      </Field>

      {/* Styled File Input */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
          Choose PDF File
        </label>
        <div className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 transition-colors hover:border-indigo-400 hover:bg-indigo-50/20">
          <FileUp className="h-8 w-8 text-indigo-500" />
          <p className="mt-2 text-xs font-bold text-slate-800">
            {selectedFileName ? (
              <span className="text-indigo-600 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                {selectedFileName}
              </span>
            ) : (
              "Click to browse or drop your PDF document here"
            )}
          </p>
          <p className="mt-1 text-[11px] text-slate-400">PDF documents only, up to 15 MB</p>
          <input
            name="file"
            type="file"
            accept="application/pdf,.pdf"
            required
            onChange={(e) => {
              const file = e.target.files?.[0];
              setSelectedFileName(file ? file.name : null);
            }}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <SubmitButton pendingLabel="Uploading to Storage...">
          Upload & Add Reading
        </SubmitButton>
      </div>
    </form>
  );
}
