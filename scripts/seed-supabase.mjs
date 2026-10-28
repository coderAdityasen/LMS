import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim();
  }
}

loadEnv(path.join(process.cwd(), ".env"));
loadEnv(path.join(process.cwd(), ".env.local"));

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key || key.includes("...")) {
  console.error("Set a real SUPABASE_SERVICE_ROLE_KEY in .env first.");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const db = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "demo-db.json"), "utf8"));

async function ensureUser(email, password, fullName, role) {
  const listed = await supabase.auth.admin.listUsers({ perPage: 200 });
  if (listed.error) throw listed.error;
  let user = listed.data.users.find((item) => item.email?.toLowerCase() === email);
  if (!user) {
    const created = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    });
    if (created.error) throw created.error;
    user = created.data.user;
  }

  const existing = await supabase.from("profiles").select("id, role").eq("id", user.id).maybeSingle();
  if (existing.error) throw existing.error;
  if (!existing.data) {
    const inserted = await supabase.from("profiles").insert({ id: user.id, full_name: fullName, role });
    if (inserted.error) throw inserted.error;
    return user.id;
  }
  if (existing.data.role === role) {
    await supabase.from("profiles").update({ full_name: fullName }).eq("id", user.id);
    return user.id;
  }

  const removed = await supabase.from("profiles").delete().eq("id", user.id);
  if (removed.error) throw removed.error;
  const inserted = await supabase.from("profiles").insert({ id: user.id, full_name: fullName, role });
  if (inserted.error) throw inserted.error;
  return user.id;
}

const adminId = await ensureUser("admin@meridian.dev", "admin123", "Meridian Admin", "admin");
const learnerId = await ensureUser("learner@meridian.dev", "learner123", "Alex Rivera", "user");

const courses = db.courses.map((course) => ({
  id: course.id,
  title: course.title,
  description: course.description,
  thumbnail_url: course.thumbnail_url,
  price: course.price,
  is_published: course.is_published,
  created_by: adminId,
  metadata: course.metadata,
  created_at: course.created_at,
  updated_at: course.updated_at,
}));

const courseSave = await supabase.from("courses").upsert(courses, { onConflict: "id" });
if (courseSave.error) throw courseSave.error;

const pdfs = db.pdfs.map((pdf) => ({
  id: pdf.id,
  course_id: pdf.course_id,
  title: pdf.title,
  file_path: pdf.file_path,
  module_title: pdf.module_title,
  summary: pdf.summary,
  sort_order: pdf.sort_order,
  created_at: pdf.created_at,
}));
const pdfSave = await supabase.from("course_pdfs").upsert(pdfs, { onConflict: "id" });
if (pdfSave.error) throw pdfSave.error;

const free = db.courses.find((course) => Number(course.price) === 0);
if (free) {
  const purchase = await supabase.from("purchases").upsert(
    {
      user_id: learnerId,
      course_id: free.id,
      amount_paid: 0,
      payment_status: "completed",
      payment_reference: "seed_free_enrollment",
    },
    { onConflict: "user_id,course_id" },
  );
  if (purchase.error) throw purchase.error;
}

console.log(`Seeded ${courses.length} courses, ${pdfs.length} readings.`);
console.log("Admin: admin@meridian.dev / admin123");
console.log("Learner: learner@meridian.dev / learner123");
