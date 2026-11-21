import createClient from 'openapi-fetch'

import type { paths } from './generated/schema'

export type { paths }

/**
 * Crea el cliente tipado del API de MITAY.
 * Lo usan SOLO los adaptadores en `@mitay/core/<modulo>/infrastructure`, nunca los componentes.
 */
export function createApiClient(baseUrl: string) {
  return createClient<paths>({ baseUrl, credentials: 'include' })
}

export type ApiClient = ReturnType<typeof createApiClient>
