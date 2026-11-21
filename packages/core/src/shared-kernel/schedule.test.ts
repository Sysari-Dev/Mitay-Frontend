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

/** Crea un instante a partir de una hora local de Perú (UTC-5). */
const limaTime = (isoLocal: string) => new Date(`${isoLocal}-05:00`)

describe('isOpenNow', () => {
  it('abierto dentro del rango (lunes 13:00)', () => {
    expect(isOpenNow(schedule, limaTime('2026-11-16T13:00:00'))).toBe(true)
  })

  it('cerrado justo a la hora de cierre (lunes 16:00)', () => {
    expect(isOpenNow(schedule, limaTime('2026-11-16T16:00:00'))).toBe(false)
  })

  it('cerrado en día sin rangos (domingo)', () => {
    expect(isOpenNow(schedule, limaTime('2026-11-15T13:00:00'))).toBe(false)
  })

  it('cruce de medianoche: viernes 23:00 abierto', () => {
    expect(isOpenNow(schedule, limaTime('2026-11-20T23:00:00'))).toBe(true)
  })

  it('cruce de medianoche: sábado 01:30 sigue abierto', () => {
    expect(isOpenNow(schedule, limaTime('2026-11-21T01:30:00'))).toBe(true)
  })

  it('cruce de medianoche: sábado 02:00 ya cerró', () => {
    expect(isOpenNow(schedule, limaTime('2026-11-21T02:00:00'))).toBe(false)
  })
})
