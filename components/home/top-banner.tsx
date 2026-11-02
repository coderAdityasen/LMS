import Link from "next/link";
import { Mail, Phone, Sparkles } from "lucide-react";

export function TopBanner() {
  return (
    <div className="relative z-30 border-b border-purple-950/20 bg-[#160624] px-4 py-2 text-white text-xs">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        {/* Contact links: exact email and phone numbers requested */}
        <div className="flex flex-wrap items-center gap-4 text-purple-200/90 text-[11px] sm:text-xs">
          <a
            href="mailto:info@eminencecareersolution.com"
            className="flex items-center gap-1.5 transition hover:text-white"
          >
            <Mail className="h-3.5 w-3.5 text-purple-400" />
            <span>info@eminencecareersolution.com</span>
          </a>
          <span className="hidden sm:inline text-purple-400/40">|</span>
          <a
            href="tel:+14242653171"
            className="flex items-center gap-1.5 transition hover:text-white"
          >
            <Phone className="h-3.5 w-3.5 text-purple-400" />
            <span>+1(424)265-3171</span>
          </a>
          <span className="hidden md:inline text-purple-400/40">|</span>
          <a
            href="tel:+918527117688"
            className="hidden md:flex items-center gap-1.5 transition hover:text-white"
          >
            <Phone className="h-3.5 w-3.5 text-purple-400" />
            <span>+91-85271-17688</span>
          </a>
        </div>

        {/* Official Certification Partner CTA */}
        <div className="flex items-center gap-2 text-[11px] sm:text-xs font-medium">
          <div className="flex items-center gap-1.5 text-purple-200">
            <Sparkles className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
            <span>Authorized IT & Cloud Certification Programs</span>
          </div>
          <Link
            href="/courses"
            className="ml-1 inline-flex items-center rounded-full bg-purple-700/60 px-2.5 py-0.5 text-[10px] font-bold text-white transition hover:bg-purple-600"
          >
            View Catalog →
          </Link>
        </div>
      </div>
    </div>
  );
}
