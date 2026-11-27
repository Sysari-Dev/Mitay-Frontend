import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '@mitay/ui/lib/utils'

const buttonColorStyles = {
  primary: {
    filled: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border-primary text-primary hover:bg-primary/10',
    ghost: 'text-primary hover:bg-primary/10',
    link: 'text-primary',
  },
  secondary: {
    filled: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    outline: 'border-secondary text-secondary hover:bg-secondary/10',
    ghost: 'text-secondary hover:bg-secondary/10',
    link: 'text-secondary',
  },
  tertiary: {
    filled: 'bg-tertiary text-tertiary-foreground hover:bg-tertiary/90',
    outline: 'border-tertiary text-tertiary hover:bg-tertiary/10',
    ghost: 'text-tertiary hover:bg-tertiary/10',
    link: 'text-tertiary',
  },
  brand: {
    filled: 'bg-brand text-brand-foreground hover:bg-brand/90',
    outline: 'border-brand text-brand hover:bg-brand/10',
    ghost: 'text-brand hover:bg-brand/10',
    link: 'text-brand',
  },
  destructive: {
    filled: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border-destructive text-destructive hover:bg-destructive/10',
    ghost: 'text-destructive hover:bg-destructive/10',
    link: 'text-destructive',
  },
  success: {
    filled: 'bg-success text-success-foreground hover:bg-success/90',
    outline: 'border-success text-success hover:bg-success/10',
    ghost: 'text-success hover:bg-success/10',
    link: 'text-success',
  },
  warning: {
    filled: 'bg-warning text-warning-foreground hover:bg-warning/90',
    outline: 'border-warning text-warning hover:bg-warning/10',
    ghost: 'text-warning hover:bg-warning/10',
    link: 'text-warning',
  },
  info: {
    filled: 'bg-info text-info-foreground hover:bg-info/90',
    outline: 'border-info text-info hover:bg-info/10',
    ghost: 'text-info hover:bg-info/10',
    link: 'text-info',
  },
  neutral: {
    filled: 'bg-muted text-foreground hover:bg-accent hover:text-accent-foreground',
    outline: 'border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
    ghost: 'text-foreground hover:bg-accent hover:text-accent-foreground',
    link: 'text-foreground',
  },
} as const

type ButtonColor = keyof typeof buttonColorStyles
type ButtonVariant = keyof (typeof buttonColorStyles)[ButtonColor]

const buttonColorCompounds = Object.entries(buttonColorStyles).flatMap(([color, variants]) =>
  Object.entries(variants).map(([variant, className]) => ({
    color: color as ButtonColor,
    variant: variant as ButtonVariant,
    className,
  })),
)

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,background-color,border-color,transform] duration-200 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        filled: '',
        outline: 'border bg-transparent',
        ghost: 'bg-transparent',
        link: 'underline-offset-4 hover:underline',
      },
      color: {
        primary: '',
        secondary: '',
        tertiary: '',
        brand: '',
        destructive: '',
        success: '',
        warning: '',
        info: '',
        neutral: '',
      },
      size: {
        sm: 'h-8 px-3',
        default: 'h-10 px-4',
        lg: 'h-12 rounded-lg px-6 text-base',
        'icon-sm': 'size-8',
        icon: 'size-10',
        'icon-lg': 'size-11 [&_svg:not([class*=size-])]:size-6',
      },
      animated: {
        true: 'hover:scale-103 active:scale-97 motion-reduce:hover:scale-100 motion-reduce:active:scale-100',
        false: '',
      },
    },
    compoundVariants: [
      ...buttonColorCompounds,
      { variant: 'link', className: 'h-auto px-0' },
    ],
    defaultVariants: {
      variant: 'filled',
      color: 'primary',
      size: 'default',
      animated: false,
    },
  },
)

type ButtonProps = Omit<ComponentProps<'button'>, 'color'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({ className, variant, color, size, animated, asChild = false, type, ...props }: ButtonProps) {
  const Component = asChild ? Slot.Root : 'button'
  return (
    <Component
      data-slot="button"
      type={asChild ? type : (type ?? 'button')}
      className={cn(buttonVariants({ variant, color, size, animated, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants, type ButtonColor, type ButtonProps, type ButtonVariant }
