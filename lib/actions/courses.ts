"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/current-user";
import { createCourse, deleteCourse, updateCourse } from "@/lib/data/repository";
import type { ActionState } from "@/lib/types";
import { parseCourseForm } from "@/lib/validators";

function refreshCatalog(id?: string) {
  revalidatePath("/");
  revalidatePath("/courses");
  revalidatePath("/admin");
  revalidatePath("/admin/courses");
  if (id) {
    revalidatePath(`/courses/${id}`);
    revalidatePath(`/admin/courses/${id}`);
  }
}

export async function createCourseAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  const parsed = parseCourseForm(formData);
  if (!parsed.ok) return { error: parsed.error };
  const id = await createCourse(parsed.data, admin.id);
  refreshCatalog(id);
  redirect(`/admin/courses/${id}/pdfs`);
}

export async function updateCourseAction(courseId: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseCourseForm(formData);
  if (!parsed.ok) return { error: parsed.error };
  await updateCourse(courseId, parsed.data);
  refreshCatalog(courseId);
  return { ok: true, message: "Course saved." };
}

export async function deleteCourseAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await deleteCourse(id);
  refreshCatalog(id);
  redirect("/admin/courses");
}
