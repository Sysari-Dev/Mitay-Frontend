import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@mitay/ui/atoms/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@mitay/ui/atoms/card'
import { ProfileField } from '@/modules/restaurant/presentation/restaurant-profile/components/ProfileField'
import type { RestaurantProfile } from '@/modules/restaurant/presentation/shared/fixtures/restaurantProfileFixture'

export function LocationSection({ profile }: { profile?: RestaurantProfile }) {
  const isLoading = !profile
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Ubicación</CardTitle>
          <CardDescription>Desde aquí se calcula hasta dónde llegan tus envíos.</CardDescription>
        </div>
        <Button asChild variant="link" color="neutral" size="sm">
          <Link href="/restaurant/delivery">
            Ver cobertura
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          <ProfileField label="Dirección" value={profile?.addressLine} isLoading={isLoading} />
          <ProfileField
            label="Distrito"
            value={profile && `${profile.district.name}, ${profile.district.provinceName}`}
            isLoading={isLoading}
          />
        </dl>
      </CardContent>
    </Card>
  )
}
