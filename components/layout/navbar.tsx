import Link from "next/link";
import { Search } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/current-user";
import { CATEGORIES } from "@/lib/catalog";
import { Logo } from "@/components/layout/logo";
import { SignOutItem } from "@/components/auth/sign-out-item";
import { buttonClass } from "@/lib/ui";
import { containerClass } from "@/lib/utils";

export async function Navbar() {
  const user = await getCurrentUser();
  const initial = (user?.full_name || user?.email || "M").trim().charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className={`${containerClass} flex h-16 items-center gap-3`}>
        <Logo />
        <details className="group relative hidden md:block">
          <summary className="cursor-pointer rounded-md px-3 py-2 text-sm font-semibold hover:bg-canvas">Explore</summary>
          <div className="invisible absolute left-0 top-full z-40 pt-2 group-open:visible">
            <div className="w-72 rounded-lg border border-line bg-white p-2 shadow-lg">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.name}
                  href={`/courses?category=${encodeURIComponent(category.name)}`}
                  className="block rounded-md px-3 py-2 hover:bg-canvas"
                >
                  <span className="block text-sm font-semibold">{category.name}</span>
                  <span className="block text-xs text-muted">{category.blurb}</span>
                </Link>
              ))}
            </div>
          </div>
        </details>
        <form action="/courses" className="mx-auto hidden max-w-xl flex-1 md:block">
          <label className="relative block">
            <span className="sr-only">Search courses</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              name="q"
              placeholder="What do you want to learn?"
              className="h-11 w-full rounded-full border border-line bg-canvas pl-10 pr-4 text-sm outline-none focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15"
            />
          </label>
        </form>
        <nav className="ml-auto hidden items-center gap-1 md:flex">
          <Link href="/courses" className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-canvas">
            Catalog
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-canvas">
                My learning
              </Link>
              <details className="group relative">
                <summary className="flex cursor-pointer items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-canvas">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-sm font-bold text-white">{initial}</span>
                </summary>
                <div className="invisible absolute right-0 top-full z-40 w-56 pt-2 group-open:visible">
                  <div className="rounded-lg border border-line bg-white p-2 shadow-lg">
                    <p className="px-3 py-2 text-sm">
                      <span className="block font-semibold">{user.full_name || "Learner"}</span>
                      <span className="block truncate text-xs text-muted">{user.email}</span>
                    </p>
                    <Link href="/dashboard" className="block rounded-md px-3 py-2 text-sm hover:bg-canvas">
                      My learning
                    </Link>
                    {user.role === "admin" ? (
                      <Link href="/admin" className="block rounded-md px-3 py-2 text-sm hover:bg-canvas">
                        Admin
                      </Link>
                    ) : null}
                    <SignOutItem />
                  </div>
                </div>
              </details>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-canvas">
                Log in
              </Link>
              <Link href="/register" className={buttonClass("primary", "sm")}>
                Join for free
              </Link>
            </>
          )}
        </nav>
        <details className="group relative ml-auto md:hidden">
          <summary className="cursor-pointer rounded-md border border-line px-3 py-2 text-sm font-semibold">Menu</summary>
          <div className="invisible absolute right-0 top-full z-40 w-64 pt-2 group-open:visible">
            <div className="rounded-lg border border-line bg-white p-2 shadow-lg">
              <Link href="/courses" className="block rounded-md px-3 py-2 text-sm font-semibold hover:bg-canvas">
                Catalog
              </Link>
              {user ? (
                <>
                  <Link href="/dashboard" className="block rounded-md px-3 py-2 text-sm font-semibold hover:bg-canvas">
                    My learning
                  </Link>
                  {user.role === "admin" ? (
                    <Link href="/admin" className="block rounded-md px-3 py-2 text-sm font-semibold hover:bg-canvas">
                      Admin
                    </Link>
                  ) : null}
                  <SignOutItem className="font-semibold" />
                </>
              ) : (
                <>
                  <Link href="/login" className="block rounded-md px-3 py-2 text-sm font-semibold hover:bg-canvas">
                    Log in
                  </Link>
                  <Link href="/register" className="block rounded-md px-3 py-2 text-sm font-semibold text-brand hover:bg-canvas">
                    Join for free
                  </Link>
                </>
              )}
            </div>
          </div>
        </details>
      </div>
      <form action="/courses" className="border-t border-line px-4 py-2 md:hidden">
        <label className="relative block">
          <span className="sr-only">Search courses</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input name="q" placeholder="Search courses" className="h-10 w-full rounded-full border border-line bg-canvas pl-10 pr-4 text-sm outline-none" />
        </label>
      </form>
    </header>
  );
}
