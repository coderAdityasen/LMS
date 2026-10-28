"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BookOpen,
  ExternalLink,
  FileText,
  Filter,
  GraduationCap,
  Layers,
  Pencil,
  Plus,
  Search,
} from "lucide-react";
import { Cover } from "@/components/courses/cover";
import type { CourseView } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export function AdminCoursesView({ courses }: { courses: CourseView[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const c of courses) {
      if (c.metadata.category) set.add(c.metadata.category);
    }
    return Array.from(set);
  }, [courses]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      const matchesStatus =
        filter === "all" ||
        (filter === "published" && c.is_published) ||
        (filter === "draft" && !c.is_published);
      const matchesCategory =
        categoryFilter === "all" || c.metadata.category === categoryFilter;
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.metadata.partner.toLowerCase().includes(q) ||
        c.metadata.category.toLowerCase().includes(q);
      return matchesStatus && matchesCategory && matchesQuery;
    });
  }, [courses, query, filter, categoryFilter]);

  const publishedCount = useMemo(() => courses.filter((c) => c.is_published).length, [courses]);
  const draftCount = useMemo(() => courses.filter((c) => !c.is_published).length, [courses]);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Courses & PDF Readings
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Publish courses, upload PDF lesson handouts, and organize curriculum modules.
          </p>
        </div>

        <Link
          href="/admin/courses/new"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 transition-colors shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>New Course</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search course title, partner, or subject..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-xs sm:text-sm outline-none focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10 transition-all"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                filter === "all"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All ({courses.length})
            </button>
            <button
              onClick={() => setFilter("published")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                filter === "published"
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              }`}
            >
              Published ({publishedCount})
            </button>
            <button
              onClick={() => setFilter("draft")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                filter === "draft"
                  ? "bg-amber-600 text-white"
                  : "bg-amber-50 text-amber-700 hover:bg-amber-100"
              }`}
            >
              Drafts ({draftCount})
            </button>
          </div>
        </div>

        {/* Category Pills */}
        {categories.length > 0 ? (
          <div className="flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-3">
            <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="h-3 w-3" />
              <span>Subject:</span>
            </span>
            <button
              onClick={() => setCategoryFilter("all")}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                categoryFilter === "all"
                  ? "bg-indigo-100 text-indigo-700 font-bold"
                  : "bg-slate-50 text-slate-500 hover:bg-slate-100"
              }`}
            >
              All Subjects
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  categoryFilter === cat
                    ? "bg-indigo-100 text-indigo-700 font-bold"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* Courses Cards Grid */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((course) => (
          <article
            key={course.id}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all hover:border-slate-300 hover:shadow-md"
          >
            <div>
              {/* Cover Image & Status Badge */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                <Cover src={course.thumbnail_url} alt={course.title} category={course.metadata.category} />
                <div className="absolute left-3 top-3">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold shadow-xs backdrop-blur-md ${
                      course.is_published
                        ? "bg-emerald-500/90 text-white"
                        : "bg-amber-500/90 text-white"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    <span>{course.is_published ? "Published" : "Draft"}</span>
                  </span>
                </div>
                <div className="absolute right-3 top-3">
                  <span className="rounded-lg bg-black/60 px-2 py-1 text-xs font-bold text-white backdrop-blur-md">
                    {course.price <= 0 ? "Free" : formatPrice(course.price)}
                  </span>
                </div>
              </div>

              {/* Course Meta */}
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  {course.metadata.partner || "Meridian"} · {course.metadata.category}
                </p>
                <h3 className="mt-1 text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {course.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {course.description || course.metadata.subtitle}
                </p>

                <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 font-medium">
                    <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
                    <span>{course.learner_count} {course.learner_count === 1 ? "student" : "students"}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Layers className="h-3.5 w-3.5 text-slate-400" />
                    <span>{course.metadata.level}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="border-t border-slate-100 bg-slate-50/50 p-3.5 flex items-center justify-between gap-2">
              <Link
                href={`/admin/courses/${course.id}/pdfs`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 border border-indigo-200/80 px-3 py-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition-colors"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Manage PDFs</span>
              </Link>

              <div className="flex items-center gap-1.5">
                <Link
                  href={`/admin/courses/${course.id}`}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Pencil className="h-3 w-3 text-slate-400" />
                  <span>Edit</span>
                </Link>

                <Link
                  href={`/courses/${course.id}`}
                  target="_blank"
                  className="grid h-7 w-7 place-items-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
                  title="View on site"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}

        {filtered.length === 0 ? (
          <div className="col-span-full py-16 text-center">
            <BookOpen className="mx-auto h-10 w-10 text-slate-300" />
            <h3 className="mt-3 text-base font-bold text-slate-900">No courses match your filter</h3>
            <p className="mt-1 text-sm text-slate-500">Try adjusting your search query or subject filter.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
