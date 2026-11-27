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
  isCollapsed?: boolean
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
            <>
              <p className="text-sidebar-foreground/60 px-3 pb-1 text-xs font-semibold tracking-wide uppercase group-data-[state=collapsed]/sidebar:hidden">
                {group.label}
              </p>
              <div aria-hidden className="bg-sidebar-border mx-auto mb-1 hidden h-px w-8 group-data-[state=collapsed]/sidebar:block" />
            </>
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

function Sidebar({
  brand,
  navigation,
  headerAction,
  footer,
  isCollapsed = false,
  onNavigate,
  className,
}: SidebarProps) {
  function handleClick(event: MouseEvent<HTMLElement>) {
    if (onNavigate && (event.target as HTMLElement).closest('a')) onNavigate()
  }

  return (
    <div
      data-state={isCollapsed ? 'collapsed' : 'expanded'}
      className={cn('group/sidebar bg-sidebar text-sidebar-foreground flex h-full flex-col', className)}
    >
      <div className="group/header relative flex h-16 shrink-0 items-center justify-between gap-2 pr-3 pl-5 group-data-[state=collapsed]/sidebar:justify-center group-data-[state=collapsed]/sidebar:px-0">
        <div className="min-w-0 transition-opacity group-data-[state=collapsed]/sidebar:group-focus-within/header:opacity-0 group-data-[state=collapsed]/sidebar:group-hover/header:opacity-0">
          {brand}
        </div>
        {headerAction && (
          <div className="shrink-0 transition-opacity group-data-[state=collapsed]/sidebar:absolute group-data-[state=collapsed]/sidebar:inset-0 group-data-[state=collapsed]/sidebar:flex group-data-[state=collapsed]/sidebar:items-center group-data-[state=collapsed]/sidebar:justify-center group-data-[state=collapsed]/sidebar:opacity-0 group-data-[state=collapsed]/sidebar:group-focus-within/header:opacity-100 group-data-[state=collapsed]/sidebar:group-hover/header:opacity-100">
            {headerAction}
          </div>
        )}
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
