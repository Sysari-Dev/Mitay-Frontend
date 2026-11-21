import createClient from 'openapi-fetch'

import type { paths } from './generated/schema'

export type { paths }

export function createApiClient(baseUrl: string) {
  return createClient<paths>({ baseUrl, credentials: 'include' })
}

export type ApiClient = ReturnType<typeof createApiClient>
