export type OrdinalGender = 'm' | 'f'

export interface OrdinalOptions {
  gender?: OrdinalGender
  apocope?: boolean
}

export function toOrdinal(n: number, options?: OrdinalGender | OrdinalOptions): string
export function enhance(): void
