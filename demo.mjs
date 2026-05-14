import { toOrdinal } from './src/ordinales.js'

console.log("\n--- DEMOSTRACIÓN DE RESULTADOS ---\n")

const numeros = [1, 3, 10, 21, 23, 31, 101, 9999, 21000, 1000000]

console.log("NUM      | NORMAL (M)                    | APÓCOPE (M)                   | FEMENINO")
console.log("---------|-------------------------------|-------------------------------|------------------------------")

numeros.forEach(n => {
  const col1 = n.toString().padEnd(8)
  const col2 = toOrdinal(n, 'm').padEnd(29)
  const col3 = toOrdinal(n, 'm', true).padEnd(29)
  console.log(`${col1} | ${col2} | ${col3} | ${toOrdinal(n, 'f')}`)
})

console.log("\n----------------------------------\n")
