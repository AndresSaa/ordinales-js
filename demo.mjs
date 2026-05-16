import { toOrdinal } from './src/index.js'

console.log("\n--- DEMOSTRACIÓN DE RESULTADOS ---\n")

const numeros = [1, 3, 10, 21, 23, 31, 101, 9999, 21000, 1000000]

console.log("NUM      | NORMAL (M)                    | APÓCOPE (M)                   | FEMENINO")
console.log("---------|-------------------------------|-------------------------------|------------------------------")

numeros.forEach(n => {
  const col1 = n.toString().padEnd(8)
  const col2 = toOrdinal(n).padEnd(29)
  const col3 = toOrdinal(n, { apocope: true }).padEnd(29)
  const col4 = toOrdinal(n, 'f')
  console.log(`${col1} | ${col2} | ${col3} | ${col4}`)
})

console.log("\n--- ABREVIATURAS CON PUNTO (format: 'abbr') ---\n")

console.log("NUM      | ABREV. (M) | ABREV. APÓCOPE | ABREV. FEMENINO")
console.log("---------|------------|----------------|----------------")

numeros.forEach(n => {
  const col1 = n.toString().padEnd(8)
  const col2 = toOrdinal(n, { format: 'abbr' }).padEnd(10)
  const col3 = toOrdinal(n, { apocope: true, format: 'abbr' }).padEnd(14)
  const col4 = toOrdinal(n, { gender: 'f', format: 'abbr' })
  console.log(`${col1} | ${col2} | ${col3} | ${col4}`)
})

console.log("\n--- ABREVIATURAS SIN PUNTO (format: 'abbr', abbrDot: false) ---\n")

console.log("NUM      | ABREV. (M) | ABREV. APÓCOPE | ABREV. FEMENINO")
console.log("---------|------------|----------------|----------------")

numeros.forEach(n => {
  const col1 = n.toString().padEnd(8)
  const col2 = toOrdinal(n, { format: 'abbr', abbrDot: false }).padEnd(10)
  const col3 = toOrdinal(n, { apocope: true, format: 'abbr', abbrDot: false }).padEnd(14)
  const col4 = toOrdinal(n, { gender: 'f', format: 'abbr', abbrDot: false })
  console.log(`${col1} | ${col2} | ${col3} | ${col4}`)
})

console.log("\n----------------------------------\n")

console.log("--- CASOS DE BORDE ---\n")

const edgeCases = [
  { label: 'toOrdinal(0)',               call: () => toOrdinal(0) },
  { label: 'toOrdinal(-5)',              call: () => toOrdinal(-5) },
  { label: 'toOrdinal(1.9)',             call: () => toOrdinal(1.9) },
  { label: 'toOrdinal(21.7)',            call: () => toOrdinal(21.7) },
  { label: "toOrdinal('foo')",           call: () => toOrdinal('foo') },
  { label: 'toOrdinal(null)',            call: () => toOrdinal(null) },
  { label: 'toOrdinal(undefined)',       call: () => toOrdinal(undefined) },
  { label: 'toOrdinal(NaN)',             call: () => toOrdinal(NaN) },
  { label: "toOrdinal({ gender: 'f' })", call: () => toOrdinal({ gender: 'f' }) },
]

edgeCases.forEach(({ label, call }) => {
  try {
    console.log(`${label.padEnd(30)} → '${call()}'`)
  } catch (e) {
    console.log(`${label.padEnd(30)} → ${e.constructor.name}: ${e.message}`)
  }
})

console.log("\n----------------------------------\n")
