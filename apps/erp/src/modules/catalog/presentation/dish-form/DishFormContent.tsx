'use client'

import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { FormProvider } from 'react-hook-form'
import { RotateCw, SearchX, TriangleAlert } from 'lucide-react'
import { Button } from '@mitay/ui/atoms/button'
import { EmptyState } from '@mitay/ui/molecules/empty-state'
import { FormActionsBar } from '@/shared/components/FormActionsBar'
import { usePreviewState } from '@/shared/hooks/usePreviewState'
import { DishFormBody } from '@/modules/catalog/presentation/dish-form/DishFormBody'
import { useDishForm } from '@/modules/catalog/presentation/dish-form/hooks/useDishForm'
import { dishesFixture } from '@/modules/catalog/presentation/shared/fixtures/catalogFixture'

export type DishFormMode = 'create' | 'edit'

export function DishFormContent({ mode }: { mode: DishFormMode }) {
  const status = usePreviewState()
  const params = useParams<{ id?: string }>()
  const searchParams = useSearchParams()
  const dish = mode === 'edit' ? dishesFixture.find((item) => item.id === params.id) : undefined
  const { form, onSubmit } = useDishForm(dish, searchParams.get('category') ?? undefined)
  if (status === 'loading') return <DishFormBody isLoading />
  if (status === 'error') {
    return (
      <EmptyState
        tone="destructive"
        icon={<TriangleAlert />}
        title="No pudimos cargar el plato"
        description="Revisa tu conexión a internet e inténtalo de nuevo."
        action={
          <Button variant="outline" color="neutral" onClick={() => window.location.reload()}>
            <RotateCw aria-hidden />
            Reintentar
          </Button>
        }
      />
    )
  }
  if (mode === 'edit' && !dish) {
    return (
      <EmptyState
        icon={<SearchX />}
        title="No encontramos este plato"
        description="Puede que se haya eliminado de tu carta."
        action={
          <Button asChild variant="outline" color="neutral">
            <Link href="/catalog">Volver a Mi carta</Link>
          </Button>
        }
      />
    )
  }
  const { isDirty, isSubmitting } = form.formState
  const isCreating = mode === 'create'
  return (
    <FormProvider {...form}>
      <form
        noValidate
        onSubmit={onSubmit}
        aria-label={isCreating ? 'Nuevo plato' : 'Editar plato'}
        className="flex flex-col gap-6"
      >
        <DishFormBody />
        <FormActionsBar
          isDirty={isDirty}
          isSubmitting={isSubmitting}
          cancelHref="/catalog"
          submitLabel={isCreating ? 'Crear plato' : 'Guardar cambios'}
          idleMessage={isCreating ? 'Completa los datos del plato' : 'No hay cambios por guardar'}
        />
      </form>
    </FormProvider>
  )
}
