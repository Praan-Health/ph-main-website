import { useState } from 'react'
import { CAL_URL, HEADER_LINKS } from '../content/site'
import { Button } from './Button'
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
          {HEADER_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
              {'tag' in link && <span className="nav__tag">{link.tag}</span>}
            </a>
          ))}
          <Button href={CAL_URL} className="nav__cta">
            Talk to an advisor
          </Button>
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
