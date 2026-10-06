import { FOOTER_CONTACT, FOOTER_QUICK_LINKS, FOOTER_SERVICES, SOCIAL_LINKS } from '../content/site'
import { InstagramIcon, LinkedInIcon, YouTubeIcon } from '../protocols/components/ui/footer-icons'
import { MailIcon } from '../protocols/components/ui/footer-icons'
import { WhatsAppIcon } from './icons'
import { asset } from '../lib/asset'

const SOCIAL_ICONS = { linkedin: LinkedInIcon, instagram: InstagramIcon, youtube: YouTubeIcon } as const

const EXTERNAL = { target: '_blank', rel: 'noopener noreferrer' } as const

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src={asset('/assets/logo-white.svg')} alt="Praan Health" width="130" height="48" />
          <p>Non-surgical, doctor-led care for chronic pain.</p>
          <ul className="footer__social" aria-label="Praan Health on social media">
            {SOCIAL_LINKS.map((link) => {
              const Icon = SOCIAL_ICONS[link.network]
              return (
                <li key={link.network}>
                  <a href={link.href} {...EXTERNAL} aria-label={link.label}>
                    <Icon width={40} height={40} />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <nav className="footer__col" aria-labelledby="footer-services">
          <h3 id="footer-services" className="footer__heading">Services</h3>
          <ul className="footer__list">
            {FOOTER_SERVICES.map((link) => (
              <li key={link.label}>
                <a href={link.href} {...('external' in link ? EXTERNAL : {})}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__col" aria-labelledby="footer-quick">
          <h3 id="footer-quick" className="footer__heading">Quick Links</h3>
          <ul className="footer__list">
            {FOOTER_QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col footer__col--contact">
          <h3 className="footer__heading">Contact Us</h3>
          <ul className="footer__contact">
            {FOOTER_CONTACT.map((item) => (
              <li key={item.kind}>
                <a href={item.href} {...EXTERNAL}>
                  <span className={`footer__contact-icon footer__contact-icon--${item.kind}`}>
                    {item.kind === 'whatsapp' ? <WhatsAppIcon size={19.5} /> : <MailIcon width={24} height={24} />}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container footer__legal">© {new Date().getFullYear()} Praan Health. All rights reserved.</div>
    </footer>
  )
}
