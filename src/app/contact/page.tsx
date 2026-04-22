import type { Metadata } from 'next'
import Link from 'next/link'
import { Bookmark, Mail, MessageSquare, Send, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

const lanes = [
  {
    icon: Bookmark,
    title: 'Collections & shelves',
    body: 'Request a featured place for your public board, ask about import formats, or share feedback on how collections read on mobile.',
  },
  {
    icon: MessageSquare,
    title: 'Profiles & identity',
    body: 'Get help with verification badges, name changes, and how your profile should appear when someone lands from a search or social post.',
  },
  {
    icon: Sparkles,
    title: 'Partners & education',
    body: 'We work with study groups, bootcamps, and product teams. Tell us about a cohort or a workshop and we can suggest a shared workflow.',
  },
] as const

const panel = 'rounded-2xl border border-[#c8e8dc] bg-white p-6 shadow-sm sm:p-8'
const soft = 'rounded-2xl border border-[#d4efe6] bg-[#e8f8f0] p-5'
const muted = 'text-[#3d5a50]'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/contact',
    title: `Contact — ${SITE_CONFIG.name}`,
    description: `Reach the team behind ${SITE_CONFIG.name} for profiles, bookmarking, partnerships, and support. We read every message.`,
  })
}

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  return (
    <div className="min-h-screen bg-white text-[#1a2825]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#d8ebe4] bg-[linear-gradient(180deg,#ffffff_0%,#f0faf6_100%)]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#1a3531]">Support</p>
            <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#122520] sm:text-5xl">Tell us what you are trying to build</h1>
            <p className={`mt-4 max-w-2xl text-base sm:text-lg ${muted}`}>
              The product is intentionally narrow: profiles and shared bookmarks. That means we can usually route you quickly—no generic &ldquo;ticket to nowhere.&rdquo;
            </p>
            <p className="mt-2 text-sm text-[#5a7a6f]">
              Typical first reply: <span className="font-semibold text-[#1a2825]">one business day</span>, often sooner for accessibility or sign-in blockers.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <h2 className="text-lg font-bold text-[#122520]">Choose the lane that fits</h2>
              <div className="mt-5 space-y-4">
                {lanes.map((lane) => (
                  <div key={lane.title} className={soft}>
                    <lane.icon className="h-5 w-5 text-[#1a3531]" />
                    <h3 className="mt-2 text-base font-bold">{lane.title}</h3>
                    <p className={`mt-1 text-sm leading-6 ${muted}`}>{lane.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <Link href="/help" className="font-semibold text-[#1a3531] hover:underline">
                  Help center
                </Link>
                <span className="text-[#c8e8dc]">|</span>
                <Link href="/status" className="font-semibold text-[#1a3531] hover:underline">
                  System status
                </Link>
              </div>
            </div>
            <div className={panel}>
              <h2 className="flex items-center gap-2 text-xl font-bold text-[#122520]">
                <Send className="h-5 w-5" />
                Send a message
              </h2>
              <p className={`mt-1 text-sm ${muted}`}>
                This is a <span className="font-medium text-[#1a2825]">static demo form</span>—in production, wire it to your support desk. For now, use the fields to draft what you
                would send in email.
              </p>
              <form className="mt-6 grid gap-4" action="#" method="get">
                <div className="grid gap-1.5">
                  <label htmlFor="c-name" className="text-xs font-medium text-[#3d4a45]">
                    Name
                  </label>
                  <Input
                    id="c-name"
                    className="h-11 rounded-xl border-[#d4e5df]"
                    name="name"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                <div className="grid gap-1.5">
                  <label htmlFor="c-email" className="text-xs font-medium text-[#3d4a45]">
                    Work email
                  </label>
                  <Input
                    id="c-email"
                    className="h-11 rounded-xl border-[#d4e5df]"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
                <div className="grid gap-1.5">
                  <label htmlFor="c-topic" className="text-xs font-medium text-[#3d4a45]">
                    Topic
                  </label>
                  <Input
                    id="c-topic"
                    className="h-11 rounded-xl border-[#d4e5df]"
                    name="topic"
                    placeholder="e.g. Shelf export, brand profile, class cohort"
                  />
                </div>
                <div className="grid gap-1.5">
                  <label htmlFor="c-body" className="text-xs font-medium text-[#3d4a45]">
                    How can we help?
                  </label>
                  <Textarea
                    id="c-body"
                    name="message"
                    className="min-h-[160px] rounded-xl border-[#d4e5df] bg-white"
                    placeholder="Include expected outcome, any deadlines, and links to your public profile or shelf if relevant."
                  />
                </div>
                <Button
                  type="button"
                  className="h-12 rounded-full bg-[#1a3531] text-white hover:bg-[#0f2320]"
                >
                  Send message
                </Button>
              </form>
              <p className="mt-4 flex items-center gap-2 text-xs text-[#5a7a6f]">
                <Mail className="h-3.5 w-3.5" />
                You can also reach the team the old-fashioned way through your own mail client; this page is for framing the right context.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
