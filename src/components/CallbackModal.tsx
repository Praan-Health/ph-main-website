import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { callback } from '../protocols/content/clinics'
import { utmFieldNames } from '../protocols/content/forms-pages'
import { submitForm } from '../protocols/lib/forms'
import { onOpenCallback } from '../lib/callback'

type Status = 'idle' | 'sending' | 'done' | 'fail'

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** Attribution fields carried on every site form, read from the page's query string. */
function readUtm(): Record<string, string> {
  const params = new URLSearchParams(window.location.search)
  return Object.fromEntries(utmFieldNames.map((name) => [name, params.get(name) ?? '']))
}

/** The "Request a Callback" popup. Mounted once; any CallbackButton opens it. */
export function CallbackModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [formKey, setFormKey] = useState(0)
  const headingId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const firstFieldRef = useRef<HTMLInputElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  const open = useCallback(() => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setStatus('idle')
    setFormKey((k) => k + 1)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    returnFocusRef.current?.focus()
  }, [])

  useEffect(() => onOpenCallback(open), [open])

  // Lock page scroll, focus the first field, close on Escape and keep Tab inside the dialog.
  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstFieldRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') return close()
      if (event.key !== 'Tab' || !dialogRef.current) return
      const items = [...dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)]
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, close])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return
    const data = new FormData(event.currentTarget)
    const value = (name: string) => String(data.get(name) ?? '').trim()
    setStatus('sending')
    const ok = await submitForm({
      formName: callback.formName,
      fields: {
        ...readUtm(),
        'First Name': value('First-Name'),
        'Last Name': value('Last-Name'),
        'Phone Number': value('Phone-Number'),
        'Site of Pain': value('Site-of-Pain'),
        'Intensity of Pain': value('Intensity-of-Pain'),
      },
    })
    setStatus(ok ? 'done' : 'fail')
  }

  if (!isOpen) return null

  return createPortal(
    <div className="modal" onMouseDown={(event) => event.target === event.currentTarget && close()}>
      <div ref={dialogRef} className="modal__panel" role="dialog" aria-modal="true" aria-labelledby={headingId}>
        <button type="button" className="modal__close" aria-label="Close" onClick={close}>
          ×
        </button>
        <h2 id={headingId} className="modal__title">
          {callback.heading}
        </h2>

        {status === 'done' ? (
          <p className="modal__done" role="status">
            {callback.success}
          </p>
        ) : (
          <>
            <p className="modal__intro">{callback.intro}</p>
            <form key={formKey} className="modal__form" onSubmit={onSubmit} aria-label={callback.formName}>
              <label className="field">
                <span>First name</span>
                <input ref={firstFieldRef} name="First-Name" type="text" autoComplete="given-name" maxLength={256} required />
              </label>
              <label className="field">
                <span>Last name</span>
                <input name="Last-Name" type="text" autoComplete="family-name" maxLength={256} required />
              </label>
              <label className="field">
                <span>Phone number</span>
                <input name="Phone-Number" type="tel" autoComplete="tel" placeholder="Enter your phone number" maxLength={256} required />
              </label>
              <label className="field">
                <span>Site of pain</span>
                <select name="Site-of-Pain" defaultValue="">
                  <option value="">Select one...</option>
                  {callback.siteOfPain.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Intensity of pain</span>
                <select name="Intensity-of-Pain" defaultValue="" required>
                  <option value="">Select one...</option>
                  {callback.intensity.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit" className="btn btn--primary modal__submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Submit'}
              </button>
              {status === 'fail' && (
                <p className="modal__error" role="alert">
                  {callback.error}
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  )
}
