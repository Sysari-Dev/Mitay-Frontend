import { MessageCircle } from 'lucide-react'
import { Button } from '@mitay/ui/atoms/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@mitay/ui/atoms/card'
import { formatPeruvianPhone, toWhatsAppUrl } from '@mitay/utils'
import { ProfileField } from '@/modules/restaurant/presentation/restaurant-profile/components/ProfileField'
import type { RestaurantProfile } from '@/modules/restaurant/presentation/shared/fixtures/restaurantProfileFixture'

export function OrderContactSection({ profile }: { profile?: RestaurantProfile }) {
  const isLoading = !profile
  const whatsAppUrl = profile ? toWhatsAppUrl(profile.whatsappPhone) : null
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Pedidos y contacto</CardTitle>
          <CardDescription>A dónde te escriben tus clientes cuando hacen un pedido.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          <ProfileField
            label="WhatsApp de pedidos"
            value={profile && formatPeruvianPhone(profile.whatsappPhone)}
            hint="Aquí llegan las intenciones de pedido de tus clientes."
            isLoading={isLoading}
            action={
              whatsAppUrl && (
                <Button asChild variant="link" size="sm">
                  <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle aria-hidden />
                    Probar
                  </a>
                </Button>
              )
            }
          />
          <ProfileField
            label="Teléfono de contacto"
            value={profile?.contactPhone && formatPeruvianPhone(profile.contactPhone)}
            hint="Opcional. Para llamadas y consultas."
            isLoading={isLoading}
          />
        </dl>
      </CardContent>
    </Card>
  )
}
