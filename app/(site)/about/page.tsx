import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Users,
  BookOpen,
  Globe2,
  Clock,
  Briefcase,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "About Us | Eminence Career Solution",
  description:
    "Learn about Eminence Career Solution, our mission to make high-impact technical certifications accessible, our 1:1 expert mentorship, and global training tracks.",
};

export default function AboutPage() {
  const stats = [
    { label: "Students Enrolled", value: "30,000+", icon: Users },
    { label: "Modules & Reading Handouts", value: "41,000+", icon: BookOpen },
    { label: "Certified Professionals", value: "11,000+", icon: Award },
    { label: "Global Industry Mentors", value: "3,900+", icon: Globe2 },
  ];

  const pillars = [
    {
      title: "No Need to Quit Your Job",
      desc: "Designed specifically for working professionals with flexible, self-paced learning that fits seamlessly around your career.",
      icon: Briefcase,
    },
    {
      title: "Preserve Day-to-Day Routine",
      desc: "Zero disruption to your lifestyle or employment commitments. Access all lectures and curriculum materials on demand 24/7.",
      icon: Clock,
    },
    {
      title: "1:1 Dedicated Mentorship",
      desc: "Get personalized guidance, code reviews, and doubt-clearing sessions from certified enterprise architects.",
      icon: GraduationCap,
    },
    {
      title: "Fully Flexible Schedules",
      desc: "Set your own study pace and exam readiness milestones with tailored study planners and progress tracking.",
      icon: CheckCircle2,
    },
  ];

  const domains = [
    {
      category: "Cloud Computing",
      desc: "AWS & Microsoft Azure architecture, security, developer, and sysops tracks.",
    },
    {
      category: "Cyber Security & Audit",
      desc: "CompTIA Security+, CySA+, CASP+, CISA, and CISM enterprise defense certifications.",
    },
    {
      category: "Developer & DevOps",
      desc: "Modern cloud-native development, CI/CD pipelines, containerization, and Microsoft Power BI.",
    },
    {
      category: "Project Management",
      desc: "PMP® certification prep aligned with current PMI standards and Agile methodologies.",
    },
  ];

  return (
    <div className="bg-white text-slate-900 antialiased selection:bg-purple-100 selection:text-brand">
      
      {/* 1. Page Header / Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50/70 via-slate-50/50 to-white py-16 sm:py-24 border-b border-slate-100">
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-purple-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-40 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/90 px-3.5 py-1 text-xs font-semibold text-brand shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              <span>About Eminence Career Solution</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.15]">
              Empowering IT Careers Through{" "}
              <span className="text-brand">Eminence</span> in Training
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              As per our name, we believe in delivering eminent technical training from certified mentors at your preferable time—helping you master high-demand IT certifications without disrupting your day-to-day life.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3 text-sm sm:text-base font-bold text-white shadow-lg shadow-purple-600/25 transition-all hover:bg-brand-dark hover:scale-[1.02]"
              >
                <span>Browse Certification Catalog</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3 text-sm sm:text-base font-semibold text-slate-800 shadow-sm transition hover:bg-purple-50 hover:border-purple-300"
              >
                Contact Our Team
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Key Metrics Bar */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 text-center transition hover:border-purple-200 hover:shadow-md"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100/80 text-brand mb-3">
                    <Icon className="h-6 w-6 stroke-[1.8]" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm font-medium text-slate-500">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Welcome to Eminence Career Solution (Our Story & Philosophy) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-purple-100/80 px-3.5 py-1 text-xs font-bold text-brand">
                <ShieldCheck className="h-4 w-4" />
                <span>Our Philosophy</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Welcome to Eminence Career Solution
              </h2>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  As per our name, we believe in delivering <strong className="text-slate-900 font-bold">Eminence</strong> training from our elite mentors at your preferable time. This enables you to elevate your IT skill set without sacrificing your existing career commitments or personal balance.
                </p>
                <p>
                  We pioneered a learner-first mentorship model providing personalized, 1-on-1 guidance where candidates can schedule support sessions according to their own timeframe.
                </p>
                <p>
                  Our specialized syllabus focuses on rapidly evolving technologies: <strong className="text-slate-900">Cloud Computing, Cyber Security, Developer Operations, Project Management, and Data Analytics</strong>.
                </p>
              </div>

              <div className="pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    "No need to quit your job for learning",
                    "No disruption to your day-to-day life",
                    "Direct access to private industry mentors",
                    "Flexible, self-paced training schedules",
                  ].map((bullet) => (
                    <div key={bullet} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Column */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900 via-slate-900 to-[#170725] p-8 text-white shadow-2xl">
                  
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-purple-300">
                      Our Vision
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                      &ldquo;Making education affordable for everyone.&rdquo;
                    </h3>
                    <p className="text-sm text-purple-200/90 leading-relaxed">
                      Being educated helps people judge any situation and make the right decision. It also broadens one’s perspective and develops the knowledge essential for long-term personal and professional career growth.
                    </p>
                  </div>

                  <div className="mt-8 border-t border-purple-800/60 pt-6 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-black text-amber-300">Global</p>
                      <p className="text-xs text-purple-200/70">Vendor Tracks</p>
                    </div>
                    <div>
                      <p className="text-2xl font-black text-emerald-400">98.7%</p>
                      <p className="text-xs text-purple-200/70">Pass Rate</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Why Choose Eminence (The 4 Pillars) */}
      <section className="py-16 md:py-24 bg-slate-50/70 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Learn With <span className="text-brand">Eminence Career Solution</span>?
            </h2>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600">
              A modern learning framework designed around the practical realities of adult learners and working IT practitioners.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-brand mb-5">
                    <Icon className="h-6 w-6 stroke-[1.8]" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Our Core Specializations */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Enterprise Certification Specializations
            </h2>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600">
              Each syllabus is crafted strictly according to official vendor exam domains.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {domains.map((dom) => (
              <div
                key={dom.category}
                className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand mb-3">
                    {dom.category}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {dom.desc}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-200/60">
                  <Link
                    href={`/courses?category=${encodeURIComponent(dom.category.split(" ")[0])}`}
                    className="inline-flex items-center text-xs font-bold text-brand hover:underline"
                  >
                    <span>View Courses</span>
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Ready to Get Started CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-purple-900 via-purple-950 to-slate-950 text-white text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Take the Next Step in Your Professional Career
          </h2>
          <p className="text-purple-200 text-sm sm:text-base max-w-xl mx-auto">
            Explore our accredited certifications, download curated study handouts, and prepare to clear your official exams with confidence.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm sm:text-base font-bold text-slate-900 shadow-xl transition hover:bg-purple-50 hover:scale-[1.02]"
            >
              <span>Explore All Certifications</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-purple-400/30 px-8 py-3.5 text-sm sm:text-base font-semibold text-white transition hover:bg-white/10"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
