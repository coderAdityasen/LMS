import { mapCourse, mapPdf, raiseDb } from "@/lib/data/mappers";
import { buildLessonPdf } from "@/lib/pdf/simple-pdf";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type {
  AdminStats,
  Course,
  CourseInput,
  CoursePdf,
  CourseView,
  LearningItem,
  LessonLink,
  PaymentStatus,
  Role,
  SessionUser,
  StudentUser,
  SubscriptionItem,
  UserDetail,
} from "@/lib/types";

function withLearners(course: Course, counts: Map<string, number>): CourseView {
  return {
    ...course,
    learner_count: course.metadata.enrolled_count + (counts.get(course.id) ?? 0),
  };
}

async function livePurchaseCounts(): Promise<Map<string, number>> {
  const admin = createAdminClient();
  const client = admin ?? (await createClient());
  const { data, error } = await client
    .from("purchases")
    .select("course_id")
    .eq("payment_status", "completed");

  if (error) return new Map();
  const counts = new Map<string, number>();
  for (const row of data ?? []) {
    const courseId = String(row.course_id);
    counts.set(courseId, (counts.get(courseId) ?? 0) + 1);
  }
  return counts;
}

export async function listPublishedCourses(): Promise<CourseView[]> {
  const [counts, supabase] = await Promise.all([livePurchaseCounts(), createClient()]);
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true);
  raiseDb(error);

  return (data ?? [])
    .map((row) => withLearners(mapCourse(row as Record<string, unknown>), counts))
    .sort((a, b) => b.learner_count - a.learner_count);
}

export async function listAllCourses(): Promise<CourseView[]> {
  const [counts, supabase] = await Promise.all([livePurchaseCounts(), createClient()]);
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("updated_at", { ascending: false });
  raiseDb(error);

  return (data ?? []).map((row) => withLearners(mapCourse(row as Record<string, unknown>), counts));
}

export async function getCourse(id: string): Promise<CourseView | null> {
  const [counts, supabase] = await Promise.all([livePurchaseCounts(), createClient()]);
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  raiseDb(error);

  return data ? withLearners(mapCourse(data as Record<string, unknown>), counts) : null;
}

export async function listCoursePdfs(courseId: string): Promise<CoursePdf[]> {
  const admin = createAdminClient();
  const supabase = admin ?? (await createClient());
  const { data, error } = await supabase
    .from("course_pdfs")
    .select("*")
    .eq("course_id", courseId)
    .order("sort_order", { ascending: true });
  raiseDb(error);

  return (data ?? []).map((row) => mapPdf(row as Record<string, unknown>));
}

export async function listSyllabus(courseId: string): Promise<LessonLink[]> {
  const pdfs = await listCoursePdfs(courseId);
  return pdfs.map((pdf) => ({
    id: pdf.id,
    title: pdf.title,
    module_title: pdf.module_title,
    summary: pdf.summary,
    sort_order: pdf.sort_order,
  }));
}

export async function hasCompletedPurchase(userId: string, courseId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("purchases")
    .select("id")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .eq("payment_status", "completed")
    .maybeSingle();
  raiseDb(error);

  return Boolean(data);
}

export async function createCourse(input: CourseInput, userId: string): Promise<string> {
  const id = crypto.randomUUID();
  const supabase = await createClient();
  const { error } = await supabase.from("courses").insert({
    id,
    title: input.title,
    description: input.description,
    thumbnail_url: input.thumbnail_url,
    price: input.price,
    is_published: input.is_published,
    created_by: userId,
    metadata: input.metadata,
  });
  raiseDb(error);

  return id;
}

