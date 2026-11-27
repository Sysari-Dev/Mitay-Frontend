import { SchedulePreviewSection } from '@/modules/restaurant/presentation/restaurant-schedule/sections/SchedulePreviewSection'
import { WeeklyScheduleSection } from '@/modules/restaurant/presentation/restaurant-schedule/sections/WeeklyScheduleSection'

export function RestaurantScheduleBody({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {isLoading && (
        <span role="status" className="sr-only">
          Cargando horario
        </span>
      )}
      <div className="lg:col-span-2">
        <WeeklyScheduleSection isLoading={isLoading} />
      </div>
      <SchedulePreviewSection isLoading={isLoading} />
    </div>
  )
}
