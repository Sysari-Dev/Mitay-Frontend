export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface OpeningRange {
  opens: string
  closes: string
}

export type WeeklySchedule = Record<DayOfWeek, readonly OpeningRange[]>

export const PERU_UTC_OFFSET_MINUTES = -300

const MINUTES_PER_DAY = 24 * 60

export function timeToMinutes(hhmm: string): number {
  const [hours = 0, minutes = 0] = hhmm.split(':').map(Number)
  return hours * 60 + minutes
}

export function crossesMidnight(range: OpeningRange): boolean {
  return timeToMinutes(range.closes) <= timeToMinutes(range.opens)
}

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
    const opens = timeToMinutes(range.opens)
    const closes = crossesMidnight(range) ? MINUTES_PER_DAY : timeToMinutes(range.closes)
    return minuteOfDay >= opens && minuteOfDay < closes
  })

  const stillOpenFromYesterday = schedule[yesterday].some(
    (range) => crossesMidnight(range) && minuteOfDay < timeToMinutes(range.closes),
  )

  return openToday || stillOpenFromYesterday
}
