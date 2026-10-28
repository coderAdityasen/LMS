import Link from "next/link";

export function Logo({ tone = "dark", href = "/" }: { tone?: "dark" | "light"; href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-md bg-brand text-sm font-bold text-white">M</span>
      <span className={tone === "light" ? "text-xl font-bold tracking-tight text-white" : "text-xl font-bold tracking-tight text-ink"}>
        Meridian
      </span>
    </Link>
  );
}
