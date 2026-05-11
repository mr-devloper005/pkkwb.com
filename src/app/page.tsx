import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Bookmark, Building2, CheckCircle2, Compass, FileText, Image as ImageIcon, LayoutGrid, Layers, MapPin, RefreshCw, ShieldCheck, Sparkles, Star, Tag, User } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind, type ProductKind } from '@/design/factory/get-product-kind'
import type { SitePost } from '@/lib/site-connector'
import { HOME_PAGE_OVERRIDE_ENABLED, HomePageOverride } from '@/overrides/home-page'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/',
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  })
}

type EnabledTask = (typeof SITE_CONFIG.tasks)[number]
type TaskFeedItem = { task: EnabledTask; posts: SitePost[] }

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: Bookmark,
  classified: Tag,
  image: ImageIcon,
  profile: User,
}

function resolveTaskKey(value: unknown, fallback: TaskKey): TaskKey {
  if (value === 'listing' || value === 'classified' || value === 'article' || value === 'image' || value === 'profile' || value === 'sbm') return value
  return fallback
}

function getTaskHref(task: TaskKey, slug: string) {
  const route = SITE_CONFIG.tasks.find((item) => item.key === task)?.route || `/${task}`
  return `${route}/${slug}`
}

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage = typeof post?.content === 'object' && post?.content && Array.isArray((post.content as any).images)
    ? (post.content as any).images.find((url: unknown) => typeof url === 'string' && url)
    : null
  const logo = typeof post?.content === 'object' && post?.content && typeof (post.content as any).logo === 'string'
    ? (post.content as any).logo
    : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

function getPostMeta(post?: SitePost | null) {
  if (!post || typeof post.content !== 'object' || !post.content) return { location: '', category: '' }
  const content = post.content as Record<string, unknown>
  return {
    location: typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : '',
    category: typeof content.category === 'string' ? content.category : typeof post.tags?.[0] === 'string' ? post.tags[0] : '',
  }
}

function getDirectoryTone(brandPack: string) {
  if (brandPack === 'market-utility') {
    return {
      shell: 'bg-[#f5f7f1] text-[#1f2617]',
      hero: 'bg-[linear-gradient(180deg,#eef4e4_0%,#f8faf4_100%)]',
      panel: 'border border-[#d5ddc8] bg-white shadow-[0_24px_64px_rgba(64,76,34,0.08)]',
      soft: 'border border-[#d5ddc8] bg-[#eff3e7]',
      muted: 'text-[#5b664c]',
      title: 'text-[#1f2617]',
      badge: 'bg-[#1f2617] text-[#edf5dc]',
      action: 'bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
      actionAlt: 'border border-[#d5ddc8] bg-white text-[#1f2617] hover:bg-[#eef3e7]',
    }
  }
  return {
    shell: 'bg-[#f8fbff] text-slate-950',
    hero: 'bg-[linear-gradient(180deg,#eef6ff_0%,#ffffff_100%)]',
    panel: 'border border-slate-200 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.08)]',
    soft: 'border border-slate-200 bg-slate-50',
    muted: 'text-slate-600',
    title: 'text-slate-950',
    badge: 'bg-slate-950 text-white',
    action: 'bg-slate-950 text-white hover:bg-slate-800',
    actionAlt: 'border border-slate-200 bg-white text-slate-950 hover:bg-slate-100',
  }
}

function getEditorialTone() {
  return {
    shell: 'bg-[#fbf6ee] text-[#241711]',
    panel: 'border border-[#dcc8b7] bg-[#fffdfa] shadow-[0_24px_60px_rgba(77,47,27,0.08)]',
    soft: 'border border-[#e6d6c8] bg-[#fff4e8]',
    muted: 'text-[#6e5547]',
    title: 'text-[#241711]',
    badge: 'bg-[#241711] text-[#fff1e2]',
    action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]',
    actionAlt: 'border border-[#dcc8b7] bg-transparent text-[#241711] hover:bg-[#f5e7d7]',
  }
}

function getVisualTone() {
  return {
    shell: 'bg-[#07101f] text-white',
    panel: 'border border-white/10 bg-[rgba(11,18,31,0.78)] shadow-[0_28px_80px_rgba(0,0,0,0.35)]',
    soft: 'border border-white/10 bg-white/6',
    muted: 'text-slate-300',
    title: 'text-white',
    badge: 'bg-[#8df0c8] text-[#07111f]',
    action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    actionAlt: 'border border-white/10 bg-white/6 text-white hover:bg-white/10',
  }
}

