import { listPublishedCourses } from "@/lib/data/repository";
import { HeroSection } from "@/components/home/hero-section";
import { StatsRibbon } from "@/components/home/stats-ribbon";
import { CourseCatalogSection } from "@/components/home/course-catalog-section";
import { ComparisonTableSection } from "@/components/home/comparison-table-section";
import { VideoTestimonialsSection } from "@/components/home/video-testimonials-section";
import { TestimonialsWallSection } from "@/components/home/testimonials-wall-section";
import { FaqSection } from "@/components/home/faq-section";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const publishedCourses = await listPublishedCourses();

  return (
    <div className="bg-white text-slate-900 antialiased selection:bg-purple-100 selection:text-brand">
      {/* 1. Hero Section: Level Up Your Career with Industry-Leading Professional Certifications */}
      <HeroSection />

      {/* 2. Stats Ribbon: 20+ Certifications, 30,000+ Enrolled, 98.7% Pass Rate, 24x7 Support */}
      <StatsRibbon />

      {/* 3. Featured Courses Section: Exactly 3 featured courses + CTA to view all courses */}
      <CourseCatalogSection publishedCourses={publishedCourses} />

      {/* 4. Platform Comparison Table */}
      <ComparisonTableSection />

      {/* 5. Video Reviews from Our Students */}
      <VideoTestimonialsSection />

      {/* 6. Testimonials Wall (Verified Google Reviews) */}
      <TestimonialsWallSection />

      {/* 7. FAQs Accordion */}
      <FaqSection />
    </div>
  );
}
