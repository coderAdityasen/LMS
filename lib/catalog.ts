export const CATEGORIES = [
  { name: "Cloud", blurb: "AWS & Microsoft Azure architecture and administration" },
  { name: "Cyber Security", blurb: "CompTIA, CISA, CISM & defense certifications" },
  { name: "Developer", blurb: "Cloud-native apps, DevOps pipelines & Power BI" },
  { name: "Project Management", blurb: "PMP® frameworks, Agile leadership & PMBOK" },
] as const;

export type CategoryName = (typeof CATEGORIES)[number]["name"];
