"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import {
  BookOpen,
  Calendar,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";
import { Field, Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { updateUserAction } from "@/lib/actions/users";
import type { UserDetail } from "@/lib/types";
import { formatDate, formatPrice } from "@/lib/utils";

export function UserEditor({ detail }: { detail: UserDetail }) {
  const action = updateUserAction.bind(null, detail.profile.id);
  const [state, formAction] = useActionState(action, {});

  useEffect(() => {
    if (state.ok && state.message) toast.success(state.message);
  }, [state]);

  const initial = (detail.profile.full_name || detail.profile.email || "S").charAt(0).toUpperCase();

  const totalSpent = detail.purchases
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Left Column: Profile Card & Role Editor */}
      <div className="lg:col-span-1 space-y-6">
        {/* User Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-400 text-2xl font-bold text-white shadow-md shadow-indigo-100">
            {initial}
          </div>
          <h2 className="mt-4 text-lg font-bold text-slate-900">
            {detail.profile.full_name || "Unnamed Student"}
          </h2>
          <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5 mt-1">
            <Mail className="h-3.5 w-3.5 text-slate-400" />
            <span>{detail.profile.email}</span>
          </p>

          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border">
            {detail.profile.role === "admin" ? (
              <span className="flex items-center gap-1 text-indigo-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Super Administrator</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-slate-700">
                <User className="h-3.5 w-3.5" />
                <span>Enrolled Student</span>
              </span>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 text-left">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Enrolled</p>
              <p className="mt-1 text-lg font-extrabold text-slate-900">{detail.purchases.length}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Spend</p>
              <p className="mt-1 text-lg font-extrabold text-emerald-600">{formatPrice(totalSpent)}</p>
            </div>
          </div>
        </div>

        {/* Profile Edit Form */}
        <form
          action={formAction}
          className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4"
        >
          <h3 className="text-base font-bold text-slate-900">Update Profile & Role</h3>
          {state.error ? (
            <p className="rounded-xl bg-red-50 p-3 text-xs font-medium text-red-800 border border-red-100">
              {state.error}
            </p>
          ) : null}

          <Field label="Full Name">
            <Input name="full_name" defaultValue={detail.profile.full_name ?? ""} required />
          </Field>

          <Field label="Email Address">
            <Input value={detail.profile.email} readOnly className="bg-slate-50 text-slate-500 cursor-not-allowed" />
          </Field>

          <Field label="Account Role">
            <select
              name="role"
              defaultValue={detail.profile.role}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10"
            >
              <option value="user">Learner (Standard Student Access)</option>
              <option value="admin">Admin (Full Management Control)</option>
            </select>
          </Field>

          <SubmitButton className="w-full" pendingLabel="Saving Changes...">
            Save Changes
          </SubmitButton>
        </form>
      </div>

      {/* Right Column: Subscriptions & Enrolled Courses */}
      <div className="lg:col-span-2">
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Subscriptions & Enrollments</h3>
              <p className="text-xs text-slate-500">All purchased courses and payment status records</p>
            </div>
            <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">
              {detail.purchases.length} Records
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {detail.purchases.map((purchase) => (
              <div
                key={purchase.id}
                className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-6 py-4 transition-colors hover:bg-slate-50/50"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-indigo-50 text-indigo-600">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <Link
                      href={`/courses/${purchase.course_id}`}
                      target="_blank"
                      className="font-bold text-slate-900 hover:text-indigo-600 transition-colors"
                    >
                      {purchase.course_title}
                    </Link>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span>Order ID: {purchase.id.slice(0, 8)}...</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(purchase.purchased_at)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className="text-sm font-extrabold text-slate-900">
                    {formatPrice(purchase.amount)}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
                      purchase.status === "completed"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                        : purchase.status === "pending"
                        ? "bg-amber-50 text-amber-700 border-amber-100"
                        : "bg-red-50 text-red-700 border-red-100"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        purchase.status === "completed"
                          ? "bg-emerald-500"
                          : purchase.status === "pending"
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                    />
                    <span className="capitalize">{purchase.status}</span>
                  </span>
                </div>
              </div>
            ))}

            {detail.purchases.length === 0 ? (
              <div className="py-12 text-center text-sm text-slate-400">
                This student has not enrolled in any courses yet.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
