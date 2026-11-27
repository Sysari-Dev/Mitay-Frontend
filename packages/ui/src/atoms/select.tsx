'use client'

import type { ComponentProps } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { Select as SelectPrimitive } from 'radix-ui'

import { fieldControlClassName } from '@mitay/ui/lib/field-styles'
import { cn } from '@mitay/ui/lib/utils'

type SelectOption = {
  value: string
  label: string
  description?: string
}

type SelectProps = Omit<ComponentProps<typeof SelectPrimitive.Trigger>, 'value' | 'defaultValue' | 'dir'> & {
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  name?: string
  required?: boolean
}

function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Elige una opción',
  name,
  required,
  disabled,
  className,
  ...triggerProps
}: SelectProps) {
  return (
    <SelectPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      name={name}
      required={required}
      disabled={disabled}
    >
      <SelectPrimitive.Trigger
        data-slot="select-trigger"
        className={cn(
          fieldControlClassName,
          'group/select flex h-11 cursor-pointer items-center justify-between gap-2 px-3.5 text-left',
          'data-[state=open]:border-primary data-[state=open]:ring-3 data-[state=open]:ring-primary/15',
          'data-placeholder:text-muted-foreground',
          className,
        )}
        {...triggerProps}
      >
        <span className="truncate">
          <SelectPrimitive.Value placeholder={placeholder} />
        </span>
        <SelectPrimitive.Icon asChild>
          <ChevronDown
            aria-hidden
            className="text-muted-foreground size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/select:rotate-180 motion-reduce:transition-none"
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          data-slot="select-content"
          position="popper"
          sideOffset={6}
          collisionPadding={16}
          className="bg-popover text-popover-foreground border-border animate-popover-in relative z-50 max-h-(--radix-select-content-available-height) w-(--radix-select-trigger-width) min-w-40 origin-(--radix-select-content-transform-origin) overflow-hidden rounded-xl border shadow-lg motion-reduce:animate-none"
        >
          <SelectPrimitive.Viewport className="max-h-72 overflow-y-auto p-1.5">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className="data-highlighted:bg-accent data-highlighted:text-accent-foreground relative flex min-h-10 cursor-pointer items-center gap-3 rounded-lg py-2 pr-9 pl-3 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-[state=checked]:font-medium"
              >
                <div className="flex min-w-0 flex-col">
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  {option.description && (
                    <span className="text-muted-foreground truncate text-xs font-normal">{option.description}</span>
                  )}
                </div>
                <SelectPrimitive.ItemIndicator className="text-primary absolute right-3 flex items-center">
                  <Check aria-hidden className="size-4" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}

export { Select, type SelectOption, type SelectProps }
