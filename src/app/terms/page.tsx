import type { Metadata } from 'next'
import Link from 'next/link'
import { NexuzPageShell, NexuzBreadcrumb, NexuzPanel } from '@/components/nexuz/nexuz-page-shell'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

const sections = [
  {
    id: 'agreement',
    title: '1. Agreement to these terms',
    body: `By using ${SITE_CONFIG.name} you agree to these terms and to any policies linked here (for example, privacy and cookies). If you use the product on behalf of an organization, you confirm that you have authority to bind that organization. If you do not agree, do not use the service.`,
  },
  {
    id: 'accounts',
    title: '2. Accounts and security',
    body: 'You are responsible for activity on your account. Keep your credentials secret, use a strong unique password, and let us know immediately if you suspect someone else can access your profile, shelves, or sign-in. We may require additional verification in higher-risk cases.',
  },
  {
    id: 'content',
    title: '3. Your content and license to us',
    body: 'You own what you create, including text, links, and public profile information. You grant us a non-exclusive, worldwide, royalty-free license to host, display, and share your content in order to run the product—e.g. rendering a profile, indexing search, or generating a preview. You are responsible for ensuring you have the rights to share the links and materials you publish.',
  },
  {
    id: 'conduct',
    title: '4. Acceptable use',
    body: 'You may not use the service to distribute malware, to harass or impersonate others, to break the law, to scrape at a rate that harms availability, or to attempt to gain unauthorized access. We may remove content, suspend features, or close an account in serious or repeated cases, with a notice that matches the risk unless law or safety says otherwise.',
  },
  {
    id: 'third',
    title: '5. Third-party sites and links',
    body: 'Shelves and profiles often point to the wider web. We are not responsible for the practices of third-party sites, even when they appear in a post or a preview card. You follow those links at your own discretion.',
  },
  {
    id: 'disclaimer',
    title: '6. Service availability and disclaimers',
    body: 'The service is provided "as is" to the maximum extent allowed by law. We aim for high reliability but do not guarantee that the product will be uninterrupted or free of defects. In jurisdictions that do not allow certain warranty exclusions, your rights may be broader; nothing here limits non-waivable consumer protections.',
  },
  {
    id: 'liability',
    title: '7. Limitation of liability',
    body: 'To the maximum extent allowed by law, we are not liable for indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, data, or goodwill. Our aggregate liability for a claim is generally limited to the fees you have paid to us in the 12 months before the event, or a modest default cap where no fee applies, unless a higher minimum applies in your jurisdiction.',
  },
  {
    id: 'changes',
    title: '8. Changes to these terms',
    body: 'We may change these terms when we launch new product areas or to reflect legal or policy updates. We will post the new version here with an updated "last updated" line. In some cases we may also email you. Continued use after the effective date is treated as acceptance of the new terms, except where your law requires a different process for material changes.',
  },
] as const

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/terms',
    title: `Terms of service — ${SITE_CONFIG.name}`,
    description: `Rules for using public profiles, bookmarking, and the ${SITE_CONFIG.name} platform.`,
  })
}

export default function TermsPage() {
  return (
    <NexuzPageShell
      eyebrow="Legal"
      title="Terms of service"
      description={`The agreement between you and ${SITE_CONFIG.name} when you browse, post a profile, or build bookmark shelves. Read alongside the privacy and cookie pages.`}
    >
      <NexuzBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Terms' }]} />
      <NexuzPanel className="mb-8" variant="soft">
        <p className="text-sm text-[#3d5a50]">
          <span className="font-bold text-[#1a2825]">Last updated: April 22, 2026</span> — If you are signing an enterprise order form, the order may include additional or overriding terms. This page applies to the general public product.
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
          Questions about a specific line? <Link className="font-bold text-[#1a2825] underline" href="/contact">Send a message</Link> and reference the section number. We are not a law firm; for binding advice, involve your own counsel.
        </p>
      </NexuzPanel>
    </NexuzPageShell>
  )
}
