"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BookOpen,
  DollarSign,
  GraduationCap,
  Search,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";
import type { Role, StudentUser } from "@/lib/types";
import { formatDate, formatPrice } from "@/lib/utils";

export function UserTable({ users }: { users: StudentUser[] }) {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | Role>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter((u) => {
      const matchesRole = roleFilter === "all" || u.role === roleFilter;
      const matchesQuery =
        !q ||
        (u.full_name && u.full_name.toLowerCase().includes(q)) ||
        u.email.toLowerCase().includes(q);
      return matchesRole && matchesQuery;
    });
  }, [users, query, roleFilter]);

  const activeLearners = useMemo(() => {
    return users.filter((u) => u.enrolled_count > 0).length;
  }, [users]);

  const totalSpend = useMemo(() => {
    return users.reduce((sum, u) => sum + (u.total_spent || 0), 0);
  }, [users]);

  const adminCount = useMemo(() => {
    return users.filter((u) => u.role === "admin").length;
  }, [users]);

  return (
    <div className="space-y-6">
      {/* Metric Strip */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Accounts</span>
            <Users className="h-4 w-4" />
          </div>
          <p className="mt-2 text-2xl font-extrabold text-slate-900">{users.length}</p>
          <p className="mt-1 text-xs text-slate-500">Learners & system admins</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-indigo-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Enrolled Students</span>
            <UserCheck className="h-4 w-4" />
          </div>
          <p className="mt-2 text-2xl font-extrabold text-indigo-600">{activeLearners}</p>
          <p className="mt-1 text-xs text-slate-500">Students with paid courses</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-emerald-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Student Spend</span>
            <DollarSign className="h-4 w-4" />
          </div>
          <p className="mt-2 text-2xl font-extrabold text-slate-900">{formatPrice(totalSpend)}</p>
          <p className="mt-1 text-xs text-slate-500">Cumulative purchases</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Administrators</span>
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="mt-2 text-2xl font-extrabold text-slate-900">{adminCount}</p>
          <p className="mt-1 text-xs text-slate-500">Full platform access</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by student name or email..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-xs sm:text-sm outline-none focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10 transition-all"
          />
        </div>

        {/* Role Filters */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setRoleFilter("all")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              roleFilter === "all"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Accounts ({users.length})
          </button>
          <button
            onClick={() => setRoleFilter("user")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              roleFilter === "user"
                ? "bg-indigo-600 text-white"
                : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
            }`}
          >
            Learners ({users.filter((u) => u.role === "user").length})
          </button>
          <button
            onClick={() => setRoleFilter("admin")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              roleFilter === "admin"
                ? "bg-slate-800 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Admins ({adminCount})
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Student Profile</th>
                <th className="px-6 py-3.5">Role</th>
                <th className="px-6 py-3.5">Enrolled Courses</th>
                <th className="px-6 py-3.5">Total Spend</th>
                <th className="px-6 py-3.5">Joined Date</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((user) => {
                const initial = (user.full_name || user.email || "S").charAt(0).toUpperCase();
                return (
                  <tr key={user.id} className="transition-colors hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-400 text-sm font-bold text-white shadow-2xs">
                          {initial}
                        </div>
                        <div>
                          <Link
                            href={`/admin/users/${user.id}`}
                            className="font-bold text-slate-900 hover:text-indigo-600 transition-colors"
                          >
                            {user.full_name || "Unnamed Student"}
                          </Link>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {user.role === "admin" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-2.5 py-0.5 text-xs font-semibold text-white">
                          <ShieldCheck className="h-3 w-3 text-emerald-400" />
                          <span>Admin</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 border border-slate-200">
                          <GraduationCap className="h-3 w-3" />
                          <span>Learner</span>
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">
                        <BookOpen className="h-3.5 w-3.5 text-indigo-500" />
                        <span>{user.enrolled_count} {user.enrolled_count === 1 ? "course" : "courses"}</span>
                      </span>
                    </td>

                    <td className="px-6 py-4 font-bold text-slate-900">
                      {formatPrice(user.total_spent)}
                    </td>

                    <td className="px-6 py-4 text-xs text-slate-400">
                      {formatDate(user.created_at)}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                      >
                        <span>Manage</span>
                        <span>→</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-14 text-center text-sm text-slate-400">
                    No students match your search.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
