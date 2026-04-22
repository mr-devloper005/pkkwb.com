import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, MessageCircle, Share2, Sparkles } from 'lucide-react'
import { NexuzPageShell, NexuzPanel } from '@/components/nexuz/nexuz-page-shell'
import { Button } from '@/components/ui/button'
import { mockTeamMembers } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

const openRoles = [
  { title: 'Product designer', focus: 'Navigation, readability, and bookmark shelf layouts' },
  { title: 'Full-stack engineer', focus: 'TypeScript, Next.js, and resilient search' },
  { title: 'Community & education', focus: 'Guides, templates, and public shelf highlights' },
]

const principles = [
  { t: 'Small surface area, big care', b: 'We are not building an everything-app. The roadmap stays narrow so polish wins.' },
  { t: 'Default to public-friendly', b: 'Features should look good the moment a profile or shelf is shared, not just inside the product.' },
  { t: 'Fast from cold start', b: 'Loading states and empty states are first-class, because first impressions are often a shared link in chat.' },
]

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/team',
    title: `Team & mission — ${SITE_CONFIG.name}`,
    description: `Meet the people working on public profiles, social bookmarking, and a calmer way to put your reading list on the web with ${SITE_CONFIG.name}.`,
    openGraphTitle: `Team | ${SITE_CONFIG.name}`,
  })
}

export default function TeamPage() {
  return (
    <NexuzPageShell
      eyebrow="Company"
      title="A distributed crew shipping calm profiles and better shelves"
      description={`The ${SITE_CONFIG.name} team blends product, design, and community support. We stay close to real researchers, students, and builders who outgrow generic link-in-bio tools.`}
      actions={
        <Button asChild className="rounded-full border-2 border-[#1a3531] bg-white text-[#1a2825] hover:bg-[#e8f8f0]">
          <Link href="/careers">See open roles</Link>
        </Button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {principles.map((p) => (
          <NexuzPanel key={p.t} variant="soft" className="!p-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#1a3531]">How we work</h3>
            <h4 className="mt-2 text-lg font-bold text-[#122520]">{p.t}</h4>
            <p className="mt-2 text-sm leading-6 text-[#3d5a50]">{p.b}</p>
          </NexuzPanel>
        ))}
      </div>

      <NexuzPanel className="mt-8" variant="default">
        <h2 className="text-2xl font-bold text-[#122520]">Field notes</h2>
        <p className="mt-3 text-sm text-[#3d5a50]">
          We work across US and European time zones with a weekly all-hands focused on what shipped, what we learned from support, and the next public shelf stories worth amplifying. If
          you care about the quiet craft of a good list view, you will find kindred spirits here.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d4efe6] bg-[#f3faf7] px-3 py-1.5 text-[#1a2825]">
            <MapPin className="h-3.5 w-3.5" /> Remote-first, async-friendly
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d4efe6] bg-[#f3faf7] px-3 py-1.5 text-[#1a2825]">
            <MessageCircle className="h-3.5 w-3.5" /> Public roadmap notes on status
          </span>
        </div>
      </NexuzPanel>

      <h2 className="mb-2 mt-14 text-center text-2xl font-bold text-[#122520]">People</h2>
      <p className="mb-8 text-center text-sm text-[#3d5a50]">Leads and makers you might meet on calls or at community office hours.</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockTeamMembers.map((m) => (
          <NexuzPanel key={m.id} className="!p-6">
            <div className="overflow-hidden rounded-2xl border border-[#c8e8dc]">
              <img src={m.avatar} alt="" className="h-40 w-full object-cover" width="400" height="200" />
            </div>
            <p className="mt-4 text-lg font-bold text-[#122520]">{m.name}</p>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#1a3531]">{m.role}</p>
            <p className="mt-2 text-sm leading-6 text-[#3d5a50]">{m.bio}</p>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-[#5a7a6f]">
              <MapPin className="h-3 w-3" /> {m.location}
            </p>
            <p className="mt-3 text-xs text-[#3d5a50]">Ask them about a favorite saved shelf, a calm profile layout, or how we test search quality.</p>
          </NexuzPanel>
        ))}
      </div>

      <NexuzPanel variant="quote" className="mt-8">
        <h3 className="text-lg font-bold text-[#2d3250]">Open roles (snapshot)</h3>
        <ul className="mt-3 space-y-2 text-sm text-[#3d4a5c]">
          {openRoles.map((r) => (
            <li key={r.title}>
              <span className="font-bold text-[#1a2825]">{r.title}:</span> {r.focus}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-[#5a5f78]">Full job descriptions and locations live on the careers page—this list is a quick filter.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild className="rounded-full bg-[#1a3531] text-white hover:bg-[#0f2320]">
            <Link href="/careers" className="inline-flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              Open careers
            </Link>
          </Button>
          <Button asChild variant="ghost" className="rounded-full text-[#1a2825]">
            <Link href="/contact" className="inline-flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              Contact recruiting
            </Link>
          </Button>
        </div>
      </NexuzPanel>
    </NexuzPageShell>
  )
}
