import type { ReactNode } from 'react'
import Link from 'next/link'

import { cn } from '@mitay/ui/lib/utils'

type SidebarNavItemProps = {
  href: string
  label: string
  icon?: ReactNode
  isActive?: boolean
}

function SidebarNavItem({ href, label, icon, isActive = false }: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      title={label}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'focus-visible:ring-sidebar-ring flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors outline-none focus-visible:ring-2 group-data-[state=collapsed]/sidebar:justify-center group-data-[state=collapsed]/sidebar:px-0',
        isActive
          ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold'
          : 'text-sidebar-foreground/75 hover:bg-sidebar-foreground/5 hover:text-sidebar-foreground font-medium',
      )}
    >
      <span
        aria-hidden
        className={cn(
          'flex size-5 shrink-0 items-center justify-center [&_svg]:size-5',
          isActive ? 'text-sidebar-primary' : 'opacity-70',
        )}
      >
        {icon}
      </span>
      <span className="truncate group-data-[state=collapsed]/sidebar:sr-only">{label}</span>
    </Link>
  )
}

export { SidebarNavItem, type SidebarNavItemProps }
