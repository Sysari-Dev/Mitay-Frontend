'use client'

import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { validateBrandImage, type BrandImageKind, type RestaurantBrandingFormValues } from '@mitay/core/restaurant'

const fieldByKind: Record<BrandImageKind, 'logoUrl' | 'bannerUrl'> = {
  logo: 'logoUrl',
  banner: 'bannerUrl',
}

function revokeIfLocal(url: string | null) {
  if (url?.startsWith('blob:')) URL.revokeObjectURL(url)
}

export function useBrandImageField(kind: BrandImageKind) {
  const name = fieldByKind[kind]
  const { control, setValue, getValues } = useFormContext<RestaurantBrandingFormValues>()
  const previewUrl = useWatch({ control, name })

  useEffect(() => () => revokeIfLocal(getValues(name)), [getValues, name])

  function accept(file: File) {
    revokeIfLocal(getValues(name))
    setValue(name, URL.createObjectURL(file), { shouldDirty: true })
  }

  function remove() {
    revokeIfLocal(getValues(name))
    setValue(name, null, { shouldDirty: true })
  }

  return {
    previewUrl,
    accept,
    remove,
    validate: (file: File) => validateBrandImage(file, kind),
  }
}
