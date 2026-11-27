import type { ReactNode } from 'react'

import { cn } from '@mitay/ui/lib/utils'

type EmptyStateProps = {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
  tone?: 'neutral' | 'destructive'
  className?: string
}

function EmptyState({ title, description, icon, action, tone = 'neutral', className }: EmptyStateProps) {
  return (
    <div
      role={tone === 'destructive' ? 'alert' : undefined}
      className={cn(
        'border-border flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed px-6 py-14 text-center',
        className,
      )}
    >
      {icon && (
        <span
          aria-hidden
          className={cn(
            'flex size-12 items-center justify-center rounded-full [&_svg]:size-6',
            tone === 'destructive' ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground',
          )}
        >
          {icon}
        </span>
      )}
      <div className="flex max-w-sm flex-col gap-1">
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </div>
      {action}
    </div>
  )
}

export { EmptyState, type EmptyStateProps }
