export const CATEGORIES = [
  { name: "Data Science", blurb: "Analysis, SQL, and clear readouts" },
  { name: "Computer Science", blurb: "Software foundations that ship" },
  { name: "Design", blurb: "Research, interface, and critique" },
  { name: "Business", blurb: "Marketing, growth, and decisions" },
  { name: "Artificial Intelligence", blurb: "Models, judgment, and practice" },
  { name: "Information Technology", blurb: "Cloud, systems, and operations" },
  { name: "Finance", blurb: "Statements, value, and risk" },
  { name: "Product", blurb: "Discovery, scope, and delivery" },
] as const;

export type CategoryName = (typeof CATEGORIES)[number]["name"];
