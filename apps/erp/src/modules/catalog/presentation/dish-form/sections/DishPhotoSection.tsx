'use client'

import { DISH_IMAGE_MAX_BYTES, validateDishImage, type DishFormInput } from '@mitay/core/catalog'
import { formatMegabytes, IMAGE_ACCEPTED_TYPES } from '@mitay/core/shared-kernel'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@mitay/ui/atoms/card'
import { Skeleton } from '@mitay/ui/atoms/skeleton'
import { ImageDropzone } from '@mitay/ui/organisms/image-dropzone'
import { useLocalImageField } from '@/shared/hooks/useLocalImageField'

function DishPhotoField() {
  const photo = useLocalImageField<DishFormInput, 'imageUrl'>('imageUrl')
  return (
    <ImageDropzone
      label="Foto"
      hint={`Cuadrada, con buena luz y el plato al centro. JPG, PNG o WebP de hasta ${formatMegabytes(DISH_IMAGE_MAX_BYTES)}.`}
      accept={IMAGE_ACCEPTED_TYPES}
      previewUrl={photo.previewUrl}
      onFileAccepted={photo.accept}
      onRemove={photo.remove}
      validate={validateDishImage}
      aspect="square"
      className="max-w-56"
    />
  )
}

export function DishPhotoSection({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Foto referencial</CardTitle>
          <CardDescription>Los platos con foto reciben más pedidos.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>{isLoading ? <Skeleton className="aspect-square w-full max-w-56 rounded-xl" /> : <DishPhotoField />}</CardContent>
    </Card>
  )
}
