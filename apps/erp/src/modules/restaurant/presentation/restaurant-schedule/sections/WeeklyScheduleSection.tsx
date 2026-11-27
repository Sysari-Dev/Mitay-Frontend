import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@mitay/ui/atoms/card'
import { Skeleton } from '@mitay/ui/atoms/skeleton'
import { DayScheduleRow } from '@/modules/restaurant/presentation/restaurant-schedule/components/DayScheduleRow'

const DAYS_IN_WEEK = 7

function DayScheduleRowSkeleton() {
  return (
    <li className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:gap-6">
      <div className="flex items-center gap-3 sm:w-40">
        <Skeleton className="h-6 w-11 rounded-full" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-11 w-full max-w-80" />
    </li>
  )
}

export function WeeklyScheduleSection({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Horario semanal</CardTitle>
          <CardDescription>Puedes tener hasta 3 turnos por día, como almuerzo y cena.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ul aria-busy={isLoading} className="divide-border flex flex-col divide-y">
          {Array.from({ length: DAYS_IN_WEEK }, (_, dayIndex) =>
            isLoading ? <DayScheduleRowSkeleton key={dayIndex} /> : <DayScheduleRow key={dayIndex} dayIndex={dayIndex} />,
          )}
        </ul>
      </CardContent>
    </Card>
  )
}
