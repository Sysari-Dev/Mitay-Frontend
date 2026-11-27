'use client'

import Image from 'next/image'
import { useWatch } from 'react-hook-form'
import { UtensilsCrossed } from 'lucide-react'
import { dishPriceSchema, type DishFormInput } from '@mitay/core/catalog'
import { Card } from '@mitay/ui/atoms/card'
import { cn } from '@mitay/ui/lib/utils'
import { formatPEN } from '@mitay/utils'
import { categoriesFixture } from '@/modules/catalog/presentation/shared/fixtures/catalogFixture'

export function DishPreviewCard() {
  const [name, description, price, categoryId, imageUrl, isAvailable] = useWatch<
    DishFormInput,
    ['name', 'description', 'price', 'categoryId', 'imageUrl', 'isAvailable']
  >({ name: ['name', 'description', 'price', 'categoryId', 'imageUrl', 'isAvailable'] })
  const parsedPrice = dishPriceSchema.safeParse(price ?? '')
  const categoryName = categoriesFixture.find((category) => category.id === categoryId)?.name
  return (
    <Card className="overflow-hidden">
      <div className="bg-muted text-muted-foreground relative flex aspect-square items-center justify-center">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt=""
            fill
            unoptimized
            sizes="320px"
            className={cn('object-cover', !isAvailable && 'opacity-60 grayscale')}
          />
        ) : (
          <UtensilsCrossed aria-hidden className="size-10" />
        )}
        {!isAvailable && (
          <span className="bg-background/90 text-foreground absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs font-semibold">
            Agotado
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1 p-4">
        {categoryName && <span className="text-muted-foreground text-xs font-medium">{categoryName}</span>}
        <h3 className="font-sans text-base leading-snug font-semibold">{name?.trim() || 'Nombre del plato'}</h3>
        {description?.trim() && <p className="text-muted-foreground line-clamp-2 text-sm">{description}</p>}
        <p className="mt-1 text-base font-bold tabular-nums">{parsedPrice.success ? formatPEN(parsedPrice.data) : 'S/ —'}</p>
      </div>
    </Card>
  )
}
