"use client";

import { useState } from "react";
import { categoryTone } from "@/lib/utils";

export function Cover({
  src,
  alt,
  category,
}: {
  src: string | null;
  alt: string;
  category: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`grid h-full w-full place-items-end bg-gradient-to-br p-4 text-white ${categoryTone(
          category
        )}`}
      >
        <span className="text-sm font-semibold">{category}</span>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-200">
      {/* Background placeholder shimmer */}
      <div className="absolute inset-0 animate-shimmer bg-slate-300/40" />
      {/* External lesson art */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt || "Course thumbnail"}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="relative h-full w-full object-cover"
      />
    </div>
  );
}
