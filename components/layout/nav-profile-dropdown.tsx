"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { BookOpen, LogOut, ChevronDown, Shield } from "lucide-react";
import { signOut } from "@/lib/actions/auth";

interface NavProfileDropdownProps {
  user: {
    id?: string;
    email?: string | null;
    full_name?: string | null;
    role?: string | null;
  };
}

export function NavProfileDropdown({ user }: NavProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const displayName = user.full_name || "Learner";
  const initial = (user.full_name || user.email || "U").trim().charAt(0).toUpperCase();

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Profile Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-full p-1 pl-1.5 pr-2.5 transition-all duration-200 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-brand/20"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-xs font-bold text-white shadow-sm ring-2 ring-white">
          {initial}
        </span>
        <span className="hidden lg:inline text-xs font-semibold text-slate-700 max-w-[100px] truncate">
          {displayName}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-300 ease-out ${
            isOpen ? "rotate-180 text-brand" : ""
          }`}
        />
      </button>

      {/* Animated Profile Dropdown Menu: smooth fade, scale, and slide on open and close */}
      <div
        className={`absolute right-0 top-full z-50 pt-2 w-64 origin-top-right transition-all duration-200 ease-out ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 visible pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 invisible pointer-events-none"
        }`}
      >
        {/* Invisible Hover Bridge */}
        <div className="absolute -top-2 left-0 right-0 h-4 bg-transparent pointer-events-auto" />

        <div className="rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl ring-1 ring-black/5">
          {/* User Details Header */}
          <div className="px-3 py-2.5 border-b border-slate-100">
            <p className="text-xs font-bold text-slate-900 truncate">{displayName}</p>
            {user.email && (
              <p className="text-[11px] text-slate-500 truncate mt-0.5">{user.email}</p>
            )}
          </div>

          <div className="py-1 space-y-0.5">
            {/* Option 1: My Learning (Redirects to Learning Dashboard) */}
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-purple-50 hover:text-brand transition"
            >
              <BookOpen className="h-4 w-4 text-brand" />
              <span>My Learning</span>
            </Link>

            {/* Admin option if applicable */}
            {user.role === "admin" && (
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-purple-50 hover:text-brand transition"
              >
                <Shield className="h-4 w-4 text-purple-600" />
                <span>Admin Console</span>
              </Link>
            )}
          </div>

          {/* Option 2: Logout Button */}
          <div className="border-t border-slate-100 pt-1 mt-1">
            <form action={signOut}>
              <button
                type="submit"
                className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-rose-600 hover:bg-rose-50 transition"
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
