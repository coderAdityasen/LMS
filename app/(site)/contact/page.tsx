import { ContactForm } from "@/components/contact/contact-form";
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export const metadata = {
  title: "Contact Us | Eminence Career Solution",
  description:
    "Contact Eminence Career Solution for inquiries about our certification programs, enrollment guidance, mentorship, or corporate training.",
};

export default function ContactPage() {
  return (
    <div className="bg-white text-slate-900 antialiased selection:bg-purple-100 selection:text-brand">
      
      {/* 1. Page Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50/70 via-slate-50/50 to-white py-16 sm:py-20 border-b border-slate-100">
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-purple-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-40 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/90 px-3.5 py-1 text-xs font-semibold text-brand shadow-sm mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Keep In Touch</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.15]">
            Contact <span className="text-brand">Our Team</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Do let us know your requirements. Whether you&apos;re selecting an IT certification track or need syllabus guidance, we&apos;re ready to assist.
          </p>
        </div>
      </section>

      {/* 2. Main Content Grid: Form on Left, Contact Details on Right */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            
            {/* Form Column (Left 7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand">
                  Send A Message
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  How Can We Help You?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fill out the form below and one of our certification advisors will get back to you promptly.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
                <ContactForm />
              </div>
            </div>

            {/* Information Column (Right 5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand">
                  Contact Information
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Get In Touch Directly
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Connect with us via email, direct lines, or WhatsApp.
                </p>
              </div>

              {/* Cards Stack */}
              <div className="space-y-4">
                
                {/* Office Address Card */}
                <div className="flex items-start gap-4 rounded-3xl border border-slate-200/90 bg-slate-50/50 p-6 transition hover:border-purple-200 hover:bg-purple-50/20">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-brand">
                    <MapPin className="h-6 w-6 stroke-[1.8]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Registered Office</h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      2nd floor WZ-20, Asalatpur Janak Puri, New Delhi-110058
                    </p>
                  </div>
                </div>

                {/* Email Card */}
                <div className="flex items-start gap-4 rounded-3xl border border-slate-200/90 bg-slate-50/50 p-6 transition hover:border-purple-200 hover:bg-purple-50/20">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                    <Mail className="h-6 w-6 stroke-[1.8]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Email Inquiries</h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600">
                      General & Admissions Support:
                    </p>
                    <a
                      href="mailto:info@eminencecareersolution.com"
                      className="mt-1 inline-block text-xs sm:text-sm font-semibold text-brand hover:underline"
                    >
                      info@eminencecareersolution.com
                    </a>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="flex items-start gap-4 rounded-3xl border border-slate-200/90 bg-slate-50/50 p-6 transition hover:border-purple-200 hover:bg-purple-50/20">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                    <Phone className="h-6 w-6 stroke-[1.8]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">Direct Phone Lines</h3>
                    <p className="text-xs text-slate-500">United States:</p>
                    <a
                      href="tel:+14242653171"
                      className="block text-xs sm:text-sm font-semibold text-slate-800 hover:text-brand"
                    >
                      +1 (424) 265-3171
                    </a>
                    <a
                      href="tel:+13043059746"
                      className="block text-xs sm:text-sm font-semibold text-slate-800 hover:text-brand"
                    >
                      +1 (304) 305-9746 (Toll-Free)
                    </a>
                    <p className="text-xs text-slate-500 pt-1">India & International:</p>
                    <a
                      href="tel:+918527117688"
                      className="block text-xs sm:text-sm font-semibold text-slate-800 hover:text-brand"
                    >
                      +91-85271-17688
                    </a>
                  </div>
                </div>

                {/* WhatsApp Quick Chat Card */}
                <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/60 to-white p-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
                      <MessageSquare className="h-5 w-5 fill-current" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Chat On WhatsApp</h4>
                      <p className="text-xs text-slate-500">+91-85271-17688</p>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/918527117688?text=Hello!%20I%20have%20an%20inquiry%20about%20Eminence%20courses."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700"
                  >
                    <span>Message</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                {/* Support Hours Card */}
                <div className="flex items-center gap-3.5 rounded-2xl bg-slate-900 text-white p-5">
                  <Clock className="h-5 w-5 text-amber-400 shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold block text-white">24 x 7 Mentorship & Support</span>
                    <span className="text-slate-400">Our team operates globally across time zones.</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
