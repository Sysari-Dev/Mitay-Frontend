import type { ReactNode } from 'react'
import Link from 'next/link'
import { BookOpen, House, Megaphone, ReceiptText, Settings } from 'lucide-react'
import { ThemeToggle } from '@mitay/ui/molecules/theme-toggle'
import { type SidebarNavGroup } from '@mitay/ui/organisms/sidebar'
import { DashboardTemplate } from '@mitay/ui/templates/dashboard-template'
import { LayoutPlaceholder } from '@/shared/components/LayoutPlaceholder'

const erpNavigation: SidebarNavGroup[] = [
  {
    label: 'Operación',
    items: [
      { href: '/', label: 'Inicio', icon: <House /> },
      { href: '/orders', label: 'Pedidos', icon: <ReceiptText /> },
    ],
  },
  {
    label: 'Mi negocio',
    items: [
      { href: '/catalog', label: 'Mi carta', icon: <BookOpen /> },
      { href: '/campaigns', label: 'Campañas', icon: <Megaphone /> },
    ],
  },
  {
    label: 'Cuenta',
    items: [{ href: '/settings', label: 'Configuración', icon: <Settings /> }],
  },
]

function ErpBrand({ isCompact = false }: { isCompact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2 rounded-md">
      <span className="font-heading text-primary text-xl font-extrabold tracking-tight">MITAY</span>
      {!isCompact && <span className="bg-secondary/10 text-secondary rounded-md px-2 py-0.5 text-xs font-semibold">Restaurantes</span>}
    </Link>
  )
}

function RestaurantCard() {
  return (
    <div className="flex items-center gap-3 rounded-lg p-2">
      <LayoutPlaceholder label="" className="size-10 shrink-0 rounded-full" />
      <div className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-semibold">Tu restaurante</span>
        <span className="text-sidebar-foreground/60 truncate text-xs">Perfil y plan</span>
      </div>
    </div>
  )
}

function TopbarActions() {
  return (
    <>
      <LayoutPlaceholder label="Abierto / Cerrado" className="h-10 w-24 text-[0.625rem] sm:w-36 sm:text-xs" />
      <LayoutPlaceholder label="Avisos" className="size-10 rounded-full text-[0.625rem]" />
      <div className="hidden sm:block">
        <ThemeToggle />
      </div>
      <LayoutPlaceholder label="Usuario" className="size-10 rounded-full text-[0.625rem]" />
    </>
  )
}

export function ErpLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardTemplate
      brand={<ErpBrand />}
      mobileBrand={<ErpBrand isCompact />}
      navigation={erpNavigation}
      sidebarFooter={<RestaurantCard />}
      topbarActions={<TopbarActions />}
    >
      {children}
    </DashboardTemplate>
  )
}
