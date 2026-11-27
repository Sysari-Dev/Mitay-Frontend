'use client'

import { useId, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Copy } from 'lucide-react'
import type { WeeklyScheduleFormValues } from '@mitay/core/restaurant'
import type { DayOfWeek } from '@mitay/core/shared-kernel'
import { Button } from '@mitay/ui/atoms/button'
import { Checkbox } from '@mitay/ui/atoms/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '@mitay/ui/atoms/popover'
import { DAY_NAMES } from '@/modules/restaurant/presentation/restaurant-schedule/components/dayNames'

export function CopyDaySchedulePopover({ dayIndex }: { dayIndex: number }) {
  const { getValues, setValue } = useFormContext<WeeklyScheduleFormValues>()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])
  const baseId = useId()
  const days = getValues('days')
  const sourceDay = days[dayIndex]
  const sourceName = sourceDay ? DAY_NAMES[sourceDay.dayOfWeek as DayOfWeek] : ''
  const targetIndexes = days.map((_, index) => index).filter((index) => index !== dayIndex)
  const isAllSelected = selectedIndexes.length === targetIndexes.length

  function toggle(index: number, isChecked: boolean) {
    setSelectedIndexes((current) => (isChecked ? [...current, index] : current.filter((item) => item !== index)))
  }

  function applyCopy() {
    const source = getValues(`days.${dayIndex}`)
    for (const index of selectedIndexes) {
      setValue(`days.${index}.isOpen`, source.isOpen, { shouldDirty: true })
      setValue(
        `days.${index}.ranges`,
        source.ranges.map((range) => ({ ...range })),
        { shouldDirty: true, shouldValidate: true },
      )
    }
    setSelectedIndexes([])
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          color="neutral"
          size="icon"
          title={`Copiar el horario del ${sourceName.toLowerCase()} a otros días`}
          aria-label={`Copiar el horario del ${sourceName.toLowerCase()} a otros días`}
          className="text-muted-foreground hover:text-foreground"
        >
          <Copy />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-64 flex-col gap-3">
        <p className="text-sm font-semibold">Copiar {sourceName.toLowerCase()} a…</p>
        <label htmlFor={`${baseId}-all`} className="flex cursor-pointer items-center gap-3 text-sm">
          <Checkbox
            id={`${baseId}-all`}
            checked={isAllSelected}
            onCheckedChange={(checked) => setSelectedIndexes(checked === true ? targetIndexes : [])}
          />
          Todos los días
        </label>
        <div className="bg-border h-px" />
        <ul className="flex flex-col gap-2.5">
          {targetIndexes.map((index) => {
            const day = days[index]
            if (!day) return null
            const checkboxId = `${baseId}-${index}`
            return (
              <li key={day.dayOfWeek}>
                <label htmlFor={checkboxId} className="flex cursor-pointer items-center gap-3 text-sm">
                  <Checkbox
                    id={checkboxId}
                    checked={selectedIndexes.includes(index)}
                    onCheckedChange={(checked) => toggle(index, checked === true)}
                  />
                  {DAY_NAMES[day.dayOfWeek as DayOfWeek]}
                </label>
              </li>
            )
          })}
        </ul>
        <Button size="sm" disabled={selectedIndexes.length === 0} onClick={applyCopy}>
          Copiar horario
        </Button>
      </PopoverContent>
    </Popover>
  )
}
