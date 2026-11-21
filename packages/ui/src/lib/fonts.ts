import { Figtree, Geist_Mono, Nunito } from 'next/font/google'

const headingFont = Nunito({
  subsets: ['latin'],
  variable: '--font-heading-family',
  display: 'swap',
})

const sansFont = Figtree({
  subsets: ['latin'],
  variable: '--font-sans-family',
  display: 'swap',
})

const monoFont = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono-family',
  display: 'swap',
})

export const fontVariables = `${headingFont.variable} ${sansFont.variable} ${monoFont.variable}`
