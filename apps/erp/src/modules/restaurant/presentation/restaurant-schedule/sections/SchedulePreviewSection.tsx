'use client'

import { useWatch } from 'react-hook-form'
import { toWeeklySchedule, type WeeklyScheduleFormValues } from '@mitay/core/restaurant'
import { RestaurantPreviewCard } from '@/modules/restaurant/presentation/shared/components/RestaurantPreviewCard'
import { restaurantProfileFixture } from '@/modules/restaurant/presentation/shared/fixtures/restaurantProfileFixture'

function LivePreviewCard() {
  const days = useWatch<WeeklyScheduleFormValues, 'days'>({ name: 'days' })
  return <RestaurantPreviewCard profile={{ ...restaurantProfileFixture, schedule: toWeeklySchedule({ days }) }} />
}

export function SchedulePreviewSection({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <aside aria-labelledby="schedule-preview-title" className="flex flex-col gap-3 lg:sticky lg:top-24 lg:self-start">
      <div className="flex flex-col gap-0.5">
        <h2 id="schedule-preview-title" className="text-sm font-semibold">
          Así te verán
        </h2>
        <p className="text-muted-foreground text-xs">Cambia en vivo mientras editas el horario.</p>
      </div>
      {isLoading ? <RestaurantPreviewCard /> : <LivePreviewCard />}
    </aside>
  )
}
