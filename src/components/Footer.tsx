import { CAL_URL, NAV_LINKS } from '../content/site'
import { Button } from './Button'
import { asset } from '../lib/asset'

export function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src={asset('/assets/logo-white.svg')} alt="Praan Health" width="130" height="48" />
          <p>Chronic care for ageing parents — even from far away.</p>
          <Button href={CAL_URL} variant="inverse">
            Book Free Consultation
          </Button>
        </div>
        <nav className="footer__links" aria-label="Footer">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} {...('external' in link ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              {link.label}
            </a>
          ))}
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </nav>
      </div>
      <div className="container footer__legal">© {new Date().getFullYear()} Praan Health. All rights reserved.</div>
    </footer>
  )
}
