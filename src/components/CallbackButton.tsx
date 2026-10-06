import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { openCallback } from '../lib/callback'

type Variant = 'primary' | 'secondary' | 'inverse' | 'ghost'

interface CallbackButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type'> {
  variant?: Variant
  children?: ReactNode
}

/** Looks like a Button but opens the callback modal on this page instead of navigating. */
export function CallbackButton({ variant = 'primary', className = '', children = 'Request Callback', ...rest }: CallbackButtonProps) {
  return (
    <button type="button" className={`btn btn--${variant} ${className}`.trim()} onClick={openCallback} {...rest}>
      {children}
    </button>
  )
}
