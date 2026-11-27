import { Check } from 'lucide-react'
import { getBrandColorContrast } from '@mitay/core/restaurant'
import { cn } from '@mitay/ui/lib/utils'

const BRAND_COLOR_PRESETS = [
  { name: 'Ladrillo', value: '#c2410c' },
  { name: 'Ají', value: '#b91c1c' },
  { name: 'Frambuesa', value: '#9d174d' },
  { name: 'Uva', value: '#6d28d9' },
  { name: 'Huacatay', value: '#15803d' },
  { name: 'Menta', value: '#0f766e' },
  { name: 'Mostaza', value: '#a16207' },
  { name: 'Piedra', value: '#57534e' },
  { name: 'Carbón', value: '#1c1917' },
] as const

type BrandColorSwatchesProps = {
  value: string
  onSelect: (color: string) => void
}

export function BrandColorSwatches({ value, onSelect }: BrandColorSwatchesProps) {
  return (
    <div role="radiogroup" aria-label="Colores sugeridos" className="flex flex-wrap gap-3">
      {BRAND_COLOR_PRESETS.map((preset) => {
        const isSelected = preset.value === value.toLowerCase()
        return (
          <button
            key={preset.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={preset.name}
            title={preset.name}
            onClick={() => onSelect(preset.value)}
            style={{ backgroundColor: preset.value, color: getBrandColorContrast(preset.value)?.foreground }}
            className={cn(
              'focus-visible:ring-ring flex size-9 cursor-pointer items-center justify-center rounded-full ring-offset-2 ring-offset-background transition-transform duration-150 outline-none hover:scale-110 focus-visible:ring-2 motion-reduce:hover:scale-100',
              isSelected && 'ring-foreground ring-2',
            )}
          >
            {isSelected && <Check aria-hidden className="size-4" strokeWidth={3} />}
          </button>
        )
      })}
    </div>
  )
}
