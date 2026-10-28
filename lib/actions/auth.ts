"use server";

import { redirect } from "next/navigation";
import { appUrl } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";
import type { ActionState } from "@/lib/types";
import { safeNextPath } from "@/lib/utils";
import { loginSchema, registerSchema } from "@/lib/validators";

export async function signIn(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  const email = parsed.data.email.toLowerCase().trim();
  const nextParam = formData.get("next");
  const next = safeNextPath(nextParam);

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password: parsed.data.password });

  if (error) {
    const msg = error.message.toLowerCase();
    if (msg.includes("email not confirmed")) {
      return { error: "Please verify your email address before signing in." };
    }
    if (msg.includes("invalid login credentials")) {
      return { error: "Invalid email or password." };
    }
    return { error: error.message };
  }

  // If the authenticated user is an admin, redirect them directly to /admin
  if (data?.user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();

    if (profile?.role === "admin") {
      if (!nextParam || next === "/dashboard") {
        redirect("/admin");
      }
    }
  }

  redirect(next);
}

export async function signUp(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = registerSchema.safeParse({
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  const email = parsed.data.email.toLowerCase().trim();
  const next = safeNextPath(formData.get("next"));

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.full_name.trim() },
      emailRedirectTo: `${appUrl()}/callback?next=${encodeURIComponent(next)}`,
    },
  });

  if (error) return { error: error.message };

  if (!data.session) {
    return { message: "Account created! Check your email to confirm your account, then log in." };
  }

  redirect(next);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
