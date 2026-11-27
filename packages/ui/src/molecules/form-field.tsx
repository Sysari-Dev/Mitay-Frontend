'use client'

import { useId, type ReactNode } from 'react'
import { CircleAlert, CircleCheck } from 'lucide-react'

import { Label } from '@mitay/ui/atoms/label'
import { cn } from '@mitay/ui/lib/utils'

type FormFieldControlProps = {
  id: string
  'aria-invalid': true | undefined
  'aria-describedby': string | undefined
  'data-success': true | undefined
}

type FormFieldProps = {
  label: string
  children: (control: FormFieldControlProps) => ReactNode
  hint?: string
  error?: string
  success?: string
  counter?: string
  isOptional?: boolean
  className?: string
}

function FormField({ label, children, hint, error, success, counter, isOptional = false, className }: FormFieldProps) {
  const id = useId()
  const messageId = `${id}-message`
  const message = error ?? success ?? hint
  const control: FormFieldControlProps = {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': message ? messageId : undefined,
    'data-success': !error && success ? true : undefined,
  }
  return (
    <div data-slot="form-field" className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-baseline justify-between gap-2">
        <Label htmlFor={id}>{label}</Label>
        {isOptional && <span className="text-muted-foreground text-xs">Opcional</span>}
      </div>
      {children(control)}
      {(message || counter) && (
        <div className="flex items-start justify-between gap-3 text-xs">
          {message ? (
            <p
              id={messageId}
              className={cn(
                'flex items-start gap-1.5',
                error ? 'text-destructive' : success ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              {error && <CircleAlert aria-hidden className="mt-px size-3.5 shrink-0" />}
              {!error && success && <CircleCheck aria-hidden className="text-success mt-px size-3.5 shrink-0" />}
              {message}
            </p>
          ) : (
            <span />
          )}
          {counter && <span className="text-muted-foreground shrink-0 tabular-nums">{counter}</span>}
        </div>
      )}
    </div>
  )
}

export { FormField, type FormFieldControlProps, type FormFieldProps }
