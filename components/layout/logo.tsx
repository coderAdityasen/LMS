import Link from "next/link";
import Image from "next/image";

export function Logo({
  tone = "dark",
  href = "/",
  className = "",
}: {
  tone?: "dark" | "light";
  href?: string;
  showText?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center transition-opacity hover:opacity-90 ${className}`}
      aria-label="Eminence Career Solution"
    >
      <div className="relative flex h-10 sm:h-12 w-auto shrink-0 items-center justify-center">
        <Image
          src="/logo.png"
          alt="Eminence Career Solution"
          width={220}
          height={60}
          className={`h-8 sm:h-10 w-auto object-contain transition-all ${
            tone === "light" ? "brightness-0 invert" : ""
          }`}
          priority
        />
      </div>
    </Link>
  );
}
