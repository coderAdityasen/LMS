"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Award,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { CATEGORIES } from "@/lib/catalog";
import type { ActionState, CourseView } from "@/lib/types";

export function CourseForm({
  course,
  action,
}: {
  course?: CourseView;
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
}) {
  const [state, formAction] = useActionState(action, {});
  const [thumbnailPreview, setThumbnailPreview] = useState(course?.thumbnail_url ?? "");

  useEffect(() => {
    if (state.ok && state.message) toast.success(state.message);
  }, [state]);

  return (
    <form action={formAction} className="space-y-8">
      {state.error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800 shadow-xs">
          {state.error}
        </p>
      ) : null}

      {/* 1. Core Course Information */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-50 text-indigo-600">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Basic Information</h2>
            <p className="text-xs text-slate-500">Title, description, pricing, and thumbnail cover</p>
          </div>
        </div>

        <Field label="Course Title">
          <Input
            name="title"
            required
            defaultValue={course?.title}
            placeholder="e.g. Next.js & Supabase Masterclass"
            className="text-base font-semibold"
          />
        </Field>

        <Field label="Subtitle / Tagline">
          <Input
            name="subtitle"
            required
            defaultValue={course?.metadata.subtitle}
            placeholder="A comprehensive guide to building full-stack applications with guided readings."
          />
        </Field>

        <Field
          label="About this Course"
          hint="Explain who this course is for, what skills will be mastered, and the expected outcome."
        >
          <Textarea
            name="description"
            required
            defaultValue={course?.description ?? ""}
            rows={4}
            placeholder="Detailed course description..."
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Price in USD" hint="Set 0 for a completely free course.">
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                $
              </span>
              <Input
                name="price"
                type="number"
                min="0"
                step="0.01"
                required
                defaultValue={course?.price ?? 49}
                className="pl-8 font-bold"
              />
            </div>
          </Field>

          <Field label="Duration Label">
            <Input
              name="duration_label"
              required
              defaultValue={course?.metadata.duration_label ?? "8 hours"}
              placeholder="e.g. 6 weeks · 8 hours"
            />
          </Field>
        </div>

        <Field label="Course Cover Thumbnail URL" hint="Direct HTTPS image link (Unsplash, Supabase Storage, etc.)">
          <Input
            name="thumbnail_url"
            defaultValue={course?.thumbnail_url ?? ""}
            placeholder="https://images.unsplash.com/..."
            onChange={(e) => setThumbnailPreview(e.target.value)}
          />
        </Field>

        {thumbnailPreview ? (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-2 max-w-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-1">
              Thumbnail Preview
            </p>
            <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnailPreview}
                alt="Preview"
                className="h-full w-full object-cover"
                onError={(e) => ((e.target as HTMLElement).style.display = "none")}
              />
            </div>
          </div>
        ) : null}
      </section>

      {/* 2. Target Audience & Category */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-sky-50 text-sky-600">
            <GraduationCap className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Audience & Curriculum Scope</h2>
            <p className="text-xs text-slate-500">Subject taxonomy, experience level, and skills</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Subject Category">
            <select
              name="category"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10"
              defaultValue={course?.metadata.category ?? CATEGORIES[0].name}
            >
              {CATEGORIES.map((category) => (
                <option key={category.name}>{category.name}</option>
              ))}
            </select>
          </Field>

          <Field label="Proficiency Level">
            <select
              name="level"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10"
              defaultValue={course?.metadata.level ?? "Beginner"}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </Field>

          <Field label="Course Language">
            <select
              name="language"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10"
              defaultValue={course?.metadata.language ?? "English"}
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </Field>
        </div>

        <Field label="Key Skills Taught" hint="Separated by commas. (e.g. Next.js, Supabase, PostgreSQL, Auth)">
          <Input
            name="skills"
            required
            defaultValue={course?.metadata.skills.join(", ")}
            placeholder="Next.js, Supabase, Row Level Security, App Router"
          />
        </Field>

        <Field label="Learning Outcomes" hint="Enter one key learner outcome per line.">
          <Textarea
            name="learning_points"
            required
            defaultValue={course?.metadata.learning_points.join("\n")}
            rows={3}
            placeholder="Architect scalable SaaS database schemas&#10;Implement secure PDF storage with signed URLs&#10;Build end-to-end authentication with SSR"
          />
        </Field>
      </section>

      {/* 3. Instructor & Publishing */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-amber-50 text-amber-600">
            <Award className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Instructor & Visibility</h2>
            <p className="text-xs text-slate-500">Instructor profile and publication switch</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Teaching Partner / Organization">
            <Input name="partner" required defaultValue={course?.metadata.partner ?? "Meridian"} />
          </Field>
          <Field label="Instructor Full Name">
            <Input name="instructor_name" required defaultValue={course?.metadata.instructor_name ?? "Lead Instructor"} />
          </Field>
        </div>

        <Field label="Instructor Professional Title">
          <Input
            name="instructor_title"
            required
            defaultValue={course?.metadata.instructor_title ?? "Senior Systems Architect"}
          />
        </Field>

        <Field label="Instructor Short Bio">
          <Textarea
            name="instructor_bio"
            required
            defaultValue={course?.metadata.instructor_bio ?? ""}
            rows={2}
            placeholder="Brief bio highlighting industry background and credentials..."
          />
        </Field>

        {/* Publication Switch */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="is_published"
              defaultChecked={course?.is_published ?? false}
              className="mt-0.5 h-4 w-4 rounded-sm border-slate-300 text-indigo-600 focus:ring-indigo-600"
            />
            <div>
              <p className="text-sm font-bold text-slate-900">Publish in Course Catalog</p>
              <p className="text-xs text-slate-500">
                When checked, students can discover, browse, and purchase this course on the storefront.
              </p>
            </div>
          </label>
        </div>
      </section>

      <div className="flex justify-end gap-3 pt-2">
        <SubmitButton pendingLabel="Saving Course...">
          {course ? "Save Course Changes" : "Create & Continue to PDFs"}
        </SubmitButton>
      </div>
    </form>
  );
}
