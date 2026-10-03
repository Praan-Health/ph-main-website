/**
 * The legal copy was exported as one long line of text broken only by <br> tags, with "- " bullets and bold
 * lead-ins standing in for structure. This rebuilds that structure: headings, paragraphs and bullet lists.
 */
export function formatLegalHtml(source: string): string {
  const html = source
    .replace(/\u200d/g, "")
    // Headings were bolded across line breaks: <strong>Title<br>Sub<br>- </strong>body.
    .replace(/<strong>([^<]*(?:<br>[^<]*)+)<\/strong>/g, (_, inner: string) => {
      const parts = inner.split("<br>").map((part) => part.trim());
      const bullet = parts[parts.length - 1] === "-" ? "<br>- " : "";
      const titles = parts.filter((part) => part && part !== "-");
      return `<br><br>${titles.map(heading).join("")}${bullet}`;
    })
    // Numbered section titles that close on the same line: <strong>3. Eligibility</strong>.
    .replace(/<strong>(\d+\.\s[^<]*?)<\/strong>/g, (_, title: string) => heading(title))
    // Bullets whose dash sits outside the bold lead-in: -<strong> Lead</strong>.
    .replace(/(^|<br>|<\/h[23]>)-\s*<strong>\s*<\/strong>/g, "$1- ")
    .replace(/(^|<br>|<\/h[23]>)-<strong>\s*/g, "$1- <strong>");

  const blocks: string[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) blocks.push(`<p>${paragraph.join("<br>")}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (list.length) blocks.push(`<ul>${list.map((item) => `<li>${item}</li>`).join("")}</ul>`);
    list = [];
  };

  // Put headings on their own line so the split below treats them as separate blocks.
  const lines = html.replace(/(<h[23]>.*?<\/h[23]>)/g, "<br><br>$1<br><br>").split("<br>");

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushParagraph();
      flushList();
    } else if (/^<h[23]>/.test(line)) {
      flushParagraph();
      flushList();
      blocks.push(line);
    } else if (line.startsWith("- ")) {
      flushParagraph();
      list.push(line.slice(2));
    } else {
      flushList();
      paragraph.push(line);
    }
  }
  flushParagraph();
  flushList();
  return blocks.join("");
}

function heading(title: string): string {
  const text = title.trim();
  const tag = /^\d+\./.test(text) ? "h2" : "h3";
  return `<${tag}>${text}</${tag}>`;
}
