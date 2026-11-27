'use client'

import Link from 'next/link'
import { FormProvider } from 'react-hook-form'
import { RotateCw, TriangleAlert } from 'lucide-react'
import { Button } from '@mitay/ui/atoms/button'
import { EmptyState } from '@mitay/ui/molecules/empty-state'
import { usePreviewState } from '@/shared/hooks/usePreviewState'
import { RestaurantScheduleBody } from '@/modules/restaurant/presentation/restaurant-schedule/RestaurantScheduleBody'
import { useWeeklyScheduleForm } from '@/modules/restaurant/presentation/restaurant-schedule/hooks/useWeeklyScheduleForm'
import { FormActionsBar } from '@/shared/components/FormActionsBar'

export function RestaurantScheduleContent() {
  const status = usePreviewState()
  const { form, onSubmit } = useWeeklyScheduleForm()
  if (status === 'loading') return <RestaurantScheduleBody isLoading />
  if (status === 'error') {
    return (
      <EmptyState
        tone="destructive"
        icon={<TriangleAlert />}
        title="No pudimos cargar tu horario"
        description="Revisa tu conexión a internet e inténtalo de nuevo."
        action={
          <Button asChild variant="outline" color="neutral">
            <Link href="/restaurant/schedule">
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
      <form noValidate onSubmit={onSubmit} aria-label="Horario semanal" className="flex flex-col gap-6">
        <RestaurantScheduleBody />
        <FormActionsBar isDirty={isDirty} isSubmitting={isSubmitting} onDiscard={() => form.reset()} />
      </form>
    </FormProvider>
  )
}
