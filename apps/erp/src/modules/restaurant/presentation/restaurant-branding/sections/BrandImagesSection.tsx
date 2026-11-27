'use client'

import { BRAND_IMAGE_ACCEPTED_TYPES, BRAND_IMAGE_MAX_BYTES } from '@mitay/core/restaurant'
import { formatMegabytes } from '@mitay/core/shared-kernel'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@mitay/ui/atoms/card'
import { Skeleton } from '@mitay/ui/atoms/skeleton'
import { ImageDropzone } from '@mitay/ui/organisms/image-dropzone'
import { useBrandImageField } from '@/modules/restaurant/presentation/restaurant-branding/hooks/useBrandImageField'

function LogoField() {
  const logo = useBrandImageField('logo')
  return (
    <ImageDropzone
      label="Logo"
      hint={`Cuadrado, mínimo 400 × 400 px. JPG, PNG o WebP de hasta ${formatMegabytes(BRAND_IMAGE_MAX_BYTES.logo)}.`}
      accept={BRAND_IMAGE_ACCEPTED_TYPES}
      previewUrl={logo.previewUrl}
      onFileAccepted={logo.accept}
      onRemove={logo.remove}
      validate={logo.validate}
      aspect="square"
      className="max-w-44"
    />
  )
}

function BannerField() {
  const banner = useBrandImageField('banner')
  return (
    <ImageDropzone
      label="Portada"
      hint={`Horizontal 16:9, mínimo 1280 × 720 px. Hasta ${formatMegabytes(BRAND_IMAGE_MAX_BYTES.banner)}.`}
      accept={BRAND_IMAGE_ACCEPTED_TYPES}
      previewUrl={banner.previewUrl}
      onFileAccepted={banner.accept}
      onRemove={banner.remove}
      validate={banner.validate}
      aspect="video"
    />
  )
}

export function BrandImagesSection({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Logo y portada</CardTitle>
          <CardDescription>Son lo primero que ven tus clientes en la app y en el directorio.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-[11rem_1fr]">
        {isLoading ? (
          <>
            <Skeleton className="aspect-square w-full rounded-xl" />
            <Skeleton className="aspect-video w-full rounded-xl" />
          </>
        ) : (
          <>
            <LogoField />
            <BannerField />
          </>
        )}
      </CardContent>
    </Card>
  )
}
