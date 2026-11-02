"use client";

import Link from "next/link";
import { Star, TrendingUp, CheckCircle2, Zap, Briefcase } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-purple-50/50 via-white to-white py-12 md:py-20">
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-purple-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 top-40 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Initiative Tag Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/90 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-purple-900 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand animate-pulse" />
              <span>Eminence Career Solution · Authorized Certification Partner</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.15]">
              Level Up{" "}
              <span className="inline-flex items-center text-brand">
                <TrendingUp className="inline-block h-8 w-8 sm:h-12 sm:w-12 text-brand mx-1" />
              </span>{" "}
              Your Career
              <br />
              With Industry-Leading
              <br />
              <span className="text-brand">Professional Certifications</span>
            </h1>

            {/* Subtext */}
            <p className="max-w-xl text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
              Master globally recognized Cloud, Cyber Security, Developer, and Project Management certifications with curriculum designed by industry experts.
            </p>

            {/* Google Rating Social Proof */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100">
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-900 text-sm">4.9/5</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-medium">Google Ratings</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/courses"
                className="inline-flex h-12 sm:h-14 items-center justify-center rounded-full bg-brand px-8 text-base font-bold text-white shadow-lg shadow-purple-600/25 transition-all hover:bg-brand-dark hover:scale-[1.02] active:scale-[0.98]"
              >
                Explore All Courses
              </Link>

              <Link
                href="#featured-courses"
                className="inline-flex h-12 sm:h-14 items-center justify-center gap-2 rounded-full border border-purple-200 bg-white px-6 text-sm sm:text-base font-semibold text-slate-800 shadow-sm transition hover:bg-purple-50/60 hover:border-purple-300"
              >
                <span>View Featured</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Composition with Student Cards & Floating Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card Background */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-100/80 via-white to-amber-50/60 p-6 sm:p-8 shadow-xl border border-purple-100">
                
                {/* Floating Badge: Accredited Programs */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-md border border-emerald-100">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Accredited Curriculum</span>
                </div>

                {/* Floating Badge: Instant Doubt Support */}
                <div className="absolute top-16 left-2 z-20 flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-3 py-1.5 text-xs font-semibold text-amber-800 shadow-md border border-amber-100">
                  <Zap className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span>Instant doubt Support</span>
                </div>

                {/* Floating Badge: Internship Opportunities */}
                <div className="absolute top-28 left-4 z-20 flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-3 py-1.5 text-xs font-semibold text-indigo-900 shadow-md border border-indigo-100">
                  <Briefcase className="h-4 w-4 text-brand" />
                  <span>Internship Opportunities</span>
                </div>

                {/* Collage Images */}
                <div className="relative pt-10 pb-4">
                  <div className="grid grid-cols-2 gap-4 items-end">
                    
                    {/* Student 1 (Top / Right) */}
                    <div className="col-span-2 sm:col-span-1 flex justify-center">
                      <div className="relative h-44 w-36 overflow-hidden rounded-2xl bg-amber-100 shadow-md border-2 border-white">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                          alt="Enrolled Student"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Student 2 (Pointing / smiling) */}
                    <div className="col-span-2 sm:col-span-1 flex justify-center">
                      <div className="relative h-56 w-44 overflow-hidden rounded-2xl bg-sky-100 shadow-lg border-2 border-white">
                        <img
                          src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"
                          alt="Mentor & Graduate"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Google Reviews Card in Bottom Corner */}
                <div className="absolute -bottom-2 -right-2 sm:bottom-4 sm:right-4 z-20 rounded-2xl bg-white p-3.5 shadow-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 border border-slate-200">
                      <svg className="h-4 w-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Google Reviews</span>
                      <span className="text-base font-extrabold text-slate-900 leading-none">4.9/5</span>
                    </div>
                  </div>
                  <div className="flex text-amber-400 mt-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
