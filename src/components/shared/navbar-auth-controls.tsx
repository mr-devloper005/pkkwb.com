'use client'

import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'

export function NavbarAuthControls() {
  const { user, logout } = useAuth()

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {/* Profile button removed from UI */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={logout}
        className="hidden h-9 gap-1.5 rounded-full border-2 border-[#1a3531] bg-white px-3 text-xs font-semibold text-[#1a2825] hover:bg-[#e8f8f0] sm:inline-flex"
      >
        <LogOut className="h-3.5 w-3.5" />
        Sign out
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={logout}
        className="rounded-full text-[#1a2825] hover:bg-[#e8f8f0] sm:hidden"
        title="Sign out"
      >
        <LogOut className="h-5 w-5" />
        <span className="sr-only">Sign out</span>
      </Button>
    </div>
  )
}
