import type { ReactNode } from 'react'
import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { cn } from '@/lib/utils'

/** Shared marketing layout: white + charcoal green + mint, consistent with the home page. */
export function NexuzPageShell({
  eyebrow,
  title,
  description,
  actions,
  children,
  mainClassName,
}: {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
  children: ReactNode
  mainClassName?: string
}) {
  return (
    <div className="min-h-screen bg-white text-[#1a2825]">
      <NavbarShell />
      <header className="border-b border-[#d8ebe4] bg-[linear-gradient(180deg,#ffffff_0%,#f0faf6_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {eyebrow ? (
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#1a3531]">{eyebrow}</p>
          ) : null}
          <div className="mt-2 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold tracking-[-0.04em] text-[#122520] sm:text-4xl lg:text-5xl">
                {title}
              </h1>
              {description ? (
                <p className="mt-4 text-base leading-7 text-[#3d5a50] sm:text-lg">{description}</p>
              ) : null}
            </div>
            {actions ? <div className="flex flex-shrink-0 flex-wrap gap-2">{actions}</div> : null}
          </div>
        </div>
      </header>
      <div className={cn('mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8', mainClassName)}>{children}</div>
      <Footer />
    </div>
  )
}

export function NexuzPanel({
  id,
  className,
  children,
  variant = 'default',
}: {
  id?: string
  className?: string
  children: ReactNode
  variant?: 'default' | 'soft' | 'dark' | 'quote' | 'mintCta'
}) {
  const base =
    variant === 'default'
      ? 'rounded-2xl border border-[#c8e8dc] bg-white shadow-sm'
      : variant === 'soft'
        ? 'rounded-2xl border border-[#d4efe6] bg-[#e8f8f0]'
        : variant === 'dark'
          ? 'rounded-2xl border border-[#1a3531] bg-[#1a3531] text-white'
          : variant === 'quote'
            ? 'rounded-2xl border border-[#d4d0e8] bg-[#edeaf5]'
            : 'rounded-2xl border border-[#7eb8a4]/50 bg-[#c5efe2]'

  return (
    <div id={id} className={cn('p-6 sm:p-8', base, className)}>
      {children}
    </div>
  )
}

export const nexuzProse = 'prose prose-sm max-w-none text-[#1a2825] prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[#122520] prose-p:text-[#3d5a50] prose-li:text-[#3d5a50] prose-a:text-[#1a3531] prose-a:font-semibold'

export function NexuzBreadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-[#5a7a6f]">
      {items.map((item, i) => (
        <span key={item.label} className="inline-flex items-center gap-2">
          {i > 0 && <span aria-hidden>/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-[#1a3531]">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#1a2825] font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
