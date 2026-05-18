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

/**
 * Convierte un número cardinal a su forma ordinal en español.
 * Converts a cardinal number to its Spanish ordinal form.
 *
 * @param {number} numero - Número a convertir (entero positivo; los decimales se truncan)
 * @param {'m'|'f'|Object} [opciones='m'] - Género abreviado o objeto de opciones
 * @param {'m'|'f'} [opciones.gender='m'] - Género del ordinal
 * @param {boolean} [opciones.apocope=false] - Aplica apócope (primero→primer, tercero→tercer)
 * @param {'full'|'abbr'} [opciones.format='full'] - Formato: texto completo o abreviatura tipográfica RAE
 * @param {boolean} [opciones.abbrDot=true] - Incluye punto en la abreviatura (1.ᵒ vs 1ᵒ)
 * @param {'super'|'plain'} [opciones.abbrStyle='super'] - Estilo de abbr: superíndices unicode o texto plano (1o, 1a, 1er)
 * @returns {string} Ordinal en español, o cadena vacía para 0 y negativos
 * @throws {TypeError} Si el primer argumento no es un número válido
 *
 * @example
 * toOrdinal(1)                                    // 'primero'
 * toOrdinal(1, 'f')                               // 'primera'
 * toOrdinal(21, { gender: 'f', apocope: true })   // 'vigésima primera'
 * toOrdinal(1, { format: 'abbr' })                // '1.ᵒ'
 * toOrdinal(1, { format: 'abbr', abbrStyle: 'plain' }) // '1o'
 */
const toOrdinal = (number, options = 'm') => {
  if (typeof number !== 'number' || isNaN(number)) throw new TypeError(`toOrdinal: se esperaba un número, se recibió ${typeof number}`)
  if (number <= 0) return ''

  const n         = Math.trunc(number)
  const gender    = typeof options === 'object' ? (options.gender    ?? 'm')    : options
  const apocope   = typeof options === 'object' ? (options.apocope   ?? false)  : false
  const format    = typeof options === 'object' ? (options.format    ?? 'full') : 'full'
  const abbrDot   = typeof options === 'object' ? (options.abbrDot   ?? true)   : true
  const abbrStyle = typeof options === 'object' ? (options.abbrStyle ?? 'super'): 'super'

  if (format === 'abbr') {
    const apocopeAbbr = apocope && gender !== 'f' && (n % 10 === 1 || n % 10 === 3)
    if (abbrStyle === 'plain') return apocopeAbbr ? `${n}er` : `${n}${gender === 'f' ? 'a' : 'o'}`
    const sep = abbrDot ? '.' : ''
    return apocopeAbbr ? `${n}${sep}ᵉʳ` : `${n}${sep}${gender === 'f' ? 'ᵃ' : 'ᵒ'}`
  }

  const ordinal = buildParts(n, gender)
    .map(part => gender === 'f' ? part.slice(0, -1) + 'a' : part)
    .join(' ')

  return apocope ? applyApocope(ordinal, gender) : ordinal
}

/**
 * Extiende el prototipo de Number con el método toOrdinal.
 * Extends the Number prototype with the toOrdinal method.
 *
 * @example
 * enhance()
 * (21).toOrdinal('f') // 'vigésima primera'
 */
const enhance = () => addToPrototype(Number, 'toOrdinal', toOrdinal)

module.exports = { toOrdinal, enhance }
