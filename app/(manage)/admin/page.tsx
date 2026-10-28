import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  CreditCard,
  GraduationCap,
  Plus,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { getAdminStats } from "@/lib/data/repository";
import { formatDate, formatPrice } from "@/lib/utils";

export const metadata = { title: "Executive Overview · Admin" };

export default async function AdminHomePage() {
  const stats = await getAdminStats();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Overview
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 border border-indigo-200/60 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
              <Sparkles className="h-3 w-3 text-indigo-500" />
              Live Platform
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Real-time enrollment metrics, revenue performance, and student activity.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/courses/new"
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>New Course</span>
          </Link>
          <Link
            href="/admin/subscriptions"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors"
          >
            <CreditCard className="h-4 w-4 text-slate-400" />
            <span>Subscriptions</span>
          </Link>
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors"
          >
            <GraduationCap className="h-4 w-4 text-slate-400" />
            <span>Students</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <StatsCards stats={stats} />

      {/* Two-Column Grid: Recent Subscriptions + Operations */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Subscriptions Table (2 cols) */}
        <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Enrollments & Subscriptions</h2>
              <p className="text-xs text-slate-500">Latest course purchases and student registrations</p>
            </div>
            <Link
              href="/admin/subscriptions"
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <span>View all</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-slate-50/60 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-6 py-3">Learner</th>
                  <th className="px-6 py-3">Course</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stats.recent.map((row) => {
                  const initial = (row.learner || "L").charAt(0).toUpperCase();
                  return (
                    <tr key={row.id} className="transition-colors hover:bg-slate-50/50">
                      <td className="px-6 py-3.5 font-semibold text-slate-900">
                        <div className="flex items-center gap-2.5">
                          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-tr from-indigo-500 to-sky-400 text-xs font-bold text-white shadow-2xs">
                            {initial}
                          </div>
                          <span className="truncate max-w-[140px]">{row.learner}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-slate-600 font-medium truncate max-w-[200px]">
                        {row.course}
                      </td>
                      <td className="px-6 py-3.5 font-bold text-slate-900">
                        {formatPrice(row.amount)}
                      </td>
                      <td className="px-6 py-3.5">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-100">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          <span className="capitalize">{row.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-xs text-slate-400">
                        {formatDate(row.purchased_at)}
                      </td>
                    </tr>
                  );
                })}
                {stats.recent.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-400">
                      No enrollments recorded yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Hub Sidebar (1 col) */}
        <div className="space-y-6">
          {/* Quick Hub Shortcuts */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900">Management Shortcuts</h2>
            <p className="mt-0.5 text-xs text-slate-500">Quick access to key operational tasks</p>

            <div className="mt-4 space-y-2.5">
              <Link
                href="/admin/courses"
                className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-3 text-sm font-semibold text-slate-800 transition-all hover:border-indigo-200 hover:bg-indigo-50/50"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-100 text-indigo-600">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      Course Catalog & PDFs
                    </p>
                    <p className="text-xs font-normal text-slate-500">Edit courses & upload PDFs</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                href="/admin/users"
                className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-3 text-sm font-semibold text-slate-800 transition-all hover:border-indigo-200 hover:bg-indigo-50/50"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-sky-100 text-sky-600">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      Student Directory
                    </p>
                    <p className="text-xs font-normal text-slate-500">Roles, spend & profiles</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                href="/admin/subscriptions"
                className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-3 text-sm font-semibold text-slate-800 transition-all hover:border-indigo-200 hover:bg-indigo-50/50"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-amber-100 text-amber-600">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                      Subscriptions & Orders
                    </p>
                    <p className="text-xs font-normal text-slate-500">Orders, receipts & status</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </div>

          {/* Infrastructure Health Card */}
          <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-900 to-[#0B132B] p-6 text-white shadow-xs">
            <div className="flex items-center gap-2 font-bold text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-sm">Supabase Infrastructure</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              Your courses, students, and subscriptions are managed under strict PostgreSQL Row Level Security.
            </p>
            <div className="mt-4 space-y-2 border-t border-slate-800 pt-4 text-xs text-slate-400">
              <div className="flex items-center justify-between">
                <span>Database</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>PDF Storage Bucket</span>
                <span className="font-semibold text-slate-200">course-pdfs (Private)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Access Control</span>
                <span className="font-semibold text-indigo-400">Signed URLs (1h)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
