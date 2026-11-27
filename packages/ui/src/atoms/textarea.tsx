import type { ComponentProps } from 'react'

import { fieldControlClassName } from '@mitay/ui/lib/field-styles'
import { cn } from '@mitay/ui/lib/utils'

function Textarea({ className, rows = 3, ...props }: ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      rows={rows}
      className={cn(fieldControlClassName, 'min-h-20 resize-y px-3.5 py-2.5 leading-relaxed', className)}
      {...props}
    />
  )
}

export { Textarea }
