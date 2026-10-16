// Writes protocols/conditions/index.html and one protocols/conditions/<slug>/index.html per condition,
// copying the head of clinics/index.html (favicons, fonts, consent check) with page-specific tags.
// Run after editing src/protocols/json/conditions.json:  node scripts/generate-condition-pages.mjs
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://praan.health";
const OG_IMAGE = `${SITE}/images/og-share.jpg`;
const conditions = JSON.parse(readFileSync(join(root, "src/protocols/json/conditions.json"), "utf8"));
const raw = JSON.parse(readFileSync(join(root, "src/protocols/json/conditions-raw.json"), "utf8"));
const template = readFileSync(join(root, "clinics/index.html"), "utf8");

const escapeAttr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const plainText = (html) => html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
// Head from <title> to the last og/twitter tag is replaced; everything else (favicons, fonts, scripts) is kept.
const headStart = template.indexOf("    <title>");
const headEnd = template.indexOf('    <link rel="preconnect"');
if (headStart < 0 || headEnd < 0) throw new Error("clinics/index.html layout changed; update this script");

function page({ title, description, path, entry, rootAttrs = "", jsonLd }) {
  const url = `${SITE}${path}`;
  const tags = `    <title>${escapeAttr(title)}</title>
    <meta name="description" content="${escapeAttr(description)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Praan Health" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:title" content="${escapeAttr(title)}" />
    <meta property="og:description" content="${escapeAttr(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(title)}" />
    <meta name="twitter:description" content="${escapeAttr(description)}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />
${jsonLd ? `    <script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>\n` : ""}`;
  return (template.slice(0, headStart) + tags + template.slice(headEnd))
    .replace('<div id="root"></div>', `<div id="root"${rootAttrs}></div>`)
    .replace("/src/protocols/clinics-main.tsx", entry);
}

function write(path, html) {
  const file = join(root, path.replace(/^\//, ""), "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

write("/protocols/conditions/", page({
  title: "Conditions We Treat | Praan Health",
  description: "Diabetes, blood pressure, chronic pain and more: find the doctor-led care plan for what you or your parents are going through.",
  path: "/protocols/conditions/",
  entry: "/src/protocols/conditions-index-main.tsx",
}));

for (const c of conditions) {
  const path = `/protocols/conditions/${c.slug}/`;
  const dates = raw.find((r) => r.fieldData.slug === c.slug) ?? {};
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: c.name,
    description: c.summary,
    url: `${SITE}${path}`,
    datePublished: dates.lastPublished ?? undefined,
    dateModified: dates.lastUpdated ?? undefined,
    about: { "@type": "MedicalCondition", name: c.name, description: c.summary },
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: c.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: plainText(f.answer) } })),
    },
    provider: { "@type": "MedicalOrganization", name: "Praan Health", url: SITE },
  };
  write(path, page({
    title: `${c.name} | Praan Health`,
    description: c.summary,
    path,
    entry: "/src/protocols/condition-main.tsx",
    rootAttrs: ` data-condition="${c.slug}"`,
    jsonLd,
  }));
}
console.log(`Wrote ${conditions.length + 1} pages`);
