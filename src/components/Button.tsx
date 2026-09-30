import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'inverse' | 'ghost'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  variant?: Variant
  children: ReactNode
}

export function Button({ href, variant = 'primary', children, className = '', ...rest }: ButtonProps) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      className={`btn btn--${variant} ${className}`.trim()}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  )
}
