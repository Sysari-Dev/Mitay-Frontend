import { Button } from '@mitay/ui/atoms/button'

export default function Page() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
      <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
        MITAY
      </span>
      <h1 className="max-w-xl text-4xl font-semibold tracking-tight">Panel del restaurante</h1>
      <p className="max-w-md text-muted-foreground">Gestiona tu carta, horarios y pedidos. Próximamente.</p>
      <Button size="lg">Iniciar sesión</Button>
    </main>
  )
}
