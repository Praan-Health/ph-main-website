import { describe, expect, it } from "vitest";
import { buildLeadParams, knownConditionFor, phoneProblem, toE164India } from "./lead";

describe("toE164India", () => {
  it.each([
    ["98450 12345", "+919845012345"],
    ["9845012345", "+919845012345"],
    ["+91 98450-12345", "+919845012345"],
    ["919845012345", "+919845012345"],
    ["09845012345", "+919845012345"],
  ])("normalises %s", (input, expected) => expect(toE164India(input)).toBe(expected));

  it.each(["", "12345", "5845012345", "98450123456", "+1 415 555 0100", "abcdefghij"])("rejects %s", (input) =>
    expect(toE164India(input)).toBeNull(),
  );
});

describe("phoneProblem", () => {
  it("is null for a valid number and a message otherwise", () => {
    expect(phoneProblem("98450 12345")).toBeNull();
    expect(phoneProblem("12345")).toMatch(/10-digit/);
  });
});

describe("knownConditionFor", () => {
  it("maps the pain site to a LeadSquared label", () => {
    expect(knownConditionFor("knee")).toBe("Joint Pain / Arthritis");
    expect(knownConditionFor("shoulder")).toBe("Joint Pain / Arthritis");
    expect(knownConditionFor("back")).toBe("Spine / Mobility");
    expect(knownConditionFor("neck")).toBe("Spine / Mobility");
    expect(knownConditionFor("other")).toBe("Other");
    expect(knownConditionFor("")).toBe("");
  });
});

const env = {
  href: "https://praan.health/clinics/?utm_source=google",
  pathname: "/clinics/",
  referrer: "https://www.google.com/",
  userAgent: "UA/1.0",
  now: "2026-10-16T10:00:00.000Z",
  eventId: "0b7e1f3e-1111-4222-8333-444455556666",
};
const attribution = { utm_source: "google", utm_medium: "cpc", gclid: "G1", fbp: "fb.1.1.2", fbc: "" };
const callback = {
  formName: "Contact Form",
  fields: { "First Name": "Asha", "Last Name": "Rao", "Phone Number": "98450 12345", "Site of Pain": "knee", "Intensity of Pain": "moderate" },
};

describe("buildLeadParams", () => {
  it("uses the webhook's field names and values", () => {
    const params = buildLeadParams({ ...callback, attribution, env });
    expect(params).toMatchObject({
      firstName: "Asha",
      lastName: "Rao",
      phone: "+919845012345",
      exploringFor: "Myself",
      knownConditions: "Joint Pain / Arthritis",
      protocol: "home",
      landingPage: "/clinics/",
      event_source_url: "https://praan.health/clinics/?utm_source=google",
      referrer: "https://www.google.com/",
      submittedAt: "2026-10-16T10:00:00.000Z",
      utm_source: "google",
      utm_medium: "cpc",
      gclid: "G1",
      fbp: "fb.1.1.2",
      user_agent: "UA/1.0",
      event_id: env.eventId,
    });
    expect(params.conditionDescription).toBe("Site of pain: knee. Intensity of pain: moderate.");
  });

  it("leaves out empty values", () => {
    const params = buildLeadParams({ ...callback, attribution, env });
    expect("fbc" in params).toBe(false);
    expect("email" in params).toBe(false);
    expect("utm_campaign" in params).toBe(false);
    expect(Object.values(params).every((v) => v !== "")).toBe(true);
  });

  it("reads the Contact page spelling of phone and lowercases email", () => {
    const params = buildLeadParams({ formName: "Contact Form", fields: { "First Name": "Asha", "Last Name": "Rao", Email: "A@B.co", Phone: "+91 98450 12345" }, attribution: {}, env });
    expect(params.phone).toBe("+919845012345");
    expect(params.email).toBe("a@b.co");
    expect("knownConditions" in params).toBe(false);
    expect(params.exploringFor).toBe("Myself");
  });

  it("does not send a route-key-like source or the page's own source param", () => {
    const params = buildLeadParams({ ...callback, fields: { ...callback.fields, source: "everyday", ref: "x", campaign: "y" }, attribution, env });
    expect("source" in params).toBe(false);
    expect("ref" in params).toBe(false);
    expect("campaign" in params).toBe(false);
  });
});
