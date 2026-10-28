"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="max-w-lg text-center">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="mt-3 text-sm leading-6 text-muted">{error.message}</p>
        <button onClick={reset} className="mt-6 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white">Try again</button>
      </div>
    </main>
  );
}
