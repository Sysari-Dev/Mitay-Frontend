'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@mitay/ui/lib/utils'

export type PageTab = {
  href: string
  label: string
}

type PageTabsProps = {
  tabs: PageTab[]
  label: string
}

export function PageTabs({ tabs, label }: PageTabsProps) {
  const pathname = usePathname()
  return (
    <nav aria-label={label} className="border-border -mx-4 overflow-x-auto overflow-y-hidden border-b px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
      <ul className="flex gap-1">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'focus-visible:ring-ring relative inline-flex h-11 items-center rounded-t-md px-3 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2',
                  isActive
                    ? 'text-foreground after:bg-primary after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {tab.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
