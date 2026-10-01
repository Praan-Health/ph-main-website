"use client";

import { useEffect, useId } from "react";

type CalApi = ((...args: unknown[]) => void) & { loaded?: boolean; ns: Record<string, CalApi>; q: unknown[] };
declare global {
  interface Window {
    Cal?: CalApi;
  }
}

/** Cal.id's embed bootstrap (verbatim from the live page's "Cal inline embed code"), typed. */
function bootCal(w: Window, src: string): CalApi {
  if (w.Cal) return w.Cal;
  const push = (api: CalApi, args: unknown) => api.q.push(args);
  const cal = function (...args: unknown[]) {
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      document.head.appendChild(document.createElement("script")).src = src;
      cal.loaded = true;
    }
    if (args[0] === "init") {
      const api = function (...a: unknown[]) {
        push(api, a);
      } as CalApi;
      const namespace = args[1];
      api.q = api.q || [];
      if (typeof namespace === "string") {
        cal.ns[namespace] = cal.ns[namespace] || api;
        push(cal.ns[namespace], args);
        push(cal, ["initNamespace", namespace]);
      } else push(cal, args);
      return;
    }
    push(cal, args);
  } as CalApi;
  cal.q = [];
  cal.ns = {};
  w.Cal = cal;
  return cal;
}

/** Inline Cal.id booking calendar ("Find your plan"), configured exactly as on the live site. */
export function CalEmbed({ calLink }: { calLink: string }) {
  const id = `cal-inline-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  useEffect(() => {
    const el = document.getElementById(id);
    if (!el || el.dataset.calBooted) return; // already embedded (React strict-mode re-run)
    el.dataset.calBooted = "true";
    const Cal = bootCal(window, "https://cal.id/embed-link/embed.js");
    if (!Cal.ns.default) Cal("init", "default", { origin: "https://cal.id" });
    Cal.ns.default("inline", { elementOrSelector: `#${id}`, config: { layout: "month_view" }, calLink });
    Cal.ns.default("ui", {
      theme: "light",
      cssVarsPerTheme: { light: { "cal-brand": "#F26B49" }, dark: { "cal-brand": "#EB7956" } },
      hideEventTypeDetails: true,
      layout: "month_view",
    });
  }, [id, calLink]);

  return <div id={id} className="h-full w-full overflow-scroll" />;
}
