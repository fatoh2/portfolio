// Collects each project's current phase line from its TASKS.md in the
// workstation and writes src/content/now.json for the "Now building" strip.
// Run locally before committing; the deploy has no access to sibling folders.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const workstation = resolve(root, "..");
const folders = {
  bab: "job-finder",
  "nedaa-lifestyle": "nedaa-lifestyle",
  nuqta: "focusquest",
  solitaire: "solitaire-dapp",
  "seeker-radar": "seeker-launch-radar",
  elsewhereco: "elsewhereco",
  "go-to-nature": "go-to-nature",
  "camp-and-hike": "camp-and-hike",
  "whatsapp-ai-sales-agent": "nazareth-whatsapp-sales-agent",
};

const stripMarkdown = (text) =>
  text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const entries = [];
for (const [slug, folder] of Object.entries(folders)) {
  const file = join(workstation, folder, "TASKS.md");
  if (!existsSync(file)) continue;
  const line = readFileSync(file, "utf8")
    .split(/\r?\n/)
    .find((candidate) => /\*\*Updated:\*\*/.test(candidate) && /\*\*Phase:\*\*/.test(candidate));
  if (!line) continue;
  const updated = line.match(/\*\*Updated:\*\*\s*(\d{4}-\d{2}-\d{2})/)?.[1];
  const phaseRaw = line.split(/\*\*Phase:\*\*/)[1] ?? "";
  // First clause only, without its closing punctuation; the strip is a glance, not a report.
  const phase = stripMarkdown(phaseRaw)
    .split(/(?<=[.;])\s/)[0]
    .replace(/[;.:\s]+$/, "")
    .slice(0, 110)
    .replace(/^(.{90,}?)\s\S*$/, "$1…");
  if (!updated || !phase) continue;
  entries.push({ slug, updated, phase: phase.charAt(0).toUpperCase() + phase.slice(1) });
}
entries.sort((a, b) => b.updated.localeCompare(a.updated));
writeFileSync(join(root, "src/content/now.json"), JSON.stringify(entries, null, 2) + "\n");
console.log(entries.map((entry) => `${entry.updated} ${entry.slug}: ${entry.phase}`).join("\n"));
