'use client'

import { useFormContext, useWatch, type FieldPathByValue, type FieldValues, type PathValue } from 'react-hook-form'

function revokeIfLocal(url: unknown) {
  if (typeof url === 'string' && url.startsWith('blob:')) URL.revokeObjectURL(url)
}

export function useLocalImageField<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string | null>,
>(name: TName) {
  const { control, setValue, getValues } = useFormContext<TValues>()
  const previewUrl = useWatch({ control, name }) as string | null

  function update(url: string | null) {
    revokeIfLocal(getValues(name))
    setValue(name, url as PathValue<TValues, TName>, { shouldDirty: true })
  }

  return {
    previewUrl,
    accept: (file: File) => update(URL.createObjectURL(file)),
    remove: () => update(null),
  }
}
