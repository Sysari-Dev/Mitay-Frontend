'use client'

import { useId, useRef, useState, type DragEvent } from 'react'
import Image from 'next/image'
import { ImagePlus, RefreshCw, Trash2 } from 'lucide-react'

import { Button } from '@mitay/ui/atoms/button'
import { cn } from '@mitay/ui/lib/utils'

type ImageDropzoneProps = {
  label: string
  hint: string
  accept: readonly string[]
  previewUrl: string | null
  onFileAccepted: (file: File) => void
  onRemove: () => void
  validate?: (file: File) => string | null
  aspect?: 'square' | 'video'
  className?: string
}

function ImageDropzone({
  label,
  hint,
  accept,
  previewUrl,
  onFileAccepted,
  onRemove,
  validate,
  aspect = 'square',
  className,
}: ImageDropzoneProps) {
  const inputId = useId()
  const messageId = `${inputId}-message`
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleFile(file: File | undefined) {
    if (!file) return
    const validationError = validate?.(file) ?? null
    setError(validationError)
    if (!validationError) onFileAccepted(file)
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault()
    setIsDragging(false)
    handleFile(event.dataTransfer.files[0])
  }

  const aspectClassName = aspect === 'square' ? 'aspect-square' : 'aspect-video'

  const fileInput = (
    <input
      ref={inputRef}
      id={inputId}
      type="file"
      accept={accept.join(',')}
      aria-labelledby={`${inputId}-label`}
      aria-describedby={messageId}
      aria-invalid={error ? true : undefined}
      className="sr-only"
      onChange={(event) => {
        handleFile(event.target.files?.[0])
        event.target.value = ''
      }}
    />
  )

  return (
    <div data-slot="image-dropzone" className={cn('flex flex-col gap-2', className)}>
      <span id={`${inputId}-label`} className="text-sm font-medium">
        {label}
      </span>
      {previewUrl ? (
        <div className="flex flex-col gap-2">
          {fileInput}
          <div className={cn('border-border bg-muted relative overflow-hidden rounded-xl border', aspectClassName)}>
            <Image src={previewUrl} alt={`Vista previa: ${label.toLowerCase()}`} fill unoptimized className="object-cover" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" color="neutral" size="sm" onClick={() => inputRef.current?.click()}>
              <RefreshCw aria-hidden />
              Cambiar
            </Button>
            <Button
              variant="ghost"
              color="neutral"
              size="sm"
              onClick={() => {
                setError(null)
                onRemove()
              }}
            >
              <Trash2 aria-hidden />
              Quitar
            </Button>
          </div>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          onDragOver={(event) => {
            event.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            'border-input text-muted-foreground hover:border-primary/60 hover:bg-primary/5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-4 text-center transition-colors duration-200 has-focus-visible:border-primary has-focus-visible:ring-3 has-focus-visible:ring-primary/15',
            aspectClassName,
            isDragging && 'border-primary bg-primary/5',
            error && 'border-destructive',
          )}
        >
          {fileInput}
          <span className="bg-muted flex size-10 items-center justify-center rounded-full">
            <ImagePlus aria-hidden className="size-5" />
          </span>
          <span className="text-sm">
            Arrastra una imagen o <span className="text-primary font-medium">elige un archivo</span>
          </span>
        </label>
      )}
      <p id={messageId} className={cn('text-xs', error ? 'text-destructive' : 'text-muted-foreground')}>
        {error ?? hint}
      </p>
    </div>
  )
}

export { ImageDropzone, type ImageDropzoneProps }
