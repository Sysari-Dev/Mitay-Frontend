import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@mitay/ui/atoms/button'
import { DishFormBody } from '@/modules/catalog/presentation/dish-form/DishFormBody'
import { DishFormContent, type DishFormMode } from '@/modules/catalog/presentation/dish-form/DishFormContent'

export function DishFormView({ mode }: { mode: DishFormMode }) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 pt-6 sm:px-6 lg:px-8 lg:pt-8">
      <header className="flex flex-col gap-3">
        <Button asChild variant="link" color="neutral" size="sm" className="self-start">
          <Link href="/catalog">
            <ArrowLeft aria-hidden />
            Mi carta
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{mode === 'create' ? 'Nuevo plato' : 'Editar plato'}</h1>
      </header>
      <Suspense fallback={<DishFormBody isLoading />}>
        <DishFormContent mode={mode} />
      </Suspense>
    </div>
  )
}
