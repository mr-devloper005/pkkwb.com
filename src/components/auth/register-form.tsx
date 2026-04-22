'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sparkles, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'

const nexuz = {
  action: 'bg-[#1a3531] text-white hover:bg-[#0f2320]',
} as const

export function RegisterForm() {
  const { signup, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password) {
      toast({ title: 'Create account', description: 'Please complete all required fields.' })
      return
    }
    if (password.length < 4) {
      toast({ title: 'Password', description: 'Use at least 4 characters for this demo sign-up.' })
      return
    }
    try {
      await signup(name.trim(), email.trim(), password)
      toast({ title: 'Account ready', description: 'You are signed in. Your profile is stored locally in this browser.' })
      router.push('/')
      router.refresh()
    } catch {
      toast({ title: 'Sign up failed', description: 'Something went wrong. Please try again.' })
    }
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-1.5">
        <label htmlFor="reg-name" className="text-xs font-medium text-[#3d4a45]">Name</label>
        <Input
          id="reg-name"
          className="h-12 rounded-xl border-[#d4e5df] bg-white"
          autoComplete="name"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="reg-email" className="text-xs font-medium text-[#3d4a45]">Email</label>
        <Input
          id="reg-email"
          className="h-12 rounded-xl border-[#d4e5df] bg-white"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="reg-pass" className="text-xs font-medium text-[#3d4a45]">Password</label>
        <Input
          id="reg-pass"
          className="h-12 rounded-xl border-[#d4e5df] bg-white"
          type="password"
          autoComplete="new-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit" disabled={isLoading} className={`h-12 w-full rounded-full text-sm font-semibold ${nexuz.action}`}>
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create account'}
      </Button>
    </form>
  )
}

export function RegisterFormFooter({ mutedClass }: { mutedClass: string }) {
  return (
    <div className={`mt-6 flex items-center justify-between text-sm ${mutedClass}`}>
      <span>Already have an account?</span>
      <Link href="/login" className="inline-flex items-center gap-2 font-semibold hover:underline text-[#1a3531]">
        <Sparkles className="h-4 w-4" />
        Sign in
      </Link>
    </div>
  )
}
