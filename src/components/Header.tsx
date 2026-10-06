import { useEffect, useState } from 'react'
import { NAV_LINKS } from '../content/site'
import type { NavLink } from '../content/site'
import { asset } from '../lib/asset'

function NavAnchor({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  return (
    <a
      href={link.href}
      onClick={onNavigate}
      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {link.label}
      {link.tag && <span className="nav__tag">{link.tag}</span>}
    </a>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Transparent over the hero photo; frosted white once the page moves.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled || open ? 'is-solid' : ''}`}>
      <div className="container header__bar">
        <a href="#top" className="header__logo" aria-label="Praan Health home">
          <img src={asset('/assets/logo.svg')} alt="Praan Health" width="98" height="36" />
        </a>
        <nav className={`nav ${open ? 'is-open' : ''}`} aria-label="Primary">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.label} className="nav__group">
                <a href={link.href} className="nav__parent" onClick={() => setOpen(false)}>
                  {link.label}
                  <svg className="nav__caret" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
                    <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <div className="nav__menu">
                  {link.children.map((child) => (
                    <NavAnchor key={child.label} link={child} onNavigate={() => setOpen(false)} />
                  ))}
                </div>
              </div>
            ) : (
              <NavAnchor key={link.label} link={link} onNavigate={() => setOpen(false)} />
            ),
          )}
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
