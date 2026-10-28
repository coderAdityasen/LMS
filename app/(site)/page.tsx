import Link from "next/link";
import { BookOpen, Library, Search, ShieldCheck } from "lucide-react";
import { CourseGrid } from "@/components/courses/course-grid";
import { Cover } from "@/components/courses/cover";
import { Rating } from "@/components/courses/rating";
import { CATEGORIES } from "@/lib/catalog";
import { listPublishedCourses } from "@/lib/data/repository";
import { buttonClass } from "@/lib/ui";
import { containerClass, formatPrice } from "@/lib/utils";

const categoryIcons = ["01", "02", "03", "04", "05", "06", "07", "08"];

export default async function HomePage() {
  const courses = await listPublishedCourses();
  const featured = [...courses].sort((a, b) => b.metadata.rating - a.metadata.rating).slice(0, 4);
  const spotlight = featured[0];

  return (
    <>
      <section className="border-b border-line bg-[#f5f8fc]">
        <div className={`${containerClass} grid items-center gap-10 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:py-16`}>
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-brand">Career skills, taught in short readings</p>
            <h1 className="mt-3 max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Learn the skills that move your work forward
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-7 text-ink/80">
              Browse a catalog built like the large course platforms: a clear offer, a syllabus, and a library of PDF readings you keep.
            </p>
            <form action="/courses" className="mt-6 flex max-w-xl flex-col gap-2 sm:flex-row">
              <label className="relative flex-1">
                <span className="sr-only">Search courses</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input name="q" placeholder="What do you want to learn?" className="h-12 w-full rounded-md border border-line bg-white pl-10 pr-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/15" />
              </label>
              <button className={buttonClass("primary", "lg")}>Search</button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2">
              {CATEGORIES.slice(0, 5).map((category) => (
                <Link key={category.name} href={`/courses?category=${encodeURIComponent(category.name)}`} className="rounded-full border border-line bg-white px-3 py-1 text-sm font-semibold hover:border-brand hover:text-brand">
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          {spotlight ? (
            <Link href={`/courses/${spotlight.id}`} className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <div className="aspect-[16/9]">
                <Cover src={spotlight.thumbnail_url} alt="" category={spotlight.metadata.category} />
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-brand">{spotlight.metadata.partner}</p>
                <h2 className="mt-1 text-xl font-bold">{spotlight.title}</h2>
                <div className="mt-2"><Rating value={spotlight.metadata.rating} count={spotlight.metadata.review_count} /></div>
                <p className="mt-3 text-sm font-bold">{formatPrice(spotlight.price)}</p>
              </div>
            </Link>
          ) : null}
        </div>
      </section>

      <section className={`${containerClass} py-12`}>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Popular right now</h2>
            <p className="mt-1 text-sm text-muted">Start with a highly rated course, or open the full catalog.</p>
          </div>
          <Link href="/courses" className="hidden text-sm font-bold text-brand sm:inline">View all</Link>
        </div>
        {featured.length > 0 ? <CourseGrid courses={featured} /> : <p className="text-sm text-muted">No published courses yet.</p>}
      </section>

      <section className="border-y border-line bg-white">
        <div className={`${containerClass} py-12`}>
          <h2 className="text-2xl font-bold">Explore by subject</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((category, index) => (
              <Link key={category.name} href={`/courses?category=${encodeURIComponent(category.name)}`} className="rounded-lg border border-line p-4 transition hover:border-brand hover:shadow-sm">
                <span className="text-xs font-bold text-brand">{categoryIcons[index]}</span>
                <h3 className="mt-2 font-bold">{category.name}</h3>
                <p className="mt-1 text-sm text-muted">{category.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className={`${containerClass} py-14`}>
        <h2 className="text-2xl font-bold">How learning works</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            [BookOpen, "Choose a course", "Read the syllabus, the outcomes, and the price before you enroll."],
            [Library, "Work through the readings", "Each lesson opens as a PDF, with the next reading one click away."],
            [ShieldCheck, "Keep your library", "Purchased courses stay on your dashboard, with progress saved on this device."],
          ].map(([Icon, title, copy]) => (
            <article key={title as string} className="rounded-lg border border-line p-5">
              <Icon className="h-5 w-5 text-brand" />
              <h3 className="mt-3 font-bold">{title as string}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{copy as string}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-navy text-white">
        <div className={`${containerClass} py-14`}>
          <p className="text-sm font-bold uppercase tracking-wide text-white/60">From the library</p>
          <blockquote className="mt-4 max-w-3xl text-2xl font-bold leading-snug sm:text-3xl">
            “I wanted the Coursera feeling: a catalog I can trust, then a quiet place to read. Meridian is that, without the noise.”
          </blockquote>
          <p className="mt-4 text-sm text-white/70">Nora Hale, operations lead</p>
        </div>
      </section>

      <section className={`${containerClass} py-14`}>
        <div className="rounded-xl bg-brand px-6 py-10 text-white sm:px-10">
          <h2 className="max-w-xl text-3xl font-bold">Start with a free course, or pick a paid path.</h2>
          <p className="mt-3 max-w-xl text-white/85">AI Literacy for Teams is open to every account. The rest of the catalog is a one-time enrollment.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/courses?price=free" className="inline-flex h-12 items-center rounded-md bg-white px-5 text-sm font-bold text-brand">See free courses</Link>
            <Link href="/register" className="inline-flex h-12 items-center rounded-md border border-white px-5 text-sm font-bold">Join for free</Link>
          </div>
        </div>
      </section>
    </>
  );
}
