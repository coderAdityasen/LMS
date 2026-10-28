export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const containerClass = "mx-auto w-full max-w-7xl px-4 sm:px-6";

export function formatPrice(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "Free";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export function formatCount(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: value >= 10000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function safeNextPath(value: unknown, fallback = "/dashboard") {
  if (typeof value !== "string") return fallback;
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return fallback;
  return value;
}

export function categoryTone(category: string) {
  const tones: Record<string, string> = {
    "Data Science": "from-sky-700 to-blue-950",
    "Computer Science": "from-indigo-700 to-slate-950",
    Design: "from-rose-600 to-fuchsia-950",
    Business: "from-amber-600 to-stone-900",
    "Artificial Intelligence": "from-violet-700 to-slate-950",
    "Information Technology": "from-cyan-700 to-slate-950",
    Finance: "from-emerald-700 to-slate-950",
    Product: "from-blue-700 to-indigo-950",
  };
  return tones[category] ?? "from-brand to-navy";
}

export function groupLessons<T extends { module_title: string; sort_order: number }>(items: T[]) {
  const order: string[] = [];
  const map = new Map<string, T[]>();
  for (const item of [...items].sort((a, b) => a.sort_order - b.sort_order)) {
    const key = item.module_title || "Lessons";
    if (!map.has(key)) {
      map.set(key, []);
      order.push(key);
    }
    map.get(key)?.push(item);
  }
  return order.map((title) => ({ title, lessons: map.get(title) ?? [] }));
}
