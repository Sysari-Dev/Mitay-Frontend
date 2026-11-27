import { describe, expect, it } from 'vitest'
import type { WeeklySchedule } from '../../shared-kernel/schedule'
import { findOverlappingRangeIndexes } from './scheduleRules'
import { toWeeklySchedule, toWeeklyScheduleForm, weeklyScheduleFormSchema } from './weeklyScheduleFormSchema'

const schedule: WeeklySchedule = {
  0: [],
  1: [{ opens: '11:00', closes: '16:00' }],
  2: [],
  3: [],
  4: [],
  5: [{ opens: '20:00', closes: '02:00' }],
  6: [],
}

describe('findOverlappingRangeIndexes', () => {
  it('accepts lunch and dinner shifts', () => {
    expect(
      findOverlappingRangeIndexes([
        { opens: '11:00', closes: '16:00' },
        { opens: '18:00', closes: '22:30' },
      ]),
    ).toEqual([])
  })

  it('flags a shift that overlaps an earlier one', () => {
    expect(
      findOverlappingRangeIndexes([
        { opens: '11:00', closes: '16:00' },
        { opens: '15:30', closes: '20:00' },
      ]),
    ).toEqual([1])
  })

  it('treats a shift that crosses midnight as continuing past 24:00', () => {
    expect(
      findOverlappingRangeIndexes([
        { opens: '20:00', closes: '02:00' },
        { opens: '23:00', closes: '23:30' },
      ]),
    ).toEqual([1])
  })
})

describe('weeklyScheduleFormSchema', () => {
  it('round-trips a weekly schedule starting on Monday', () => {
    const form = toWeeklyScheduleForm(schedule)
    expect(form.days[0]?.dayOfWeek).toBe(1)
    expect(form.days[6]?.dayOfWeek).toBe(0)
    expect(toWeeklySchedule(form)).toEqual(schedule)
  })

  it('requires at least one shift on an open day', () => {
    const form = toWeeklyScheduleForm(schedule)
    form.days[0] = { dayOfWeek: 1, isOpen: true, ranges: [] }
    expect(weeklyScheduleFormSchema.safeParse(form).success).toBe(false)
  })

  it('ignores shifts of a closed day', () => {
    const form = toWeeklyScheduleForm(schedule)
    form.days[0] = { dayOfWeek: 1, isOpen: false, ranges: [{ opens: 'bad', closes: '10:00' }] }
    expect(toWeeklySchedule(form)[1]).toEqual([])
    expect(weeklyScheduleFormSchema.safeParse(form).success).toBe(true)
  })

  it('rejects equal opening and closing times', () => {
    const form = toWeeklyScheduleForm(schedule)
    form.days[0] = { dayOfWeek: 1, isOpen: true, ranges: [{ opens: '10:00', closes: '10:00' }] }
    expect(weeklyScheduleFormSchema.safeParse(form).success).toBe(false)
  })
})
