import type { ComponentProps } from 'react'

import { cn } from '@mitay/ui/lib/utils'

function Skeleton({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn('bg-muted animate-pulse rounded-md motion-reduce:animate-none', className)}
      {...props}
    />
  )
}

export { Skeleton }
