export type OrdinalGender = 'm' | 'f'
export type OrdinalFormat = 'full' | 'abbr'
export type OrdinalAbbrStyle = 'super' | 'plain'

export interface OrdinalOptions {
  gender?: OrdinalGender
  apocope?: boolean
  format?: OrdinalFormat
  abbrDot?: boolean
  abbrStyle?: OrdinalAbbrStyle
}

export function toOrdinal(n: number, options?: OrdinalGender | OrdinalOptions): string
export function enhance(): void
