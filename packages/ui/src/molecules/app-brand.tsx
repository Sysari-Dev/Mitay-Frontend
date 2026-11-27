import type { ReactNode } from 'react'
import Link from 'next/link'

import { cn } from '@mitay/ui/lib/utils'

type AppBrandProps = {
  title: string
  subtitle?: string
  href: string
  logo?: ReactNode
  isTextHiddenOnMobile?: boolean
  className?: string
}

function AppBrand({ title, subtitle, href, logo, isTextHiddenOnMobile = false, className }: AppBrandProps) {
  return (
    <Link
      href={href}
      className={cn(
        'focus-visible:ring-ring flex min-w-0 items-center gap-3 rounded-lg outline-none focus-visible:ring-2',
        className,
      )}
    >
      <span
        aria-hidden
        className="bg-primary text-primary-foreground font-heading flex size-9 shrink-0 items-center justify-center rounded-lg text-lg font-extrabold"
      >
        {logo ?? title.charAt(0)}
      </span>
      <span
        className={cn(
          'flex min-w-0 flex-col leading-tight group-data-[state=collapsed]/sidebar:sr-only',
          isTextHiddenOnMobile && 'max-sm:sr-only',
        )}
      >
        <span className="font-heading truncate text-base font-extrabold tracking-tight">{title}</span>
        {subtitle && <span className="truncate text-xs font-medium opacity-60">{subtitle}</span>}
      </span>
    </Link>
  )
}

export { AppBrand, type AppBrandProps }
