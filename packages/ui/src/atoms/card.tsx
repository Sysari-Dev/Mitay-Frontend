import type { ComponentProps } from 'react'

import { cn } from '@mitay/ui/lib/utils'

function Card({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn('bg-card text-card-foreground border-border rounded-xl border', className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn('flex flex-wrap items-start justify-between gap-x-4 gap-y-2 p-5 sm:p-6', className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: ComponentProps<'h2'>) {
  return <h2 data-slot="card-title" className={cn('text-base font-semibold', className)} {...props} />
}

function CardDescription({ className, ...props }: ComponentProps<'p'>) {
  return <p data-slot="card-description" className={cn('text-muted-foreground text-sm', className)} {...props} />
}

function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('px-5 pb-5 sm:px-6 sm:pb-6', className)} {...props} />
}

export { Card, CardContent, CardDescription, CardHeader, CardTitle }
