'use client'

import { useId, useState, type FormEvent } from 'react'
import { CircleAlert } from 'lucide-react'
import { CATEGORY_NAME_MAX_LENGTH, categoryNameSchema } from '@mitay/core/catalog'
import { Button } from '@mitay/ui/atoms/button'
import { Input } from '@mitay/ui/atoms/input'

type CategoryNameFormProps = {
  label: string
  initialName?: string
  submitLabel: string
  onSubmit: (name: string) => void
  onCancel?: () => void
}

export function CategoryNameForm({ label, initialName = '', submitLabel, onSubmit, onCancel }: CategoryNameFormProps) {
  const [name, setName] = useState(initialName)
  const [error, setError] = useState<string | null>(null)
  const inputId = useId()
  const errorId = `${inputId}-error`

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = categoryNameSchema.safeParse(name)
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? 'Nombre inválido')
      return
    }
    onSubmit(result.data)
    setName('')
    setError(null)
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <div className="flex gap-2">
        <Input
          id={inputId}
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={CATEGORY_NAME_MAX_LENGTH}
          placeholder={label}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          autoFocus={Boolean(initialName)}
          className="min-w-0 flex-1"
        />
        <Button type="submit" variant={onCancel ? 'filled' : 'outline'} color={onCancel ? 'primary' : 'neutral'}>
          {submitLabel}
        </Button>
        {onCancel && (
          <Button variant="ghost" color="neutral" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
      {error && (
        <p id={errorId} className="text-destructive flex items-center gap-1.5 text-xs">
          <CircleAlert aria-hidden className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </form>
  )
}
