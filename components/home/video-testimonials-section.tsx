"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { VideoModal } from "./video-modal";

interface VideoReviewItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  thumbnail: string;
  videoDuration: string;
}

const REVIEWS: VideoReviewItem[] = [
  {
    id: "1",
    name: "Salman",
    role: "Student",
    avatar: "S",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    videoDuration: "1:00",
  },
  {
    id: "2",
    name: "Apeksha",
    role: "Student",
    avatar: "A",
    thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    videoDuration: "1:00",
  },
  {
    id: "3",
    name: "Naveen",
    role: "Student",
    avatar: "N",
    thumbnail: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    videoDuration: "1:00",
  },
  {
    id: "4",
    name: "Shadab Ahmed",
    role: "Student",
    avatar: "S",
    thumbnail: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    videoDuration: "1:00",
  },
];

export function VideoTestimonialsSection() {
  const [selectedReview, setSelectedReview] = useState<VideoReviewItem | null>(null);

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Video Reviews from
            <br />
            <span className="text-brand">Our Students!</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
            Listen to unfiltered feedback and internship transition stories from our community.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              onClick={() => setSelectedReview(review)}
              className="group cursor-pointer flex flex-col items-center"
            >
              {/* Portrait Video Thumbnail */}
              <div className="relative aspect-[9/14] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-lg border border-slate-200 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:border-purple-300">
                <img
                  src={review.thumbnail}
                  alt={review.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85"
                />

                {/* Duration Badge */}
                <div className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur px-2.5 py-0.5 text-[11px] font-semibold text-white">
                  {review.videoDuration}
                </div>

                {/* Central Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-brand shadow-lg transition duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
                    <Play className="h-5 w-5 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Gradient bottom shadow */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
              </div>

              {/* Name & Subtitle below card */}
              <div className="mt-3 text-center">
                <h4 className="text-base font-bold text-slate-900 group-hover:text-brand transition">
                  {review.name}
                </h4>
                <p className="text-xs font-semibold text-slate-500">
                  {review.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <VideoModal
        isOpen={Boolean(selectedReview)}
        onClose={() => setSelectedReview(null)}
        title={selectedReview ? `Video Review by ${selectedReview.name}` : "Student Video Review"}
      />
    </section>
  );
}
