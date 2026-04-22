import type { Metadata } from 'next'
import Link from 'next/link'
import { NexuzPageShell, NexuzBreadcrumb, NexuzPanel } from '@/components/nexuz/nexuz-page-shell'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

const sections = [
  {
    id: 'what',
    title: '1. What is a cookie?',
    body: 'A cookie is a small file stored in your browser that helps a site remember something between visits—often a session, a setting, or an anonymous ID for analytics. Similar technologies (like local storage) can be used the same way for in-browser apps.',
  },
  {
    id: 'essential',
    title: '2. Essential storage',
    body: 'We use essential cookies and local storage to keep you signed in, to protect the service from abuse, and to remember that you have accepted a banner or a preference. Without these, core flows such as sign-in, saving a shelf, and loading your own profile do not work reliably.',
  },
  {
    id: 'preferences',
    title: '3. Preferences and UI state',
    body: 'We may store lightweight non-sensitive preferences—such as a collapsed section, a theme choice if offered, or the last search you ran—so the interface feels familiar. You can clear these by clearing site data in your browser settings; some preferences will reset the next time you use the app.',
  },
  {
    id: 'analytics',
    title: '4. Performance and product analytics',
    body: 'We may use analytics to understand which pages are slow, which flows drop off, and which features are adopted. We aim to use aggregated, privacy-preserving data where we can, and to avoid building cross-site profiles that follow you around the open web. Details depend on your environment and the analytics provider your deployment has enabled.',
  },
  {
    id: 'third',
    title: '5. Third-party content',
    body: 'When a profile or shelf includes an embed or a preview of an external page, the third party may set its own cookies. We do not control those. Your browser and privacy tools do.',
  },
  {
    id: 'choices',
    title: '6. Your choices',
    body: 'You can use browser settings to block or clear cookies, use private mode for one-off sessions, and install block list tools for trackers. If you block essential cookies, parts of the product that depend on a session or CSRF token may not function until you allow them for this origin.',
  },
] as const

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/cookies',
    title: `Cookie policy — ${SITE_CONFIG.name}`,
    description: `How ${SITE_CONFIG.name} uses cookies and local storage for sign-in, preferences, and basic analytics.`,
  })
}

export default function CookiesPage() {
  return (
    <NexuzPageShell
      eyebrow="Legal"
      title="Cookie policy"
      description="Short and practical: what we store in the browser, why, and what you can control. Pair this with the privacy page for a full picture of data handling."
    >
      <NexuzBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Cookies' }]} />
      <NexuzPanel className="mb-8" variant="soft">
        <p className="text-sm text-[#3d5a50]">
          <span className="font-bold text-[#1a2825]">Last updated: April 22, 2026</span> — the technology list under the hood can change; the principles above stay the same: minimal storage, clear purpose, and your control in the browser.
        </p>
      </NexuzPanel>
      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <nav className="hidden h-fit space-y-1.5 rounded-2xl border border-[#c8e8dc] bg-[#f3faf7] p-3 text-sm lg:sticky lg:top-24 lg:block">
          <p className="px-1 pb-2 text-xs font-bold uppercase text-[#5a7a6f]">On this page</p>
          {sections.map((s) => (
            <a key={s.id} className="block rounded-lg px-2 py-1.5 text-[#1a2825] hover:bg-white" href={`#${s.id}`}>
              {s.title}
            </a>
          ))}
        </nav>
        <div className="min-w-0 space-y-6">
          {sections.map((s) => (
            <NexuzPanel id={s.id} key={s.id} className="scroll-mt-24">
              <h2 className="text-lg font-bold text-[#122520]">{s.title}</h2>
              <p className="mt-2 text-sm leading-7 text-[#3d5a50]">{s.body}</p>
            </NexuzPanel>
          ))}
        </div>
      </div>
      <NexuzPanel variant="quote" className="mt-8 !py-4">
        <p className="text-sm text-[#2d3250]">
          Looking for a quick reset? Browsers such as Chrome, Edge, and Firefox all support &ldquo;delete data for this site&rdquo; in their privacy or storage UI. You can also reach out via{' '}
          <Link className="font-bold text-[#1a2825] underline" href="/help">Help</Link> for step-by-step screenshots.
        </p>
      </NexuzPanel>
    </NexuzPageShell>
  )
}
