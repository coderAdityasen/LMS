"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { signOut } from "@/lib/actions/auth";

function SignOutButton({ className }: { className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full flex items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-all active:scale-[0.98] disabled:opacity-50 hover:bg-canvas ${
        className || ""
      }`}
    >
      <span>{pending ? "Signing out..." : "Log out"}</span>
      {pending && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted" />}
    </button>
  );
}

export function SignOutItem({ className }: { className?: string }) {
  return (
    <form action={signOut}>
      <SignOutButton className={className} />
    </form>
  );
}
