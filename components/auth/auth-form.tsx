"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { Field, Input } from "@/components/ui/input";
import { signIn, signUp } from "@/lib/actions/auth";
import { buttonClass } from "@/lib/ui";

export function AuthForm({ mode, nextPath }: { mode: "login" | "register"; nextPath: string }) {
  const action = mode === "login" ? signIn : signUp;
  const [state, formAction, pending] = useActionState(action, {});
  const [show, setShow] = useState(false);

  return (
    <form action={formAction} className="grid gap-4">
      <input type="hidden" name="next" value={nextPath} />
      {mode === "register" ? (
        <Field label="Full name">
          <Input name="full_name" autoComplete="name" required placeholder="Alex Rivera" />
        </Field>
      ) : null}
      <Field label="Email">
        <Input name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
      </Field>
      <Field label="Password" hint={mode === "register" ? "At least 6 characters." : undefined}>
        <div className="relative">
          <Input
            name="password"
            type={show ? "text" : "password"}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
            minLength={6}
            className="pr-16"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-brand"
            onClick={() => setShow((value) => !value)}
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>
      </Field>
      {state.error ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-800">{state.error}</p> : null}
      {state.message ? <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{state.message}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className={buttonClass("primary", "lg", "w-full transition-transform active:scale-[0.98]")}
      >
        {pending ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>{mode === "login" ? "Signing in..." : "Creating account..."}</span>
          </span>
        ) : mode === "login" ? (
          "Log in"
        ) : (
          "Create account"
        )}
      </button>

      <p className="text-center text-sm text-muted">
        {mode === "login" ? (
          <>
            New to Meridian?{" "}
            <Link href={`/register?next=${encodeURIComponent(nextPath)}`} className="font-bold text-brand">
              Join for free
            </Link>
          </>
        ) : (
          <>
            Already enrolled?{" "}
            <Link href={`/login?next=${encodeURIComponent(nextPath)}`} className="font-bold text-brand">
              Log in
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
