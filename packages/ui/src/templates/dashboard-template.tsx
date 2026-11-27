'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { Menu, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react'

import { Button } from '@mitay/ui/atoms/button'
import { useSidebarCollapsed } from '@mitay/ui/hooks/use-sidebar-collapsed'
import { AppBrand, type AppBrandProps } from '@mitay/ui/molecules/app-brand'
import { Sidebar, type SidebarNavGroup } from '@mitay/ui/organisms/sidebar'
import { Topbar } from '@mitay/ui/organisms/topbar'

type DashboardTemplateProps = {
  brand: AppBrandProps
  navigation: SidebarNavGroup[]
  sidebarFooter?: ReactNode
  topbarActions?: ReactNode
  children: ReactNode
}

function DashboardTemplate({
  brand,
  navigation,
  sidebarFooter,
  topbarActions,
  children,
}: DashboardTemplateProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isCollapsed, toggleCollapsed } = useSidebarCollapsed()

  useEffect(() => {
    if (!isMenuOpen) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null
      const isTyping = target?.closest('input, textarea, select, [contenteditable="true"]')
      if (!isTyping && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'b') {
        event.preventDefault()
        toggleCollapsed()
      }
    }
    document.addEventListener('keydown', handleShortcut)
    return () => document.removeEventListener('keydown', handleShortcut)
  }, [toggleCollapsed])

  return (
    <div className="bg-background text-foreground flex min-h-dvh w-full">
      <aside
        id="dashboard-sidebar"
        data-state={isCollapsed ? 'collapsed' : 'expanded'}
        className="border-sidebar-border sticky top-0 hidden h-dvh w-64 shrink-0 border-r transition-[width] duration-200 motion-reduce:transition-none data-[state=collapsed]:w-18 lg:block"
      >
        <Sidebar
          brand={<AppBrand {...brand} />}
          navigation={navigation}
          footer={sidebarFooter}
          isCollapsed={isCollapsed}
          headerAction={
            <Button
              variant="ghost"
              color="neutral"
              size="icon"
              title={isCollapsed ? 'Expandir menú (Ctrl + B)' : 'Contraer menú (Ctrl + B)'}
              aria-label={isCollapsed ? 'Expandir menú' : 'Contraer menú'}
              aria-expanded={!isCollapsed}
              aria-controls="dashboard-sidebar"
              aria-keyshortcuts="Control+B"
              onClick={toggleCollapsed}
              className="text-sidebar-foreground/70 hover:text-sidebar-foreground"
            >
              {isCollapsed ? <PanelLeftOpen className="size-5" /> : <PanelLeftClose className="size-5" />}
            </Button>
          }
        />
      </aside>
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div aria-hidden onClick={() => setIsMenuOpen(false)} className="bg-foreground/40 absolute inset-0" />
          <aside id="dashboard-mobile-menu" className="absolute inset-y-0 left-0 w-72 max-w-[85vw] shadow-xl">
            <Sidebar
              brand={<AppBrand {...brand} />}
              navigation={navigation}
              footer={sidebarFooter}
              onNavigate={() => setIsMenuOpen(false)}
              headerAction={
                <Button
                  variant="ghost"
                  color="neutral"
                  size="icon-lg"
                  aria-label="Cerrar menú"
                  onClick={() => setIsMenuOpen(false)}
                  className="-mr-2"
                >
                  <X />
                </Button>
              }
            />
          </aside>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          leading={
            <div className="flex min-w-0 items-center gap-3 lg:hidden">
              <Button
                variant="ghost"
                color="neutral"
                size="icon-lg"
                aria-label="Abrir menú"
                aria-expanded={isMenuOpen}
                aria-controls="dashboard-mobile-menu"
                onClick={() => setIsMenuOpen(true)}
                className="-ml-2"
              >
                <Menu />
              </Button>
              <AppBrand {...brand} subtitle={undefined} isTextHiddenOnMobile />
            </div>
          }
          actions={topbarActions}
        />
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </div>
  )
}

export { DashboardTemplate, type DashboardTemplateProps }