export async function updateCourse(id: string, input: CourseInput): Promise<void> {
  const existing = await getCourse(id);
  if (!existing) throw new Error("Course not found.");

  const metadata = {
    ...input.metadata,
    rating: existing.metadata.rating,
    review_count: existing.metadata.review_count,
    enrolled_count: existing.metadata.enrolled_count,
  };

  const supabase = await createClient();
  const { error } = await supabase
    .from("courses")
    .update({
      title: input.title,
      description: input.description,
      thumbnail_url: input.thumbnail_url,
      price: input.price,
      is_published: input.is_published,
      metadata,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  raiseDb(error);
}

async function removeStoredFile(filePath: string) {
  if (filePath.startsWith("storage:")) {
    const admin = createAdminClient();
    if (!admin) return;
    await admin.storage.from("course-pdfs").remove([filePath.slice("storage:".length)]);
  }
}

export async function deleteCourse(id: string): Promise<void> {
  const pdfs = await listCoursePdfs(id);
  for (const pdf of pdfs) {
    await removeStoredFile(pdf.file_path);
  }

  const supabase = await createClient();
  const { error } = await supabase.from("courses").delete().eq("id", id);
  raiseDb(error);
}

export async function storePdfFile(courseId: string, file: File): Promise<string> {
  if (file.size <= 0) throw new Error("That file is empty.");
  if (file.size > 15 * 1024 * 1024) throw new Error("PDFs must be 15 MB or smaller.");
  const name = file.name.toLowerCase();
  if (file.type && file.type !== "application/pdf" && !name.endsWith(".pdf")) throw new Error("Upload a PDF file.");
  if (!file.type && !name.endsWith(".pdf")) throw new Error("Upload a PDF file.");

  const admin = createAdminClient();
  if (!admin) throw new Error("SUPABASE_SERVICE_ROLE_KEY is required to upload course PDFs.");

  const bytes = Buffer.from(await file.arrayBuffer());
  const storagePath = `${courseId}/${crypto.randomUUID()}.pdf`;
  const { error } = await admin.storage.from("course-pdfs").upload(storagePath, bytes, {
    contentType: "application/pdf",
    upsert: false,
  });
  raiseDb(error);

  return `storage:${storagePath}`;
}

export async function addPdf(input: {
  courseId: string;
  title: string;
  moduleTitle: string;
  summary: string;
  filePath: string;
}): Promise<string> {
  const pdfs = await listCoursePdfs(input.courseId);
  const sort = pdfs.reduce((max, pdf) => Math.max(max, pdf.sort_order), 0) + 1;
  const id = crypto.randomUUID();
  const row = {
    id,
    course_id: input.courseId,
    title: input.title,
    module_title: input.moduleTitle,
    summary: input.summary || null,
    file_path: input.filePath,
    sort_order: sort,
    created_at: new Date().toISOString(),
  };

  const supabase = await createClient();
  const { error } = await supabase.from("course_pdfs").insert(row);
  raiseDb(error);

  return id;
}

export async function replacePdfFile(pdfId: string, courseId: string, file: File): Promise<void> {
  const pdfs = await listCoursePdfs(courseId);
  const current = pdfs.find((pdf) => pdf.id === pdfId);
  if (!current) throw new Error("Lesson not found.");

  const filePath = await storePdfFile(courseId, file);
  await removeStoredFile(current.file_path);

  const supabase = await createClient();
  const { error } = await supabase.from("course_pdfs").update({ file_path: filePath }).eq("id", pdfId);
  raiseDb(error);
}

export async function deletePdf(pdfId: string, courseId: string): Promise<void> {
  const pdfs = await listCoursePdfs(courseId);
  const current = pdfs.find((pdf) => pdf.id === pdfId);
  if (!current) return;

  await removeStoredFile(current.file_path);
  const supabase = await createClient();
  const { error } = await supabase.from("course_pdfs").delete().eq("id", pdfId);
  raiseDb(error);
}

export async function movePdf(courseId: string, pdfId: string, direction: -1 | 1): Promise<void> {
  const pdfs = await listCoursePdfs(courseId);
  const current = pdfs.find((pdf) => pdf.id === pdfId);
  if (!current) return;
  const siblings = pdfs.filter((pdf) => pdf.module_title === current.module_title);
  const index = siblings.findIndex((pdf) => pdf.id === pdfId);
  const neighbor = siblings[index + direction];
  if (!neighbor) return;

  const supabase = await createClient();
  const [first, second] = await Promise.all([
    supabase.from("course_pdfs").update({ sort_order: neighbor.sort_order }).eq("id", current.id),
    supabase.from("course_pdfs").update({ sort_order: current.sort_order }).eq("id", neighbor.id),
  ]);
  raiseDb(first.error);
  raiseDb(second.error);
}

export async function getLessonForViewer(courseId: string, pdfId: string, user: SessionUser) {
  const [course, pdfs] = await Promise.all([getCourse(courseId), listCoursePdfs(courseId)]);
  const pdf = pdfs.find((p) => p.id === pdfId);
  if (!course || !pdf || pdf.course_id !== courseId) {
    return { ok: false as const, reason: "missing" as const };
  }

  const allowed = user.role === "admin" || (await hasCompletedPurchase(user.id, courseId));
  if (!allowed) return { ok: false as const, reason: "forbidden" as const };

  const lessons: LessonLink[] = pdfs.map((item) => ({
    id: item.id,
    title: item.title,
    summary: item.summary,
    module_title: item.module_title,
    sort_order: item.sort_order,
  }));

  let src = `/api/content/${pdf.id}`;
  if (pdf.file_path.startsWith("storage:")) {
    const admin = createAdminClient();
    if (!admin) throw new Error("SUPABASE_SERVICE_ROLE_KEY is required to access course PDFs.");
    const { data, error } = await admin.storage
      .from("course-pdfs")
      .createSignedUrl(pdf.file_path.slice("storage:".length), 60 * 60);
    raiseDb(error);
    src = data?.signedUrl ?? src;
  } else if (pdf.file_path.startsWith("http://") || pdf.file_path.startsWith("https://")) {
    src = pdf.file_path;
  }

  return {
    ok: true as const,
    course,
    lesson: {
      id: pdf.id,
      title: pdf.title,
      summary: pdf.summary,
      module_title: pdf.module_title,
      sort_order: pdf.sort_order,
    },
    lessons,
    src,
  };
}

export async function readPdfResponse(pdfId: string, user: SessionUser) {
  const admin = createAdminClient();
  const supabase = admin ?? (await createClient());
  const { data: pdfRow, error } = await supabase.from("course_pdfs").select("*").eq("id", pdfId).maybeSingle();
  raiseDb(error);
  if (!pdfRow) return null;

  const pdf = mapPdf(pdfRow as Record<string, unknown>);
  const allowed = user.role === "admin" || (await hasCompletedPurchase(user.id, pdf.course_id));
  if (!allowed) return { forbidden: true as const };

  const course = await getCourse(pdf.course_id);
  const bytes = buildLessonPdf({
    courseTitle: course?.title ?? "Course Lesson",
    moduleTitle: pdf.module_title,
    title: pdf.title,
    summary: pdf.summary ?? "",
  });

  return { bytes, filename: `${pdf.title}.pdf` };
}

export async function recordPayment(input: {
  user_id: string;
  course_id: string;
  amount_paid: number;
  payment_status: PaymentStatus;
  payment_reference: string;
}): Promise<string> {
  const admin = createAdminClient();
  if (!admin) throw new Error("SUPABASE_SERVICE_ROLE_KEY is required to record purchases.");
  const now = new Date().toISOString();

  const { data: existing, error: readError } = await admin
    .from("purchases")
    .select("id")
    .eq("user_id", input.user_id)
    .eq("course_id", input.course_id)
    .maybeSingle();
  raiseDb(readError);

  if (existing) {
    const { error } = await admin
      .from("purchases")
      .update({
        amount_paid: input.amount_paid,
        payment_status: input.payment_status,
        payment_reference: input.payment_reference,
      })
      .eq("id", existing.id);
    raiseDb(error);
    return String(existing.id);
  }

  const id = crypto.randomUUID();
  const { error } = await admin.from("purchases").insert({ id, ...input, purchased_at: now });
  raiseDb(error);

  return id;
}

export async function listMyLearning(userId: string): Promise<LearningItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("purchases")
    .select("purchased_at, course_id, courses(*, course_pdfs(id, sort_order))")
    .eq("user_id", userId)
    .eq("payment_status", "completed")
    .order("purchased_at", { ascending: false });
  raiseDb(error);

  const items: LearningItem[] = [];
  for (const row of data ?? []) {
    const record = row as unknown as {
      purchased_at: string;
      course_id: string;
      courses: (Record<string, unknown> & { course_pdfs?: { id: string; sort_order: number }[] }) | null;
    };
    if (!record.courses) continue;
    const course = mapCourse(record.courses);
    const pdfs = (record.courses.course_pdfs ?? []).sort((a, b) => a.sort_order - b.sort_order);
    items.push({
      id: course.id,
      title: course.title,
      thumbnail_url: course.thumbnail_url,
      partner: course.metadata.partner,
      lessonIds: pdfs.map((p) => p.id),
      firstLessonId: pdfs[0]?.id ?? null,
      purchased_at: record.purchased_at,
    });
  }
  return items;
}

export async function listUsers(): Promise<(SessionUser & { created_at: string })[]> {
  const admin = createAdminClient();
  if (!admin) {
    const supabase = await createClient();
    const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    raiseDb(error);
    return (data ?? []).map((row) => ({
      id: String(row.id),
      email: "",
      full_name: row.full_name,
      avatar_url: row.avatar_url,
      role: row.role === "admin" ? "admin" : "user",
      created_at: String(row.created_at),
    }));
  }

  const [{ data: profiles, error }, authList] = await Promise.all([
    admin.from("profiles").select("*").order("created_at", { ascending: false }),
    admin.auth.admin.listUsers({ perPage: 200 }),
  ]);
  raiseDb(error);

  const emails = new Map((authList.data?.users ?? []).map((user) => [user.id, user.email ?? ""]));
  return (profiles ?? []).map((row) => ({
    id: String(row.id),
    email: emails.get(String(row.id)) ?? "",
    full_name: row.full_name == null ? null : String(row.full_name),
    avatar_url: row.avatar_url == null ? null : String(row.avatar_url),
    role: row.role === "admin" ? "admin" : "user",
    created_at: String(row.created_at),
  }));
}

export async function getUserDetail(userId: string): Promise<UserDetail | null> {
  const users = await listUsers();
  const profile = users.find((user) => user.id === userId);
  if (!profile) return null;

  const admin = createAdminClient();
  const supabase = admin ?? (await createClient());
  const { data, error } = await supabase
    .from("purchases")
    .select("*, courses(title)")
    .eq("user_id", userId)
    .order("purchased_at", { ascending: false });
  raiseDb(error);

  return {
    profile,
    purchases: (data ?? []).map((row) => {
      const record = row as Record<string, unknown> & { courses?: { title?: string } | null };
      return {
        id: String(record.id),
        course_id: String(record.course_id),
        course_title: record.courses?.title ?? "Course",
        amount: Number(record.amount_paid ?? 0),
        status: record.payment_status as PaymentStatus,
        purchased_at: String(record.purchased_at),
      };
    }),
  };
}

export async function updateUserProfile(userId: string, input: { full_name: string; role: Role }): Promise<void> {
  const admin = createAdminClient();
  const supabase = admin ?? (await createClient());
  const { error } = await supabase
    .from("profiles")
    .update({ full_name: input.full_name, role: input.role, updated_at: new Date().toISOString() })
    .eq("id", userId);
  raiseDb(error);
}

type PurchaseStatRow = {
  id: string;
  user_id: string;
  course_id: string;
  amount_paid: number;
  payment_status: PaymentStatus;
  purchased_at: string;
  courses?: { title?: string } | { title?: string }[] | null;
  profiles?: { full_name?: string } | { full_name?: string }[] | null;
};

export async function getAdminStats(): Promise<AdminStats> {
  const admin = createAdminClient();
  const supabase = admin ?? (await createClient());

  const [profiles, courses, purchases] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("courses").select("is_published"),
    supabase
      .from("purchases")
      .select("id, user_id, course_id, amount_paid, payment_status, purchased_at, courses(title), profiles(full_name)")
      .order("purchased_at", { ascending: false })
      .limit(20),
  ]);
  raiseDb(profiles.error);
  raiseDb(courses.error);
  raiseDb(purchases.error);

  const courseRows = (courses.data ?? []) as { is_published: boolean }[];
  const purchaseRows = (purchases.data ?? []) as unknown as PurchaseStatRow[];
  const completed = purchaseRows.filter((purchase) => purchase.payment_status === "completed");

  return {
    users: profiles.count ?? 0,
    courses: courseRows.length,
    published: courseRows.filter((course) => course.is_published).length,
    enrollments: completed.length,
    revenue: completed.reduce((sum, purchase) => sum + Number(purchase.amount_paid), 0),
    recent: purchaseRows.slice(0, 6).map((purchase) => {
      const learner = Array.isArray(purchase.profiles) ? purchase.profiles[0]?.full_name : purchase.profiles?.full_name;
      const course = Array.isArray(purchase.courses) ? purchase.courses[0]?.title : purchase.courses?.title;
      return {
        id: String(purchase.id),
        learner: learner || "Learner",
        course: course || "Course",
        amount: Number(purchase.amount_paid),
        status: purchase.payment_status,
        purchased_at: purchase.purchased_at,
      };
    }),
  };
}

