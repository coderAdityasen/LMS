"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/current-user";
import { updateUserProfile } from "@/lib/data/repository";
import type { ActionState, Role } from "@/lib/types";

export async function updateUserAction(userId: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  const fullName = String(formData.get("full_name") ?? "").trim();
  const role = formData.get("role") === "admin" ? "admin" : "user";
  if (fullName.length < 2) return { error: "Enter a name." };
  if (admin.id === userId && role !== "admin") return { error: "You cannot remove your own admin access." };
  await updateUserProfile(userId, { full_name: fullName, role: role as Role });
  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${userId}`);
  return { ok: true, message: "Learner updated." };
}
