'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'

const nexuz = {
  action: 'bg-[#1a3531] text-white hover:bg-[#0f2320]',
} as const

export function LoginForm() {
  const { login, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      toast({ title: 'Sign in', description: 'Please enter your email and password.' })
      return
    }
    try {
      await login(email.trim(), password)
      toast({ title: 'Welcome back', description: 'You are signed in. Your session is saved on this device.' })
      router.push('/')
      router.refresh()
    } catch {
      toast({ title: 'Sign in failed', description: 'Something went wrong. Please try again.' })
    }
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-1.5">
        <label htmlFor="login-email" className="text-xs font-medium text-[#3d4a45]">Email</label>
        <Input
          id="login-email"
          className="h-12 rounded-xl border-[#d4e5df] bg-white"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="login-password" className="text-xs font-medium text-[#3d4a45]">Password</label>
        <Input
          id="login-password"
          className="h-12 rounded-xl border-[#d4e5df] bg-white"
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit" disabled={isLoading} className={`h-12 w-full rounded-full text-sm font-semibold ${nexuz.action}`}>
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign in'}
      </Button>
    </form>
  )
}

export function LoginFormLinks({ mutedClass }: { mutedClass: string }) {
  return (
    <div className={`mt-6 flex items-center justify-between text-sm ${mutedClass}`}>
      <Link href="/forgot-password" className="hover:underline">Forgot password?</Link>
      <Link href="/register" className="inline-flex items-center gap-2 font-semibold hover:underline text-[#1a3531]">
        Create account
      </Link>
    </div>
  )
}
