/** Where a submission can additionally be relayed (see src/app/api/forms/route.ts). */
export type ForwardTarget = "lp-lsq";

type Submission = {
  formName: string;
  fields: Record<string, string>;
  /** Optional relay to a lead pipeline, in that pipeline's own payload shape. */
  forward?: { target: ForwardTarget; payload: Record<string, string> };
};

/** Client helper for site forms. Returns true when the submission was stored. */
export async function submitForm({ formName, fields, forward }: Submission): Promise<boolean> {
  try {
    const res = await fetch("/api/forms", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ formName, fields, forward, pagePath: window.location.pathname, pageUrl: window.location.href }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
