import { DishFormView } from '@/modules/catalog/presentation/dish-form/DishFormView'

export const metadata = { title: 'Nuevo plato' }

export default function Page() {
  return <DishFormView mode="create" />
}
