"use client";

import Link from "next/link";
import { useMemo, useOptimistic, useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader2, Search } from "lucide-react";
import { updateSubscriptionStatusAction } from "@/lib/actions/purchases";
import type { PaymentStatus, SubscriptionItem } from "@/lib/types";
import { formatDate, formatPrice } from "@/lib/utils";

export function SubscriptionTable({ subscriptions }: { subscriptions: SubscriptionItem[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | PaymentStatus>("all");
  const [, startTransition] = useTransition();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [optimisticSubs, setOptimisticSubs] = useOptimistic(
    subscriptions,
    (state, update: { id: string; status: PaymentStatus }) =>
      state.map((sub) => (sub.id === update.id ? { ...sub, payment_status: update.status } : sub))
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return optimisticSubs.filter((sub) => {
      const matchesStatus = statusFilter === "all" || sub.payment_status === statusFilter;
      const matchesSearch =
        !q ||
        sub.student_name.toLowerCase().includes(q) ||
        sub.student_email.toLowerCase().includes(q) ||
        sub.course_title.toLowerCase().includes(q) ||
        (sub.payment_reference && sub.payment_reference.toLowerCase().includes(q));
      return matchesStatus && matchesSearch;
    });
  }, [optimisticSubs, search, statusFilter]);

  const totalRevenue = useMemo(() => {
    return optimisticSubs
      .filter((s) => s.payment_status === "completed")
      .reduce((sum, s) => sum + s.amount_paid, 0);
  }, [optimisticSubs]);

  const completedCount = useMemo(() => {
    return optimisticSubs.filter((s) => s.payment_status === "completed").length;
  }, [optimisticSubs]);

  const handleStatusToggle = (id: string, newStatus: PaymentStatus) => {
    setUpdatingId(id);
    startTransition(async () => {
      setOptimisticSubs({ id, status: newStatus });
      try {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("status", newStatus);
        await updateSubscriptionStatusAction(formData);
        toast.success(`Subscription marked as ${newStatus}`);
      } catch {
        toast.error("Failed to update status. Reverting change.");
      } finally {
        setUpdatingId(null);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Metric Summary Bar */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Subscriptions</p>
          <p className="mt-2 text-2xl font-extrabold text-slate-900">{subscriptions.length}</p>
          <p className="mt-1 text-xs text-slate-500">All registered enrollments</p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Completed Orders</p>
          <p className="mt-2 text-2xl font-extrabold text-emerald-600">{completedCount}</p>
          <p className="mt-1 text-xs text-slate-500">Active course access granted</p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Subscription Volume</p>
          <p className="mt-2 text-2xl font-extrabold text-slate-900">{formatPrice(totalRevenue)}</p>
          <p className="mt-1 text-xs text-slate-500">Gross lifetime receipts</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student, email, course, or ref..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-xs sm:text-sm outline-none focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10 transition-all"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setStatusFilter("all")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              statusFilter === "all"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All ({subscriptions.length})
          </button>
          <button
            onClick={() => setStatusFilter("completed")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              statusFilter === "completed"
                ? "bg-emerald-600 text-white"
                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            Completed ({completedCount})
          </button>
          <button
            onClick={() => setStatusFilter("pending")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              statusFilter === "pending"
                ? "bg-amber-600 text-white"
                : "bg-amber-50 text-amber-700 hover:bg-amber-100"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatusFilter("refunded")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              statusFilter === "refunded"
                ? "bg-red-600 text-white"
                : "bg-red-50 text-red-700 hover:bg-red-100"
            }`}
          >
            Refunded
          </button>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Student</th>
                <th className="px-6 py-3.5">Enrolled Course</th>
                <th className="px-6 py-3.5">Amount</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Order Reference</th>
                <th className="px-6 py-3.5">Purchased Date</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((sub) => {
                const initial = (sub.student_name || "S").charAt(0).toUpperCase();
                return (
                  <tr key={sub.id} className="transition-colors hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-400 text-xs font-bold text-white shadow-2xs">
                          {initial}
                        </div>
                        <div>
                          <Link
                            href={`/admin/users/${sub.user_id}`}
                            className="font-bold text-slate-900 hover:text-indigo-600 transition-colors"
                          >
                            {sub.student_name}
                          </Link>
                          <p className="text-xs text-slate-400">{sub.student_email || "No email"}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <Link
                        href={`/courses/${sub.course_id}`}
                        target="_blank"
                        className="font-semibold text-slate-800 hover:text-indigo-600 transition-colors line-clamp-1 max-w-[220px]"
                      >
                        {sub.course_title}
                      </Link>
                    </td>

                    <td className="px-6 py-4 font-bold text-slate-900">
                      {formatPrice(sub.amount_paid)}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
                          sub.payment_status === "completed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : sub.payment_status === "pending"
                            ? "bg-amber-50 text-amber-700 border-amber-100"
                            : "bg-red-50 text-red-700 border-red-100"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            sub.payment_status === "completed"
                              ? "bg-emerald-500"
                              : sub.payment_status === "pending"
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }`}
                        />
                        <span className="capitalize">{sub.payment_status}</span>
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <code className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-mono text-slate-600">
                        {sub.payment_reference ? sub.payment_reference.slice(0, 18) + "..." : "—"}
                      </code>
                    </td>

                    <td className="px-6 py-4 text-xs text-slate-400">
                      {formatDate(sub.purchased_at)}
                    </td>

                    <td className="px-6 py-4 text-right">
                      {/* Status toggle action with optimistic UI and instant loading state */}
                      {sub.payment_status === "completed" ? (
                        <button
                          type="button"
                          disabled={updatingId === sub.id}
                          onClick={() => handleStatusToggle(sub.id, "refunded")}
                          title="Mark as refunded"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-all active:scale-95 disabled:opacity-50"
                        >
                          {updatingId === sub.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : null}
                          <span>Refund</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={updatingId === sub.id}
                          onClick={() => handleStatusToggle(sub.id, "completed")}
                          title="Mark as completed"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition-all active:scale-95 disabled:opacity-50"
                        >
                          {updatingId === sub.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : null}
                          <span>Mark Paid</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-14 text-center text-sm text-slate-400">
                    No subscriptions match your search filter.
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
