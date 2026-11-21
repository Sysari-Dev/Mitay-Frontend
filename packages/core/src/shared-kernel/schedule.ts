/** 0 = domingo ... 6 = sábado (igual que Date.getDay). */
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

/**
 * Rango de atención en hora local, formato "HH:mm".
 * Si `closes` es menor o igual que `opens`, el rango cruza la medianoche (ej. 18:00 → 02:00).
 */
export interface OpeningRange {
  opens: string
  closes: string
}

/** Horario semanal (REST-01). Un día sin rangos = cerrado. */
export type WeeklySchedule = Record<DayOfWeek, readonly OpeningRange[]>

/** Perú no usa horario de verano: UTC-5 todo el año. */
export const PERU_UTC_OFFSET_MINUTES = -300

const MINUTES_PER_DAY = 24 * 60

function toMinutes(hhmm: string): number {
  const [hours = 0, minutes = 0] = hhmm.split(':').map(Number)
  return hours * 60 + minutes
}

function crossesMidnight(range: OpeningRange): boolean {
  return toMinutes(range.closes) <= toMinutes(range.opens)
}

/**
 * ¿Está abierto en este instante? Base de ORD-03.
 * Usa un offset fijo en vez de Intl/timeZone para comportarse igual en Node, navegador y Expo (Hermes).
 */
export function isOpenNow(
  schedule: WeeklySchedule,
  now: Date,
  utcOffsetMinutes: number = PERU_UTC_OFFSET_MINUTES,
): boolean {
  const local = new Date(now.getTime() + utcOffsetMinutes * 60_000)
  const today = local.getUTCDay() as DayOfWeek
  const yesterday = ((today + 6) % 7) as DayOfWeek
  const minuteOfDay = local.getUTCHours() * 60 + local.getUTCMinutes()

  const openToday = schedule[today].some((range) => {
    const opens = toMinutes(range.opens)
    const closes = crossesMidnight(range) ? MINUTES_PER_DAY : toMinutes(range.closes)
    return minuteOfDay >= opens && minuteOfDay < closes
  })

  const stillOpenFromYesterday = schedule[yesterday].some(
    (range) => crossesMidnight(range) && minuteOfDay < toMinutes(range.closes),
  )

  return openToday || stillOpenFromYesterday
}
