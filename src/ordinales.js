import enhance from './enhance'

const ordinalTextMapping = [
  // unidades
  ['','primero','segundo','tercero','cuarto','quinto','sexto','septimo','octavo','noveno'],
  // decenas
  ['','décimo','vigésimo','trigésimo','cuadragésimo','quincuagésimo','sexagésimo','septuagésimo','octagésimo','nonagésimo'],
  // centenas
  ['','centésimo','ducentésimo','tricentésimo','cuadrigentésimo','quingentésimo','sexcentésimo','septingentésimo','octingentésimo','noningentésimo']
]

const toOrdinal = (number, gender = 'm') => {
  let ordinal = ''
  let digits = [...number.toString()]
  digits.forEach((digit, i) => {
    ordinal += ordinalTextMapping[digits.length - i - 1][digit]
    if (gender === 'f') ordinal = ordinal.substr(0, [ordinal.length-1]) + 'a'
    ordinal += ' '
  })
  return ordinal.trim()
}

const ordinal = {
  toOrdinal,
  enhance: () => enhance(Number, 'toOrdinal', toOrdinal)
}

export default ordinal