export async function listAllStudents(): Promise<StudentUser[]> {
  const admin = createAdminClient();
  const supabase = admin ?? (await createClient());

  const [{ data: profiles, error }, { data: purchases }, authList] = await Promise.all([
    supabase.from("profiles").select("*").order("created_at", { ascending: false }),
    supabase.from("purchases").select("user_id, amount_paid, payment_status"),
    admin ? admin.auth.admin.listUsers({ perPage: 500 }) : Promise.resolve({ data: { users: [] } }),
  ]);
  raiseDb(error);

  const emails = new Map((authList?.data?.users ?? []).map((u) => [u.id, u.email ?? ""]));
  const userStats = new Map<string, { count: number; spent: number }>();

  for (const p of purchases || []) {
    if (p.payment_status !== "completed") continue;
    const cur = userStats.get(p.user_id) || { count: 0, spent: 0 };
    cur.count++;
    cur.spent += Number(p.amount_paid);
    userStats.set(p.user_id, cur);
  }

  return (profiles ?? []).map((row) => ({
    id: String(row.id),
    email: emails.get(String(row.id)) ?? "",
    full_name: row.full_name == null ? null : String(row.full_name),
    avatar_url: row.avatar_url == null ? null : String(row.avatar_url),
    role: row.role === "admin" ? "admin" : "user",
    created_at: String(row.created_at),
    enrolled_count: userStats.get(String(row.id))?.count || 0,
    total_spent: userStats.get(String(row.id))?.spent || 0,
  }));
}

