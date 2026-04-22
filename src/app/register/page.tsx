import { Bookmark, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'
import { RegisterForm, RegisterFormFooter } from '@/components/auth/register-form'
import { SITE_CONFIG } from '@/lib/site-config'

const nexuz = {
  shell: 'min-h-screen bg-white text-[#1a2825]',
  side: 'rounded-3xl border border-[#c8e8dc] bg-[#e8f8f0] p-8',
  panel: 'rounded-3xl border border-[#d4e5df] bg-white p-8 shadow-sm',
  muted: 'text-[#3d5a50]',
} as const

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const isCuration = productKind === 'curation'

  return (
    <div className={nexuz.shell}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className={nexuz.side}>
            <Bookmark className="h-8 w-8 text-[#1a3531]" />
            <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-[#122520] sm:text-4xl">
              {isCuration ? 'Create a profile and start saving the web' : 'Create your account'}
            </h1>
            <p className={`mt-5 text-sm leading-8 ${nexuz.muted}`}>
              {isCuration
                ? `Join ${SITE_CONFIG.name} to publish a public page and build bookmark shelves you can share.`
                : 'Set up your account to access the full experience.'}
            </p>
            <div className="mt-8 grid gap-3 text-sm text-[#2d3f39]">
              {['Profile and shelves in one place', 'No article or listing clutter—just people and links', 'Sign-up also signs you in; details stay in this browser'].map((t) => (
                <div key={t} className="rounded-2xl border border-[#1a3531]/10 bg-white/60 px-4 py-3.5">
                  {t}
                </div>
              ))}
            </div>
          </div>
          <div className={nexuz.panel}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1a3531]">Create account</p>
            <RegisterForm />
            <RegisterFormFooter mutedClass={nexuz.muted} />
            <p className={`mt-4 flex items-center gap-2 text-xs ${nexuz.muted}`}>
              <Sparkles className="h-3.5 w-3.5" />
              Your account is stored in local storage for this demo experience.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
