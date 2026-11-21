import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { themeScript } from '@mitay/ui/lib/theme'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MITAY Panel | Restaurantes',
  description: 'Panel de gestión para restaurantes en MITAY.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
