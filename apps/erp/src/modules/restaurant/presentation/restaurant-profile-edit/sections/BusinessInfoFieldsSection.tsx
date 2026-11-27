'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import { RESTAURANT_SLOGAN_MAX_LENGTH, type RestaurantProfileFormInput } from '@mitay/core/restaurant'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@mitay/ui/atoms/card'
import { Input } from '@mitay/ui/atoms/input'
import { Textarea } from '@mitay/ui/atoms/textarea'
import { FormField } from '@mitay/ui/molecules/form-field'
import { isValidRuc } from '@mitay/utils'

export function BusinessInfoFieldsSection() {
  const { register, getFieldState, formState } = useFormContext<RestaurantProfileFormInput>()
  const [ruc = '', slogan = ''] = useWatch<RestaurantProfileFormInput, ['ruc', 'slogan']>({ name: ['ruc', 'slogan'] })
  const rucState = getFieldState('ruc', formState)
  const rucSuccess = rucState.isTouched && !rucState.invalid && isValidRuc(ruc) ? 'RUC válido' : undefined
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Datos del negocio</CardTitle>
          <CardDescription>Cómo te presentas a tus clientes y tus datos ante SUNAT.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="Nombre comercial"
          hint="Es el nombre que ven tus clientes."
          error={formState.errors.tradeName?.message}
        >
          {(control) => (
            <Input {...control} {...register('tradeName')} autoComplete="organization" placeholder="Ej. Picantería Doña Juana" />
          )}
        </FormField>
        <FormField label="RUC" error={formState.errors.ruc?.message} success={rucSuccess}>
          {(control) => (
            <Input
              {...control}
              {...register('ruc')}
              inputMode="numeric"
              maxLength={11}
              autoComplete="off"
              placeholder="11 dígitos"
            />
          )}
        </FormField>
        <FormField
          label="Razón social"
          hint="Tal como figura en SUNAT."
          error={formState.errors.businessName?.message}
          className="sm:col-span-2"
        >
          {(control) => <Input {...control} {...register('businessName')} placeholder="Ej. Inversiones Doña Juana S.A.C." />}
        </FormField>
        <FormField
          label="Eslogan"
          isOptional
          hint="Una frase corta que te distinga."
          error={formState.errors.slogan?.message}
          counter={`${slogan.length}/${RESTAURANT_SLOGAN_MAX_LENGTH}`}
          className="sm:col-span-2"
        >
          {(control) => (
            <Textarea
              {...control}
              {...register('slogan')}
              rows={2}
              maxLength={RESTAURANT_SLOGAN_MAX_LENGTH}
              placeholder="Ej. Sabor apurimeño desde 1998"
            />
          )}
        </FormField>
      </CardContent>
    </Card>
  )
}
