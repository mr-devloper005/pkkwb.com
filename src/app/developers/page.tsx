import type { Metadata } from 'next'
import Link from 'next/link'
import { Code2, Key, Webhook, Zap } from 'lucide-react'
import { NexuzPageShell, NexuzPanel, NexuzBreadcrumb } from '@/components/nexuz/nexuz-page-shell'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')

const endpoints = [
  { method: 'GET', path: '/api/seo/link-health', note: 'Lightweight head checks for public URLs in your posts (read-only, rate limited).' },
  { method: 'GET', path: '/sitemap.xml', note: 'Machine-readable list of public routes. Same shape you would expect for search engine discovery.' },
] as const

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/developers',
    title: `Developers — ${SITE_CONFIG.name}`,
    description: `Integration notes, public endpoints, and bookmarking best practices for teams extending ${SITE_CONFIG.name}.`,
  })
}

export default function DevelopersPage() {
  return (
    <NexuzPageShell
      eyebrow="Platform"
      title="Build on top of calm profiles and structured shelves"
      description="This area documents what you can rely on when you connect your own tools. We keep the service small on purpose, so the contract surface is easy to reason about."
    >
      <NexuzBreadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'Developers' }]}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {[
          { icon: Code2, t: 'Read-first', b: 'We favour stable GET endpoints and clear cache headers. Breaking changes are announced on the status page with a date.' },
          { icon: Key, t: 'Auth you control', b: 'When your deployment adds API keys or JWT, they are scoped to the workspace that issued them. Never share keys in client-side code.' },
          { icon: Zap, t: 'Shelves as lists', b: 'Bookmarks export conceptually as ordered arrays: title, URL, optional note, and tags. If you can model JSON, you can model a shelf.' },
        ].map((c) => (
          <NexuzPanel key={c.t} variant="soft" className="!p-5">
            <c.icon className="h-5 w-5 text-[#1a3531]" />
            <h2 className="mt-2 text-sm font-bold uppercase text-[#1a3531]">{c.t}</h2>
            <p className="mt-1 text-sm leading-6 text-[#3d5a50]">{c.b}</p>
          </NexuzPanel>
        ))}
      </div>

      <NexuzPanel className="mt-6">
        <h2 className="text-xl font-bold text-[#122520]">Documented public endpoints (snapshot)</h2>
        <p className="mt-1 text-sm text-[#3d5a50]">All paths are relative to your project origin. The following table is a marketing snapshot—treat the running deployment as the source of truth.</p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e0ebe6]">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <thead className="border-b border-[#e8f2ed] bg-[#f3faf7] text-xs font-bold uppercase text-[#5a7a6f]">
              <tr>
                <th className="px-4 py-2">Method</th>
                <th className="px-4 py-2">Path</th>
                <th className="px-4 py-2">Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8f2ed] text-[#3d5a50]">
              {endpoints.map((e) => (
                <tr key={e.path}>
                  <td className="px-4 py-3 font-mono text-xs font-bold text-[#1a2825]">{e.method}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[#1a3531]">{e.path}</td>
                  <td className="px-4 py-3 text-xs sm:text-sm">{e.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </NexuzPanel>

      <NexuzPanel className="mt-6" variant="soft">
        <div className="flex items-center gap-2 text-sm font-bold text-[#122520]">
          <Webhook className="h-4 w-4" />
          Webhooks &amp; eventing (roadmap)
        </div>
        <p className="mt-2 text-sm text-[#3d5a50]">
          Many teams ask for &ldquo;something changed on this profile&rdquo; style hooks. The shape we are most likely to ship first: a signed POST to your endpoint with
          <span className="font-mono text-xs text-[#1a2825]"> {`{ "event", "objectId", "occurredAt" }`}</span>
          . If you are planning an integration, tell us in contact which events matter so we can line up a beta cohort.
        </p>
      </NexuzPanel>

      <NexuzPanel variant="quote" className="mt-6">
        <h3 className="text-sm font-bold uppercase text-[#2d3250]">Embed example</h3>
        <pre className="mt-2 overflow-x-auto rounded-xl border border-[#c4bdd8] bg-white/60 p-4 text-left text-xs leading-relaxed text-[#1a2825] sm:text-sm">
{`GET ${baseUrl}/search?q=design%20shelf
# Returns HTML with card surfaces you can also discover via
# the same public routes a browser would use. Prefer linking out
# instead of hot-linking our assets in production front-ends.`}
        </pre>
        <p className="mt-2 text-xs text-[#4a4f68]">Replace the base URL in your own deployment. Caching: respect the Cache-Control you receive; do not pin assets longer than the header suggests.</p>
      </NexuzPanel>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Button asChild className="rounded-full bg-[#1a3531] text-white">
          <Link href="/status">Status &amp; change notes</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full border-2 border-[#1a3531] bg-white">
          <Link href="/contact">Partner on an integration</Link>
        </Button>
      </div>
    </NexuzPageShell>
  )
}
