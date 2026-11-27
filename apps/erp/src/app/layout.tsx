import type { Metadata } from 'next'
import { fontVariables } from '@mitay/ui/lib/fonts'
import { themeScript } from '@mitay/ui/lib/theme'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'MITAY Panel | Restaurantes',
    template: '%s | MITAY Panel',
  },
  description: 'Panel de gestión para restaurantes en MITAY.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${fontVariables} h-full`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
