import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'

const social = [
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
] as const

const columns = {
  product: {
    title: 'Product',
    items: [
      { name: 'Public profiles', href: '/profile' },
      { name: 'Social bookmarking', href: '/sbm' },
      { name: 'Search', href: '/search' },
    ],
  },
  company: {
    title: 'Company',
    items: [
      { name: 'About', href: '/about' },
      { name: 'Team', href: '/team' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  help: {
    title: 'Support',
    items: [
      { name: 'Help', href: '/help' },
      { name: 'Status', href: '/status' },
      { name: 'Developers', href: '/developers' },
    ],
  },
} as const

export const FOOTER_OVERRIDE_ENABLED = true

export function FooterOverride() {
  return (
    <footer className="bg-[#1a3531] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1.6fr] lg:grid-cols-[1.1fr_1.4fr]">
          <div>
            <div className="inline-flex items-center gap-2.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/10">
                <img
                  src="/favicon.png?v=20260422"
                  alt=""
                  className="h-full w-full origin-center scale-[1.38] object-contain object-center"
                  width="44"
                  height="44"
                />
              </div>
              <div>
                <p className="text-lg font-semibold">{SITE_CONFIG.name}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">{siteContent.footer.tagline}</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/75">
              {SITE_CONFIG.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {social.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                  <span className="sr-only">{s.name}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {(Object.values(columns) as { title: string; items: { name: string; href: string }[] }[]).map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7eb8a4]">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-white/85">
                  {col.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="hover:text-white hover:underline">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 border-t border-white/15 pt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-white/55">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-white/70">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/cookies" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
