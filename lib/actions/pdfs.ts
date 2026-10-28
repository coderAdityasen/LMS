"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/current-user";
import { addPdf, deletePdf, movePdf, replacePdfFile, storePdfFile } from "@/lib/data/repository";
import type { ActionState } from "@/lib/types";
import { pdfMetaSchema } from "@/lib/validators";

function refresh(courseId: string) {
  revalidatePath(`/admin/courses/${courseId}/pdfs`);
  revalidatePath(`/courses/${courseId}`);
  revalidatePath(`/dashboard/courses/${courseId}`);
}

export async function uploadPdfAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const courseId = String(formData.get("course_id") ?? "");
  const parsed = pdfMetaSchema.safeParse({
    title: formData.get("title"),
    module_title: formData.get("module_title"),
    summary: formData.get("summary") || "",
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Check the lesson details." };
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Choose a PDF to upload." };
  try {
    const filePath = await storePdfFile(courseId, file);
    await addPdf({
      courseId,
      title: parsed.data.title,
      moduleTitle: parsed.data.module_title,
      summary: parsed.data.summary ?? "",
      filePath,
    });
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Upload failed." };
  }
  refresh(courseId);
  return { ok: true, message: "Lesson added." };
}

export async function replacePdfAction(formData: FormData) {
  await requireAdmin();
  const courseId = String(formData.get("course_id") ?? "");
  const pdfId = String(formData.get("pdf_id") ?? "");
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return;
  await replacePdfFile(pdfId, courseId, file);
  refresh(courseId);
}

export async function deletePdfAction(formData: FormData) {
  await requireAdmin();
  const courseId = String(formData.get("course_id") ?? "");
  const pdfId = String(formData.get("pdf_id") ?? "");
  await deletePdf(pdfId, courseId);
  refresh(courseId);
}

export async function movePdfAction(formData: FormData) {
  await requireAdmin();
  const courseId = String(formData.get("course_id") ?? "");
  const pdfId = String(formData.get("pdf_id") ?? "");
  const direction = Number(formData.get("direction")) === -1 ? -1 : 1;
  await movePdf(courseId, pdfId, direction);
  refresh(courseId);
}
