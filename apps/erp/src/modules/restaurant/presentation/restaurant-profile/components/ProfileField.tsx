import type { ReactNode } from 'react'
import { Skeleton } from '@mitay/ui/atoms/skeleton'
import { cn } from '@mitay/ui/lib/utils'

type ProfileFieldProps = {
  label: string
  value: ReactNode
  hint?: string
  action?: ReactNode
  isLoading?: boolean
  isMonospace?: boolean
  className?: string
}

export function ProfileField({
  label,
  value,
  hint,
  action,
  isLoading = false,
  isMonospace = false,
  className,
}: ProfileFieldProps) {
  const isEmpty = value === null || value === undefined || value === ''
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <dt className="text-muted-foreground text-sm">{label}</dt>
      <dd className="flex min-h-5 flex-wrap items-center gap-x-3 gap-y-1">
        {isLoading ? (
          <Skeleton className="h-5 w-40 max-w-full" />
        ) : isEmpty ? (
          <span className="text-muted-foreground text-sm italic">Sin registrar</span>
        ) : (
          <span className={cn('text-sm font-medium break-words', isMonospace && 'font-mono tracking-tight')}>{value}</span>
        )}
        {!isLoading && action}
      </dd>
      {hint && <p className="text-muted-foreground text-xs">{hint}</p>}
    </div>
  )
}
