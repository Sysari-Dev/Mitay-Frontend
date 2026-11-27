'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  toWeeklyScheduleForm,
  weeklyScheduleFormSchema,
  type WeeklyScheduleFormValues,
} from '@mitay/core/restaurant'
import { restaurantProfileFixture } from '@/modules/restaurant/presentation/shared/fixtures/restaurantProfileFixture'

const SIMULATED_SAVE_DELAY_MS = 900

export function useWeeklyScheduleForm() {
  const form = useForm<WeeklyScheduleFormValues>({
    resolver: zodResolver(weeklyScheduleFormSchema),
    defaultValues: toWeeklyScheduleForm(restaurantProfileFixture.schedule),
    mode: 'onTouched',
  })
  const onSubmit = form.handleSubmit(async (values) => {
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_SAVE_DELAY_MS))
    form.reset(values)
  })
  return { form, onSubmit }
}
