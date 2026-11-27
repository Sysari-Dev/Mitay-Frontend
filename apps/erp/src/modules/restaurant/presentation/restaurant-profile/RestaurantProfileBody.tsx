import Link from 'next/link'
import { Pencil } from 'lucide-react'
import { Button } from '@mitay/ui/atoms/button'
import { Skeleton } from '@mitay/ui/atoms/skeleton'
import { BusinessInfoSection } from '@/modules/restaurant/presentation/restaurant-profile/sections/BusinessInfoSection'
import { LocationSection } from '@/modules/restaurant/presentation/restaurant-profile/sections/LocationSection'
import { OrderContactSection } from '@/modules/restaurant/presentation/restaurant-profile/sections/OrderContactSection'
import { RestaurantPreviewCard } from '@/modules/restaurant/presentation/shared/components/RestaurantPreviewCard'
import type { RestaurantProfile } from '@/modules/restaurant/presentation/shared/fixtures/restaurantProfileFixture'

const updatedAtFormatter = new Intl.DateTimeFormat('es-PE', { dateStyle: 'long', timeZone: 'America/Lima' })

export function RestaurantProfileBody({ profile }: { profile?: RestaurantProfile }) {
  const isLoading = !profile
  return (
    <div aria-busy={isLoading} className="flex flex-col gap-6">
      {isLoading && (
        <span role="status" className="sr-only">
          Cargando perfil
        </span>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {profile ? (
          <p className="text-muted-foreground text-sm">
            Última actualización: {updatedAtFormatter.format(new Date(profile.updatedAt))}
          </p>
        ) : (
          <Skeleton className="h-4 w-64" />
        )}
        {isLoading ? (
          <Button disabled>
            <Pencil aria-hidden />
            Editar perfil
          </Button>
        ) : (
          <Button asChild animated>
            <Link href="/restaurant/edit">
              <Pencil aria-hidden />
              Editar perfil
            </Link>
          </Button>
        )}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <BusinessInfoSection profile={profile} />
          <OrderContactSection profile={profile} />
          <LocationSection profile={profile} />
        </div>
        <aside aria-labelledby="restaurant-preview-title" className="flex flex-col gap-3 lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-col gap-0.5">
            <h2 id="restaurant-preview-title" className="text-sm font-semibold">
              Así te verán
            </h2>
            <p className="text-muted-foreground text-xs">Vista previa de tu tarjeta en la app de MITAY.</p>
          </div>
          <RestaurantPreviewCard profile={profile} />
        </aside>
      </div>
    </div>
  )
}
