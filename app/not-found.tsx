import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { buttonClass } from "@/lib/ui";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="max-w-md text-center">
        <Logo />
        <h1 className="mt-6 text-3xl font-bold">That page is not in the catalog</h1>
        <p className="mt-2 text-sm text-muted">The course may be unpublished, or the link is out of date.</p>
        <Link href="/courses" className={`${buttonClass("primary", "md")} mt-6`}>Back to courses</Link>
      </div>
    </main>
  );
}
