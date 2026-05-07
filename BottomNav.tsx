'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, Search, User } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/search?source=&destination=', label: 'Search', icon: Search },
  { href: '/profile', label: 'Profile', icon: User },
]

export function BottomNav() {
  const pathname = usePathname()
  const isMobile = useIsMobile()

  if (!isMobile) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-muted shadow-lg md:hidden z-50">
      <div className="flex items-center justify-around h-20">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href.split('?')[0])

          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                isActive
                  ? 'text-primary border-t-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
