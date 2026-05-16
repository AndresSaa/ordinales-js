export type OrdinalGender = 'm' | 'f'
export type OrdinalFormat = 'full' | 'abbr'

export interface OrdinalOptions {
  gender?: OrdinalGender
  apocope?: boolean
  format?: OrdinalFormat
  abbrDot?: boolean
}

export function toOrdinal(n: number, options?: OrdinalGender | OrdinalOptions): string
export function enhance(): void
