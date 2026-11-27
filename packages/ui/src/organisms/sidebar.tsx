'use client'

import { Suspense, type MouseEvent, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import { cn } from '@mitay/ui/lib/utils'
import { SidebarNavItem, type SidebarNavItemProps } from '@mitay/ui/molecules/sidebar-nav-item'

type SidebarLink = Omit<SidebarNavItemProps, 'isActive'>

type SidebarNavGroup = {
  label?: string
  items: SidebarLink[]
}

type SidebarProps = {
  brand: ReactNode
  navigation: SidebarNavGroup[]
  headerAction?: ReactNode
  footer?: ReactNode
  onNavigate?: () => void
  className?: string
}

function isActiveHref(pathname: string | null, href: string) {
  if (!pathname) return false
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

function SidebarNavGroups({ groups, pathname }: { groups: SidebarNavGroup[]; pathname: string | null }) {
  return (
    <div className="flex flex-col gap-6">
      {groups.map((group, index) => (
        <div key={group.label ?? index} className="flex flex-col gap-1">
          {group.label && (
            <p className="text-sidebar-foreground/60 px-3 pb-1 text-xs font-semibold tracking-wide uppercase">
              {group.label}
            </p>
          )}
          <ul className="flex flex-col gap-1">
            {group.items.map((item) => (
              <li key={item.href}>
                <SidebarNavItem {...item} isActive={isActiveHref(pathname, item.href)} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function ActiveSidebarNavGroups({ groups }: { groups: SidebarNavGroup[] }) {
  const pathname = usePathname()
  return <SidebarNavGroups groups={groups} pathname={pathname} />
}

function Sidebar({ brand, navigation, headerAction, footer, onNavigate, className }: SidebarProps) {
  function handleClick(event: MouseEvent<HTMLElement>) {
    if (onNavigate && (event.target as HTMLElement).closest('a')) onNavigate()
  }

  return (
    <div className={cn('bg-sidebar text-sidebar-foreground flex h-full flex-col', className)}>
      <div className="flex h-16 shrink-0 items-center justify-between gap-2 px-5">
        {brand}
        {headerAction}
      </div>
      <nav aria-label="Navegación principal" onClick={handleClick} className="flex-1 overflow-y-auto px-3 py-4">
        <Suspense fallback={<SidebarNavGroups groups={navigation} pathname={null} />}>
          <ActiveSidebarNavGroups groups={navigation} />
        </Suspense>
      </nav>
      {footer && <div className="shrink-0 p-3">{footer}</div>}
    </div>
  )
}

export { Sidebar, type SidebarLink, type SidebarNavGroup, type SidebarProps }
