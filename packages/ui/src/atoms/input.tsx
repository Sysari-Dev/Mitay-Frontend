import type { ComponentProps, ReactNode } from 'react'

import { fieldControlClassName, fieldGroupClassName } from '@mitay/ui/lib/field-styles'
import { cn } from '@mitay/ui/lib/utils'

type InputProps = ComponentProps<'input'> & {
  startAddon?: ReactNode
  endAddon?: ReactNode
}

function Input({ className, startAddon, endAddon, ...props }: InputProps) {
  if (!startAddon && !endAddon) {
    return <input data-slot="input" className={cn(fieldControlClassName, 'h-11 px-3.5', className)} {...props} />
  }
  return (
    <div data-slot="input-group" className={cn(fieldGroupClassName, 'h-11', className)}>
      {startAddon && (
        <span className="text-muted-foreground flex shrink-0 items-center pl-3.5 text-sm select-none">{startAddon}</span>
      )}
      <input
        data-slot="input"
        className={cn(
          'placeholder:text-muted-foreground h-full w-full min-w-0 flex-1 bg-transparent text-base outline-none disabled:cursor-not-allowed sm:text-sm',
          startAddon ? 'pl-2' : 'pl-3.5',
          endAddon ? 'pr-1' : 'pr-3.5',
        )}
        {...props}
      />
      {endAddon && <span className="flex shrink-0 items-center pr-1.5">{endAddon}</span>}
    </div>
  )
}

export { Input, type InputProps }
