import { z } from "zod";
import type { CourseInput, CourseMetadata, Level } from "@/lib/types";

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email."),
  password: z.string().min(6, "Use at least 6 characters."),
});

export const registerSchema = loginSchema.extend({
  full_name: z.string().trim().min(2, "Enter your name.").max(80),
});

const courseSchema = z.object({
  title: z.string().trim().min(3, "Title is too short.").max(140),
  subtitle: z.string().trim().min(8, "Add a one-line subtitle.").max(180),
  description: z.string().trim().min(40, "Describe the course in a few sentences.").max(5000),
  price: z.coerce.number().min(0, "Price cannot be negative.").max(9999),
  category: z.string().trim().min(2),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  language: z.string().trim().min(2).max(40),
  partner: z.string().trim().min(2, "Add the teaching partner.").max(80),
  instructor_name: z.string().trim().min(2, "Add an instructor name.").max(80),
  instructor_title: z.string().trim().min(2).max(120),
  instructor_bio: z.string().trim().min(20, "Add a short instructor bio.").max(1000),
  skills: z.string().trim().min(2, "List at least one skill."),
  learning_points: z.string().trim().min(8, "Add what learners will be able to do."),
  duration_label: z.string().trim().min(2).max(60),
  thumbnail_url: z.string().trim().max(500),
});

export function parseCourseForm(formData: FormData): { ok: true; data: CourseInput } | { ok: false; error: string } {
  const parsed = courseSchema.safeParse({
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    description: formData.get("description"),
    price: formData.get("price"),
    category: formData.get("category"),
    level: formData.get("level"),
    language: formData.get("language") || "English",
    partner: formData.get("partner"),
    instructor_name: formData.get("instructor_name"),
    instructor_title: formData.get("instructor_title"),
    instructor_bio: formData.get("instructor_bio"),
    skills: formData.get("skills"),
    learning_points: formData.get("learning_points"),
    duration_label: formData.get("duration_label"),
    thumbnail_url: formData.get("thumbnail_url") || "",
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  }

  const thumbnail = parsed.data.thumbnail_url;
  if (thumbnail && !/^https?:\/\//i.test(thumbnail)) {
    return { ok: false, error: "Thumbnail must be an http(s) URL." };
  }

  const skills = parsed.data.skills.split(",").map((item) => item.trim()).filter(Boolean);
  const learning_points = parsed.data.learning_points.split("\n").map((item) => item.trim()).filter(Boolean);
  if (skills.length === 0) return { ok: false, error: "List at least one skill, separated by commas." };
  if (learning_points.length === 0) return { ok: false, error: "Add at least one learning point." };

  const metadata: CourseMetadata = {
    subtitle: parsed.data.subtitle,
    partner: parsed.data.partner,
    instructor_name: parsed.data.instructor_name,
    instructor_title: parsed.data.instructor_title,
    instructor_bio: parsed.data.instructor_bio,
    level: parsed.data.level as Level,
    rating: 0,
    review_count: 0,
    enrolled_count: 0,
    duration_label: parsed.data.duration_label,
    skills,
    category: parsed.data.category,
    language: parsed.data.language,
    learning_points,
  };

  return {
    ok: true,
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      thumbnail_url: thumbnail || null,
      price: Math.round(parsed.data.price * 100) / 100,
      is_published: formData.get("is_published") === "on",
      metadata,
    },
  };
}

export const pdfMetaSchema = z.object({
  title: z.string().trim().min(2, "Add a lesson title.").max(160),
  module_title: z.string().trim().min(2, "Add a module name.").max(160),
  summary: z.string().trim().max(2000).optional(),
});

export const paymentEventSchema = z.object({
  user_id: z.string().uuid(),
  course_id: z.string().uuid(),
  amount: z.coerce.number().min(0),
  status: z.enum(["pending", "completed", "refunded"]),
  payment_reference: z.string().trim().min(3).max(160),
});
