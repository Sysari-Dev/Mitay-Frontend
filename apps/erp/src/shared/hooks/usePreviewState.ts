'use client'

import { useSearchParams } from 'next/navigation'

export type PreviewState = 'ready' | 'loading' | 'empty' | 'error'

const PREVIEWABLE_STATES: readonly string[] = ['loading', 'empty', 'error']

export function usePreviewState(): PreviewState {
  const searchParams = useSearchParams()
  if (process.env.NODE_ENV === 'production') return 'ready'
  const requested = searchParams.get('state') ?? ''
  return PREVIEWABLE_STATES.includes(requested) ? (requested as PreviewState) : 'ready'
}
