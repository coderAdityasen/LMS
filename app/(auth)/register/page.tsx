import { AuthForm } from "@/components/auth/auth-form";
import { safeNextPath } from "@/lib/utils";

export const metadata = { title: "Join" };

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const params = await searchParams;
  return (
    <>
      <h1 className="text-3xl font-bold">Create your account</h1>
      <p className="mt-2 text-sm text-muted">Join for free. Enroll in a course when you are ready.</p>
      <div className="mt-6">
        <AuthForm mode="register" nextPath={safeNextPath(params.next)} />
      </div>
    </>
  );
}
