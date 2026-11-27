'use client'

import { useState } from 'react'
import Link from 'next/link'
import { RotateCw, TriangleAlert } from 'lucide-react'
import { Button } from '@mitay/ui/atoms/button'
import { EmptyState } from '@mitay/ui/molecules/empty-state'
import { usePreviewState } from '@/shared/hooks/usePreviewState'
import { CatalogBody } from '@/modules/catalog/presentation/catalog/CatalogBody'
import { CategoryManagerDialog } from '@/modules/catalog/presentation/catalog/components/CategoryManagerDialog'
import { useCatalog } from '@/modules/catalog/presentation/catalog/hooks/useCatalog'

export function CatalogContent() {
  const status = usePreviewState()
  const catalog = useCatalog()
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false)
  if (status === 'loading') return <CatalogBody />
  if (status === 'error') {
    return (
      <EmptyState
        tone="destructive"
        icon={<TriangleAlert />}
        title="No pudimos cargar tu carta"
        description="Revisa tu conexión a internet e inténtalo de nuevo."
        action={
          <Button asChild variant="outline" color="neutral">
            <Link href="/catalog">
              <RotateCw aria-hidden />
              Reintentar
            </Link>
          </Button>
        }
      />
    )
  }
  return (
    <>
      <CatalogBody catalog={catalog} onManageCategories={() => setIsCategoryManagerOpen(true)} />
      <CategoryManagerDialog open={isCategoryManagerOpen} onOpenChange={setIsCategoryManagerOpen} catalog={catalog} />
    </>
  )
}
