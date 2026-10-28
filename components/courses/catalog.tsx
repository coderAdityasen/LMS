"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { CourseCard } from "@/components/courses/course-card";
import { Modal } from "@/components/ui/modal";
import { CATEGORIES } from "@/lib/catalog";
import type { CourseView, Level } from "@/lib/types";
import { buttonClass } from "@/lib/ui";

const levels: Array<Level | "All"> = ["All", "Beginner", "Intermediate", "Advanced"];

function matches(course: CourseView, query: string) {
  if (!query.trim()) return true;
  const haystack = [
    course.title,
    course.description,
    course.metadata.subtitle,
    course.metadata.partner,
    course.metadata.instructor_name,
    course.metadata.category,
    ...course.metadata.skills,
  ]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

export function Catalog({
  courses,
  initialQuery = "",
  initialCategory = "",
  initialPrice = "all",
}: {
  courses: CourseView[];
  initialQuery?: string;
  initialCategory?: string;
  initialPrice?: "all" | "free" | "paid";
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [level, setLevel] = useState<Level | "All">("All");
  const [price, setPrice] = useState<"all" | "free" | "paid">(initialPrice);
  const [sort, setSort] = useState("popular");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    const filtered = courses.filter((course) => {
      if (!matches(course, query)) return false;
      if (category && course.metadata.category !== category) return false;
      if (level !== "All" && course.metadata.level !== level) return false;
      if (price === "free" && course.price > 0) return false;
      if (price === "paid" && course.price <= 0) return false;
      return true;
    });
    return filtered.sort((a, b) => {
      if (sort === "rating") return b.metadata.rating - a.metadata.rating;
      if (sort === "newest") return a.created_at < b.created_at ? 1 : -1;
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return b.learner_count - a.learner_count;
    });
  }, [courses, query, category, level, price, sort]);

  const filters = (
    <div className="grid gap-6">
      <label className="grid gap-2 text-sm font-semibold">
        Subject
        <select className="h-11 rounded-md border border-line bg-white px-3 font-normal" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">All subjects</option>
          {CATEGORIES.map((item) => (
            <option key={item.name} value={item.name}>{item.name}</option>
          ))}
        </select>
      </label>
      <fieldset>
        <legend className="text-sm font-semibold">Level</legend>
        <div className="mt-2 grid gap-2">
          {levels.map((item) => (
            <label key={item} className="flex items-center gap-2 text-sm">
              <input type="radio" name="level" checked={level === item} onChange={() => setLevel(item)} />
              {item}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="text-sm font-semibold">Price</legend>
        <div className="mt-2 grid gap-2">
          {[
            ["all", "All"],
            ["free", "Free"],
            ["paid", "Paid"],
          ].map(([value, label]) => (
            <label key={value} className="flex items-center gap-2 text-sm">
              <input type="radio" name="price" checked={price === value} onChange={() => setPrice(value as "all" | "free" | "paid")} />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <button
        className="text-left text-sm font-semibold text-brand"
        onClick={() => {
          setQuery("");
          setCategory("");
          setLevel("All");
          setPrice("all");
        }}
      >
        Clear filters
      </button>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block">{filters}</aside>
      <div>
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <label className="min-w-[220px] flex-1">
            <span className="sr-only">Search this catalog</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by skill, title, or instructor"
              className="h-11 w-full rounded-md border border-line px-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/15"
            />
          </label>
          <button className={`${buttonClass("outline", "md")} lg:hidden`} onClick={() => setFiltersOpen(true)}>
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
          <label className="text-sm font-semibold">
            <span className="sr-only">Sort</span>
            <select className="h-11 rounded-md border border-line bg-white px-3" value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="popular">Most popular</option>
              <option value="rating">Highest rated</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
        </div>
        <p className="mb-4 text-sm text-muted">
          {results.length} {results.length === 1 ? "course" : "courses"}
          {query ? ` for “${query}”` : ""}
          {category ? ` in ${category}` : ""}
        </p>
        {results.length === 0 ? (
          <div className="rounded-lg border border-dashed border-line bg-white px-6 py-16 text-center">
            <h2 className="text-xl font-bold">No courses match those filters</h2>
            <p className="mt-2 text-sm text-muted">Try another skill, or clear the filters and browse the full catalog.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
      <Modal open={filtersOpen} title="Filters" onClose={() => setFiltersOpen(false)}>
        {filters}
      </Modal>
    </div>
  );
}
