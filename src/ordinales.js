"use strict"

const enhance = require('./enhance')

const ordinalTextMapping = [
  // unidades
  ['','primero','segundo','tercero','cuarto','quinto','sexto','séptimo','octavo','noveno'],
// decenas
['','décimo','vigésimo','trigésimo','cuadragésimo','quincuagésimo','sexagésimo','septuagésimo','octagésimo','nonagésimo'],
// centenas
['','centésimo','ducentésimo','tricentésimo','cuadrigentésimo','quingentésimo','sexcentésimo','septingentésimo','octingentésimo','noningentésimo'],
// unidades de millar
['','milésimo','dosmilésimo','tresmilésimo ','cuatromilésimo','cincomilésimo','seismilésimo','sietemilésimo','ochomilésimo','nuevemilésimo']
]

// MODIFICACIÓN: Añadido el tercer parámetro 'apocope' (por defecto false)
const toOrdinal = (number = 0, gender = 'm', apocope = false) => {
  let ordinal = ''
  let digits = [...number.toString()]

  digits.forEach((digit, i) => {
    let digit_ordinal = ordinalTextMapping[digits.length - i - 1][digit]
    if (!digit_ordinal) return

      // Lógica original de género
      if (gender === 'f') digit_ordinal = digit_ordinal.substr(0, [digit_ordinal.length-1]) + 'a'

        ordinal += digit_ordinal + ' '
  })

  // Limpiamos espacios sobrantes (lógica original)
  ordinal = ordinal.trim()

  // NUEVA LÓGICA: Aplicar apócope (primer / tercer)
  // Solo se aplica si:
  // 1. El usuario activó el flag 'apocope'
  // 2. El género es masculino (femenino nunca apocopa)
  if (apocope && gender === 'm') {
    if (ordinal.endsWith('primero')) {
      return ordinal.slice(0, -1); // "primero" -> "primer"
    }
    if (ordinal.endsWith('tercero')) {
      return ordinal.slice(0, -1); // "tercero" -> "tercer"
    }
  }

  return ordinal
}

module.exports = {
  toOrdinal,
  enhance: () => enhance(Number, 'toOrdinal', toOrdinal)
}
