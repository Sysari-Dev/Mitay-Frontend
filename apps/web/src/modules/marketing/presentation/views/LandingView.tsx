import { Button } from '@mitay/ui/atoms/button'
import { ThemeToggle } from '@mitay/ui/molecules/theme-toggle'

import { erpUrl } from '@/shared/lib/env'

export function LandingView() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <span className="text-xl font-bold tracking-tight">
          MITAY<span className="text-primary">.</span>
        </span>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button asChild variant="secondary" size="sm">
            <a href={erpUrl}>Soy restaurante</a>
          </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
        <span className="rounded-full bg-accent px-4 py-1 text-sm font-medium text-accent-foreground">
          Abancay, Apurímac
        </span>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          Lo mejor de Abancay, <span className="text-primary">directo a tu WhatsApp</span>
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          ¿Tienes un restaurante? Publica tu carta en MITAY y recibe pedidos sin pagar comisiones.
        </p>
        <Button asChild size="lg">
          <a href={erpUrl}>Ingresar al panel de mi restaurante</a>
        </Button>
        <div className="mt-8 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="h-32 rounded-xl border-2 border-dashed bg-muted" />
          <div className="h-32 rounded-xl border-2 border-dashed bg-muted" />
          <div className="h-32 rounded-xl border-2 border-dashed bg-muted" />
        </div>
      </main>
      <footer className="border-t px-6 py-6 text-center text-sm text-muted-foreground">
        MITAY · un producto de Sysari
      </footer>
    </div>
  )
}
