import enhance from './enhance'

const ordinalTextMapping = [
  // unidades
  ['','primero','segundo','tercero','cuarto','quinto','sexto','septimo','octavo','noveno'],
  // decenas
  ['','décimo','vigésimo','trigésimo','cuadragésimo','quincuagésimo','sexagésimo','septuagésimo','octagésimo','nonagésimo'],
  // centenas
  ['','centésimo','ducentésimo','tricentésimo','cuadrigentésimo','quingentésimo','sexcentésimo','septingentésimo','octingentésimo','noningentésimo']
]

const toOrdinal = (number = 0, gender = 'm') => {
  let ordinal = ''
  let digits = [...number.toString()]
  digits.forEach((digit, i) => {
    let digit_ordinal = ordinalTextMapping[digits.length - i - 1][digit]
    if (!digit_ordinal) return
    if (gender === 'f') digit_ordinal = digit_ordinal.substr(0, [digit_ordinal.length-1]) + 'a'
    ordinal += digit_ordinal + ' '
  })
  return ordinal.trim()
}

const ordinal = {
  toOrdinal,
  enhance: () => enhance(Number, 'toOrdinal', toOrdinal)
}

export default ordinal