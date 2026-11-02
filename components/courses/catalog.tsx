"use client";

import { useMemo, useState, useEffect, useRef, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  RotateCcw,
  BookOpen,
  Loader2,
} from "lucide-react";
import { CourseCard } from "@/components/courses/course-card";
import { CourseCardSkeleton } from "@/components/courses/course-card-skeleton";
import { CATEGORIES } from "@/lib/catalog";
import type { CourseView, Level } from "@/lib/types";

const levels: Array<Level | "All"> = ["All", "Beginner", "Intermediate", "Advanced"];

const PRICE_TIERS = [
  { id: "all", label: "All Tuition Rates" },
  { id: "under-800", label: "Under $800" },
  { id: "800-1000", label: "$800 – $1,000" },
  { id: "1000-plus", label: "$1,000 & Above" },
] as const;

type PriceTierId = (typeof PRICE_TIERS)[number]["id"];

const MORE_EXPLORE_TAGS = [
  "Cloud Computing",
  "AWS Solutions Architect",
  "Microsoft Azure",
  "Cyber Security",
  "DevOps Pipelines",
  "CompTIA Security+",
  "PMP Certification",
  "Power BI",
];

const SORT_OPTIONS = [
  { id: "popular", label: "Most Popular" },
  { id: "rating", label: "Highest Rated" },
  { id: "newest", label: "Newest Additions" },
  { id: "price-asc", label: "Tuition: Low to High" },
  { id: "price-desc", label: "Tuition: High to Low" },
];

