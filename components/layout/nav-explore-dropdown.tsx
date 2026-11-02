"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Cloud, Shield, Code, Briefcase, Sparkles, ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/catalog";

const CATEGORY_ICONS: Record<string, typeof Cloud> = {
  Cloud: Cloud,
  "Cyber Security": Shield,
  Developer: Code,
  "Project Management": Briefcase,
};

export function NavExploreDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200 ${
          isOpen
            ? "bg-purple-100/80 text-brand shadow-xs"
            : "text-slate-700 hover:text-brand hover:bg-purple-50/60"
        }`}
      >
        <span>Explore</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ease-out ${
            isOpen ? "rotate-180 text-brand" : "text-slate-400"
          }`}
        />
      </button>

      {/* Animated Dropdown Card: smooth fade, scale, and slide on open and close */}
      <div
        className={`absolute right-0 sm:left-0 top-full z-50 pt-2 w-80 origin-top transition-all duration-200 ease-out ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 visible pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 invisible pointer-events-none"
        }`}
      >
        {/* Invisible Hover Bridge */}
        <div className="absolute -top-2 left-0 right-0 h-4 bg-transparent pointer-events-auto" />

        <div className="rounded-2xl border border-slate-100 bg-white p-3 shadow-2xl ring-1 ring-black/5">
          <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              Course Categories
            </span>
            <span className="flex items-center gap-1 text-[11px] font-bold text-brand">
              <Sparkles className="h-3 w-3" />
              <span>Certified</span>
            </span>
          </div>

          <div className="mt-2 space-y-1">
            {CATEGORIES.map((category) => {
              const Icon = CATEGORY_ICONS[category.name] || Cloud;
              return (
                <Link
                  key={category.name}
                  href={`/courses?category=${encodeURIComponent(category.name)}`}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-purple-50/70"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-100/70 text-brand group-hover:bg-brand group-hover:text-white transition">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900 group-hover:text-brand transition leading-tight">
                      {category.name}
                    </p>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {category.blurb}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-2 border-t border-slate-100 pt-2">
            <Link
              href="/courses"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-brand hover:bg-purple-50 transition"
            >
              <span>View All Courses</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
