'use client'

import { Controller, useFormContext, useWatch } from 'react-hook-form'
import {
  DISH_DESCRIPTION_MAX_LENGTH,
  DISH_NAME_MAX_LENGTH,
  sortCategories,
  type DishFormInput,
} from '@mitay/core/catalog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@mitay/ui/atoms/card'
import { Input } from '@mitay/ui/atoms/input'
import { Select } from '@mitay/ui/atoms/select'
import { Skeleton } from '@mitay/ui/atoms/skeleton'
import { Textarea } from '@mitay/ui/atoms/textarea'
import { FormField } from '@mitay/ui/molecules/form-field'
import { categoriesFixture } from '@/modules/catalog/presentation/shared/fixtures/catalogFixture'

const categoryOptions = sortCategories(categoriesFixture).map((category) => ({ value: category.id, label: category.name }))

function DishDetailsFields() {
  const { control, register, formState } = useFormContext<DishFormInput>()
  const description = useWatch({ control, name: 'description' }) ?? ''
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <FormField label="Nombre del plato" error={formState.errors.name?.message} className="sm:col-span-2">
        {(fieldControl) => (
          <Input
            {...fieldControl}
            {...register('name')}
            maxLength={DISH_NAME_MAX_LENGTH}
            placeholder="Ej. Lomo saltado"
            autoComplete="off"
          />
        )}
      </FormField>
      <FormField label="Precio" error={formState.errors.price?.message}>
        {(fieldControl) => (
          <Input
            {...fieldControl}
            {...register('price')}
            inputMode="decimal"
            autoComplete="off"
            placeholder="0.00"
            startAddon="S/"
            className="font-medium tabular-nums"
          />
        )}
      </FormField>
      <FormField label="Categoría" error={formState.errors.categoryId?.message}>
        {(fieldControl) => (
          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => (
              <Select
                {...fieldControl}
                ref={field.ref}
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
                options={categoryOptions}
                placeholder="Elige una categoría"
              />
            )}
          />
        )}
      </FormField>
      <FormField
        label="Descripción"
        isOptional
        hint="Ingredientes o acompañamientos. Ayuda a decidir."
        error={formState.errors.description?.message}
        counter={`${description.length}/${DISH_DESCRIPTION_MAX_LENGTH}`}
        className="sm:col-span-2"
      >
        {(fieldControl) => (
          <Textarea
            {...fieldControl}
            {...register('description')}
            rows={3}
            maxLength={DISH_DESCRIPTION_MAX_LENGTH}
            placeholder="Ej. Lomo fino salteado al wok con cebolla, tomate y papas fritas."
          />
        )}
      </FormField>
    </div>
  )
}

export function DishDetailsSection({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Información del plato</CardTitle>
          <CardDescription>Así lo verán tus clientes en la carta.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <Skeleton className="h-11 sm:col-span-2" />
            <Skeleton className="h-11" />
            <Skeleton className="h-11" />
            <Skeleton className="h-24 sm:col-span-2" />
          </div>
        ) : (
          <DishDetailsFields />
        )}
      </CardContent>
    </Card>
  )
}
