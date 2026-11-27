import { DishFormView } from '@/modules/catalog/presentation/dish-form/DishFormView'

export const metadata = { title: 'Editar plato' }

export default function Page() {
  return <DishFormView mode="edit" />
}
