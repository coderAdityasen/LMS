import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";
import { Logo } from "@/components/layout/logo";

export function Footer() {
  return (
    <footer id="footer-part" className="bg-[#170725] text-white pt-16 pb-12 border-t border-purple-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 pb-12 border-b border-purple-900/40">
          
          {/* Column 1: About ECS with exact text and social links (col-lg-5) */}
          <div className="lg:col-span-5 space-y-4">
            <Logo tone="light" />
            <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed max-w-md">
              Being educated helps people to judge any situation and make the right decision. It also broadens one’s perspective and makes one knowledgeable, which is essential for their personal and professional growth in future.
            </p>

            {/* Social Links matching eminencecareersolution.com */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-900/60 text-purple-200 transition hover:bg-brand hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-900/60 text-purple-200 transition hover:bg-brand hover:text-white"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-900/60 text-purple-200 transition hover:bg-brand hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-900/60 text-purple-200 transition hover:bg-brand hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (col-lg-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-purple-300">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-purple-200/70">
              <li>
                <Link href="/" className="hover:text-white transition flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-purple-400" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-purple-400" />
                  <span>Courses</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-purple-400" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-purple-400" />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support matching eminencecareersolution.com (col-lg-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-purple-300">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-purple-200/70">
              <li>
                <Link href="/#faq" className="hover:text-white transition flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-purple-400" />
                  <span>FAQS</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-purple-400" />
                  <span>Terms & Conditions</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-purple-400" />
                  <span>Refund Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-purple-400" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us matching eminencecareersolution.com (col-lg-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-purple-300">
              Contact Us
            </h4>
            
            <ul className="space-y-3.5 text-xs sm:text-sm text-purple-200/80">
              {/* Address */}
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  2nd floor WZ-20, Asalatpur Janak Puri, New Delhi-110058
                </span>
              </li>

              {/* Phone Numbers: US & India */}
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <a href="tel:+14242653171" className="block hover:text-white transition">
                    +1(424)265-3171
                  </a>
                  <a href="tel:+13043059746" className="block hover:text-white transition">
                    +1(304)305-9746 (Toll-Free)
                  </a>
                  <a href="tel:+918527117688" className="block hover:text-white transition">
                    +91-85271-17688
                  </a>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-purple-400 shrink-0" />
                <a
                  href="mailto:info@eminencecareersolution.com"
                  className="hover:text-white hover:underline transition"
                >
                  info@eminencecareersolution.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Credit Bar matching eminencecareersolution.com */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-300/60">
          <div>
            <p>© Copyrights 2026 ECS All rights reserved.</p>
          </div>

          <div>
            <p className="flex items-center gap-1">
              <span>Designed by</span>
              <a
                href="https://adsngrow.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-purple-200 hover:text-white underline decoration-purple-400/40"
              >
                Adsngrow Media House
              </a>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
