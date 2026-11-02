import Link from "next/link";
import { Star, ArrowRight, Award } from "lucide-react";
import type { CourseView } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export function CourseCard({ course }: { course: CourseView }) {
  const reviewCount = course.metadata?.review_count || 1200;
  const rating = course.metadata?.rating || 4.8;
  const category = course.metadata?.category || "Certification";
  const partner = course.metadata?.partner || "Eminence";
  const level = course.metadata?.level || "Beginner";
  const duration = course.metadata?.duration_label || "40 Hours";
  const skills = course.metadata?.skills || [];

  // Partner initials or short badge for Coursera-style partner icon
  const partnerInitial = partner.slice(0, 2).toUpperCase();

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
      <div>
        {/* Top Thumbnail Section (Coursera Aspect Ratio) */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          {course.thumbnail_url ? (
            <img
              src={course.thumbnail_url}
              alt={course.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand to-slate-900 text-white font-bold p-6 text-center text-sm">
              {course.title}
            </div>
          )}

          {/* Category Pill Tag */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="rounded-full bg-slate-900/85 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
              {category}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          {/* Coursera Partner Row: Icon + Partner Name */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-100 border border-slate-200 text-[10px] font-extrabold text-slate-700">
              {partnerInitial}
            </div>
            <span className="text-xs font-bold text-slate-700 truncate">{partner}</span>
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-bold text-slate-900 transition group-hover:text-brand line-clamp-2 leading-snug">
            <Link href={`/courses/${course.id}`} className="focus:outline-none">
              {course.title}
            </Link>
          </h3>

          {/* Coursera Skills You'll Gain Row */}
          <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            <strong className="text-slate-700 font-semibold">Skills you&apos;ll gain: </strong>
            {skills.length > 0 ? skills.slice(0, 4).join(", ") : course.description}
          </p>

          {/* Metadata Row: Rating, Reviews, Level, Duration */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-1 font-bold text-slate-900">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <span className="text-slate-400">({(reviewCount / 1000).toFixed(1)}k)</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 font-medium">{level}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 font-medium">{duration}</span>
          </div>

          {/* Coursera Certificate Badge */}
          <div className="mt-3">
            <span className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-2 py-0.5 text-[11px] font-bold text-brand">
              <Award className="h-3 w-3" />
              Professional Certificate
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer: Tuition & Enroll CTA */}
      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-4 sm:px-5 py-3">
        <div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 block">
            Tuition
          </span>
          <span className="text-lg font-extrabold text-slate-900">
            {formatPrice(course.price)}
          </span>
        </div>

        <Link
          href={`/courses/${course.id}`}
          className="inline-flex items-center justify-center rounded-xl bg-brand px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-brand-dark"
        >
          <span>Enroll</span>
          <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
