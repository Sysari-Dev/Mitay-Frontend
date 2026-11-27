'use client'

import { FormProvider } from 'react-hook-form'
import { useRestaurantProfileForm } from '@/modules/restaurant/presentation/restaurant-profile-edit/hooks/useRestaurantProfileForm'
import { BusinessInfoFieldsSection } from '@/modules/restaurant/presentation/restaurant-profile-edit/sections/BusinessInfoFieldsSection'
import { LocationFieldsSection } from '@/modules/restaurant/presentation/restaurant-profile-edit/sections/LocationFieldsSection'
import { OrderContactFieldsSection } from '@/modules/restaurant/presentation/restaurant-profile-edit/sections/OrderContactFieldsSection'
import { FormActionsBar } from '@/shared/components/FormActionsBar'

export function RestaurantProfileEditContent() {
  const { form, onSubmit } = useRestaurantProfileForm()
  const { isDirty, isSubmitting } = form.formState
  return (
    <FormProvider {...form}>
      <form noValidate onSubmit={onSubmit} aria-label="Editar perfil del restaurante" className="flex flex-col gap-6">
        <BusinessInfoFieldsSection />
        <OrderContactFieldsSection />
        <LocationFieldsSection />
        <FormActionsBar isDirty={isDirty} isSubmitting={isSubmitting} cancelHref="/restaurant" />
      </form>
    </FormProvider>
  )
}
