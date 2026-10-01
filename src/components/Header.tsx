import { useState } from 'react'
import { NAV_LINKS } from '../content/site'
import { asset } from '../lib/asset'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <div className="container header__bar">
        <a href="#top" className="header__logo" aria-label="Praan Health home">
          <img src={asset('/assets/logo.svg')} alt="Praan Health" width="98" height="36" />
        </a>
        <nav className={`nav ${open ? 'is-open' : ''}`} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              {...('external' in link ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.label}
              {'tag' in link && <span className="nav__tag">{link.tag}</span>}
            </a>
          ))}
        </nav>
        <button
          className="header__toggle"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
