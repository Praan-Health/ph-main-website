/// <reference types="node" />
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { conditions, getCondition } from "./conditions";

describe("conditions content", () => {
  it("has 16 conditions with unique slugs", () => {
    expect(conditions).toHaveLength(16);
    expect(new Set(conditions.map((c) => c.slug)).size).toBe(16);
  });

  it("finds a condition by slug and returns undefined for unknown ones", () => {
    expect(getCondition("diabetes")?.name).toBe("Diabetes");
    expect(getCondition("nope")).toBeUndefined();
  });

  it("has a generated page for every condition", () => {
    for (const { slug } of conditions) {
      expect(existsSync(`protocols/conditions/${slug}/index.html`), slug).toBe(true);
    }
  });

  it("only references images that exist in public/", () => {
    const srcs = [...JSON.stringify(conditions).matchAll(/"src":"(\/images\/[^"]+)"/g)].map((m) => m[1]);
    expect(srcs.length).toBeGreaterThan(0);
    for (const src of srcs) expect(existsSync(`public${src}`), src).toBe(true);
  });

  it("lists every condition page in the sitemap", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf8");
    expect(sitemap).toContain("https://praan.health/protocols/conditions/</loc>");
    for (const { slug } of conditions) expect(sitemap).toContain(`/protocols/conditions/${slug}/</loc>`);
  });
});
