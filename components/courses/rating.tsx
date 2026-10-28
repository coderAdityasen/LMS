import { formatCount } from "@/lib/utils";

export function Rating({ value, count }: { value: number; count: number }) {
  if (!count) return <span className="text-xs font-bold uppercase tracking-wide text-brand">New</span>;
  const width = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <p className="flex items-center gap-1.5 text-sm" aria-label={`Rated ${value.toFixed(1)} out of 5 from ${count} reviews`}>
      <span className="font-bold text-star">{value.toFixed(1)}</span>
      <span className="relative inline-flex h-4 w-[4.6rem] text-line" aria-hidden="true">
        <span className="absolute inset-0 tracking-[-0.08em]">★★★★★</span>
        <span className="absolute inset-0 overflow-hidden text-star tracking-[-0.08em]" style={{ width: `${width}%` }}>
          ★★★★★
        </span>
      </span>
      <span className="text-muted">({formatCount(count)})</span>
    </p>
  );
}
