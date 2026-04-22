import type { Metadata } from 'next'
import Link from 'next/link'
import { NexuzPageShell, NexuzBreadcrumb, NexuzPanel } from '@/components/nexuz/nexuz-page-shell'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

const sections = [
  {
    id: 'summary',
    title: '1. Summary',
    body: `This policy explains what ${SITE_CONFIG.name} may collect, why we use it, and the choices you have. It is written to match how the product actually works: public profiles, bookmark collections, and account features that help you sign in and save your work.`,
  },
  {
    id: 'data',
    title: '2. Data we process',
    body: 'When you create an account, we typically process your name, email, and any profile fields you choose to make public. When you save a link, we process the URL, title, and any note you attach. We also process basic technical data such as device type, rough region (from IP), and diagnostic logs to keep the service secure and available.',
  },
  {
    id: 'use',
    title: '3. How we use data',
    body: 'We use account data to let you sign in, recover access, and show your content to the audience you choose. We use operational data to run search, stop abuse, and fix outages. We do not sell personal information as a business model; if we work with service providers, they are bound to process data only for the services we use them for.',
  },
  {
    id: 'retention',
    title: '4. Retention',
    body: 'We keep your account and content while your account is active, and for a limited period after deletion to recover from mistakes or to meet legal needs. The exact period may depend on your plan and regional rules—when you ask to close an account, we will give you a clear timeline in the confirmation email.',
  },
  {
    id: 'rights',
    title: '5. Your rights',
    body: 'Where applicable, you can ask to access, correct, or delete personal data, or to export a machine-readable copy. You can also object to certain processing or request restriction. Contact us through the details on the site and we will respond within the time required by the laws that apply to you.',
  },
  {
    id: 'children',
    title: '6. Children',
    body: 'The product is not directed to children under the age where parental consent is required in your region. We do not knowingly collect personal information from such children. If you believe a child has created an account, let us know so we can take appropriate action.',
  },
  {
    id: 'contact',
    title: '7. How to reach us',
    body: 'For anything privacy related, the fastest path is a message from your signed-in account through the help or contact form. This ties your request to a record we can act on. If you are not a user, still write from an email you control so we can verify and reply securely.',
  },
] as const

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/privacy',
    title: `Privacy — ${SITE_CONFIG.name}`,
    description: `Read how ${SITE_CONFIG.name} handles public profiles, bookmarking activity, and account data.`,
  })
}

export default function PrivacyPage() {
  return (
    <NexuzPageShell
      eyebrow="Legal"
      title="Privacy"
      description="A plain-English view of our privacy practices. For contractual terms, you may have a separate data processing addendum with your organization—this page is a general product statement, not a substitute for legal review."
    >
      <NexuzBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy' }]} />
      <NexuzPanel className="mb-8" variant="soft">
        <p className="text-sm text-[#3d5a50]">
          <span className="font-bold text-[#1a2825]">Last updated: April 22, 2026</span> — we revise this when features or the law change. The date always appears at the top; minor wording edits may not reset the year if the substance is unchanged.
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
          If you are visiting from a corporate network, your employer may have additional security tools in front of this site. We only control the application itself—if something looks unexpected, your IT team may be able to explain a proxy in the path. Questions?{' '}
          <Link className="font-bold text-[#1a2825] underline" href="/contact">Contact the team</Link>
          .
        </p>
      </NexuzPanel>
    </NexuzPageShell>
  )
}
