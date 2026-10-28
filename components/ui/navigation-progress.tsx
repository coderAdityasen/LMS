"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Complete and reset loading when route changes
  useEffect(() => {
    setProgress(100);
    const timer = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  // Listen to clicks on links and form submits to start immediate top progress bar
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const handleStart = () => {
      setLoading(true);
      setProgress(20);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 85) {
            clearInterval(interval);
            return prev;
          }
          return prev + Math.floor(Math.random() * 15 + 5);
        });
      }, 200);
    };

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      const isInternal = href && href.startsWith("/") && !href.startsWith("//") && target.getAttribute("target") !== "_blank";
      const isSamePage = href === window.location.pathname + window.location.search;
      if (isInternal && !isSamePage && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        handleStart();
      }
    };

    const handleSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement;
      if (form) {
        handleStart();
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("submit", handleSubmit);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("submit", handleSubmit);
      if (interval) clearInterval(interval);
    };
  }, []);

  if (!loading && progress === 0) return null;

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[99999] h-1 w-full overflow-hidden bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-indigo-600 shadow-xs shadow-indigo-500/50 transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transition: progress === 100 ? "width 0.2s ease, opacity 0.3s ease 0.1s" : "width 0.3s ease",
        }}
      />
    </div>
  );
}
