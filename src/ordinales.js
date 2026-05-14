import addToPrototype from './enhance.js'

const UNIDADES = ['','primero','segundo','tercero','cuarto','quinto','sexto','séptimo','octavo','noveno']
const DECENAS  = ['','décimo','vigésimo','trigésimo','cuadragésimo','quincuagésimo','sexagésimo','septuagésimo','octagésimo','nonagésimo']
const CENTENAS = ['','centésimo','ducentésimo','tricentésimo','cuadrigentésimo','quingentésimo','sexcentésimo','septingentésimo','octingentésimo','noningentésimo']

// Prefijos para palabras compuestas con la escala: dos+milésimo = dosmilésimo
const SCALE_PREFIXES = ['','','dos','tres','cuatro','cinco','seis','siete','ocho','nueve']

const SCALES = [
  { value: 1000000, single: 'millonésimo' },
  { value: 1000,    single: 'milésimo' },
]

// Apocopa la última palabra antes de una escala (uso interno): primero → primer
const apocopeWord = word =>
  (word.endsWith('primero') || word.endsWith('tercero')) ? word.slice(0, -1) : word

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
        if (gender === 'm') mParts[mParts.length - 1] = apocopeWord(mParts[mParts.length - 1])
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

const applyApocope = (ordinal, gender) => {
  if (gender !== 'm') return ordinal
  if (ordinal.endsWith('primero') || ordinal.endsWith('tercero')) return ordinal.slice(0, -1)
  return ordinal
}

export const toOrdinal = (number = 0, gender = 'm', apocope = false) => {
  const ordinal = buildParts(number, gender)
    .map(part => gender === 'f' ? part.slice(0, -1) + 'a' : part)
    .join(' ')

  return apocope ? applyApocope(ordinal, gender) : ordinal
}

export const enhance = () => addToPrototype(Number, 'toOrdinal', toOrdinal)
