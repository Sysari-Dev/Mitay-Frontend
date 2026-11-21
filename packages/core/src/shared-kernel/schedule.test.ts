import { describe, expect, it } from 'vitest'
import { isOpenNow, type WeeklySchedule } from './schedule'

const lunch = [{ opens: '12:00', closes: '16:00' }]
const night = [{ opens: '18:00', closes: '02:00' }]

const schedule: WeeklySchedule = {
  0: [],
  1: lunch,
  2: lunch,
  3: lunch,
  4: lunch,
  5: night,
  6: [],
}

const limaTime = (isoLocal: string) => new Date(`${isoLocal}-05:00`)

describe('isOpenNow', () => {
  it('is open inside a range (Monday 13:00)', () => {
    expect(isOpenNow(schedule, limaTime('2026-11-16T13:00:00'))).toBe(true)
  })

  it('is closed exactly at closing time (Monday 16:00)', () => {
    expect(isOpenNow(schedule, limaTime('2026-11-16T16:00:00'))).toBe(false)
  })

  it('is closed on a day without ranges (Sunday)', () => {
    expect(isOpenNow(schedule, limaTime('2026-11-15T13:00:00'))).toBe(false)
  })

  it('overnight range: open on Friday 23:00', () => {
    expect(isOpenNow(schedule, limaTime('2026-11-20T23:00:00'))).toBe(true)
  })

  it('overnight range: still open on Saturday 01:30', () => {
    expect(isOpenNow(schedule, limaTime('2026-11-21T01:30:00'))).toBe(true)
  })

  it('overnight range: closed on Saturday 02:00', () => {
    expect(isOpenNow(schedule, limaTime('2026-11-21T02:00:00'))).toBe(false)
  })
})
