import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { CATEGORIES } from "@/lib/catalog";
import { containerClass } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="mt-16 bg-navy text-white">
      <div className={`${containerClass} grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4`}>
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/75">
            Structured courses and a PDF library you can return to. Self-paced, taught in focused readings.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold">Learn</p>
          <div className="mt-3 grid gap-2 text-sm text-white/75">
            <Link href="/courses" className="hover:text-white">Catalog</Link>
            <Link href="/dashboard" className="hover:text-white">My learning</Link>
            <Link href="/#how-it-works" className="hover:text-white">How it works</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold">Subjects</p>
          <div className="mt-3 grid gap-2 text-sm text-white/75">
            {CATEGORIES.slice(0, 5).map((category) => (
              <Link key={category.name} href={`/courses?category=${encodeURIComponent(category.name)}`} className="hover:text-white">
                {category.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-bold">Account</p>
          <div className="mt-3 grid gap-2 text-sm text-white/75">
            <Link href="/login" className="hover:text-white">Log in</Link>
            <Link href="/register" className="hover:text-white">Join for free</Link>
            <Link href="/admin" className="hover:text-white">Teach on Meridian</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className={`${containerClass} flex flex-wrap items-center justify-between gap-3 py-4 text-xs text-white/60`}>
          <p>© {new Date().getFullYear()} Meridian Learning · All rights reserved.</p>
          <p>Courses and PDF handouts are protected for enrolled learners.</p>
        </div>
      </div>
    </footer>
  );
}
