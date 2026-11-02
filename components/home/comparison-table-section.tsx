import { Check, X } from "lucide-react";
import Image from "next/image";

interface FeatureRow {
  name: string;
  eminence: boolean;
  youtube: boolean;
  others: boolean;
}

const COMPARISON_ROWS: FeatureRow[] = [
  { name: "Affordable", eminence: true, youtube: true, others: false },
  { name: "Live doubt solving", eminence: true, youtube: false, others: false },
  { name: "1:1 mentorship", eminence: true, youtube: false, others: false },
  { name: "Dedicated Projects", eminence: true, youtube: false, others: false },
  { name: "Certification", eminence: true, youtube: false, others: true },
  { name: "Lifetime access", eminence: true, youtube: true, others: false },
  { name: "Placement assistance", eminence: true, youtube: false, others: false },
];

export function ComparisonTableSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How are we different from others?
          </h2>
          <p className="max-w-xl mx-auto text-slate-500 text-sm sm:text-base">
            See how our comprehensive mentorship and certification curriculum stacks up.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-hidden rounded-3xl border border-slate-200/90 shadow-lg bg-white">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="py-5 px-6 font-bold text-slate-700 w-1/4">Features</th>
                  
                  {/* Our Platform Column (Highlighted) */}
                  <th className="py-5 px-6 font-bold text-brand bg-purple-50/70 border-x border-purple-100 w-1/4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-6 w-6 relative">
                        <Image
                          src="/logo-icon.png"
                          alt="Eminence"
                          width={24}
                          height={24}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <span className="text-sm font-extrabold">Eminence</span>
                    </div>
                  </th>

                  <th className="py-5 px-6 font-semibold text-slate-600 text-center w-1/4">
                    YouTube
                  </th>

                  <th className="py-5 px-6 font-semibold text-slate-600 text-center w-1/4">
                    Other Platforms
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.name} className="hover:bg-slate-50/50 transition">
                    <td className="py-4 px-6 font-semibold text-slate-800">
                      {row.name}
                    </td>

                    {/* Eminence Column (Highlighted) */}
                    <td className="py-4 px-6 text-center bg-purple-50/30 border-x border-purple-100">
                      <div className="flex justify-center">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                          <Check className="h-4 w-4 stroke-[3]" />
                        </span>
                      </div>
                    </td>

                    {/* YouTube Column */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center">
                        {row.youtube ? (
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                            <Check className="h-4 w-4 stroke-[3]" />
                          </span>
                        ) : (
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                            <X className="h-4 w-4 stroke-[3]" />
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Other Platforms Column */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center">
                        {row.others ? (
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                            <Check className="h-4 w-4 stroke-[3]" />
                          </span>
                        ) : (
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                            <X className="h-4 w-4 stroke-[3]" />
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
