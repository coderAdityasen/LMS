"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";

export function NavSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentQ = searchParams?.get("q") ?? "";

  const [query, setQuery] = useState(currentQ);

  // Sync input value if URL q parameter changes
  useEffect(() => {
    setQuery(currentQ);
  }, [currentQ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/courses?q=${encodeURIComponent(trimmed)}`);
    } else if (pathname === "/courses") {
      router.push("/courses");
    }
  };

  const handleClear = () => {
    setQuery("");
    if (pathname === "/courses") {
      const nextParams = new URLSearchParams(searchParams?.toString() ?? "");
      nextParams.delete("q");
      const qs = nextParams.toString();
      router.push(qs ? `/courses?${qs}` : "/courses");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="relative flex items-center">
        <span className="pointer-events-none absolute left-4 text-slate-400">
          <Search className="h-4 w-4" />
        </span>
        <input
          type="text"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What do you want to learn? (e.g. AWS, Azure, CISSP, Agile)"
          className="h-10 sm:h-11 w-full rounded-full border border-slate-200 bg-slate-50/80 pl-11 pr-20 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10 shadow-xs"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-10 flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:text-slate-600 transition"
            title="Clear search"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-1.5 flex h-7.5 w-7.5 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-brand text-white shadow-xs transition hover:bg-brand-dark"
          title="Search courses"
          aria-label="Search courses"
        >
          <Search className="h-3.5 w-3.5" />
        </button>
      </div>
    </form>
  );
}
