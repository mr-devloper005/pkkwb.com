import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Heart, Target, Users } from 'lucide-react'
import { NexuzPageShell, NexuzPanel } from '@/components/nexuz/nexuz-page-shell'
import { Button } from '@/components/ui/button'
import { mockTeamMembers } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

const highlights = [
  { label: 'Public profiles', value: '2.1k+' },
  { label: 'Links saved in collections', value: '18k' },
  { label: 'Shared shelves each month', value: '640+' },
]

const values = [
  { title: 'Clarity over clutter', body: 'We design for rereading and sharing—not endless scrolling. Every page should answer who this is and what to open next.' },
  { title: 'People first', body: 'Your profile is a door: name, context, and trust signals before a visitor touches a link.' },
  { title: 'Shelves, not stockpiles', body: 'Collections are meant to be named, explainable, and shippable. If you can’t share it, it probably needs a better home.' },
]

const milestones = [
  { y: '2022', t: 'Prototype' },
  { y: '2023', t: 'Open profiles' },
  { y: '2024', t: 'Shared bookmarking' },
  { y: '2025', t: 'Studio launch' },
  { y: '2026', t: 'Today' },
]

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/about',
    title: `About ${SITE_CONFIG.name} — profiles & bookmarking`,
    description: `Learn how ${SITE_CONFIG.name} helps teams publish public profiles, save the web, and share calm, readable link collections.`,
    openGraphTitle: `About ${SITE_CONFIG.name}`,
    openGraphDescription: `A platform built for identity pages and social bookmarking—less noise, more context.`,
  })
}

export default function AboutPage() {
  return (
    <NexuzPageShell
      eyebrow="Company"
      title={`A small team building a calmer way to be seen on the web`}
      description={`${SITE_CONFIG.name} is focused on just two things: a profile that shows who you are, and shelves that show what you read and recommend—without a noisy, everything-at-once feed.`}
      actions={
        <>
          <Button asChild className="rounded-full bg-[#1a3531] px-5 text-white hover:bg-[#0f2320]">
            <Link href="/register">Get started</Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="rounded-full border-2 border-[#1a3531] bg-white text-[#1a2825] hover:bg-[#e8f8f0]"
          >
            <Link href="/contact">Talk to us</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <NexuzPanel>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1a3531]">The short version</p>
          <h2 className="mt-3 text-2xl font-bold text-[#122520] sm:text-3xl">We started with a simple frustration</h2>
          <p className="mt-4 text-sm leading-7 text-[#3d5a50]">
            Browsers and feeds bury the work you care about. Bookmarks in a private folder are invisible, and &ldquo;profiles&rdquo; on big networks often look the same. We want a
            surface where your story and your sources sit together—so visitors see both in one pass.
          </p>
          <p className="mt-3 text-sm leading-7 text-[#3d5a50]">
            Today, teams, solo creators, and students use {SITE_CONFIG.name} to run public identity pages, publish hand-built reading lists, and hand off a single URL instead of
            a dozen.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {highlights.map((h) => (
              <div key={h.label} className="rounded-2xl border border-[#d4efe6] bg-[#f3faf7] p-4 text-center">
                <p className="text-2xl font-bold text-[#122520]">{h.value}</p>
                <p className="mt-1 text-xs text-[#3d5a50]">{h.label}</p>
              </div>
            ))}
          </div>
        </NexuzPanel>
        <div className="space-y-4">
          {values.map((v) => (
            <NexuzPanel key={v.title} variant="soft" className="!p-5 sm:!p-6">
              <h3 className="text-lg font-bold text-[#122520]">{v.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#3d5a50]">{v.body}</p>
            </NexuzPanel>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <NexuzPanel className="flex flex-col justify-between" variant="soft">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#1a3531]/15 bg-white">
            <Target className="h-4 w-4 text-[#1a3531]" />
          </div>
          <h3 className="mt-4 text-lg font-bold">Mission</h3>
          <p className="mt-2 text-sm text-[#3d5a50]">Make identity and reading lists as easy to publish as a link-in-bio, but with room for the real work behind it.</p>
        </NexuzPanel>
        <NexuzPanel className="flex flex-col justify-between" variant="soft">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#1a3531]/15 bg-white">
            <Heart className="h-4 w-4 text-[#1a3531]" />
          </div>
          <h3 className="mt-4 text-lg font-bold">Principles</h3>
          <p className="mt-2 text-sm text-[#3d5a50]">Respectful defaults, no dark patterns, and a UI that still reads well when you are tired on a small screen.</p>
        </NexuzPanel>
        <NexuzPanel className="flex flex-col justify-between" variant="soft">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#1a3531]/15 bg-white">
            <Users className="h-4 w-4 text-[#1a3531]" />
          </div>
          <h3 className="mt-4 text-lg font-bold">Who we are</h3>
          <p className="mt-2 text-sm text-[#3d5a50]">Product, design, and community folks who care a little too much about legibility, typography, and honest sign-up flows.</p>
        </NexuzPanel>
      </div>

      <NexuzPanel variant="quote" className="mt-8">
        <h3 className="text-lg font-bold text-[#2d3250]">Timeline</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          {milestones.map((m) => (
            <span
              key={m.y + m.t}
              className="inline-flex items-center gap-2 rounded-full border border-[#c4bdd8] bg-white/80 px-3 py-1.5 text-xs text-[#2d3250]"
            >
              <span className="font-bold text-[#1a3531]">{m.y}</span>
              {m.t}
            </span>
          ))}
        </div>
      </NexuzPanel>

      <h2 className="mt-14 text-center text-2xl font-bold text-[#122520]">People you may already know from the product</h2>
      <p className="mt-2 text-center text-sm text-[#3d5a50]">A few friendly faces we highlight on this marketing site—our full roster is larger.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockTeamMembers.map((member) => (
          <NexuzPanel key={member.id} className="!p-5">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-full border border-[#c8e8dc]">
                <img src={member.avatar} alt="" className="h-full w-full object-cover" width="48" height="48" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#122520]">{member.name}</p>
                <p className="text-xs text-[#5a7a6f]">{member.role}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-[#3d5a50]">{member.bio}</p>
            <p className="mt-2 text-xs text-[#5a7a6f]">{member.location}</p>
          </NexuzPanel>
        ))}
      </div>

      <NexuzPanel variant="mintCta" className="mt-12 text-center !py-10">
        <h3 className="text-2xl font-bold text-[#0f2320]">Work with {SITE_CONFIG.name}?</h3>
        <p className="mx-auto mt-2 max-w-lg text-sm text-[#1a3d36]">We are hiring curious designers and engineers. Tell us what you are building in your own words.</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <Button asChild className="rounded-full bg-[#1a3531] text-white hover:bg-[#0f2320]">
            <Link href="/careers" className="inline-flex items-center gap-2">
              View open roles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" asChild className="rounded-full text-[#0f2320] hover:bg-white/50">
            <Link href="/team">Meet the full team</Link>
          </Button>
        </div>
      </NexuzPanel>
    </NexuzPageShell>
  )
}
