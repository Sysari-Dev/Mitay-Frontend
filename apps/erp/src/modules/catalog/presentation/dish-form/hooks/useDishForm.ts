'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  centsToPriceInput,
  dishFormSchema,
  type Dish,
  type DishFormInput,
  type DishFormValues,
} from '@mitay/core/catalog'

const SIMULATED_SAVE_DELAY_MS = 900

const EMPTY_DISH_FORM: DishFormInput = {
  name: '',
  description: '',
  price: '',
  categoryId: '',
  imageUrl: null,
  isAvailable: true,
}

function toDishFormInput(dish: Dish): DishFormInput {
  return {
    name: dish.name,
    description: dish.description ?? '',
    price: centsToPriceInput(dish.priceCents),
    categoryId: dish.categoryId,
    imageUrl: dish.imageUrl,
    isAvailable: dish.isAvailable,
  }
}

export function useDishForm(dish?: Dish, initialCategoryId?: string) {
  const router = useRouter()
  const form = useForm<DishFormInput, unknown, DishFormValues>({
    resolver: zodResolver(dishFormSchema),
    defaultValues: dish ? toDishFormInput(dish) : { ...EMPTY_DISH_FORM, categoryId: initialCategoryId ?? '' },
    mode: 'onTouched',
  })
  const onSubmit = form.handleSubmit(async () => {
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_SAVE_DELAY_MS))
    router.push('/catalog')
  })
  return { form, onSubmit }
}
