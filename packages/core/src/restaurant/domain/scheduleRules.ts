import { crossesMidnight, timeToMinutes, type OpeningRange } from '../../shared-kernel/schedule'

const MINUTES_PER_DAY = 24 * 60

export const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/

function toInterval(range: OpeningRange): [number, number] {
  const opens = timeToMinutes(range.opens)
  const closes = timeToMinutes(range.closes)
  return [opens, crossesMidnight(range) ? closes + MINUTES_PER_DAY : closes]
}

export function findOverlappingRangeIndexes(ranges: readonly OpeningRange[]): number[] {
  const valid = ranges
    .map((range, index) => ({ range, index }))
    .filter(({ range }) => TIME_PATTERN.test(range.opens) && TIME_PATTERN.test(range.closes) && range.opens !== range.closes)
  const overlapping = new Set<number>()
  for (let current = 0; current < valid.length; current++) {
    for (let previous = 0; previous < current; previous++) {
      const [startA, endA] = toInterval(valid[previous]!.range)
      const [startB, endB] = toInterval(valid[current]!.range)
      if (startA < endB && startB < endA) overlapping.add(valid[current]!.index)
    }
  }
  return [...overlapping].sort((a, b) => a - b)
}
