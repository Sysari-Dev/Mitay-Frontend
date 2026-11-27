'use client'

import type { ComponentProps } from 'react'
import { Popover as PopoverPrimitive } from 'radix-ui'

import { cn } from '@mitay/ui/lib/utils'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverClose = PopoverPrimitive.Close

function PopoverContent({
  className,
  align = 'end',
  sideOffset = 6,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        collisionPadding={16}
        className={cn(
          'bg-popover text-popover-foreground border-border animate-popover-in z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-xl border p-4 shadow-lg outline-none motion-reduce:animate-none',
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

export { Popover, PopoverClose, PopoverContent, PopoverTrigger }
