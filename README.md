# ordinales-js

![Ordinales](./assets/ordinales-pic.png)

---

[![CI](https://github.com/AndresSaa/ordinales-js/actions/workflows/ci.yml/badge.svg)](https://github.com/AndresSaa/ordinales-js/actions/workflows/ci.yml)
[![Version](https://img.shields.io/npm/v/ordinales-js.svg)](https://www.npmjs.com/package/ordinales-js)
[![License](https://img.shields.io/badge/licencia-MIT-blue)](./LICENSE)
[![Downloads](https://img.shields.io/npm/dm/ordinales-js.svg)](https://npmcharts.com/compare/ordinales-js?minimal=true)
[![Node](https://img.shields.io/node/v/ordinales-js)](https://www.npmjs.com/package/ordinales-js)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/ordinales-js)](https://bundlephobia.com/package/ordinales-js)
[![Sin dependencias](https://img.shields.io/badge/dependencias-cero-brightgreen)](https://www.npmjs.com/package/ordinales-js?activeTab=dependencies)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178C6?logo=typescript&logoColor=white)](./src/ordinales.d.ts)
[![Tipos](https://img.shields.io/npm/types/ordinales-js)](https://github.com/AndresSaa/ordinales-js/blob/master/src/ordinales.d.ts)
[![Changelog](https://img.shields.io/badge/changelog-CHANGELOG.md-informational)](./CHANGELOG.md)

Convierte números cardinales a ordinales en español, con soporte de género, apócope y abreviaturas tipográficas RAE.

*Spanish ordinal numbers library with gender, apocope and typographic abbreviation support.*

## Requisitos

- Node.js **18** o superior

## Instalación

```bash
npm install ordinales-js
```

## Uso

**ES Modules**

```js
import { toOrdinal } from 'ordinales-js'

toOrdinal(1)                                      // 'primero'
toOrdinal(1, 'f')                                 // 'primera'
toOrdinal(1, { apocope: true })                   // 'primer'
toOrdinal(21)                                     // 'vigésimo primero'
toOrdinal(63, { gender: 'f' })                    // 'sexagésima tercera'
toOrdinal(101, { apocope: true })                 // 'centésimo primer'
toOrdinal(829)                                    // 'octingentésimo vigésimo noveno'
toOrdinal(1,  { format: 'abbr' })                 // '1.º'
toOrdinal(1,  { gender: 'f', format: 'abbr' })    // '1.ª'
toOrdinal(1,  { apocope: true, format: 'abbr' })  // '1.ᵉʳ'
toOrdinal(1,  { format: 'abbr', abbrDot: false }) // '1º'
```

**CommonJS**

```js
const { toOrdinal } = require('ordinales-js')

toOrdinal(1)                      // 'primero'
toOrdinal(1, 'f')                 // 'primera'
toOrdinal(1, { apocope: true })   // 'primer'
```

**TypeScript**

```ts
import { toOrdinal } from 'ordinales-js'
import type { OrdinalGender, OrdinalOptions, OrdinalFormat } from 'ordinales-js'

const opciones: OrdinalOptions = { gender: 'f', apocope: true }
toOrdinal(21, opciones)           // 'vigésima primera'

const genero: OrdinalGender = 'f'
toOrdinal(3, genero)              // 'tercera'

const formato: OrdinalFormat = 'abbr'
toOrdinal(1, { format: formato }) // '1.º'
```

## API

### `toOrdinal(numero, opciones?)`

El segundo parámetro acepta un `string` de género o un objeto de opciones.

| Forma | Ejemplo |
|-------|---------|
| `toOrdinal(n)` | género masculino por defecto |
| `toOrdinal(n, 'f')` | género femenino |
| `toOrdinal(n, { gender, apocope, format, abbrDot })` | objeto de opciones |

#### Opciones

| Opción | Tipo | Por defecto | Descripción |
|--------|------|-------------|-------------|
| `gender` | `'m'` \| `'f'` | `'m'` | Género del ordinal |
| `apocope` | `boolean` | `false` | Aplica apócope (`primero` → `primer`, `tercero` → `tercer`) |
| `format` | `'full'` \| `'abbr'` | `'full'` | `'abbr'` devuelve la abreviatura tipográfica RAE con superíndice unicode |
| `abbrDot` | `boolean` | `true` | Incluye el punto separador en `'abbr'` (`1.º` vs `1º`). Solo aplica cuando `format: 'abbr'` |

#### Género

```js
// Forma abreviada (string)
toOrdinal(1, 'm')               // 'primero'
toOrdinal(1, 'f')               // 'primera'

// Forma objeto
toOrdinal(1,  { gender: 'f' })  // 'primera'
toOrdinal(21, { gender: 'f' })  // 'vigésima primera'
toOrdinal(63, { gender: 'f' })  // 'sexagésima tercera'
```

#### Apócope

Se utiliza cuando el ordinal precede a un sustantivo masculino.

```js
toOrdinal(1,  { apocope: true })             // 'primer'
toOrdinal(3,  { apocope: true })             // 'tercer'
toOrdinal(21, { apocope: true })             // 'vigésimo primer'

// Con género femenino explícito, el apócope no aplica
toOrdinal(1, { gender: 'f', apocope: true }) // 'primera'
```

#### Abreviatura tipográfica (`format: 'abbr'`)

Devuelve la forma abreviada oficial RAE usando superíndices unicode (`.º`, `.ª`, `.ᵉʳ`).

```js
toOrdinal(1,  { format: 'abbr' })                // '1.º'
toOrdinal(1,  { gender: 'f', format: 'abbr' })   // '1.ª'
toOrdinal(3,  { apocope: true, format: 'abbr' }) // '3.ᵉʳ'
toOrdinal(21, { gender: 'f', format: 'abbr' })   // '21.ª'
toOrdinal(21, { apocope: true, format: 'abbr' }) // '21.º'  (apócope solo aplica en 1.ᵉʳ y 3.ᵉʳ)
```

El punto separador sigue la norma RAE y está activo por defecto. Se puede omitir con `abbrDot: false` para contextos donde se prefiere la forma sin punto:

```js
toOrdinal(1,  { format: 'abbr', abbrDot: false })                // '1º'
toOrdinal(1,  { gender: 'f', format: 'abbr', abbrDot: false })   // '1ª'
toOrdinal(3,  { apocope: true, format: 'abbr', abbrDot: false }) // '3ᵉʳ'
```

#### Números grandes

```js
toOrdinal(10000)                        // 'décimo milésimo'
toOrdinal(21000)                        // 'vigésimo primer milésimo'
toOrdinal(21000, 'f')                   // 'vigésima primera milésima'
toOrdinal(123456)                       // 'centésimo vigésimo tercer milésimo cuadrigentésimo quincuagésimo sexto'
toOrdinal(1000000)                      // 'millonésimo'
toOrdinal(2000000)                      // 'dosmillonésimo'
toOrdinal(21000000, { apocope: true })  // 'vigésimo primer millonésimo'
```

### `enhance()`

Extiende el prototipo de `Number` para usar `toOrdinal` directamente sobre cualquier número.

```js
// ESM
import { enhance } from 'ordinales-js'
// CJS
const { enhance } = require('ordinales-js')

enhance()

const numero = 21
numero.toOrdinal()                    // 'vigésimo primero'
numero.toOrdinal('f')                 // 'vigésima primera'
numero.toOrdinal({ gender: 'f' })     // 'vigésima primera'
numero.toOrdinal({ apocope: true })   // 'vigésimo primer'
```

### Tipos TypeScript

El paquete incluye tipos nativos, sin necesidad de instalar `@types/ordinales-js`.

```ts
import type { OrdinalGender, OrdinalOptions, OrdinalFormat } from 'ordinales-js'

const opciones: OrdinalOptions = { gender: 'f', apocope: true }
toOrdinal(21, opciones)           // 'vigésima primera'

const genero: OrdinalGender = 'f'
toOrdinal(3, genero)              // 'tercera'

const formato: OrdinalFormat = 'abbr'
toOrdinal(1, { format: formato }) // '1.º'
```

## Casos de borde

| Llamada | Resultado |
|---------|-----------|
| `toOrdinal(0)` | `''` (el cero no tiene ordinal en español) |
| `toOrdinal(-5)` | `''` (los negativos tampoco) |
| `toOrdinal(1.7)` | `'primero'` (los decimales se truncan con `Math.trunc`) |
| `toOrdinal(NaN)` | lanza `TypeError` |
| `toOrdinal('foo')` | lanza `TypeError` |
| `toOrdinal(null)` | lanza `TypeError` |
| `toOrdinal(undefined)` | lanza `TypeError` |
| `toOrdinal({ gender: 'f' })` | lanza `TypeError` (objeto recibido como número) |

## Demo

```bash
npm run demo
```

## Casos de uso

Cualquier interfaz que necesite expresar posiciones o rangos de forma escrita puede beneficiarse de esta librería.

En **documentos legales y contratos notariales**, los ordinales escritos son requisito formal: cláusulas como "el vigésimo primer día del mes" o referencias a artículos ("el tercero del presente contrato") requieren precisión lingüística y de género. La opción `format: 'abbr'` cubre además las abreviaturas tipográficas RAE habituales en encabezados de documentos (1.º, 2.ª, 3.ᵉʳ).

En **formularios web y aplicaciones de gestión** es común presentar pasos de procesos, ediciones o versiones como ordinales ("paso primero", "segunda edición"). La API acepta género y apócope para adaptarse al sustantivo que acompaña al ordinal sin lógica adicional en el cliente.

En **generadores de facturas e informes** los ordinales aparecen en referencias de línea, secciones o trimestres: "primer trimestre", "segunda línea de pedido", "tercer concepto facturado". La abreviatura tipográfica (`format: 'abbr'`) cubre además encabezados de columna como 1.º, 2.º, 3.º

En **listados y rankings** mostrados al usuario (clasificaciones, resultados paginados, posiciones en tablas) el femenino automático permite mostrar "primera posición" o "tercera participante" sin tablas de traducción adicionales.

## Contribuir

1. Haz un fork del repositorio
2. Crea una rama para tu cambio: `git checkout -b feat/mi-mejora`
3. Realiza tus cambios y añade tests si es necesario
4. Asegúrate de que los tests pasan: `npm test`
5. Abre una Pull Request describiendo el cambio

## Changelog

Consulta [CHANGELOG.md](./CHANGELOG.md) para el historial de versiones.

## Licencia

[MIT](./LICENSE)
