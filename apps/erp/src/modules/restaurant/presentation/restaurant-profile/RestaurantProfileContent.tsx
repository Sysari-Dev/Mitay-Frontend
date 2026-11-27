'use client'

import Link from 'next/link'
import { RotateCw, Store, TriangleAlert } from 'lucide-react'
import { Button } from '@mitay/ui/atoms/button'
import { EmptyState } from '@mitay/ui/molecules/empty-state'
import { RestaurantProfileBody } from '@/modules/restaurant/presentation/restaurant-profile/RestaurantProfileBody'
import { useRestaurantProfile } from '@/modules/restaurant/presentation/restaurant-profile/hooks/useRestaurantProfile'

export function RestaurantProfileContent() {
  const result = useRestaurantProfile()
  if (result.status === 'error') {
    return (
      <EmptyState
        tone="destructive"
        icon={<TriangleAlert />}
        title="No pudimos cargar tu perfil"
        description="Revisa tu conexión a internet e inténtalo de nuevo."
        action={
          <Button asChild variant="outline" color="neutral">
            <Link href="/restaurant">
              <RotateCw aria-hidden />
              Reintentar
            </Link>
          </Button>
        }
      />
    )
  }
  if (result.status === 'empty') {
    return (
      <EmptyState
        icon={<Store />}
        title="Tu restaurante aún no tiene perfil"
        description="Completa tus datos para que los clientes puedan encontrarte y enviarte pedidos por WhatsApp."
        action={
          <Button asChild animated>
            <Link href="/restaurant/edit">Completar perfil</Link>
          </Button>
        }
      />
    )
  }
  return <RestaurantProfileBody profile={result.status === 'ready' ? result.profile : undefined} />
}
