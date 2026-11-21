import { Button } from '@mitay/ui/atoms/button'

export default function Page() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
      <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
        MITAY
      </span>
      <h1 className="max-w-xl text-4xl font-semibold tracking-tight">Lo mejor de Abancay, directo a tu WhatsApp</h1>
      <p className="max-w-md text-muted-foreground">Landing y directorio de restaurantes. Próximamente.</p>
      <Button size="lg">Registra tu restaurante</Button>
    </main>
  )
}
