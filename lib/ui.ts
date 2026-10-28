import { cn } from "@/lib/utils";

export function buttonClass(
  variant: "primary" | "secondary" | "ghost" | "danger" | "outline" = "primary",
  size: "sm" | "md" | "lg" = "md",
  className?: string,
) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
    variant === "primary" && "bg-brand text-white hover:bg-brand-dark",
    variant === "secondary" && "bg-ink text-white hover:bg-black",
    variant === "outline" && "border border-ink bg-white text-ink hover:bg-canvas",
    variant === "ghost" && "text-ink hover:bg-canvas",
    variant === "danger" && "border border-red-200 bg-white text-red-700 hover:bg-red-50",
    size === "sm" && "h-9 px-3 text-sm",
    size === "md" && "h-11 px-4 text-sm",
    size === "lg" && "h-12 px-5 text-base",
    className,
  );
}

export const inputClass =
  "w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-muted focus:border-brand focus:ring-4 focus:ring-brand/15";

export const labelClass = "mb-1.5 block text-sm font-semibold text-ink";
