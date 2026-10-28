import { Logo } from "@/components/layout/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id="content" className="grid min-h-screen lg:grid-cols-2">
      <section className="hidden bg-navy px-12 py-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Logo tone="light" />
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-white/60">Meridian</p>
          <h1 className="mt-3 max-w-md text-4xl font-bold leading-tight">Learn on a path, not a pile of links.</h1>
          <p className="mt-4 max-w-md text-base leading-7 text-white/75">
            Every course keeps its readings, PDFs, and progress in one library you can come back to.
          </p>
        </div>
        <p className="text-sm text-white/60">Self-paced courses with structured PDF readings.</p>
      </section>
      <section className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden"><Logo /></div>
          {children}
        </div>
      </section>
    </main>
  );
}
