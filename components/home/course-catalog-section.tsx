import Link from "next/link";
import { Star, ArrowRight, ShieldCheck } from "lucide-react";
import type { CourseView } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

interface CourseCatalogSectionProps {
  publishedCourses?: CourseView[];
}

export function CourseCatalogSection({ publishedCourses = [] }: CourseCatalogSectionProps) {
  // Always show only the top 3 featured courses on the home screen
  const featuredCourses = publishedCourses.slice(0, 3);

  return (
    <section id="featured-courses" className="py-16 md:py-24 bg-slate-50/60 relative scroll-mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100/80 px-3.5 py-1 text-xs font-bold text-brand">
            <ShieldCheck className="h-4 w-4" />
            <span>Authorized Certification Programs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Featured Certification Courses
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600">
            Industry-standard Cloud, Cyber Security, and Project Management credentials paired with expert mentorship.
          </p>
        </div>

        {/* 3 Featured Courses Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((course) => {
            const reviewCount = course.metadata?.review_count || 1200;
            const category = course.metadata?.category || "Certification";

            return (
              <div
                key={course.id}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10"
              >
                {/* Top Thumbnail Section */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100">
                  {course.thumbnail_url ? (
                    <img
                      src={course.thumbnail_url}
                      alt={course.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-900 to-slate-900 text-white font-bold p-6 text-center">
                      {course.title}
                    </div>
                  )}

                  {/* Category pill on top-left */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="rounded-full bg-slate-900/75 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white shadow">
                      {category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    {/* Rating Stars & Reviews */}
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-slate-500">
                        ({reviewCount.toLocaleString()} Reviews)
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-3 text-lg font-bold text-slate-900 transition group-hover:text-brand line-clamp-2 leading-snug">
                      {course.title}
                    </h3>

                    {/* Description */}
                    {course.description && (
                      <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                    )}
                  </div>

                  {/* Bottom Row: Price & Enroll CTA */}
                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <span className="text-xs font-medium text-slate-400 block">Tuition</span>
                      <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        {formatPrice(course.price)}
                      </span>
                    </div>

                    <Link
                      href={`/courses/${course.id}`}
                      className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Enroll Now</span>
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* View All Courses CTA */}
        <div className="mt-14 text-center space-y-3">
          <Link
            href="/courses"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-brand px-8 py-4 text-base font-bold text-white shadow-xl shadow-purple-600/25 transition-all hover:bg-brand-dark hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>View All Courses</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          <p className="text-xs sm:text-sm text-slate-500">
            Browse our full curriculum with search, subject filters, and syllabus details.
          </p>
        </div>

      </div>
    </section>
  );
}
