'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import { CircleCheck, TriangleAlert } from 'lucide-react'
import { getBrandColorContrast, HEX_COLOR_PATTERN, type RestaurantBrandingFormValues } from '@mitay/core/restaurant'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@mitay/ui/atoms/card'
import { Input } from '@mitay/ui/atoms/input'
import { Skeleton } from '@mitay/ui/atoms/skeleton'
import { FormField } from '@mitay/ui/molecules/form-field'
import { BrandColorSwatches } from '@/modules/restaurant/presentation/restaurant-branding/components/BrandColorSwatches'

const FALLBACK_PICKER_COLOR = '#000000'

function BrandColorFields() {
  const { control, register, setValue, formState } = useFormContext<RestaurantBrandingFormValues>()
  const brandColor = useWatch({ control, name: 'brandColor' })
  const contrast = getBrandColorContrast(brandColor)
  const selectColor = (color: string) => setValue('brandColor', color, { shouldDirty: true, shouldValidate: true })
  return (
    <div className="flex flex-col gap-5">
      <BrandColorSwatches value={brandColor} onSelect={selectColor} />
      <FormField label="Color personalizado" error={formState.errors.brandColor?.message} className="max-w-xs">
        {(fieldControl) => (
          <Input
            {...fieldControl}
            {...register('brandColor')}
            autoComplete="off"
            spellCheck={false}
            maxLength={7}
            placeholder="#c2410c"
            startAddon={
              <input
                type="color"
                aria-label="Elegir color en la paleta"
                value={HEX_COLOR_PATTERN.test(brandColor) ? brandColor : FALLBACK_PICKER_COLOR}
                onChange={(event) => selectColor(event.target.value)}
                className="border-border size-7 cursor-pointer appearance-none rounded-md border bg-transparent p-0 [&::-moz-color-swatch]:rounded-md [&::-moz-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch-wrapper]:p-0"
              />
            }
          />
        )}
      </FormField>
      {contrast && (
        <p role="status" className="flex items-start gap-2 text-sm">
          {contrast.isReadable ? (
            <CircleCheck aria-hidden className="text-success mt-0.5 size-4 shrink-0" />
          ) : (
            <TriangleAlert aria-hidden className="text-warning mt-0.5 size-4 shrink-0" />
          )}
          <span>
            {contrast.isReadable
              ? 'Buen contraste: el texto de tus botones se lee bien sobre este color.'
              : 'Poco contraste: el texto de tus botones costará leerse. Prueba un tono más oscuro o más claro.'}
          </span>
        </p>
      )}
    </div>
  )
}

export function BrandColorSection({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Color de marca</CardTitle>
          <CardDescription>Se usa en tu tarjeta, en tus botones y en tus campañas.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col gap-5">
            <div className="flex gap-3">
              {Array.from({ length: 9 }, (_, index) => (
                <Skeleton key={index} className="size-9 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-11 w-full max-w-xs" />
          </div>
        ) : (
          <BrandColorFields />
        )}
      </CardContent>
    </Card>
  )
}
