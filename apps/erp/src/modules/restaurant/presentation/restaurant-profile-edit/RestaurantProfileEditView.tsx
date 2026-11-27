import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@mitay/ui/atoms/button'
import { RestaurantProfileEditContent } from '@/modules/restaurant/presentation/restaurant-profile-edit/RestaurantProfileEditContent'

export function RestaurantProfileEditView() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 pt-6 sm:px-6 lg:px-8 lg:pt-8">
      <header className="flex flex-col gap-3">
        <Button asChild variant="link" color="neutral" size="sm" className="self-start">
          <Link href="/restaurant">
            <ArrowLeft aria-hidden />
            Mi restaurante
          </Link>
        </Button>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Editar perfil</h1>
        </div>
      </header>
      <RestaurantProfileEditContent />
    </div>
  )
}
