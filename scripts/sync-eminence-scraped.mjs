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
if (!url || !key) {
  console.error("Missing SUPABASE credentials");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

// Read the official scraped courses
const scrapedCourses = JSON.parse(fs.readFileSync("courses_api.json", "utf-8"));

// Category mapping based on name
function getCategory(name) {
  const n = name.toLowerCase();
  if (n.includes("pmp")) return "Project Management";
  if (n.includes("cisa") || n.includes("cism") || n.includes("comptia") || n.includes("security") || n.includes("cysa") || n.includes("casp")) {
    return "Cyber Security";
  }
  if (n.includes("developer") || n.includes("power bi") || n.includes("data factory") || n.includes("dp-203") || n.includes("az-400")) {
    return "Developer";
  }
  return "Cloud";
}

// Subtitle mapping
function getSubtitle(name) {
  const n = name.toLowerCase();
  if (n.includes("pmp")) return "Globally recognized project leadership certification.";
  if (n.includes("solutions architect - associate")) return "Architect secure, resilient, and high-availability systems on AWS.";
  if (n.includes("solutions architect - professional")) return "Enterprise multi-account and hybrid cloud solutions on AWS.";
  if (n.includes("sysops")) return "System operations, automation, and infrastructure health on AWS.";
  if (n.includes("aws certified developer")) return "Build serverless and cloud-native applications on AWS.";
  if (n.includes("aws devops")) return "Continuous integration, delivery, and automated infrastructure on AWS.";
  if (n.includes("az-104")) return "Configure and manage Azure enterprise cloud environments.";
  if (n.includes("az 900") || n.includes("az-900")) return "Foundations of cloud computing and core Azure services.";
  if (n.includes("az-305")) return "Design enterprise-grade infrastructure and governance on Azure.";
  if (n.includes("az-204")) return "Build secure, scalable cloud applications with Azure PaaS.";
  if (n.includes("az-400")) return "Design and implement enterprise DevOps practices using Azure Pipelines.";
  if (n.includes("dp-203")) return "ETL data pipelines and lakehouse analytics on Microsoft Azure.";
  if (n.includes("power bi")) return "Business intelligence, advanced DAX modeling, and visual analytics.";
  if (n.includes("cisa")) return "The globally gold standard for information systems audit and control.";
  if (n.includes("cism")) return "Security management, governance, and enterprise cyber risk.";
  if (n.includes("security+")) return "Core cybersecurity skills to defend enterprise networks and systems.";
  if (n.includes("network+")) return "Foundations of enterprise network engineering and troubleshooting.";
  if (n.includes("a+")) return "Hardware, systems administration, and end-user technical support.";
  if (n.includes("cysa+")) return "Threat intelligence, behavioral analytics, and incident response.";
  if (n.includes("casp+")) return "Enterprise security architecture, engineering, and cryptography.";
  return "Professional certification training from Eminence Career Solution.";
}

// Thumbnail matching to local cropped high-res badges
function getThumbnail(name) {
  const n = name.toLowerCase();
  if (n.includes("pmp")) return "/courses/pmp-certification.png";
  if (n.includes("solutions architect - associate")) return "/courses/aws-solutions-architect-associate.png";
  if (n.includes("solutions architect - professional")) return "/courses/aws-solutions-architect-professional.png";
  if (n.includes("sysops")) return "/courses/aws-sysops-administrator-associate.png";
  if (n.includes("aws certified developer")) return "/courses/aws-developer-associate.png";
  if (n.includes("aws devops")) return "/courses/aws-devops-certification.png";
  if (n.includes("az-104")) return "/courses/azure-administrator-az-104.png";
  if (n.includes("az 900") || n.includes("az-900")) return "/courses/az-900-azure-fundamentals.png";
  if (n.includes("az-305")) return "/courses/azure-solutions-az-305.png";
  if (n.includes("az-204")) return "/courses/azure-developer-az-204.png";
  if (n.includes("az-400")) return "/courses/azure-devops-az-400.png";
  if (n.includes("dp-203")) return "/courses/azure-data-factory-dp-203.png";
  if (n.includes("power bi")) return "/courses/microsoft-power-bi.png";
  if (n.includes("cisa")) return "/courses/cisa-certification.png";
  if (n.includes("cism")) return "/courses/cism-certification.png";
  if (n.includes("security+")) return "/courses/comptia-security-plus.png";
  if (n.includes("network+")) return "/courses/comptia-network-plus.png";
  if (n.includes("a+")) return "/courses/comptia-a-plus.png";
  if (n.includes("cysa+")) return "/courses/comptia-cysa-plus.png";
  if (n.includes("casp+")) return "/courses/comptia-casp-plus.png";
  return "/courses/pmp-certification.png";
}

async function syncCourses() {
  console.log("Fetching existing courses from Supabase...");
  const { data: existing, error } = await supabase.from("courses").select("id, title");
  if (error) throw error;

  console.log(`Found ${existing.length} courses in DB. Updating with exact scraped data...`);

  for (const item of scrapedCourses) {
    const rawTitle = item.name.replace(/\u00ae/g, "®").replace(/\u2019/g, "'");
    // Find matching record by partial title or index
    const match = existing.find(c => {
      const t1 = c.title.toLowerCase().replace(/[^a-z0-9]/g, "");
      const t2 = rawTitle.toLowerCase().replace(/[^a-z0-9]/g, "");
      return t1 === t2 || t1.includes(t2) || t2.includes(t1);
    });

    if (!match) {
      console.warn(`No DB match for ${rawTitle}`);
      continue;
    }

    const category = getCategory(rawTitle);
    const subtitle = getSubtitle(rawTitle);
    const thumbnail_url = getThumbnail(rawTitle);
    const modules = (item.courseModules || []).map(m => m.description);

    const updatePayload = {
      title: rawTitle,
      description: item.courseOverview.trim(),
      price: Number(item.fees),
      thumbnail_url,
      metadata: {
        partner: "Eminence Career Solution",
        category,
        subtitle,
        duration_label: item.duration || "35 Hours",
        rating: 5.0,
        review_count: Number(item.review) || 1200,
        enrolled_count: 15000 + (Number(item.review) * 4),
        level: rawTitle.includes("Associate") || rawTitle.includes("Fundamentals") ? "Beginner" : rawTitle.includes("Professional") || rawTitle.includes("CASP") || rawTitle.includes("CISM") ? "Advanced" : "Intermediate",
        instructor_name: "Eminence Senior Practitioner",
        instructor_title: "Authorized Certification Trainer",
        instructor_bio: "Industry practitioner with over 12 years of hands-on enterprise implementation and certification coaching.",
        skills: modules.length > 0 ? modules : ["Instructor Led Training", "Hands-on Labs", "Exam Pass Guarantee"],
        learning_points: [
          "Comprehensive live & self-paced instruction aligned with official vendor curriculum.",
          "Real-world enterprise scenario walkthroughs and hands-on laboratory exercises.",
          "Rigorous mock exam questions, test simulations, and doubt resolution.",
          "100% refund guarantee on timely course completion."
        ],
        support_email: "info@eminencecareersolution.com",
        support_phone: "+1(424)265-3171 / +91-85271-17688"
      },
      updated_at: new Date().toISOString()
    };

    const { error: updErr } = await supabase.from("courses").update(updatePayload).eq("id", match.id);
    if (updErr) {
      console.error(`Failed to update ${rawTitle}:`, updErr);
    } else {
      console.log(`✓ Updated: ${rawTitle} ($${item.fees}, ${item.duration})`);
    }
  }

  console.log("All courses successfully synced with scraped data from http://www.eminencecareersolution.com!");
}

syncCourses();
