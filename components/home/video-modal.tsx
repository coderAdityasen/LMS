"use client";

import { useEffect } from "react";
import { X, Play } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  videoUrl?: string;
}

export function VideoModal({
  isOpen,
  onClose,
  title = "Certification Mentorship Overview",
  videoUrl,
}: VideoModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand/20 text-brand">
              <Play className="h-3.5 w-3.5 fill-current" />
            </span>
            <h3 className="text-base font-semibold text-white">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative aspect-video w-full bg-slate-950 flex flex-col items-center justify-center p-8 text-center">
          {videoUrl ? (
            <iframe
              src={videoUrl}
              title={title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="max-w-md space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand/20 text-brand animate-pulse">
                <Play className="h-8 w-8 fill-brand translate-x-0.5" />
              </div>
              <h4 className="text-xl font-bold text-white">Industry-Recognized IT Certifications</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                1. Enroll in your selected certification course.<br />
                2. Master exam objectives with structured lessons & real-world projects.<br />
                3. Get 1:1 expert guidance and clear your official certification exam with confidence.
              </p>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark transition shadow-lg shadow-brand/25"
                >
                  Got It, Let&apos;s Start
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
