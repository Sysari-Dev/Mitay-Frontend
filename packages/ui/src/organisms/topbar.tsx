import type { ReactNode } from 'react'

import { cn } from '@mitay/ui/lib/utils'

type TopbarProps = {
  leading?: ReactNode
  actions?: ReactNode
  className?: string
}

function Topbar({ leading, actions, className }: TopbarProps) {
  return (
    <header
      className={cn(
        'bg-background/95 border-border sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b px-4 backdrop-blur sm:px-6 lg:px-8',
        className,
      )}
    >
      {leading}
      <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">{actions}</div>
    </header>
  )
}

export { Topbar, type TopbarProps }
