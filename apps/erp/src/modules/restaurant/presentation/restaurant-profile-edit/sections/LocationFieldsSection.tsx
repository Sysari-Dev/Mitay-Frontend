'use client'

import { Controller, useFormContext } from 'react-hook-form'
import type { RestaurantProfileFormInput } from '@mitay/core/restaurant'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@mitay/ui/atoms/card'
import { Input } from '@mitay/ui/atoms/input'
import { Select } from '@mitay/ui/atoms/select'
import { FormField } from '@mitay/ui/molecules/form-field'
import { abancayDistrictsFixture } from '@/modules/restaurant/presentation/shared/fixtures/districtOptionsFixture'

const districtOptions = abancayDistrictsFixture.map((district) => ({ value: district.id, label: district.name }))

export function LocationFieldsSection() {
  const { control: formControl, register, formState } = useFormContext<RestaurantProfileFormInput>()
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Ubicación</CardTitle>
          <CardDescription>Desde aquí se calcula hasta dónde llegan tus envíos.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-5 sm:grid-cols-2">
        <FormField label="Distrito" error={formState.errors.districtId?.message}>
          {(control) => (
            <Controller
              control={formControl}
              name="districtId"
              render={({ field }) => (
                <Select
                  {...control}
                  ref={field.ref}
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                  onBlur={field.onBlur}
                  disabled={field.disabled}
                  options={districtOptions}
                  placeholder="Elige tu distrito"
                />
              )}
            />
          )}
        </FormField>
        <FormField
          label="Dirección"
          hint="Incluye una referencia para que te encuentren fácil."
          error={formState.errors.addressLine?.message}
          className="sm:col-span-2"
        >
          {(control) => (
            <Input
              {...control}
              {...register('addressLine')}
              autoComplete="street-address"
              placeholder="Ej. Jr. Lima 512, frente a la Plaza de Armas"
            />
          )}
        </FormField>
      </CardContent>
    </Card>
  )
}
