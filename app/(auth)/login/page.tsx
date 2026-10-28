import { AuthForm } from "@/components/auth/auth-form";
import { safeNextPath } from "@/lib/utils";

export const metadata = { title: "Log in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const params = await searchParams;
  const nextPath = safeNextPath(params.next);
  return (
    <>
      <h1 className="text-3xl font-bold">Welcome back</h1>
      <p className="mt-2 text-sm text-muted">Log in to open your courses and readings.</p>
      {params.error ? <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-800">The sign-in link expired. Try again.</p> : null}
      <div className="mt-6">
        <AuthForm mode="login" nextPath={nextPath} />
      </div>
      {process.env.NODE_ENV === "development" ? (
        <div className="mt-6 rounded-lg border border-line bg-canvas p-4 text-sm">
          <p className="font-bold">Local accounts</p>
          <p className="mt-2">Learner: learner@meridian.dev / learner123</p>
          <p>Admin: admin@meridian.dev / admin123</p>
        </div>
      ) : null}
    </>
  );
}
