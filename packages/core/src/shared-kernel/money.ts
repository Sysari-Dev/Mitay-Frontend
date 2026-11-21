export type Cents = number

export function solesToCents(soles: number): Cents {
  return Math.round(soles * 100)
}

export function sumCents(amounts: readonly Cents[]): Cents {
  return amounts.reduce((total, amount) => total + amount, 0)
}
