import { Skeleton } from '@mitay/ui/atoms/skeleton'

export function DishRowSkeletonList({ rows }: { rows: number }) {
  return (
    <ul aria-hidden className="divide-border flex flex-col divide-y">
      {Array.from({ length: rows }, (_, index) => (
        <li key={index} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
          <Skeleton className="size-14 shrink-0 rounded-lg sm:size-16" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3.5 w-64 max-w-full" />
          </div>
          <Skeleton className="h-6 w-11 shrink-0 rounded-full" />
        </li>
      ))}
    </ul>
  )
}
