import { Suspense } from 'react'
import { CatalogBody } from '@/modules/catalog/presentation/catalog/CatalogBody'
import { CatalogContent } from '@/modules/catalog/presentation/catalog/CatalogContent'

export function CatalogView() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <Suspense fallback={<CatalogBody />}>
        <CatalogContent />
      </Suspense>
    </div>
  )
}
