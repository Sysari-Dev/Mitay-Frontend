'use client'

import { useFormContext } from 'react-hook-form'
import type { RestaurantProfileFormInput } from '@mitay/core/restaurant'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@mitay/ui/atoms/card'
import { Input } from '@mitay/ui/atoms/input'
import { FormField } from '@mitay/ui/molecules/form-field'

export function OrderContactFieldsSection() {
  const { register, formState } = useFormContext<RestaurantProfileFormInput>()
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Pedidos y contacto</CardTitle>
          <CardDescription>A dónde te escriben tus clientes cuando hacen un pedido.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="WhatsApp de pedidos"
          hint="Aquí llegan las intenciones de pedido. Usa un número que revises siempre."
          error={formState.errors.whatsappPhone?.message}
        >
          {(control) => (
            <Input
              {...control}
              {...register('whatsappPhone')}
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={11}
              placeholder="987 654 321"
              startAddon="+51"
            />
          )}
        </FormField>
        <FormField
          label="Teléfono de contacto"
          isOptional
          hint="Para llamadas y consultas."
          error={formState.errors.contactPhone?.message}
        >
          {(control) => (
            <Input
              {...control}
              {...register('contactPhone')}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={12}
              placeholder="Fijo o celular"
            />
          )}
        </FormField>
      </CardContent>
    </Card>
  )
}
