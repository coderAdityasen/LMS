"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin, requireUser } from "@/lib/auth/current-user";
import { getCourse, hasCompletedPurchase, recordPayment, updateSubscriptionStatus } from "@/lib/data/repository";
import type { PaymentStatus } from "@/lib/types";

export async function purchaseCourse(formData: FormData) {
  const user = await requireUser();
  const courseId = String(formData.get("course_id") ?? "");
  const course = await getCourse(courseId);
  if (!course || (!course.is_published && user.role !== "admin")) {
    redirect("/courses");
  }
  if (await hasCompletedPurchase(user.id, courseId)) {
    redirect(`/dashboard/courses/${courseId}`);
  }
  try {
    await recordPayment({
      user_id: user.id,
      course_id: courseId,
      amount_paid: course.price,
      payment_status: "completed",
      payment_reference: `meridian_${crypto.randomUUID()}`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Enrollment failed.";
    redirect(`/courses/${courseId}/checkout?error=${encodeURIComponent(message)}`);
  }
  revalidatePath("/dashboard");
  revalidatePath(`/courses/${courseId}`);
  redirect(`/dashboard/courses/${courseId}?enrolled=1`);
}

export async function updateSubscriptionStatusAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = formData.get("status") as PaymentStatus;
  if (!id || !status) return;
  await updateSubscriptionStatus(id, status);
  revalidatePath("/admin");
  revalidatePath("/admin/subscriptions");
}
