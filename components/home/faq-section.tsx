"use client";

import { useState } from "react";
import { Plus, Sparkles } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "Why should I choose Eminence Career Solution?",
    a: "Eminence Career Solution offers practical, industry-designed course curricula paired with 1:1 mentorship and comprehensive certification prep materials mapped directly to official vendor standards (AWS, Microsoft Azure, CompTIA, PMI).",
  },
  {
    q: "What is the validity of the courses and when can I access them?",
    a: "All enrolled courses come with Lifetime Validity. You can access the lecture notes, lesson PDFs, curriculum guides, and resources at any time on your own schedule from any mobile or desktop device.",
  },
  {
    q: "How can I access my Mentors and get support?",
    a: "Mentors are accessible daily via our dedicated doubt-solving portal and community channels. You can submit questions, debug technical challenges, or connect with instructors for guidance.",
  },
  {
    q: "Are the courses self-paced or live?",
    a: "Our courses are self-paced, allowing you to learn without scheduling conflicts or time pressure. Combined with daily doubt support and mentorship, you get the flexibility of on-demand study with the benefits of personalized guidance.",
  },
  {
    q: "Will these courses prepare me for official certification exams?",
    a: "Yes. Every course in our catalog covers 100% of the official exam syllabus domains (e.g. AWS Solutions Architect, Azure AZ-104, CompTIA Security+, PMP). Lesson notes and practice modules are geared directly toward helping you pass your exam on the first attempt.",
  },
  {
    q: "What payment methods are supported?",
    a: "We support all major international credit/debit cards, Net Banking, and secure online payment gateways in USD and local currencies.",
  },
];

export function FaqSection() {
  const [openItem, setOpenItem] = useState<string | null>(FAQS[0].q);

  const toggle = (question: string) => {
    setOpenItem((prev) => (prev === question ? null : question));
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/70 scroll-mt-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-100/80 px-3.5 py-1 text-xs font-bold text-brand">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked <span className="text-brand">Questions</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
            Everything you need to know about our certification curriculum, mentorship, and learning formats.
          </p>
        </div>

        {/* Animated FAQs Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openItem === faq.q;

            return (
              <div
                key={faq.q}
                className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                  isOpen
                    ? "border-purple-300 shadow-lg shadow-purple-500/5 ring-1 ring-purple-100"
                    : "border-slate-200/90 shadow-xs hover:border-purple-200 hover:shadow-md"
                }`}
              >
                {/* Accordion Header / Button */}
                <button
                  type="button"
                  onClick={() => toggle(faq.q)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left font-bold text-slate-900 transition-colors duration-200 group"
                >
                  <span
                    className={`text-sm sm:text-base transition-colors duration-200 pr-4 ${
                      isOpen ? "text-brand" : "text-slate-900 group-hover:text-brand"
                    }`}
                  >
                    {faq.q}
                  </span>

                  {/* Animated rotating indicator: turns 45deg on open */}
                  <span
                    className={`ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-out ${
                      isOpen
                        ? "bg-brand text-white rotate-45 shadow-sm shadow-purple-600/20"
                        : "bg-purple-50 text-brand group-hover:bg-purple-100"
                    }`}
                  >
                    <Plus className="h-4 w-4 stroke-[2.5]" />
                  </span>
                </button>

                {/* Animated Body: CSS Grid 0fr to 1fr transition for 60fps height expansion & collapse */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/80 pt-3">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