function matches(course: CourseView, query: string) {
  if (!query.trim()) return true;
  const haystack = [
    course.title,
    course.description,
    course.metadata?.subtitle,
    course.metadata?.partner,
    course.metadata?.instructor_name,
    course.metadata?.category,
    ...(course.metadata?.skills || []),
  ]
    .filter(Boolean)
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
  initialPrice?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL search query synchronization with the navbar
  const urlQ = searchParams?.get("q") ?? initialQuery;

  const [query, setQuery] = useState(urlQ);
  const [category, setCategory] = useState(initialCategory);
  const [level, setLevel] = useState<Level | "All">("All");
  const [priceTier, setPriceTier] = useState<PriceTierId>(
    PRICE_TIERS.some((t) => t.id === initialPrice) ? (initialPrice as PriceTierId) : "all"
  );
  const [partner, setPartner] = useState<string>("All");
  const [sort, setSort] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);

  // Active dropdown state: 'category' | 'level' | 'price' | 'partner' | 'sort' | null
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Transition / Loading state for interactive filtering
  const [isPending, startTransition] = useTransition();
  const [isFiltering, setIsFiltering] = useState(false);

  // Helper to trigger filtering with loading feedback
  const applyFilter = (updateFn: () => void) => {
    setIsFiltering(true);
    setOpenDropdown(null);
    startTransition(() => {
      updateFn();
      setCurrentPage(1);
    });
    // Smooth transition buffer so the skeleton state is visibly appreciated
    setTimeout(() => {
      setIsFiltering(false);
    }, 220);
  };

  // Sync state if navbar search query changes in URL
  useEffect(() => {
    if (urlQ !== query) {
      applyFilter(() => {
        setQuery(urlQ);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlQ]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const PAGE_SIZE = 12;

  // Extract all distinct vendors/partners from courses
  const partners = useMemo(() => {
    const list = new Set<string>();
    courses.forEach((c) => {
      if (c.metadata?.partner) list.add(c.metadata.partner);
    });
    return ["All", ...Array.from(list).sort()];
  }, [courses]);

  // Dynamic counts for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: courses.length };
    CATEGORIES.forEach((cat) => {
      counts[cat.name] = courses.filter((c) => c.metadata?.category === cat.name).length;
    });
    return counts;
  }, [courses]);

  // Dynamic counts for levels
  const levelCounts = useMemo(() => {
    const counts: Record<string, number> = { All: courses.length };
    levels.forEach((lvl) => {
      if (lvl === "All") return;
      counts[lvl] = courses.filter((c) => c.metadata?.level === lvl).length;
    });
    return counts;
  }, [courses]);

  // Dynamic counts for price tiers
  const priceTierCounts = useMemo(() => {
    return {
      all: courses.length,
      "under-800": courses.filter((c) => c.price < 800).length,
      "800-1000": courses.filter((c) => c.price >= 800 && c.price <= 1000).length,
      "1000-plus": courses.filter((c) => c.price > 1000).length,
    };
  }, [courses]);

  const activeFiltersCount =
    (category ? 1 : 0) +
    (level !== "All" ? 1 : 0) +
    (priceTier !== "all" ? 1 : 0) +
    (partner !== "All" ? 1 : 0) +
    (query.trim() ? 1 : 0);

  const resetAllFilters = () => {
    applyFilter(() => {
      setQuery("");
      setCategory("");
      setLevel("All");
      setPriceTier("all");
      setPartner("All");
    });

    if (searchParams?.get("q")) {
      const nextParams = new URLSearchParams(searchParams.toString());
      nextParams.delete("q");
      const qs = nextParams.toString();
      router.push(qs ? `/courses?${qs}` : "/courses");
    }
  };

  const handleExploreTagClick = (tag: string) => {
    const catMatch = CATEGORIES.find((c) => c.name.toLowerCase() === tag.toLowerCase());
    if (catMatch) {
      applyFilter(() => {
        setCategory(catMatch.name);
        setQuery("");
      });
    } else {
      router.push(`/courses?q=${encodeURIComponent(tag)}`);
    }
  };

  const results = useMemo(() => {
    const filtered = courses.filter((course) => {
      if (!matches(course, query)) return false;
      if (category && course.metadata?.category !== category) return false;
      if (level !== "All" && course.metadata?.level !== level) return false;
      if (partner !== "All" && course.metadata?.partner !== partner) return false;

      if (priceTier === "under-800" && course.price >= 800) return false;
      if (priceTier === "800-1000" && (course.price < 800 || course.price > 1000)) return false;
      if (priceTier === "1000-plus" && course.price <= 1000) return false;

      return true;
    });

    return filtered.sort((a, b) => {
      if (sort === "rating") return (b.metadata?.rating || 0) - (a.metadata?.rating || 0);
      if (sort === "newest") return a.created_at < b.created_at ? 1 : -1;
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return b.learner_count - a.learner_count;
    });
  }, [courses, query, category, level, partner, priceTier, sort]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedResults = results.slice(startIndex, startIndex + PAGE_SIZE);

  const isLoading = isFiltering || isPending;

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* 1. COURSERA "MORE TO EXPLORE" HORIZONTAL PILL TAGS ROW                     */}
      {/* ========================================================================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
        <span className="font-bold text-slate-800 whitespace-nowrap">More to explore:</span>
        <div className="flex items-center gap-2">
          {MORE_EXPLORE_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleExploreTagClick(tag)}
              className="whitespace-nowrap rounded-full border border-slate-300 bg-white px-3.5 py-1 text-xs font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 shadow-xs"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. COURSERA TITLE HEADING & LOADING STATUS                                 */}
      {/* ========================================================================= */}
      <div className="pt-2 flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          {query ? `Results for “${query}”` : category ? `${category} Courses` : "All Courses"}
        </h1>
        {isLoading && (
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand animate-pulse">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Updating courses...</span>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. COURSERA HORIZONTAL FILTERS ROW                                        */}
      {/* ========================================================================= */}
      <div ref={dropdownRef} className="relative flex flex-wrap items-center gap-2 pt-1 pb-3">
        {/* Reset / Filter & Sort Button */}
        <button
          type="button"
          onClick={resetAllFilters}
          className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border text-xs font-bold transition shadow-xs ${
            activeFiltersCount > 0
              ? "border-brand bg-brand text-white hover:bg-brand-dark"
              : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
          }`}
        >
          {isLoading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <SlidersHorizontal className="h-3.5 w-3.5" />
          )}
          <span>Filter &amp; Sort</span>
          {activeFiltersCount > 0 && (
            <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-brand text-[10px] font-extrabold">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* 1. Category Dropdown Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === "category" ? null : "category")}
            className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border text-xs font-semibold transition shadow-xs ${
              category
                ? "border-brand bg-purple-50 text-brand font-bold"
                : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
            }`}
          >
            <span>{category ? `Category: ${category}` : "Category"}</span>
            {category ? (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  applyFilter(() => setCategory(""));
                }}
                className="hover:text-rose-600 ml-0.5"
              >
                <X className="h-3 w-3" />
              </span>
            ) : (
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            )}
          </button>

          {openDropdown === "category" && (
            <div className="absolute left-0 top-full mt-2 z-50 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Select Category
              </div>
              <button
                type="button"
                onClick={() => applyFilter(() => setCategory(""))}
                className={`flex w-full items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                  category === "" ? "bg-brand text-white" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span>All Categories</span>
                <span>{categoryCounts.All}</span>
              </button>
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat.name;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => applyFilter(() => setCategory(cat.name))}
                    className={`flex w-full items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      isSelected ? "bg-brand text-white" : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={isSelected ? "text-white" : "text-slate-400"}>
                      {categoryCounts[cat.name] || 0}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 2. Level Dropdown Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === "level" ? null : "level")}
            className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border text-xs font-semibold transition shadow-xs ${
              level !== "All"
                ? "border-brand bg-purple-50 text-brand font-bold"
                : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
            }`}
          >
            <span>{level !== "All" ? `Level: ${level}` : "Level"}</span>
            {level !== "All" ? (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  applyFilter(() => setLevel("All"));
                }}
                className="hover:text-rose-600 ml-0.5"
              >
                <X className="h-3 w-3" />
              </span>
            ) : (
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            )}
          </button>

          {openDropdown === "level" && (
            <div className="absolute left-0 top-full mt-2 z-50 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Select Level
              </div>
              {levels.map((item) => {
                const isSelected = level === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => applyFilter(() => setLevel(item))}
                    className={`flex w-full items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      isSelected ? "bg-brand text-white" : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span>{item === "All" ? "All Levels" : item}</span>
                    <span className={isSelected ? "text-white" : "text-slate-400"}>
                      {levelCounts[item] ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 3. Tuition / Price Dropdown Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === "tuition" ? null : "tuition")}
            className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border text-xs font-semibold transition shadow-xs ${
              priceTier !== "all"
                ? "border-emerald-600 bg-emerald-50 text-emerald-700 font-bold"
                : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
            }`}
          >
            <span>
              {priceTier !== "all"
                ? `Tuition: ${PRICE_TIERS.find((t) => t.id === priceTier)?.label}`
                : "Tuition"}
            </span>
            {priceTier !== "all" ? (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  applyFilter(() => setPriceTier("all"));
                }}
                className="hover:text-rose-600 ml-0.5"
              >
                <X className="h-3 w-3" />
              </span>
            ) : (
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            )}
          </button>

          {openDropdown === "tuition" && (
            <div className="absolute left-0 top-full mt-2 z-50 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Tuition Rate
              </div>
              {PRICE_TIERS.map((tier) => {
                const isSelected = priceTier === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => applyFilter(() => setPriceTier(tier.id))}
                    className={`flex w-full items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      isSelected ? "bg-emerald-600 text-white" : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span>{tier.label}</span>
                    <span className={isSelected ? "text-white" : "text-slate-400"}>
                      {priceTierCounts[tier.id]}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 4. Vendor / Partner Dropdown Pill */}
        {partners.length > 2 && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === "partner" ? null : "partner")}
              className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border text-xs font-semibold transition shadow-xs ${
                partner !== "All"
                  ? "border-brand bg-purple-50 text-brand font-bold"
                  : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
              }`}
            >
              <span>{partner !== "All" ? `Vendor: ${partner}` : "Vendor / Body"}</span>
              {partner !== "All" ? (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    applyFilter(() => setPartner("All"));
                  }}
                  className="hover:text-rose-600 ml-0.5"
                >
                  <X className="h-3 w-3" />
                </span>
              ) : (
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              )}
            </button>

            {openDropdown === "partner" && (
              <div className="absolute left-0 top-full mt-2 z-50 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Select Vendor / Body
                </div>
                {partners.map((p) => {
                  const isSelected = partner === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => applyFilter(() => setPartner(p))}
                      className={`flex w-full items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                        isSelected ? "bg-brand text-white" : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span>{p}</span>
                      {isSelected && <Check className="h-3.5 w-3.5 text-white" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 5. Sort Dropdown Pill */}
        <div className="relative ml-auto">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === "sort" ? null : "sort")}
            className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition shadow-xs"
          >
            <span className="text-slate-400 font-normal">Sort by:</span>
            <span>{SORT_OPTIONS.find((s) => s.id === sort)?.label}</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          {openDropdown === "sort" && (
            <div className="absolute right-0 top-full mt-2 z-50 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Sort Options
              </div>
              {SORT_OPTIONS.map((item) => {
                const isSelected = sort === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => applyFilter(() => setSort(item.id))}
                    className={`flex w-full items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      isSelected ? "bg-brand text-white" : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-white" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Clear All Link if filters active */}
        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={resetAllFilters}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 transition px-2 py-1"
          >
            Clear all
          </button>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. COURSERA COURSES GRID (Or SKELETON LOADING STATE WHEN FILTERING)       */}
      {/* ========================================================================= */}
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-8 py-16 text-center shadow-xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand mb-4">
            <BookOpen className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">No courses found</h2>
          <p className="mt-2 max-w-md mx-auto text-sm text-slate-500">
            {query
              ? `No certifications matched your search “${query}”. Try another keyword or reset the filters.`
              : "No courses matched your active filter selections. Clear filters to see all certifications."}
          </p>
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={resetAllFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-dark transition shadow-sm"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset all filters
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-in fade-in duration-200">
            {paginatedResults.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {/* Coursera-style Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-6">
              <p className="text-xs font-medium text-slate-500">
                Showing{" "}
                <strong className="text-slate-900 font-bold">
                  {startIndex + 1}–{Math.min(startIndex + PAGE_SIZE, results.length)}
                </strong>{" "}
                of <strong className="text-slate-900 font-bold">{results.length}</strong> courses
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 shadow-xs"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold transition shadow-xs ${
                      currentPage === page
                        ? "bg-brand text-white shadow-sm"
                        : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 shadow-xs"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
