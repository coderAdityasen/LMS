"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";
import {
  BookOpen,
  CreditCard,
  ExternalLink,
  GraduationCap,
  LayoutDashboard,
  Loader2,
  LogOut,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { signOut } from "@/lib/actions/auth";
import { NavLink } from "@/components/layout/nav-link";
import { Logo } from "@/components/layout/logo";
import type { SessionUser } from "@/lib/types";

function SignOutButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      title="Log out"
      className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition-all hover:bg-red-500/10 hover:text-red-400 active:scale-95 disabled:opacity-50"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin text-red-400" /> : <LogOut className="h-4 w-4" />}
    </button>
  );
}

const navItemClass =
  "group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:bg-slate-800/80 hover:text-white";
const activeItemClass =
  "bg-indigo-600/15 text-indigo-400 border border-indigo-500/25 shadow-sm shadow-indigo-950/50 hover:bg-indigo-600/20 hover:text-indigo-300";

export function AdminSidebar({ user }: { user: SessionUser }) {
  const initial = (user.full_name || user.email || "A").trim().charAt(0).toUpperCase();

  return (
    <aside className="flex flex-col border-b border-slate-800 bg-[#0B132B] text-slate-200 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-slate-800/80">
        <div>
          <Logo tone="light" href="/admin" />
          <div className="mt-2 flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-400">
              Admin Console
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3.5 py-5">
        <p className="px-3 text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-2.5">
          Management
        </p>
        <nav className="space-y-1.5">
          <NavLink href="/admin" exact className={navItemClass} activeClassName={activeItemClass}>
            <LayoutDashboard className="h-4 w-4 shrink-0 transition-colors group-hover:text-indigo-400" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink href="/admin/courses" className={navItemClass} activeClassName={activeItemClass}>
            <BookOpen className="h-4 w-4 shrink-0 transition-colors group-hover:text-indigo-400" />
            <span>Courses & PDFs</span>
          </NavLink>

          <NavLink href="/admin/users" className={navItemClass} activeClassName={activeItemClass}>
            <GraduationCap className="h-4 w-4 shrink-0 transition-colors group-hover:text-indigo-400" />
            <span>Students & Roles</span>
          </NavLink>

          <NavLink href="/admin/subscriptions" className={navItemClass} activeClassName={activeItemClass}>
            <CreditCard className="h-4 w-4 shrink-0 transition-colors group-hover:text-indigo-400" />
            <span>Subscriptions</span>
          </NavLink>
        </nav>

        <p className="mt-8 px-3 text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-2.5">
          Preview & Storefront
        </p>
        <nav className="space-y-1.5">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:bg-slate-800/80 hover:text-white"
          >
            <span className="flex items-center gap-3">
              <ExternalLink className="h-4 w-4 shrink-0 text-slate-400" />
              <span>Student Portal</span>
            </span>
            <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-medium text-slate-300">
              Live
            </span>
          </Link>
        </nav>

        {/* Quick Pro-tip Card */}
        <div className="mt-8 rounded-xl border border-indigo-500/20 bg-indigo-950/30 p-3.5 text-xs text-slate-300">
          <div className="flex items-center gap-1.5 font-bold text-indigo-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Secure Storage</span>
          </div>
          <p className="mt-1 leading-relaxed text-slate-400">
            PDFs are stored in private Supabase buckets with time-limited signed URLs.
          </p>
        </div>
      </div>

      {/* Admin User Footer Profile */}
      <div className="border-t border-slate-800/80 bg-slate-950/40 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-sm font-bold text-white shadow-sm shadow-indigo-950">
              {initial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-white flex items-center gap-1">
                <span>{user.full_name || "Admin"}</span>
                <ShieldCheck className="h-3 w-3 text-emerald-400 shrink-0" />
              </p>
              <p className="truncate text-[11px] text-slate-400">{user.email}</p>
            </div>
          </div>
          <form action={signOut}>
            <SignOutButton />
          </form>
        </div>
      </div>
    </aside>
  );
}
