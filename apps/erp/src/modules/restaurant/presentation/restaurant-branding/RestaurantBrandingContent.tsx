'use client'

import Link from 'next/link'
import { FormProvider } from 'react-hook-form'
import { RotateCw, TriangleAlert } from 'lucide-react'
import { Button } from '@mitay/ui/atoms/button'
import { EmptyState } from '@mitay/ui/molecules/empty-state'
import { usePreviewState } from '@/shared/hooks/usePreviewState'
import { RestaurantBrandingBody } from '@/modules/restaurant/presentation/restaurant-branding/RestaurantBrandingBody'
import { useRestaurantBrandingForm } from '@/modules/restaurant/presentation/restaurant-branding/hooks/useRestaurantBrandingForm'
import { FormActionsBar } from '@/shared/components/FormActionsBar'

export function RestaurantBrandingContent() {
  const status = usePreviewState()
  const { form, onSubmit } = useRestaurantBrandingForm()
  if (status === 'loading') return <RestaurantBrandingBody isLoading />
  if (status === 'error') {
    return (
      <EmptyState
        tone="destructive"
        icon={<TriangleAlert />}
        title="No pudimos cargar tu marca"
        description="Revisa tu conexión a internet e inténtalo de nuevo."
        action={
          <Button asChild variant="outline" color="neutral">
            <Link href="/restaurant/branding">
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
      <form noValidate onSubmit={onSubmit} aria-label="Marca del restaurante" className="flex flex-col gap-6">
        <RestaurantBrandingBody />
        <FormActionsBar isDirty={isDirty} isSubmitting={isSubmitting} onDiscard={() => form.reset()} />
      </form>
    </FormProvider>
  )
}
