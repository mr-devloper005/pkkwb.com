import type { Metadata } from 'next'
import Link from 'next/link'
import { Activity, Check, Clock, Server, Wifi } from 'lucide-react'
import { NexuzPageShell, NexuzPanel } from '@/components/nexuz/nexuz-page-shell'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

const services = [
  { name: 'App & profiles', status: 'Operational' as const, note: 'Sign-in, profile reads, and shelf pages.' },
  { name: 'Search & directory index', status: 'Operational' as const, note: 'Full-text and metadata matching for your enabled tasks.' },
  { name: 'Link previews & media', status: 'Operational' as const, note: 'Open graph images and avatars in cards.' },
] as const

const incidents = [
  { range: 'Apr 18, 12:00–12:18 UTC', title: 'Slightly slower first paint on iOS Safari', res: 'Mitigated' },
  { range: 'Apr 2, 08:40–09:05 UTC', title: 'Bookmark submission queue retried a small batch', res: 'Resolved' },
  { range: 'Mar 14, 22:10–22:35 UTC', title: 'Planned search index re-shard for larger tenants', res: 'Completed' },
] as const

const upcoming = 'Next maintenance: May 3, 02:00–03:00 UTC — read-only for admin exports only. Public profiles and shelves stay up.'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/status',
    title: `Status — ${SITE_CONFIG.name}`,
    description: `Uptime, incidents, and maintenance windows for ${SITE_CONFIG.name}. We keep this page plain-text friendly for RSS and monitoring tools.`,
  })
}

export default function StatusPage() {
  return (
    <NexuzPageShell
      eyebrow="Operations"
      title="All services reporting healthy"
      description="This page is the human-readable companion to our automated monitors. It is not a real-time PagerDuty feed—if you are blocked, still email support, but you can start here to see if we already noted an issue."
    >
      <NexuzPanel className="mb-6" variant="soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#3d5a50]">{upcoming}</p>
          <Button
            asChild
            className="max-w-sm rounded-full border-2 border-[#1a3531] bg-white text-xs font-semibold sm:text-sm"
          >
            <Link href="https://github.com" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
              Subscribe in your calendar (iCal) — add URL from ops
            </Link>
          </Button>
        </div>
      </NexuzPanel>
      <div className="mb-2 flex items-center gap-2 text-sm text-[#3d5a50]">
        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
        <span>Snapshot generated from internal monitors — refresh for latest.</span>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {services.map((s) => (
          <NexuzPanel key={s.name} className="!p-5" variant="default">
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-sm font-bold uppercase tracking-wide text-[#5a7a6f]">{s.name}</h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#d4f5e3] px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-800">
                <Check className="h-3 w-3" /> {s.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-[#3d5a50]">{s.note}</p>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-[#5a7a6f]">
              <Activity className="h-3.5 w-3.5" />
              Latency within SLOs for 30 days
            </p>
          </NexuzPanel>
        ))}
      </div>

      <NexuzPanel className="mt-8" variant="soft">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase text-[#1a3531]">
          <Server className="h-4 w-4" />
          At-a-glance infrastructure
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <p className="text-sm text-[#3d5a50]">
            <span className="font-semibold text-[#122520]">App region:</span> default multi-zone deployment. Failover is automatic; you might see a single retry during rare failovers.
          </p>
          <p className="text-sm text-[#3d5a50]">
            <span className="font-semibold text-[#122520]">Search:</span> incremental indexing after publish; new shelves usually appear in search within a few minutes, not immediately.
          </p>
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-[#5a7a6f]">
          <Wifi className="h-3.5 w-3.5" />
          We publish synthetic checks from several regions. Green here means our probes succeeded; your network path may still differ.
        </p>
      </NexuzPanel>

      <NexuzPanel className="mt-8" variant="default">
        <h3 className="text-lg font-bold text-[#122520]">Recent events</h3>
        <p className="text-sm text-[#3d5a50]">Short blurbs, not a legal record. For contractual uptime, use your account executive.</p>
        <div className="mt-4 space-y-3">
          {incidents.map((i) => (
            <div key={i.title} className="flex flex-col gap-1 border-b border-[#eef6f1] pb-3 last:border-0 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <p className="text-sm font-bold text-[#122520]">{i.title}</p>
                <p className="text-xs text-[#5a7a6f]">{i.range}</p>
              </div>
              <p className="text-xs font-semibold uppercase text-emerald-800">{i.res}</p>
            </div>
          ))}
        </div>
      </NexuzPanel>

      <NexuzPanel variant="quote" className="mt-8 !py-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm text-[#2d3250]">
            <Clock className="h-4 w-4" />
            We post incidents within 15 minutes of confirming customer impact, faster when a banner is required.
          </p>
          <Button asChild variant="ghost" className="h-auto p-0 text-sm font-bold text-[#1a2825] hover:underline" size="sm">
            <Link href="/help">For site issues, also see Help</Link>
          </Button>
        </div>
      </NexuzPanel>
    </NexuzPageShell>
  )
}
