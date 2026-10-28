import { BookOpen, CheckCircle2, DollarSign, GraduationCap, TrendingUp } from "lucide-react";
import type { AdminStats } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export function StatsCards({ stats }: { stats: AdminStats }) {
  const cards = [
    {
      label: "Total Revenue",
      value: formatPrice(stats.revenue),
      subtext: "Lifetime checkouts",
      badge: "Completed",
      badgeTone: "emerald",
      icon: DollarSign,
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      label: "Total Students",
      value: String(stats.users),
      subtext: "Registered accounts",
      badge: `${stats.enrollments} enrolled`,
      badgeTone: "indigo",
      icon: GraduationCap,
      iconColor: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      label: "Active Courses",
      value: `${stats.published} / ${stats.courses}`,
      subtext: `${stats.courses - stats.published} draft courses`,
      badge: "Published",
      badgeTone: "sky",
      icon: BookOpen,
      iconColor: "text-sky-600 bg-sky-50 border-sky-100",
    },
    {
      label: "Total Subscriptions",
      value: String(stats.enrollments),
      subtext: "Active enrollments",
      badge: "Lifetime",
      badgeTone: "amber",
      icon: CheckCircle2,
      iconColor: "text-amber-600 bg-amber-50 border-amber-100",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <article
            key={card.label}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:shadow-md hover:border-slate-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {card.label}
              </span>
              <div
                className={`grid h-10 w-10 place-items-center rounded-xl border ${card.iconColor} shadow-2xs`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {card.value}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
              <span className="text-slate-500">{card.subtext}</span>
              <span
                className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                  card.badgeTone === "emerald"
                    ? "bg-emerald-50 text-emerald-700"
                    : card.badgeTone === "indigo"
                    ? "bg-indigo-50 text-indigo-700"
                    : card.badgeTone === "sky"
                    ? "bg-sky-50 text-sky-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                <TrendingUp className="h-3 w-3" />
                {card.badge}
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
