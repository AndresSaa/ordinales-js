'use strict'

const addToPrototype = require('./enhance.js')

// Palabras para unidades, decenas y centenas. El índice corresponde al número que representan
const UNIDADES = ['','primero','segundo','tercero','cuarto','quinto','sexto','séptimo','octavo','noveno']
const DECENAS  = ['','décimo','vigésimo','trigésimo','cuadragésimo','quincuagésimo','sexagésimo','septuagésimo','octagésimo','nonagésimo']
const CENTENAS = ['','centésimo','ducentésimo','tricentésimo','cuadrigentésimo','quingentésimo','sexcentésimo','septingentésimo','octingentésimo','noningentésimo']

// Prefijos para palabras compuestas con la escala: dos+milésimo = dosmilésimo
const SCALE_PREFIXES = ['','','dos','tres','cuatro','cinco','seis','siete','ocho','nueve']

// Escalas mayores a 1000. El índice corresponde a la potencia de 10 que representan (mil = 10^3, millón = 10^6)
const SCALES = [
  { value: 1000000, single: 'millonésimo' },
  { value: 1000,    single: 'milésimo' },
]

// En español, "primero" y "tercero" se apocopan a "primer" y "tercer" cuando van antes de un sustantivo masculino
const applyApocope = (word, gender) =>
  gender === 'm' && (word.endsWith('primero') || word.endsWith('tercero'))
    ? word.slice(0, -1) : word

// Construye las partes del ordinal para un número dado. Por ejemplo, para 1234 devuelve ["milésimo", "ducentésimo", "trigésimo", "cuarto"]
const buildParts = (n, gender = 'm') => {
  if (n <= 0) return []

  for (const { value, single } of SCALES) {
    if (n >= value) {
      const multiplier = Math.floor(n / value)
      const remainder  = n % value
      const parts = []

      if (multiplier === 1) {
        parts.push(single)
      } else if (multiplier < 10) {
        parts.push(SCALE_PREFIXES[multiplier] + single)
      } else {
        const mParts = buildParts(multiplier, gender)
        mParts[mParts.length - 1] = applyApocope(mParts[mParts.length - 1], gender)
        parts.push(...mParts, single)
      }

      if (remainder > 0) parts.push(...buildParts(remainder, gender))
      return parts
    }
  }

  const c = Math.floor(n / 100)
  const d = Math.floor((n % 100) / 10)
  const u = n % 10
  const parts = []
  if (c) parts.push(CENTENAS[c])
  if (d) parts.push(DECENAS[d])
  if (u) parts.push(UNIDADES[u])
  return parts
}

// Convierte un número a su forma ordinal en español, con opciones de género y apócope
const toOrdinal = (number, options = 'm') => {
  if (typeof number !== 'number' || isNaN(number)) throw new TypeError(`toOrdinal: se esperaba un número, se recibió ${typeof number}`)

  const n       = Math.trunc(number)
  const gender  = typeof options === 'object' ? (options.gender  ?? 'm')    : options
  const apocope = typeof options === 'object' ? (options.apocope ?? false)  : false
  const format  = typeof options === 'object' ? (options.format  ?? 'full') : 'full'
  const abbrDot = typeof options === 'object' ? (options.abbrDot ?? true)   : true

  if (format === 'abbr') {
    if (n <= 0) return ''
    const sep = abbrDot ? '.' : ''
    if (apocope && gender !== 'f' && (n === 1 || n === 3)) return `${n}${sep}ᵉʳ`
    return `${n}${sep}${gender === 'f' ? 'ª' : 'º'}`
  }

  const ordinal = buildParts(n, gender)
    .map(part => gender === 'f' ? part.slice(0, -1) + 'a' : part)
    .join(' ')

  return apocope ? applyApocope(ordinal, gender) : ordinal
}

// Agrega el método toOrdinal al prototipo de Number
const enhance = () => addToPrototype(Number, 'toOrdinal', toOrdinal)

module.exports = { toOrdinal, enhance }
