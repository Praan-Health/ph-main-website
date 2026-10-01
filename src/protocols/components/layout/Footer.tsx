import { Img } from "@/components/ui/Img";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FooterLogoLink } from "@/components/layout/FooterLogoLink";
import { InstagramIcon, LinkedInIcon, MailIcon, MapPinIcon, PhoneIcon, YouTubeIcon } from "@/components/ui/footer-icons";
import { footer, type SocialNetwork } from "@/content/site";

const SOCIAL_ICONS: Record<SocialNetwork, typeof LinkedInIcon> = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
};
const CONTACT_ICONS = { phone: PhoneIcon, email: MailIcon, location: MapPinIcon };

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-700 pt-8 text-slate-100 xs:pt-[60px] sm:pt-16">
      <Container className="z-1">
        <div className="flex w-full flex-col items-start justify-between gap-7 sm:gap-10 md:flex-row md:gap-[5.25rem]">
          <div className="flex w-full max-w-full flex-col items-start gap-7 sm:w-[73%] sm:max-w-[16.5rem] sm:gap-6 md:w-full md:gap-7">
            <FooterLogoLink>
              <Img src={footer.logo.src} alt={footer.logo.alt} width={footer.logo.width} height={footer.logo.height} className="inline-block h-auto w-full align-middle object-contain" />
            </FooterLogoLink>
            <div className="max-w-[15.94rem] xs:max-w-none">
              <p className="text-[0.88rem] text-slate-100 xs:text-base">{footer.tagline}</p>
            </div>
            <div className="hidden md:block">
              <FollowUs />
            </div>
          </div>

          <div className="flex w-full max-w-full flex-1 flex-col items-start justify-start gap-7 xs:flex-row sm:gap-[5.25rem]">
            <div className="flex w-full min-w-[10.63rem] flex-col gap-2.5 xs:w-auto xs:gap-7">
              <SectionLabel>Quick Link</SectionLabel>
              <ul className="grid w-full grid-cols-2 items-start gap-4 xs:flex xs:w-auto xs:flex-col xs:gap-[0.63rem]">
                {/* The live footer keeps three hidden links (Blog, Careers, a duplicate) as empty entries that still take a slot. */}
                <li aria-hidden="true" />
                {footer.quickLinks.map((link) => (
                  <li key={link.href} className="flex items-center justify-start">
                    <Link href={link.href} className="flex text-[1.1rem] text-[#a4a6a8] transition-all duration-200 hover:text-white">
                      <span className="text-[0.88rem] text-slate-100 xs:text-base">{link.label}</span>
                    </Link>
                  </li>
                ))}
                <li aria-hidden="true" />
                <li aria-hidden="true" />
              </ul>
            </div>

            <div className="order-first flex w-full min-w-[10.63rem] flex-col gap-7 xs:order-none">
              <SectionLabel>Contact us</SectionLabel>
              <ul className="flex w-full max-w-60 flex-col items-start justify-start gap-[0.63rem]">
                {footer.contact.map((item) => {
                  const Icon = CONTACT_ICONS[item.kind];
                  const body = (
                    <>
                      <Icon className="size-6 text-orange-500 group-hover:text-white" />
                      <span>{item.label}</span>
                    </>
                  );
                  const pill = "group flex w-full items-center justify-start gap-6 rounded-pill border border-white/10 bg-black/5 px-6 py-3 tracking-[-0.005rem] hover:bg-[#fd7217]";
                  return (
                    <li key={item.kind} className="w-full">
                      {item.href ? <a href={item.href} className={pill}>{body}</a> : <div className={pill}>{body}</div>}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-7 flex w-full flex-col items-start justify-between gap-7 pb-8 xs:gap-[15px] sm:mt-11 sm:flex-row sm:items-center sm:gap-0 sm:py-6">
          <div className="w-full xs:w-auto md:hidden">
            <FollowUs />
          </div>
          <p className="text-[0.75rem]">{footer.copyright}</p>
        </div>
      </Container>

      <div className="absolute inset-0 size-full overflow-clip bg-[color-mix(in_lab,currentcolor_10%,transparent)]">
        <Img src="/images/footer-bg.webp" alt="" fill sizes="100vw" className="object-cover" />
      </div>
    </footer>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center justify-start gap-[0.63rem] text-[0.75rem] text-linen uppercase">
      <div>{children}</div>
      <div className="h-[0.13rem] flex-1 rounded-full bg-orange-50 opacity-5" />
    </div>
  );
}

function FollowUs() {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-7 xs:w-auto">
      <SectionLabel>Follow us</SectionLabel>
      <ul className="flex flex-row gap-[15px] sm:gap-4">
        {footer.social.map(({ network, label, href }) => {
          const Icon = SOCIAL_ICONS[network];
          return (
            <li key={network}>
              <a href={href} target="_blank" rel="noopener" aria-label={label} className="relative flex size-10 flex-col items-center justify-center overflow-hidden">
                <Icon className="size-full" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