export async function listAllSubscriptions(): Promise<SubscriptionItem[]> {
  const admin = createAdminClient();
  const supabase = admin ?? (await createClient());

  const [{ data, error }, authList] = await Promise.all([
    supabase
      .from("purchases")
      .select("id, user_id, course_id, amount_paid, payment_status, payment_reference, purchased_at, courses(id, title, thumbnail_url, price), profiles(id, full_name, role)")
      .order("purchased_at", { ascending: false }),
    admin ? admin.auth.admin.listUsers({ perPage: 500 }) : Promise.resolve({ data: { users: [] } }),
  ]);
  raiseDb(error);

  const emails = new Map((authList?.data?.users ?? []).map((u) => [u.id, u.email ?? ""]));

  return (data ?? []).map((row) => {
    const record = row as unknown as {
      id: string;
      user_id: string;
      course_id: string;
      amount_paid: number;
      payment_status: PaymentStatus;
      payment_reference: string | null;
      purchased_at: string;
      courses?: { id?: string; title?: string; thumbnail_url?: string | null; price?: number } | { id?: string; title?: string; thumbnail_url?: string | null; price?: number }[] | null;
      profiles?: { id?: string; full_name?: string | null; role?: string } | { id?: string; full_name?: string | null; role?: string }[] | null;
    };

    const course = Array.isArray(record.courses) ? record.courses[0] : record.courses;
    const profile = Array.isArray(record.profiles) ? record.profiles[0] : record.profiles;

    return {
      id: String(record.id),
      user_id: String(record.user_id),
      course_id: String(record.course_id),
      student_name: profile?.full_name || "Learner",
      student_email: emails.get(String(record.user_id)) || "",
      course_title: course?.title || "Course",
      course_thumbnail: course?.thumbnail_url || null,
      amount_paid: Number(record.amount_paid ?? 0),
      payment_status: record.payment_status,
      payment_reference: record.payment_reference,
      purchased_at: String(record.purchased_at),
    };
  });
}

export async function updateSubscriptionStatus(id: string, status: PaymentStatus): Promise<void> {
  const admin = createAdminClient();
  const supabase = admin ?? (await createClient());
  const { error } = await supabase.from("purchases").update({ payment_status: status }).eq("id", id);
  raiseDb(error);
}
