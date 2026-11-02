import { Award, Users, ShieldCheck, Headphones } from "lucide-react";

export function StatsRibbon() {
  const stats = [
    {
      label: "Certification Tracks",
      value: "Multi-Track",
      icon: Award,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      label: "Students Enrolled",
      value: "30,000+",
      icon: Users,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Exam Pass Rate",
      value: "98.7%",
      icon: ShieldCheck,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      label: "Support & Mentorship",
      value: "24 x 7",
      icon: Headphones,
      iconColor: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <section className="relative z-10 py-6 sm:py-8 bg-white border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-purple-50/50 via-slate-50 to-purple-50/50 p-6 sm:p-8 border border-slate-200/70 shadow-sm">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:divide-x md:divide-slate-200/80">
            {stats.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={`flex items-center gap-4 ${
                    index > 0 ? "md:pl-8" : ""
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl ${item.bgColor} ${item.iconColor} shadow-inner`}
                  >
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 stroke-[1.8]" />
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {item.value}
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-slate-500">
                      {item.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
