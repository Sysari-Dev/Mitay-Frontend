import type { ComponentProps } from 'react'

import { cn } from '@mitay/ui/lib/utils'

function Label({ className, ...props }: ComponentProps<'label'>) {
  return <label data-slot="label" className={cn('text-foreground text-sm font-medium', className)} {...props} />
}

export { Label }
