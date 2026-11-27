import type { ReactNode } from 'react'
import { PageTabs, type PageTab } from '@/shared/components/PageTabs'

const restaurantTabs: PageTab[] = [
  { href: '/restaurant', label: 'Perfil' },
  { href: '/restaurant/schedule', label: 'Horario' },
  { href: '/restaurant/branding', label: 'Marca' },
  { href: '/restaurant/delivery', label: 'Cobertura' },
]

export function RestaurantPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Mi restaurante</h1>
        <p className="text-muted-foreground">Los datos que tus clientes ven en MITAY y a dónde te llegan los pedidos.</p>
      </header>
      <PageTabs tabs={restaurantTabs} label="Secciones de Mi restaurante" />
      {children}
    </div>
  )
}
