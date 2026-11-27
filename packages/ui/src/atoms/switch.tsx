'use client'

import type { ComponentProps } from 'react'

import { cn } from '@mitay/ui/lib/utils'

type SwitchProps = Omit<ComponentProps<'button'>, 'onChange' | 'value'> & {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

function Switch({ checked, onCheckedChange, className, onClick, ...props }: SwitchProps) {
  const state = checked ? 'checked' : 'unchecked'
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      data-slot="switch"
      data-state={state}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) onCheckedChange(!checked)
      }}
      className={cn(
        'peer focus-visible:ring-ring/50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none',
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        data-state={state}
        className="bg-background pointer-events-none block size-5 rounded-full shadow-sm transition-transform duration-200 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 motion-reduce:transition-none"
      />
    </button>
  )
}

export { Switch, type SwitchProps }
