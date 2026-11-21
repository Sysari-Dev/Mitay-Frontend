import { ThemeToggle } from '@mitay/ui/molecules/theme-toggle'
import { ThemePreview } from '@mitay/ui/organisms/theme-preview'

export function DashboardView() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 p-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Panel del restaurante</h1>
          <p className="text-muted-foreground">Dashboard de baja fidelidad</p>
        </div>
        <ThemeToggle />
      </header>
      <div className="bg-primary text-primary-foreground flex aspect-square w-48 items-center justify-center rounded-2xl text-lg font-semibold">
        MITAY ERP
      </div>
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Paleta de colores</h2>
        <ThemePreview />
      </section>
    </main>
  )
}
