import type { Course, CourseMetadata, CoursePdf, Level, PaymentStatus, Purchase } from "@/lib/types";

const levels: Level[] = ["Beginner", "Intermediate", "Advanced"];

export function normalizeMetadata(value: unknown): CourseMetadata {
  const raw = value && typeof value === "object" ? (value as Partial<CourseMetadata>) : {};
  const level = levels.includes(raw.level as Level) ? (raw.level as Level) : "Beginner";
  return {
    subtitle: raw.subtitle ?? "",
    partner: raw.partner ?? "Meridian",
    instructor_name: raw.instructor_name ?? "Meridian instructor",
    instructor_title: raw.instructor_title ?? "Instructor",
    instructor_bio: raw.instructor_bio ?? "",
    level,
    rating: Number(raw.rating ?? 0),
    review_count: Number(raw.review_count ?? 0),
    enrolled_count: Number(raw.enrolled_count ?? 0),
    duration_label: raw.duration_label ?? "Self-paced",
    skills: Array.isArray(raw.skills) ? raw.skills.map(String) : [],
    category: raw.category ?? "General",
    language: raw.language ?? "English",
    learning_points: Array.isArray(raw.learning_points) ? raw.learning_points.map(String) : [],
  };
}

export function mapCourse(row: Record<string, unknown>): Course {
  return {
    id: String(row.id),
    title: String(row.title ?? ""),
    description: row.description == null ? null : String(row.description),
    thumbnail_url: row.thumbnail_url == null ? null : String(row.thumbnail_url),
    price: Number(row.price ?? 0),
    is_published: Boolean(row.is_published),
    created_by: row.created_by == null ? null : String(row.created_by),
    created_at: String(row.created_at ?? new Date().toISOString()),
    updated_at: String(row.updated_at ?? new Date().toISOString()),
    metadata: normalizeMetadata(row.metadata),
  };
}

export function mapPdf(row: Record<string, unknown>): CoursePdf {
  return {
    id: String(row.id),
    course_id: String(row.course_id),
    title: String(row.title ?? ""),
    file_path: String(row.file_path ?? ""),
    sort_order: Number(row.sort_order ?? 0),
    module_title: String(row.module_title ?? "Lessons"),
    summary: row.summary == null ? null : String(row.summary),
    created_at: String(row.created_at ?? new Date().toISOString()),
  };
}

export function mapPurchase(row: Record<string, unknown>): Purchase {
  return {
    id: String(row.id),
    user_id: String(row.user_id),
    course_id: String(row.course_id),
    amount_paid: Number(row.amount_paid ?? 0),
    payment_status: (row.payment_status as PaymentStatus) ?? "pending",
    payment_reference: row.payment_reference == null ? null : String(row.payment_reference),
    purchased_at: String(row.purchased_at ?? new Date().toISOString()),
  };
}

export function raiseDb(error: { message?: string } | null) {
  if (!error) return;
  const message = error.message ?? "Database request failed.";
  if (/relation|does not exist|schema cache|column/i.test(message)) {
    throw new Error("Supabase is missing the Meridian tables. Run supabase/migrations/001_init.sql in the SQL editor.");
  }
  throw new Error(message);
}
