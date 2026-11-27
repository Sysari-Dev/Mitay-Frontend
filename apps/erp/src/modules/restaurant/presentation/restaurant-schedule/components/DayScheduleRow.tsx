'use client'

import { useId } from 'react'
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { CircleAlert, MoonStar, Plus, X } from 'lucide-react'
import type { WeeklyScheduleFormValues } from '@mitay/core/restaurant'
import { crossesMidnight, type DayOfWeek } from '@mitay/core/shared-kernel'
import { Button } from '@mitay/ui/atoms/button'
import { Input } from '@mitay/ui/atoms/input'
import { Switch } from '@mitay/ui/atoms/switch'
import { CopyDaySchedulePopover } from '@/modules/restaurant/presentation/restaurant-schedule/components/CopyDaySchedulePopover'
import { DAY_NAMES } from '@/modules/restaurant/presentation/restaurant-schedule/components/dayNames'

const MAX_SHIFTS_PER_DAY = 3
const FIRST_SHIFT = { opens: '11:00', closes: '16:00' }
const NEXT_SHIFT = { opens: '18:00', closes: '22:00' }
const TIME_STEP_SECONDS = 900

export function DayScheduleRow({ dayIndex }: { dayIndex: number }) {
  const { control, register, formState } = useFormContext<WeeklyScheduleFormValues>()
  const { fields, append, remove } = useFieldArray({ control, name: `days.${dayIndex}.ranges` })
  const day = useWatch({ control, name: `days.${dayIndex}` })
  const switchId = useId()
  const dayName = DAY_NAMES[day.dayOfWeek as DayOfWeek]
  const dayErrors = formState.errors.days?.[dayIndex]
  const rangesError = dayErrors?.ranges?.root?.message ?? dayErrors?.ranges?.message
  return (
    <li className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:gap-6">
      <div className="flex items-center justify-between gap-3 sm:w-40 sm:shrink-0 sm:pt-2.5">
        <div className="flex items-center gap-3">
          <Controller
            control={control}
            name={`days.${dayIndex}.isOpen`}
            render={({ field }) => (
              <Switch
                id={switchId}
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked)
                  if (checked && fields.length === 0) append(FIRST_SHIFT)
                }}
              />
            )}
          />
          <label htmlFor={switchId} className="cursor-pointer text-sm font-medium">
            {dayName}
          </label>
        </div>
        <div className="sm:hidden">
          <CopyDaySchedulePopover dayIndex={dayIndex} />
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {day.isOpen ? (
          <>
            {fields.map((field, rangeIndex) => {
              const range = day.ranges[rangeIndex]
              const rangeErrors = dayErrors?.ranges?.[rangeIndex]
              const errorMessage = rangeErrors?.opens?.message ?? rangeErrors?.closes?.message
              const errorId = `${switchId}-range-${rangeIndex}-error`
              const shiftNumber = rangeIndex + 1
              return (
                <div key={field.id} className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      step={TIME_STEP_SECONDS}
                      aria-label={`${dayName}, apertura del turno ${shiftNumber}`}
                      aria-invalid={rangeErrors?.opens ? true : undefined}
                      aria-describedby={errorMessage ? errorId : undefined}
                      className="min-w-0 flex-1 sm:w-36 sm:flex-none"
                      {...register(`days.${dayIndex}.ranges.${rangeIndex}.opens`)}
                    />
                    <span aria-hidden className="text-muted-foreground">
                      –
                    </span>
                    <Input
                      type="time"
                      step={TIME_STEP_SECONDS}
                      aria-label={`${dayName}, cierre del turno ${shiftNumber}`}
                      aria-invalid={rangeErrors?.closes ? true : undefined}
                      aria-describedby={errorMessage ? errorId : undefined}
                      className="min-w-0 flex-1 sm:w-36 sm:flex-none"
                      {...register(`days.${dayIndex}.ranges.${rangeIndex}.closes`)}
                    />
                    <Button
                      variant="ghost"
                      color="neutral"
                      size="icon"
                      aria-label={`Quitar el turno ${shiftNumber} del ${dayName.toLowerCase()}`}
                      onClick={() => remove(rangeIndex)}
                      className="text-muted-foreground hover:text-foreground shrink-0"
                    >
                      <X />
                    </Button>
                  </div>
                  {range && !errorMessage && range.opens !== range.closes && crossesMidnight(range) && (
                    <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                      <MoonStar aria-hidden className="size-3.5" />
                      Cierra al día siguiente
                    </p>
                  )}
                  {errorMessage && (
                    <p id={errorId} className="text-destructive flex items-center gap-1.5 text-xs">
                      <CircleAlert aria-hidden className="size-3.5 shrink-0" />
                      {errorMessage}
                    </p>
                  )}
                </div>
              )
            })}
            {rangesError && (
              <p className="text-destructive flex items-center gap-1.5 text-xs">
                <CircleAlert aria-hidden className="size-3.5 shrink-0" />
                {rangesError}
              </p>
            )}
            {fields.length < MAX_SHIFTS_PER_DAY && (
              <Button
                variant="link"
                size="sm"
                onClick={() => append(fields.length === 0 ? FIRST_SHIFT : NEXT_SHIFT)}
                className="self-start"
              >
                <Plus aria-hidden />
                Agregar turno
              </Button>
            )}
          </>
        ) : (
          <p className="text-muted-foreground text-sm sm:pt-2.5">Cerrado</p>
        )}
      </div>
      <div className="hidden sm:block sm:pt-0.5">
        <CopyDaySchedulePopover dayIndex={dayIndex} />
      </div>
    </li>
  )
}
