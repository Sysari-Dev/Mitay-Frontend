import { BadgeCheck } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@mitay/ui/atoms/card'
import { isValidRuc } from '@mitay/utils'
import { ProfileField } from '@/modules/restaurant/presentation/restaurant-profile/components/ProfileField'
import type { RestaurantProfile } from '@/modules/restaurant/presentation/shared/fixtures/restaurantProfileFixture'

export function BusinessInfoSection({ profile }: { profile?: RestaurantProfile }) {
  const isLoading = !profile
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Datos del negocio</CardTitle>
          <CardDescription>Cómo te presentas a tus clientes y tus datos ante SUNAT.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          <ProfileField
            label="Nombre comercial"
            value={profile?.tradeName}
            hint="Es el nombre que ven tus clientes."
            isLoading={isLoading}
          />
          <ProfileField label="Eslogan" value={profile?.slogan} isLoading={isLoading} />
          <ProfileField label="Razón social" value={profile?.businessName} isLoading={isLoading} />
          <ProfileField
            label="RUC"
            value={profile?.ruc}
            isMonospace
            isLoading={isLoading}
            action={
              profile &&
              isValidRuc(profile.ruc) && (
                <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
                  <BadgeCheck aria-hidden className="text-success size-4" />
                  RUC válido
                </span>
              )
            }
          />
        </dl>
      </CardContent>
    </Card>
  )
}
