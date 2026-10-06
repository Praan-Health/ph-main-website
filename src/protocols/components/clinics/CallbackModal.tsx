"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { callback } from "@/content/clinics";
import { CallbackForm } from "./CallbackForm";

/** The live popup fades in over 250ms when opened from a button and fades out over 250ms on close. */
const FADE_MS = 250;
/** Live: an inline script opens the hero's popup 2s after the window "load" event. */
const AUTO_OPEN_DELAY_MS = 2000;

type Phase = "closed" | "opening" | "open" | "closing";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * "Request a Callback" button plus its modal (Finsweet modal `fs_modal-1_*` on the Webflow site).
 * Opens from the button; `autoOpen` also opens it 2s after page load, as the live page does for the
 * hero instance. Escape, the backdrop and the close button all close it.
 */
export function CallbackModal({
  variant = "primary",
  buttonClassName,
  autoOpen = false,
}: {
  variant?: "primary" | "secondary";
  buttonClassName?: string;
  autoOpen?: boolean;
}) {
  const headingId = useId();
  const [phase, setPhase] = useState<Phase>("closed");
  const phaseRef = useRef<Phase>("closed");
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);
  // Remount the form on every open so a previous success/error state doesn't linger.
  const [formKey, setFormKey] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const open = useCallback((instant: boolean, returnFocusTo: HTMLElement | null) => {
    clearTimeout(timer.current);
    returnFocusRef.current = returnFocusTo;
    setFormKey((k) => k + 1);
    if (instant) {
      setPhase("open");
    } else {
      setPhase("opening");
      // Next frame: flip to opacity 1 so the transition runs.
      requestAnimationFrame(() => requestAnimationFrame(() => setPhase((p) => (p === "opening" ? "open" : p))));
    }
  }, []);

  const close = useCallback(() => {
    setPhase((p) => (p === "closed" || p === "closing" ? p : "closing"));
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setPhase("closed"), FADE_MS);
    const target = returnFocusRef.current;
    if (target && document.contains(target)) target.focus({ preventScroll: true });
  }, []);

  // Auto-open after load (inline script on the live page), without a fade.
  useEffect(() => {
    if (!autoOpen) return;
    let t: ReturnType<typeof setTimeout>;
    // The homepage's "Request Callback" links here with ?callback=1 and expects the form straight away.
    const delay = new URLSearchParams(window.location.search).has("callback") ? 0 : AUTO_OPEN_DELAY_MS;
    const schedule = () => {
      t = setTimeout(() => {
        if (phaseRef.current !== "closed") return;
        returnFocusRef.current = null;
        setFormKey((k) => k + 1);
        setPhase("open");
      }, delay);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("load", schedule);
    };
  }, [autoOpen]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const visible = phase !== "closed";

  // Focus the first field when the dialog opens (as the live page does); keep Tab inside the dialog.
  useEffect(() => {
    if (phase !== "open" && phase !== "opening") return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.contains(document.activeElement)) firstFieldRef.current?.focus({ preventScroll: true });

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [phase, close]);

  return (
    <div className="block">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={visible}
        onClick={() => open(false, triggerRef.current)}
        className={buttonClasses(variant, cn("whitespace-nowrap max-xs:w-full", buttonClassName))}
      >
        {callback.button}
      </button>
      {visible &&
        createPortal(
          <div
            data-callback-modal=""
            className={cn(
              "fixed inset-0 z-[9999] flex overflow-y-auto bg-black/50 px-6 text-center transition-opacity ease-linear sm:px-8",
              phase === "open" ? "opacity-100" : "opacity-0",
            )}
            style={{ transitionDuration: `${FADE_MS}ms` }}
          >
            <div aria-hidden="true" className="absolute inset-0" onClick={close} />
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={headingId}
              className="relative z-[999] m-auto block w-full max-w-[35rem] rounded-lg bg-white p-6 text-black xs:rounded-[1.5rem]"
            >
              <div className="mb-(--spacing-margin) flex w-full flex-col gap-4 text-left">
                <h2 id={headingId} className="text-(length:--text-fluid-h4) leading-[1.2] font-medium tracking-normal text-balance">
                  {callback.heading}
                </h2>
                <p className="m-0 text-base leading-[1.5] text-slate-600">{callback.intro}</p>
              </div>
              <CallbackForm key={formKey} firstFieldRef={firstFieldRef} />
              <button
                type="button"
                aria-label="Close modal"
                onClick={close}
                className="absolute top-1 right-1 block cursor-pointer p-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#333] sm:p-[0.7rem]"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="block size-4">
                  <path
                    fill="currentColor"
                    d="M14.5,12l9-9c0.7-0.7,0.7-1.8,0-2.5c-0.7-0.7-1.8-0.7-2.5,0l-9,9l-9-9c-0.7-0.7-1.8-0.7-2.5,0 c-0.7,0.7-0.7,1.8,0,2.5l9,9l-9,9c-0.7,0.7-0.7,1.8,0,2.5c0.7,0.7,1.8,0.7,2.5,0l9-9l9,9c0.7,0.7,1.8,0.7,2.5,0 c0.7-0.7,0.7-1.8,0-2.5L14.5,12z"
                  />
                </svg>
              </button>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
