import { afterAll } from "vitest";
import fs from "node:fs";
import path from "node:path";

export const auditResults: any[] = [];

afterAll(() => {
  let md = "# UI Lab A11y Audit Summary\n\n";
  if (auditResults.length === 0) {
    md += "No components audited.\n";
  } else {
    for (const res of auditResults) {
      md += `## ${res.componentName}\n`;
      if (res.violations.length === 0) {
        md += "✅ Passed (No violations)\n\n";
      } else {
        md += "❌ Violations:\n";
        for (const v of res.violations) {
          md += `- **${v.id}**: ${v.description} (${v.impact})\n`;
        }
        md += "\n";
      }
    }
  }
  const reportPath = path.resolve(process.cwd(), "a11y-audit-report.md");
  fs.writeFileSync(reportPath, md, "utf8");
});
