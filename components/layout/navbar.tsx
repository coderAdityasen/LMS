import { Suspense } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/current-user";
import { CATEGORIES } from "@/lib/catalog";
import { Logo } from "@/components/layout/logo";
import { SignOutItem } from "@/components/auth/sign-out-item";
import { NavExploreDropdown } from "@/components/layout/nav-explore-dropdown";
import { NavProfileDropdown } from "@/components/layout/nav-profile-dropdown";
import { NavSearch } from "@/components/layout/nav-search";
import { containerClass } from "@/lib/utils";

export async function Navbar() {
  const user = await getCurrentUser();

  return (
    <div className="sticky top-0 z-40">
      <header className="border-b border-slate-100 bg-white/95 backdrop-blur-md">
        <div className={`${containerClass} flex h-18 items-center justify-between gap-4`}>
          {/* Left Column: Logo */}
          <div className="flex items-center min-w-[170px] lg:min-w-[210px] flex-shrink-0">
            <Logo />
          </div>

          {/* Center Column: Search Bar (Centered on the screen navbar) */}
          <div className="hidden md:flex flex-1 items-center justify-center max-w-xl mx-auto px-2">
            <Suspense
              fallback={
                <div className="h-10 sm:h-11 w-full max-w-lg rounded-full bg-slate-100 animate-pulse" />
              }
            >
              <NavSearch />
            </Suspense>
          </div>

          {/* Right Column: Navigation Items (Courses removed) */}
          <div className="flex items-center justify-end min-w-[170px] lg:min-w-[210px] flex-shrink-0">
            <nav className="hidden items-center gap-1.5 md:flex">
              {/* Explore Dropdown: lets user select course category on hover/click */}
              <NavExploreDropdown />

              <Link
                href="/about"
                className="rounded-full px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-brand hover:bg-purple-50/50 transition"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="rounded-full px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-brand hover:bg-purple-50/50 transition"
              >
                Contact
              </Link>

              {user ? (
                /* Profile Dropdown: Click/Hover opens dropdown with "My Learning" & "Logout" */
                <NavProfileDropdown user={user} />
              ) : (
                <div className="flex items-center gap-2 pl-1">
                  <Link
                    href="/login"
                    className="rounded-full border border-slate-200 px-4 py-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-brand hover:border-purple-300 hover:bg-purple-50/40 transition"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-full bg-brand px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-md shadow-purple-600/20 hover:bg-brand-dark transition"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>

            {/* Mobile Navigation Trigger */}
            <details className="group relative ml-auto md:hidden">
              <summary className="cursor-pointer rounded-full border border-slate-200 px-3.5 py-1.5 text-xs font-bold text-slate-700">
                Menu
              </summary>
              <div className="invisible absolute right-0 top-full z-40 w-64 pt-2 group-open:visible">
                <div className="rounded-2xl border border-slate-100 bg-white p-2 shadow-xl">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Categories
                  </div>
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category.name}
                      href={`/courses?category=${encodeURIComponent(category.name)}`}
                      className="block rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-purple-50"
                    >
                      {category.name}
                    </Link>
                  ))}

                  <div className="my-1.5 border-t border-slate-100" />
                  <Link
                    href="/about"
                    className="block rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-purple-50"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    className="block rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-purple-50"
                  >
                    Contact Us
                  </Link>

                  <div className="my-1.5 border-t border-slate-100" />
                  {user ? (
                    <>
                      <div className="px-3 py-1 text-xs">
                        <span className="block font-bold text-slate-900">
                          {user.full_name || "Learner"}
                        </span>
                        <span className="block truncate text-slate-500">{user.email}</span>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-brand hover:bg-purple-50"
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>My Learning</span>
                      </Link>
                      {user.role === "admin" && (
                        <Link
                          href="/admin"
                          className="block rounded-xl px-3 py-2 text-xs font-semibold text-purple-600 hover:bg-purple-50"
                        >
                          Admin Console
                        </Link>
                      )}
                      <div className="border-t border-slate-100 pt-1 mt-1">
                        <SignOutItem className="font-semibold text-xs text-rose-600" />
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-purple-50"
                      >
                        Log in
                      </Link>
                      <Link
                        href="/register"
                        className="block rounded-xl px-3 py-2 text-xs font-bold text-brand hover:bg-purple-50"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </details>
          </div>
        </div>

        {/* Mobile Search Form (only on screens smaller than md) */}
        <div className="border-t border-slate-100 px-4 py-2.5 md:hidden">
          <Suspense fallback={null}>
            <NavSearch />
          </Suspense>
        </div>
      </header>
    </div>
  );
}
