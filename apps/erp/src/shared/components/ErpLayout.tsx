import type { ReactNode } from 'react'
import Link from 'next/link'
import { BookOpen, CircleUserRound, House, Megaphone, ReceiptText, Store } from 'lucide-react'
import { ThemeToggle } from '@mitay/ui/molecules/theme-toggle'
import { type SidebarNavGroup } from '@mitay/ui/organisms/sidebar'
import { DashboardTemplate } from '@mitay/ui/templates/dashboard-template'
import { LayoutPlaceholder } from '@/shared/components/LayoutPlaceholder'

const erpNavigation: SidebarNavGroup[] = [
  {
    items: [{ href: '/', label: 'Inicio', icon: <House /> }],
  },
  {
    label: 'Mi negocio',
    items: [
      { href: '/restaurant', label: 'Mi restaurante', icon: <Store /> },
      { href: '/catalog', label: 'Mi carta', icon: <BookOpen /> },
      { href: '/campaigns', label: 'Campañas', icon: <Megaphone /> },
    ],
  },
  {
    label: 'Ventas',
    items: [{ href: '/orders', label: 'Pedidos', icon: <ReceiptText /> }],
  },
  {
    label: 'Cuenta',
    items: [{ href: '/account', label: 'Mi cuenta', icon: <CircleUserRound /> }],
  },
]

function RestaurantCard() {
  return (
    <Link
      href="/restaurant"
      title="Ver mi restaurante"
      className="hover:bg-sidebar-foreground/5 focus-visible:ring-sidebar-ring flex items-center gap-3 rounded-lg p-2 transition-colors outline-none focus-visible:ring-2 group-data-[state=collapsed]/sidebar:justify-center group-data-[state=collapsed]/sidebar:px-0"
    >
      <LayoutPlaceholder label="" className="size-10 shrink-0 rounded-full" />
      <div className="flex min-w-0 flex-col group-data-[state=collapsed]/sidebar:sr-only">
        <span className="truncate text-sm font-semibold">Tu restaurante</span>
        <span className="text-sidebar-foreground/60 truncate text-xs">Ver mi restaurante</span>
      </div>
    </Link>
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
      brand={{ title: 'MITAY', subtitle: 'Restaurantes', href: '/' }}
      navigation={erpNavigation}
      sidebarFooter={<RestaurantCard />}
      topbarActions={<TopbarActions />}
    >
      {children}
    </DashboardTemplate>
  )
}
