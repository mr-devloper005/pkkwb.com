import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, KeyRound, Link2, UserCircle } from 'lucide-react'
import { NexuzPageShell, NexuzPanel } from '@/components/nexuz/nexuz-page-shell'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

const guideTopics = [
  {
    icon: UserCircle,
    title: 'Set up a profile that people remember',
    body: 'Start with a square photo, one-line role, and three outbound links. Add a short paragraph only when it sharpens the story. Visitors skim in seconds—lead with the clearest signal.',
  },
  {
    icon: Link2,
    title: 'Name your first bookmark shelf',
    body: 'Create a collection with a verb in the title (&ldquo;Read next for API design&rdquo;) and 5–7 links. Each item should have a one-line reason it is here—future you will thank you.',
  },
  {
    icon: KeyRound,
    title: 'Sign in on a new device',
    body: 'In this environment, your session is stored in the browser. If you clear site data, sign in again. For classroom or library computers, use private mode and sign out when done.',
  },
  {
    icon: BookOpen,
    title: 'Share a shelf in chat or email',
    body: 'Open any public collection, copy its URL, and lead with a sentence of context. Recipients will see the same calm layout you see, without needing an account to view.',
  },
]

const faq = [
  {
    id: 'f1',
    q: 'What is the difference between a profile and a shelf?',
    a: 'Your profile is about you: who you are and what you stand for. A shelf (bookmark collection) is a list of resources around a single theme. Many people link to their most important shelf from the profile.',
  },
  {
    id: 'f2',
    q: 'Can I keep a shelf private?',
    a: 'Product behavior depends on your deployment settings. On this site, think of every shelf and profile you publish as intended for a public or team audience unless your administrator tells you otherwise.',
  },
  {
    id: 'f3',
    q: 'Why is my sign-in not syncing to another computer?',
    a: 'In the demo, authentication is local to the browser. That keeps onboarding fast, but it also means you should sign in separately on each device, or use the same account provider when your org wires up SSO later.',
  },
  {
    id: 'f4',
    q: 'How do I get better search results?',
    a: 'Search matches titles, summaries, and common fields in your posts. For profiles, add meaningful words in the bio. For shelves, add tags and a clear collection title. Short acronyms without context may rank lower.',
  },
] as const

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/help',
    title: `Help & guides — ${SITE_CONFIG.name}`,
    description: `Get started with public profiles, bookmark collections, and search on ${SITE_CONFIG.name}. Calm, step-by-step guidance for individuals and small teams.`,
  })
}

export default function HelpPage() {
  return (
    <NexuzPageShell
      eyebrow="Support"
      title="Help for profiles, shelves, and everyday browsing"
      description="Short guides so you are never stuck in a 40-tab research spiral. We focus on how people really save links in the wild."
      actions={
        <Button
          asChild
          className="rounded-full border-2 border-[#1a3531] bg-white text-[#1a2825] hover:bg-[#e8f8f0]"
        >
          <Link href="/contact">Still stuck? Contact us</Link>
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {guideTopics.map((g) => (
          <NexuzPanel key={g.title} variant="soft" className="!p-5 sm:!p-6">
            <g.icon className="h-6 w-6 text-[#1a3531]" />
            <h2 className="mt-3 text-base font-bold text-[#122520] sm:text-lg">{g.title}</h2>
            <p className="mt-2 text-sm leading-6 text-[#3d5a50]">{g.body}</p>
          </NexuzPanel>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <NexuzPanel>
          <h2 className="text-lg font-bold text-[#122520]">Before you open a ticket</h2>
          <p className="mt-2 text-sm text-[#3d5a50]">Try these quick triage steps—they solve most of the &ldquo;where did my link go&rdquo; issues.</p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-[#3d5a50]">
            <li>Scroll to the bottom of a shelf: pagination may hide the newest add.</li>
            <li>Check that you are signed in on the same browser profile you used when saving.</li>
            <li>Hard refresh once. Cached CSS rarely breaks, but a stale service worker is worth ruling out on internal builds.</li>
            <li>If something looks off on mobile, rotate once—our layouts are mobile-first, but a rare embed can overflow.</li>
          </ol>
        </NexuzPanel>
        <NexuzPanel variant="default" className="!p-4 sm:!p-6">
          <h2 className="px-1 text-lg font-bold text-[#122520] sm:px-2">Frequently asked</h2>
          <Accordion type="single" collapsible className="mt-1 w-full">
            {faq.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border-[#e8f2ed]">
                <AccordionTrigger className="text-left text-sm font-semibold text-[#122520] hover:no-underline sm:text-base">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-6 text-[#3d5a50]">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </NexuzPanel>
      </div>

      <NexuzPanel variant="mintCta" className="mt-8 text-center !py-8">
        <h3 className="text-lg font-bold text-[#0f2320]">We write new guides when a question shows up a lot in support.</h3>
        <p className="mt-1 text-sm text-[#1a3d36]">Tell us what is confusing: we might turn your note into a step-by-step article.</p>
        <Button asChild className="mt-4 rounded-full bg-[#1a3531] text-white">
          <Link href="/contact">Request a topic</Link>
        </Button>
      </NexuzPanel>
    </NexuzPageShell>
  )
}
