'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { Menu, X } from 'lucide-react'

import { Button } from '@mitay/ui/atoms/button'
import { Sidebar, type SidebarNavGroup } from '@mitay/ui/organisms/sidebar'
import { Topbar } from '@mitay/ui/organisms/topbar'

type DashboardTemplateProps = {
  brand: ReactNode
  mobileBrand?: ReactNode
  navigation: SidebarNavGroup[]
  sidebarFooter?: ReactNode
  topbarActions?: ReactNode
  children: ReactNode
}

function DashboardTemplate({
  brand,
  mobileBrand,
  navigation,
  sidebarFooter,
  topbarActions,
  children,
}: DashboardTemplateProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isMenuOpen) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  return (
    <div className="bg-background text-foreground flex min-h-dvh w-full">
      <aside className="border-sidebar-border sticky top-0 hidden h-dvh w-64 shrink-0 border-r lg:block">
        <Sidebar brand={brand} navigation={navigation} footer={sidebarFooter} />
      </aside>
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div aria-hidden onClick={() => setIsMenuOpen(false)} className="bg-foreground/40 absolute inset-0" />
          <aside id="dashboard-mobile-menu" className="absolute inset-y-0 left-0 w-72 max-w-[85vw] shadow-xl">
            <Sidebar
              brand={brand}
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
              {mobileBrand ?? brand}
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
