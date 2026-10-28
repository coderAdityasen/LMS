function pdfSafe(text: string) {
  return text
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[—–]/g, "-")
    .replace(/[^\x20-\x7E\n]/g, "");
}

function escapePdf(text: string) {
  return pdfSafe(text).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrap(text: string, width: number) {
  const words = pdfSafe(text).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > width) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export function buildLessonPdf(input: {
  courseTitle: string;
  moduleTitle: string;
  title: string;
  summary: string;
}) {
  const blocks = [
    { size: 11, gap: 18, lines: ["MERIDIAN READING"] },
    { size: 20, gap: 26, lines: wrap(input.title, 48) },
    { size: 11, gap: 16, lines: wrap(`${input.moduleTitle}  ·  ${input.courseTitle}`, 90) },
    { size: 13, gap: 18, lines: ["Overview"] },
    { size: 12, gap: 16, lines: wrap(input.summary || "Read this lesson in order, then try the practice at the end.", 92) },
    { size: 13, gap: 18, lines: ["What to notice"] },
    {
      size: 12,
      gap: 16,
      lines: [
        "- The decision this reading is meant to change.",
        "- One term you should be able to explain without notes.",
        "- How the idea shows up in the next lesson.",
      ],
    },
    { size: 13, gap: 18, lines: ["Practice"] },
    {
      size: 12,
      gap: 16,
      lines: wrap(
        `Write five lines on "${input.title}" and name one choice it would change in a real project this week.`,
        92,
      ),
    },
    { size: 10, gap: 14, lines: ["Meridian course reading. Keep this PDF with your notes."] },
  ];

  const commands = ["BT"];
  let first = true;
  for (const block of blocks) {
    commands.push(`/F1 ${block.size} Tf`);
    commands.push(first ? "72 740 Td" : `0 -${block.gap} Td`);
    first = false;
    block.lines.forEach((line, index) => {
      if (index > 0) commands.push(`0 -${block.gap} Td`);
      commands.push(`(${escapePdf(line)}) Tj`);
    });
  }
  commands.push("ET");
  const stream = commands.join("\n");

  const objects = [
    "1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj",
    "2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj",
    "3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj",
    `4 0 obj<</Length ${Buffer.byteLength(stream)}>>stream\n${stream}\nendstream\nendobj`,
    "5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj",
  ];

  let body = "%PDF-1.4\n";
  const offsets = [0];
  for (const object of objects) {
    offsets.push(Buffer.byteLength(body));
    body += `${object}\n`;
  }
  const xrefAt = Buffer.byteLength(body);
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let index = 1; index <= objects.length; index += 1) {
    xref += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  xref += `trailer<</Size ${objects.length + 1}/Root 1 0 R>>\nstartxref\n${xrefAt}\n%%EOF`;
  return Buffer.from(body + xref, "utf8");
}