function getCurationTone() {
  return {
    shell: 'bg-white text-[#1a2825]',
    panel: 'border border-[#c8e8dc] bg-white shadow-[0_20px_48px_rgba(26,53,49,0.08)]',
    soft: 'border border-[#d4efe6] bg-[#e8f8f0]',
    softInv: 'border border-[#1a3531] bg-[#1a3531] text-white shadow-[0_20px_48px_rgba(15,35,32,0.2)]',
    quote: 'bg-[#edeaf5]',
    cta: 'bg-[#c5efe2]',
    mint: 'bg-[#c8f0e4]',
    muted: 'text-[#3d5a50]',
    title: 'text-[#122520]',
    badge: 'inline-flex border border-[#1a3531] bg-white text-[#1a3531]',
    action: 'bg-[#1a3531] text-white hover:bg-[#0f2320]',
    actionAlt: 'border-2 border-[#1a3531] bg-white text-[#1a3531] hover:bg-[#c8f0e4]',
  }
}

function DirectoryHome({ primaryTask, enabledTasks, listingPosts, classifiedPosts, profilePosts, brandPack }: {
  primaryTask?: EnabledTask
  enabledTasks: EnabledTask[]
  listingPosts: SitePost[]
  classifiedPosts: SitePost[]
  profilePosts: SitePost[]
  brandPack: string
}) {
  const tone = getDirectoryTone(brandPack)
  const featuredListings = (listingPosts.length ? listingPosts : classifiedPosts).slice(0, 3)
  const featuredTaskKey: TaskKey = listingPosts.length ? 'listing' : 'classified'
  const quickRoutes = enabledTasks.slice(0, 4)

  return (
    <main>
      <section className={tone.hero}>
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
                <Compass className="h-3.5 w-3.5" />
                Local discovery product
              </span>
              <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
                Search businesses, compare options, and act fast without digging through generic feeds.
              </h1>
              <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>

              <div className={`mt-8 grid gap-3 rounded-[2rem] p-4 ${tone.panel} md:grid-cols-[1.25fr_0.8fr_auto]`}>
                <div className="rounded-full bg-black/5 px-4 py-3 text-sm">What do you need today?</div>
                <div className="rounded-full bg-black/5 px-4 py-3 text-sm">Choose area or city</div>
                <Link href={primaryTask?.route || '/listings'} className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                  Browse now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  ['Verified businesses', `${featuredListings.length || 3}+ highlighted surfaces`],
                  ['Fast scan rhythm', 'More utility, less filler'],
                  ['Action first', 'Call, visit, shortlist, compare'],
                ].map(([label, value]) => (
                  <div key={label} className={`rounded-[1.4rem] p-4 ${tone.soft}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">{label}</p>
                    <p className="mt-2 text-lg font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className={`rounded-[2rem] p-6 ${tone.panel}`}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">Primary lane</p>
                    <h2 className="mt-2 text-3xl font-semibold">{primaryTask?.label || 'Listings'}</h2>
                  </div>
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <p className={`mt-4 text-sm leading-7 ${tone.muted}`}>{primaryTask?.description || 'Structured discovery for services, offers, and business surfaces.'}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {quickRoutes.map((task) => {
                  const Icon = taskIcons[task.key as TaskKey] || LayoutGrid
                  return (
                    <Link key={task.key} href={task.route} className={`rounded-[1.6rem] p-5 ${tone.soft}`}>
                      <Icon className="h-5 w-5" />
                      <h3 className="mt-4 text-lg font-semibold">{task.label}</h3>
                      <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{task.description}</p>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Featured businesses</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Strong listings with clearer trust cues.</h2>
          </div>
          <Link href="/listings" className="text-sm font-semibold text-primary hover:opacity-80">Open listings</Link>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featuredListings.map((post) => (
            <TaskPostCard key={post.id} post={post} href={getTaskHref(featuredTaskKey, post.slug)} taskKey={featuredTaskKey} />
          ))}
        </div>
      </section>

      <section className={`${tone.shell}`}>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">What makes this different</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Built like a business directory, not a recolored content site.</h2>
            <ul className={`mt-6 space-y-3 text-sm leading-7 ${tone.muted}`}>
              <li>Search-first hero instead of a magazine headline.</li>
              <li>Action-oriented listing cards with trust metadata.</li>
              <li>Support lanes for offers, businesses, and profiles.</li>
            </ul>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {(profilePosts.length ? profilePosts : classifiedPosts).slice(0, 4).map((post) => {
              const meta = getPostMeta(post)
              const taskKey = resolveTaskKey(post.task, profilePosts.length ? 'profile' : 'classified')
              return (
                <Link key={post.id} href={getTaskHref(taskKey, post.slug)} className={`overflow-hidden rounded-[1.8rem] ${tone.panel}`}>
                  <div className="relative h-44 overflow-hidden">
                    <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] opacity-70">{meta.category || post.task || 'Profile'}</p>
                    <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
                    <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Quick access to local information and related surfaces.'}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

function EditorialHome({ primaryTask, articlePosts, supportTasks }: { primaryTask?: EnabledTask; articlePosts: SitePost[]; supportTasks: EnabledTask[] }) {
  const tone = getEditorialTone()
  const lead = articlePosts[0]
  const side = articlePosts.slice(1, 5)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <FileText className="h-3.5 w-3.5" />
              Reading-first publication
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Essays, analysis, and slower reading designed like a publication, not a dashboard.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/articles'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Start reading
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                About the publication
              </Link>
            </div>
          </div>

          <aside className={`rounded-[2rem] p-6 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Inside this issue</p>
            <div className="mt-5 space-y-5">
              {side.map((post) => (
                <Link key={post.id} href={`/articles/${post.slug}`} className="block border-b border-black/10 pb-5 last:border-b-0 last:pb-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] opacity-60">Feature</p>
                  <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Long-form perspective with a calmer reading rhythm.'}</p>
                </Link>
              ))}
            </div>
          </aside>
        </div>

        {lead ? (
          <div className={`mt-12 overflow-hidden rounded-[2.5rem] ${tone.panel}`}>
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[360px] overflow-hidden">
                <ContentImage src={getPostImage(lead)} alt={lead.title} fill className="object-cover" />
              </div>
              <div className="p-8 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Lead story</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">{lead.title}</h2>
                <p className={`mt-4 text-sm leading-8 ${tone.muted}`}>{lead.summary || 'A more deliberate lead story surface with room for a proper narrative setup.'}</p>
                <Link href={`/articles/${lead.slug}`} className={`mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {supportTasks.slice(0, 3).map((task) => (
            <Link key={task.key} href={task.route} className={`rounded-[1.8rem] p-6 ${tone.soft}`}>
              <h3 className="text-xl font-semibold">{task.label}</h3>
              <p className={`mt-3 text-sm leading-7 ${tone.muted}`}>{task.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

function VisualHome({ primaryTask, imagePosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; imagePosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getVisualTone()
  const gallery = imagePosts.length ? imagePosts.slice(0, 5) : articlePosts.slice(0, 5)
  const creators = profilePosts.slice(0, 3)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <ImageIcon className="h-3.5 w-3.5" />
              Visual publishing system
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Image-led discovery with creator profiles and a more gallery-like browsing rhythm.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/images'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Open gallery
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                Meet creators
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.slice(0, 5).map((post, index) => (
              <Link
                key={post.id}
                href={getTaskHref(resolveTaskKey(post.task, 'image'), post.slug)}
                className={index === 0 ? `col-span-2 row-span-2 overflow-hidden rounded-[2.4rem] ${tone.panel}` : `overflow-hidden rounded-[1.8rem] ${tone.soft}`}
              >
                <div className={index === 0 ? 'relative h-[360px]' : 'relative h-[170px]'}>
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Visual notes</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Larger media surfaces, fewer boxes, stronger pacing.</h2>
            <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>This product avoids business-directory density and publication framing. The homepage behaves more like a visual board, with profile surfaces and imagery leading the experience.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {creators.map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                <div className="relative h-40 overflow-hidden rounded-[1.2rem]">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Creator profile and visual identity surface.'}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function CurationHome({ primaryTask, bookmarkPosts, profilePosts }: { primaryTask?: EnabledTask; bookmarkPosts: SitePost[]; profilePosts: SitePost[] }) {
  const tone = getCurationTone()
  const primaryRoute = primaryTask?.route || '/sbm'
  const featuredBookmarks = bookmarkPosts.slice(0, 4)
  const hero = profilePosts[0] || bookmarkPosts[0]
  const detailSide = profilePosts[1] || profilePosts[0] || bookmarkPosts[0]
  const profileStat = Math.max(120, profilePosts.length * 8 + 420)
  const linkStat = Math.max(2000, bookmarkPosts.length * 12 + 1800)
  const colStat = Math.max(15, profilePosts.length + bookmarkPosts.length + 12)
  const partners = ['Apex', 'Northwind', 'Brightly', 'Vertex', 'Harborline']

  type GridItem = { name: string; handle: string; blurb: string; image: string; href: string; stars: number }
  const built: GridItem[] = [
    ...profilePosts.slice(0, 3).map((p) => ({
      name: p.title,
      handle: `@${p.slug}`.replace(/\.+/g, ''),
      blurb: p.summary || 'A polished public profile with clear identity and link-outs.',
      image: getPostImage(p),
      href: getTaskHref('profile', p.slug),
      stars: 5,
    })),
    ...bookmarkPosts.slice(0, 3).map((p) => ({
      name: p.title,
      handle: `/${p.slug}`,
      blurb: p.summary || 'A curated set of resources worth revisiting and sharing.',
      image: getPostImage(p),
      href: getTaskHref('sbm', p.slug),
      stars: 5,
    })),
  ]
  const demoFill: GridItem[] = [
    { name: 'Avery Chen', handle: '@avery', blurb: 'Saves the best product reads in one public shelf.', image: '/placeholder.svg?height=200&width=200', href: '/profile', stars: 5 },
    { name: 'Design systems hub', handle: '/design-links', blurb: 'A bookmark board for tokens, a11y, and UI kits.', image: '/placeholder.svg?height=200&width=200', href: '/sbm', stars: 4 },
  ]
  const communityGrid: GridItem[] = built.length >= 6 ? built.slice(0, 6) : [...built, ...demoFill].slice(0, 6)

  return (
    <main className={tone.shell}>
      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
            <div>
              <h1 className={`mt-0 max-w-2xl text-4xl font-bold tracking-[-0.04em] sm:text-5xl lg:text-6xl ${tone.title}`}>
                Build your identity and save the web, without the noise of a generic feed.
              </h1>
              <p className={`mt-5 max-w-xl text-base leading-7 sm:text-lg ${tone.muted}`}>
                {SITE_CONFIG.description} Follow people, open their shelves, and keep the links you care about in one place.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href={primaryRoute} className={`inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold shadow-sm ${tone.action}`}>
                  {primaryTask?.label || 'Start bookmarking'}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="relative min-h-[280px] sm:min-h-[360px]">
              <div className="absolute inset-0 rounded-3xl border border-[#b8e5d4] bg-[#c5efe2] p-3 shadow-inner sm:p-4" />
              <div className="relative h-full min-h-[280px] overflow-hidden rounded-2xl sm:min-h-[360px]">
                <ContentImage
                  src={getPostImage(hero)}
                  alt="Community member or bookmark preview"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>

          <div className="mt-14 border-t border-[#e8f2ed] pt-8">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-[#4a6b60]">Trusted by teams and creators</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 opacity-40 grayscale sm:gap-x-14">
              {partners.map((name) => (
                <span key={name} className="text-sm font-bold tracking-tight sm:text-base">{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className={tone.quote}>
        <p className="mx-auto max-w-3xl px-6 py-16 text-center text-lg italic leading-8 text-[#2d3250] sm:text-2xl sm:leading-9">
          &ldquo;{SITE_CONFIG.name} is where your profile and your saved links feel like one calm workspace—not another endless scroll.&rdquo;
        </p>
      </section>

      {/* 3 feature cards — middle highlights */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-[#122520] sm:text-4xl">Everything you need for social bookmarking</h2>
            <p className="mt-3 text-[#3d5a50]">Profiles, collections, and public shelves built for how people really save and share the web today.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                k: 'bookmarks' as const,
                title: 'Link shelves',
                text: 'Group resources by project, team, or topic. Share a shelf as a public board.',
                inv: false,
                Icon: Bookmark,
              },
              {
                k: 'profiles' as const,
                title: 'Profile-first',
                text: 'A single page for who you are and what you read—avatars, bio, and outbound links.',
                inv: true,
                Icon: User,
              },
              {
                k: 'sync' as const,
                title: 'Revisit, don’t re-search',
                text: 'Faster return visits with collections that stay legible in light or dark UIs.',
                inv: false,
                Icon: Layers,
              },
            ].map((card) => {
              const Icon = card.Icon
              return (
                <div
                  key={card.k}
                  className={`relative flex flex-col rounded-2xl p-7 min-h-[220px] ${
                    card.inv ? 'border border-[#1a3531] bg-[#1a3531] text-white' : 'border border-[#d4efe6] bg-[#e8f8f0]'
                  }`}
                >
                  <Icon
                    className={`absolute right-5 top-5 h-5 w-5 ${
                      card.inv ? 'text-white/50' : 'text-[#1a3531]/50'
                    }`}
                  />
                  <h3 className={`pr-8 text-xl font-bold ${card.inv ? 'text-white' : 'text-[#122520]'}`}>
                    {card.title}
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-7 ${
                      card.inv ? 'text-white/80' : 'text-[#3d5a50]'
                    }`}
                  >
                    {card.text}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Split: image + checklist */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
            <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-[#c8e8dc]">
              <ContentImage
                src={getPostImage(detailSide)}
                alt="Product visual"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center rounded-2xl border border-[#e0ebe6] bg-[#f3faf7] p-8 lg:p-10">
              <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#122520] sm:text-3xl">Why people stay on {SITE_CONFIG.name}</h2>
              <p className="mt-3 text-sm leading-7 text-[#3d5a50]">
                Curated for clarity: fewer ad-like surfaces, more readable lists and public profiles. Perfect for students, product teams, and research-heavy roles.
              </p>
              <ul className="mt-6 space-y-3">
                {['Public profile page with your story and best links out', 'Bookmark collections you can name, describe, and share', 'A calmer home screen focused on people and resources'].map(
                  (line) => (
                    <li key={line} className="flex gap-3 text-sm text-[#1a2825]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1a3531]" />
                      {line}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Progress + stat bars */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#d4efe6] bg-[#f3faf7] p-6 sm:p-8">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#1a3531]">What members complete first</h3>
              {[
                { label: 'Profile fields', p: 88, color: 'w-[88%]' },
                { label: 'First bookmark collection', p: 76, color: 'w-[76%]' },
                { label: 'Public shelf shared', p: 64, color: 'w-[64%]' },
              ].map((row) => (
                <div key={row.label} className="mt-5 first:mt-4">
                  <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-[#3d5a50]">
                    <span>{row.label}</span>
                    <span className="text-[#1a3531]">{row.p}%</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#d0ebe2]">
                    <div className={`h-2.5 rounded-full bg-[#1a3531] ${row.color}`} />
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:items-stretch">
              {[
                { n: `${profileStat}+`, sub: 'Public profile views', icon: User },
                { n: `${(linkStat / 1000).toFixed(1)}k+`, sub: 'Links added to collections', icon: Bookmark },
                { n: `${colStat}+`, sub: 'Open collections to browse', icon: RefreshCw },
              ].map((s) => {
                const I = s.icon
                return (
                  <div
                    key={s.sub}
                    className="flex flex-col items-center justify-center rounded-2xl border border-[#c8e8dc] bg-white p-5 text-center shadow-sm"
                  >
                    <I className="h-5 w-5 text-[#1a3531]" />
                    <p className="mt-3 text-2xl font-bold text-[#122520] sm:text-3xl">{s.n}</p>
                    <p className="mt-1.5 text-xs text-[#3d5a50]">{s.sub}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Bookmark / collection wall */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between gap-3 border-b border-[#e8f2ed] pb-4">
            <div>
              <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#122520]">Open collections and shelves</h2>
              <p className="mt-1 text-sm text-[#3d5a50]">Hand-picked from our social bookmarking surface{featuredBookmarks.length ? '' : ' (demo copy when none are live yet)'}.</p>
            </div>
            <Link href="/sbm" className="text-sm font-semibold text-[#1a3531] hover:underline">See all</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {(featuredBookmarks.length
              ? featuredBookmarks
              : [
                  { id: 'd1', task: 'sbm', title: 'Research links', summary: 'Tools for reading, writing, and shipping with fewer tabs.', slug: 'research', content: null, media: [], tags: [] } as unknown as SitePost,
                  { id: 'd2', task: 'sbm', title: 'Indie product stack', summary: 'A shelf of docs, changelogs, and communities worth following.', slug: 'indie', content: null, media: [], tags: [] } as unknown as SitePost,
                  { id: 'd3', task: 'sbm', title: 'Open-source picks', summary: 'Libraries, CLIs, and design assets we keep coming back to.', slug: 'open-source', content: null, media: [], tags: [] } as unknown as SitePost,
                  { id: 'd4', task: 'sbm', title: 'Career & learning', summary: 'Courses, talks, and references for leveling up in public.', slug: 'career', content: null, media: [], tags: [] } as unknown as SitePost,
                ]).slice(0, 4)
              .map((post) => (
                <Link
                  key={String(post.id)}
                  href={getTaskHref(resolveTaskKey(post.task, 'sbm'), post.slug)}
                  className="group rounded-2xl border border-[#d4efe6] bg-white p-6 transition hover:shadow-md"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a3531]">Collection</p>
                  <h3 className="mt-2 text-xl font-bold text-[#122520] group-hover:underline">{post.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#3d5a50]">
                    {post.summary || 'A shareable set of resources with short notes and tags.'}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Community 3x2 grid */}
      <section className="bg-[#f8fbf9]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#122520] sm:text-3xl">From the community</h2>
            <p className="mt-2 text-sm text-[#3d5a50]">Profile highlights and popular bookmark pages.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {communityGrid.map((item) => (
              <Link
                key={`${item.href}-${item.handle}`}
                href={item.href}
                className="flex flex-col rounded-2xl border border-white bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-1 flex text-amber-500">
                  {Array.from({ length: item.stars }, (_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <div className="flex items-start gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[#e8f2ed]">
                    <ContentImage src={item.image} alt="" fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#122520]">{item.name}</p>
                    <p className="text-xs text-[#5a7a6f]">{item.handle}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#3d5a50] line-clamp-3">{item.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className={tone.cta}>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-3xl border border-[#7eb8a4]/40 bg-white/30 px-6 py-8 text-center backdrop-blur sm:px-10">
            <h2 className="text-2xl font-bold text-[#0f2320] sm:text-3xl">Ready to publish your profile and your best links?</h2>
            <p className="mt-2 text-sm text-[#1a3d36]">Sign in on any device—your session is remembered in this browser.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/register" className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold ${tone.action}`}>
                Get started
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#1a3531] bg-white/80 px-6 py-3 text-sm font-semibold text-[#0f2320] hover:bg-white">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default async function HomePage() {
  if (HOME_PAGE_OVERRIDE_ENABLED) {
    return <HomePageOverride />
  }

  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const taskFeed: TaskFeedItem[] = (
    await Promise.all(
      enabledTasks.map(async (task) => ({
        task,
        posts: await fetchTaskPosts(task.key, 8, { allowMockFallback: false, fresh: true }),
      }))
    )
  ).filter(({ posts }) => posts.length)

  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]
  const supportTasks = enabledTasks.filter((task) => task.key !== primaryTask?.key)
  const listingPosts = taskFeed.find(({ task }) => task.key === 'listing')?.posts || []
  const classifiedPosts = taskFeed.find(({ task }) => task.key === 'classified')?.posts || []
  const articlePosts = taskFeed.find(({ task }) => task.key === 'article')?.posts || []
  const imagePosts = taskFeed.find(({ task }) => task.key === 'image')?.posts || []
  const profilePosts = taskFeed.find(({ task }) => task.key === 'profile')?.posts || []
  const bookmarkPosts = taskFeed.find(({ task }) => task.key === 'sbm')?.posts || []

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-white text-foreground">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />
      {productKind === 'directory' ? (
        <DirectoryHome
          primaryTask={primaryTask}
          enabledTasks={enabledTasks}
          listingPosts={listingPosts}
          classifiedPosts={classifiedPosts}
          profilePosts={profilePosts}
          brandPack={recipe.brandPack}
        />
      ) : null}
      {productKind === 'editorial' ? (
        <EditorialHome primaryTask={primaryTask} articlePosts={articlePosts} supportTasks={supportTasks} />
      ) : null}
      {productKind === 'visual' ? (
        <VisualHome primaryTask={primaryTask} imagePosts={imagePosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      {productKind === 'curation' ? (
        <CurationHome primaryTask={primaryTask} bookmarkPosts={bookmarkPosts} profilePosts={profilePosts} />
      ) : null}
      <Footer />
    </div>
  )
}
