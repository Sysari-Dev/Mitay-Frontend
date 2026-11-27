import { cn } from '@mitay/ui/lib/utils'

type LayoutPlaceholderProps = {
  label: string
  className?: string
}

export function LayoutPlaceholder({ label, className }: LayoutPlaceholderProps) {
  return (
    <div
      className={cn(
        'border-border text-muted-foreground flex items-center justify-center rounded-lg border-2 border-dashed px-3 text-center text-xs font-medium',
        className,
      )}
    >
      {label}
    </div>
  )
}
