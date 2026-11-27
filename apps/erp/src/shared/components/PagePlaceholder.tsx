import { LayoutPlaceholder } from '@/shared/components/LayoutPlaceholder'

type PagePlaceholderProps = {
  title: string
  description: string
}

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </header>
      <LayoutPlaceholder label={`Contenido de ${title}`} className="min-h-80 flex-1" />
    </div>
  )
}
