import { Star, ThumbsUp } from "lucide-react";

interface TestimonialCard {
  id: string;
  name: string;
  initial: string;
  color: string;
  date: string;
  badge?: string;
  review: string;
  rating: number;
}

const TESTIMONIALS: TestimonialCard[] = [
  {
    id: "1",
    name: "Surya Singh",
    initial: "S",
    color: "bg-purple-600",
    date: "2 weeks ago",
    badge: "NEW",
    rating: 5,
    review:
      "I wanted to express my heartfelt thanks for the UI/UX course. The curriculum was comprehensive, the instructors were knowledgeable and supportive, and most interesting part is that after completing this course I got internship. Customer service is also very good. Thank you Eminence.",
  },
  {
    id: "2",
    name: "Rahul Singh",
    initial: "R",
    color: "bg-blue-600",
    date: "1 month ago",
    rating: 5,
    review:
      "I recently purchased several courses from the platform and I have to say, the experience has been quite positive. The website offers a wide range of courses across various disciplines and I found the pricing to be fairly reasonable. The instructors were engaging and helped me keep motivated. Definitely worth checking out.",
  },
  {
    id: "3",
    name: "Sana",
    initial: "S",
    color: "bg-emerald-600",
    date: "1 month ago",
    rating: 5,
    review:
      "It's a great platform to learn UX/UI Course. The mentors are supportive and had a good time in working out my skills on this platform. Great platform in learning new things in its own clear and meaningful way.",
  },
  {
    id: "4",
    name: "Vishesh Agarwal",
    initial: "V",
    color: "bg-amber-600",
    date: "2 months ago",
    rating: 5,
    review:
      "Totally worth the investment. The learning material is thorough, well-structured, and directly applicable. I subscribed to the certification track and cleared my exam smoothly.",
  },
  {
    id: "5",
    name: "Achintya Nivsarkar",
    initial: "A",
    color: "bg-indigo-600",
    date: "1 month ago",
    rating: 5,
    review:
      "Excellent company for learning or enhancing any kind of skill. The courses are genuinely too good in terms of its content. The best part about the course is the constant support and guidance which the mentor provides during the whole course that helps in instant doubt resolving.",
  },
  {
    id: "6",
    name: "Pooja Verma",
    initial: "P",
    color: "bg-rose-600",
    date: "3 weeks ago",
    rating: 5,
    review:
      "Cleared my certification without friction right after completing the capstone project. The instant doubt resolution on community channels was super fast. Highly recommended for students who want structured learning!",
  },
];

export function TestimonialsWallSection() {
  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Testimonials
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
            Real stories and verified Google reviews from students who learned with us.
          </p>
        </div>

        {/* Masonry-like Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition hover:border-purple-200 hover:shadow-md"
            >
              <div>
                {/* Reviewer Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-white font-bold text-sm ${item.color}`}
                    >
                      {item.initial}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {item.date}
                      </p>
                    </div>
                  </div>

                  {item.badge && (
                    <span className="rounded bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-brand">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Stars */}
                <div className="mt-3 flex text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                {/* Review Body */}
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              {/* Bottom footer: Helpful thumb */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 hover:text-slate-600 cursor-pointer">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>Helpful</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-400">Verified Learner</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
