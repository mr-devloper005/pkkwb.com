'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Search, User, Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'

const NavbarAuthControls = dynamic(
  () => import('@/components/shared/navbar-auth-controls').then((m) => m.NavbarAuthControls),
  { ssr: false, loading: () => null },
)

const shell = 'border-b border-[#d8ebe4] bg-white/95 text-[#1a2825] shadow-[0_1px_0_rgba(26,53,49,0.06)] backdrop-blur-xl'
const cta = 'rounded-full bg-[#1a3531] px-5 text-white hover:bg-[#0f2320]'
const ctaOutline = 'rounded-full border-2 border-[#1a3531] bg-white text-[#1a3531] hover:bg-[#c8f0e4]'

const nav = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Profiles', href: '/profile', icon: User },
  { name: 'Bookmarks', href: '/sbm', icon: Bookmark },
  { name: 'Contact', href: '/contact' },
] as const

export const NAVBAR_OVERRIDE_ENABLED = true

export function NavbarOverride() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header className={cn('sticky top-0 z-50 w-full', shell)}>
      <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#c8e8dc] bg-[#e8f8f0]">
            <img
              src="/favicon.png?v=20260422"
              alt=""
              width="40"
              height="40"
              className="h-full w-full origin-center scale-[1.38] object-contain object-center"
            />
          </div>
          <div className="min-w-0 text-left">
            <span className="block text-lg font-semibold tracking-tight text-[#1a3531]">{SITE_CONFIG.name}</span>
            <span className="hidden text-[9px] font-medium uppercase tracking-[0.2em] text-[#4a6b60] sm:block">
              {siteContent.navbar.tagline}
            </span>
          </div>
        </Link>

        <div className="hidden min-w-0 items-center justify-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                  active ? 'bg-[#1a3531] text-white' : 'text-[#3d5a50] hover:bg-[#c8f0e4]/60 hover:text-[#1a2825]',
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Button variant="ghost" size="icon" asChild className="hidden rounded-full sm:flex text-[#1a3531]">
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>
          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" asChild className="rounded-full text-[#1a3531]">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button size="sm" asChild className={cta}>
                <Link href="/register">Get started</Link>
              </Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[#d8ebe4] bg-white lg:hidden">
          <div className="space-y-1 px-4 py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold',
                  isActive(item.href) ? 'bg-[#1a3531] text-white' : 'text-[#2d3f39] hover:bg-[#e8f8f0]',
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/search" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm text-[#3d5a50]">
              <Search className="h-4 w-4" />
              Search
            </Link>
            {!isAuthenticated && (
              <div className="mt-2 flex flex-col gap-2 border-t border-[#eef6f1] pt-3">
                <Button variant="outline" asChild className={cn('w-full', ctaOutline)}>
                  <Link href="/register" onClick={() => setOpen(false)}>Get started</Link>
                </Button>
                <Button asChild className={cn('w-full', cta)}>
                  <Link href="/login" onClick={() => setOpen(false)}>Sign in</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
