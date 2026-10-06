// Any "Request Callback" button on the homepage asks the one modal (CallbackModal) to open.
const OPEN_EVENT = 'praan:open-callback'

export function openCallback(): void {
  window.dispatchEvent(new Event(OPEN_EVENT))
}

export function onOpenCallback(handler: () => void): () => void {
  window.addEventListener(OPEN_EVENT, handler)
  return () => window.removeEventListener(OPEN_EVENT, handler)
}
