import { cn } from "@/lib/utils";

export function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "brand" | "success" | "warn" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-xs font-bold",
        tone === "neutral" && "bg-canvas text-ink",
        tone === "brand" && "bg-brand-soft text-brand",
        tone === "success" && "bg-emerald-50 text-emerald-800",
        tone === "warn" && "bg-amber-50 text-amber-800",
      )}
    >
      {children}
    </span>
  );
}
