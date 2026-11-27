'use client'

import { useState } from 'react'
import type { GeoPoint } from '@mitay/core/shared-kernel'

type GeolocationStatus = 'idle' | 'locating' | 'error'

const GEOLOCATION_TIMEOUT_MS = 10_000

export function useGeolocation() {
  const [status, setStatus] = useState<GeolocationStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  function locate(onFound: (point: GeoPoint) => void) {
    if (!('geolocation' in navigator)) {
      setStatus('error')
      setError('Tu navegador no permite obtener la ubicación. Mueve el pin a mano.')
      return
    }
    setStatus('locating')
    setError(null)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setStatus('idle')
        onFound({ lat: position.coords.latitude, lng: position.coords.longitude })
      },
      (positionError) => {
        setStatus('error')
        setError(
          positionError.code === positionError.PERMISSION_DENIED
            ? 'No diste permiso para usar tu ubicación. Puedes mover el pin a mano.'
            : 'No pudimos obtener tu ubicación. Mueve el pin a mano.',
        )
      },
      { enableHighAccuracy: true, timeout: GEOLOCATION_TIMEOUT_MS },
    )
  }

  return { isLocating: status === 'locating', error, locate }
}
