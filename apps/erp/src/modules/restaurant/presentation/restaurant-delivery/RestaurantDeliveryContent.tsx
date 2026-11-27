'use client'

import Link from 'next/link'
import { FormProvider } from 'react-hook-form'
import { RotateCw, TriangleAlert } from 'lucide-react'
import { Button } from '@mitay/ui/atoms/button'
import { EmptyState } from '@mitay/ui/molecules/empty-state'
import { usePreviewState } from '@/shared/hooks/usePreviewState'
import { RestaurantDeliveryBody } from '@/modules/restaurant/presentation/restaurant-delivery/RestaurantDeliveryBody'
import { useRestaurantCoverageForm } from '@/modules/restaurant/presentation/restaurant-delivery/hooks/useRestaurantCoverageForm'
import { FormActionsBar } from '@/modules/restaurant/presentation/shared/components/FormActionsBar'

export function RestaurantDeliveryContent() {
  const status = usePreviewState()
  const { form, onSubmit } = useRestaurantCoverageForm()
  if (status === 'loading') return <RestaurantDeliveryBody isLoading />
  if (status === 'error') {
    return (
      <EmptyState
        tone="destructive"
        icon={<TriangleAlert />}
        title="No pudimos cargar tu cobertura"
        description="Revisa tu conexión a internet e inténtalo de nuevo."
        action={
          <Button asChild variant="outline" color="neutral">
            <Link href="/restaurant/delivery">
              <RotateCw aria-hidden />
              Reintentar
            </Link>
          </Button>
        }
      />
    )
  }
  const { isDirty, isSubmitting } = form.formState
  return (
    <FormProvider {...form}>
      <form noValidate onSubmit={onSubmit} aria-label="Cobertura de reparto" className="flex flex-col gap-6">
        <RestaurantDeliveryBody />
        <FormActionsBar isDirty={isDirty} isSubmitting={isSubmitting} onDiscard={() => form.reset()} />
      </form>
    </FormProvider>
  )
}
