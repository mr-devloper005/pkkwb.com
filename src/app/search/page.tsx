import type { Metadata } from 'next'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG } from '@/lib/site-config'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { buildPageMetadata } from '@/lib/seo'
import { NexuzPageShell, NexuzPanel } from '@/components/nexuz/nexuz-page-shell'

export const revalidate = 3

export async function generateMetadata({ searchParams }: { searchParams?: Promise<{ q?: string }> }): Promise<Metadata> {
  const sp = (await searchParams) || {}
  const q = (sp.q || '').trim()
  return buildPageMetadata({
    path: '/search',
    title: q ? `Search: ${q}` : `Search — ${SITE_CONFIG.name}`,
    description: 'Search public profiles, bookmark collections, and saved resources across the site.',
  })
}

const matchText = (value: string, query: string) => value.toLowerCase().includes(query)
const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')

const compactText = (value: unknown) => {
  if (typeof value !== 'string') return ''
  return stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase()
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>
}) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster
      ? { fresh: true, category: category || undefined, task: task || undefined }
      : undefined
  )
  const posts =
    feed?.posts?.length
      ? feed.posts
      : useMaster
        ? []
        : SITE_CONFIG.tasks.filter((t) => t.enabled).flatMap((tk) => getMockPostsForTask(tk.key))

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === 'object' ? post.content : {}
    const typeText = compactText((content as { type?: string }).type)
    if (typeText === 'comment') return false
    const description = compactText((content as { description?: string }).description)
    const body = compactText((content as { body?: string }).body)
    const excerpt = compactText((content as { excerpt?: string }).excerpt)
    const categoryText = compactText((content as { category?: string }).category)
    const tags = Array.isArray(post.tags) ? post.tags.join(' ') : ''
    const tagsText = compactText(tags)
    const derivedCategory = categoryText || tagsText
    if (category && !derivedCategory.includes(category)) return false
    if (task && typeText && typeText !== task) return false
    if (!normalized.length) return true
    return (
      matchText(compactText(post.title || ''), normalized) ||
      matchText(compactText(post.summary || ''), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    )
  })

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24)

  return (
    <NexuzPageShell
      eyebrow="Search"
      title="Find a profile, shelf, or saved page"
      description="Search across the content you have enabled. Focus on how someone describes themselves, what a collection is named, and tags you use for shelves."
      actions={
        <form action="/search" className="flex w-full min-w-0 max-w-md flex-1 flex-col gap-2 sm:flex-row sm:items-center">
          <input type="hidden" name="master" value="1" />
          {category ? <input type="hidden" name="category" value={category} /> : null}
          {task ? <input type="hidden" name="task" value={task} /> : null}
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5a7a6f]" />
            <Input
              name="q"
              defaultValue={query}
              placeholder="Try a name, shelf title, or tag…"
              className="h-11 w-full min-w-0 border-[#d4e5df] pl-9"
            />
          </div>
          <Button type="submit" className="h-11 rounded-full bg-[#1a3531] text-white hover:bg-[#0f2320]">
            Search
          </Button>
        </form>
      }
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-[#e8f2ed] pb-4">
        <p className="text-sm text-[#3d5a50]">
          {query ? (
            <>
              Showing <span className="font-bold text-[#122520]">{results.length}</span> result{results.length === 1 ? '' : 's'} for
              <span className="ml-1 text-[#1a3531]">&ldquo;{query}&rdquo;</span>
            </>
          ) : (
            <>Enter a query above, or scroll the latest {results.length} surfaces we were able to load.</>
          )}
        </p>
        <div className="flex flex-wrap gap-2 text-xs font-medium">
          <span className="text-[#5a7a6f]">Quick entry:</span>
          <Link className="rounded-full border border-[#d4efe6] bg-[#f3faf7] px-2.5 py-1 text-[#1a3531] hover:bg-[#e8f8f0]" href="/profile">
            Profiles
          </Link>
          <Link className="rounded-full border border-[#d4efe6] bg-[#f3faf7] px-2.5 py-1 text-[#1a3531] hover:bg-[#e8f8f0]" href="/sbm">
            Bookmarks
          </Link>
        </div>
      </div>

      {results.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((post) => {
            const t = getPostTaskKey(post)
            const href = t ? buildPostUrl(t, post.slug) : `/posts/${post.slug}`
            return <TaskPostCard key={post.id} post={post} href={href} taskKey={t ?? undefined} />
          })}
        </div>
      ) : (
        <NexuzPanel variant="soft" className="text-center">
          <h3 className="text-lg font-bold text-[#122520]">No matches for that phrasing</h3>
          <p className="mt-2 text-sm text-[#3d5a50]">Try a shorter term, a handle without @, or browse profiles and shelves directly from the home page.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Button asChild className="rounded-full bg-[#1a3531] text-white" variant="default" size="sm">
              <Link href="/">Back home</Link>
            </Button>
            <Button asChild className="rounded-full border-2 border-[#1a3531]/20" size="sm" variant="ghost">
              <Link href="/help">Search tips</Link>
            </Button>
          </div>
        </NexuzPanel>
      )}
    </NexuzPageShell>
  )
}
