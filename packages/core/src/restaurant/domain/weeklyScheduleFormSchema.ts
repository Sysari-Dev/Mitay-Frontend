import { z } from 'zod'
import type { DayOfWeek, WeeklySchedule } from '../../shared-kernel/schedule'
import { findOverlappingRangeIndexes, TIME_PATTERN } from './scheduleRules'

export const WEEK_DAYS_FROM_MONDAY: readonly DayOfWeek[] = [1, 2, 3, 4, 5, 6, 0]

const openingRangeSchema = z.object({ opens: z.string(), closes: z.string() })

const dayScheduleSchema = z
  .object({
    dayOfWeek: z.number().int().min(0).max(6),
    isOpen: z.boolean(),
    ranges: z.array(openingRangeSchema),
  })
  .superRefine((day, context) => {
    if (!day.isOpen) return
    if (day.ranges.length === 0) {
      context.addIssue({
        code: 'custom',
        path: ['ranges'],
        message: 'Agrega al menos un turno o marca el día como cerrado',
      })
      return
    }
    day.ranges.forEach((range, index) => {
      for (const field of ['opens', 'closes'] as const) {
        if (!TIME_PATTERN.test(range[field])) {
          context.addIssue({ code: 'custom', path: ['ranges', index, field], message: 'Usa el formato HH:mm' })
        }
      }
      if (range.opens === range.closes) {
        context.addIssue({
          code: 'custom',
          path: ['ranges', index, 'closes'],
          message: 'La apertura y el cierre no pueden ser iguales',
        })
      }
    })
    for (const index of findOverlappingRangeIndexes(day.ranges)) {
      context.addIssue({
        code: 'custom',
        path: ['ranges', index, 'opens'],
        message: 'Este turno se cruza con otro del mismo día',
      })
    }
  })

export const weeklyScheduleFormSchema = z.object({
  days: z.array(dayScheduleSchema).length(7),
})

export type WeeklyScheduleFormValues = z.infer<typeof weeklyScheduleFormSchema>
export type DayScheduleFormValues = WeeklyScheduleFormValues['days'][number]

export function toWeeklyScheduleForm(schedule: WeeklySchedule): WeeklyScheduleFormValues {
  return {
    days: WEEK_DAYS_FROM_MONDAY.map((dayOfWeek) => ({
      dayOfWeek,
      isOpen: schedule[dayOfWeek].length > 0,
      ranges: schedule[dayOfWeek].map((range) => ({ ...range })),
    })),
  }
}

export function toWeeklySchedule(form: WeeklyScheduleFormValues): WeeklySchedule {
  const schedule: WeeklySchedule = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] }
  for (const day of form.days) {
    schedule[day.dayOfWeek as DayOfWeek] = day.isOpen ? day.ranges.map((range) => ({ ...range })) : []
  }
  return schedule
}
