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
[![Changelog](https://img.shields.io/badge/changelog-CHANGELOG.md-informational)](./CHANGELOG.md)

Librería para convertir números cardinales a ordinales en español.
Soporta género (masculino/femenino), apócope y números hasta millones.

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

toOrdinal(1)                          // 'primero'
toOrdinal(1, 'f')                     // 'primera'
toOrdinal(1, { apocope: true })       // 'primer'
toOrdinal(21)                         // 'vigésimo primero'
toOrdinal(63, { gender: 'f' })        // 'sexagésima tercera'
toOrdinal(101, { apocope: true })     // 'centésimo primer'
toOrdinal(829)                        // 'octingentésimo vigésimo noveno'
```

**CommonJS**

```js
const { toOrdinal } = require('ordinales-js')

toOrdinal(1)                          // 'primero'
toOrdinal(1, 'f')                     // 'primera'
toOrdinal(1, { apocope: true })       // 'primer'
```

**TypeScript**

```ts
import { toOrdinal } from 'ordinales-js'
import type { OrdinalGender, OrdinalOptions } from 'ordinales-js'

const opciones: OrdinalOptions = { gender: 'f', apocope: true }
toOrdinal(21, opciones)               // 'vigésima primera'

const genero: OrdinalGender = 'f'
toOrdinal(3, genero)                  // 'tercera'
```

## API

### `toOrdinal(numero, opciones?)`

El segundo parámetro acepta un `string` de género o un objeto de opciones.

| Forma | Ejemplo |
|-------|---------|
| `toOrdinal(n)` | género masculino por defecto |
| `toOrdinal(n, 'f')` | género femenino |
| `toOrdinal(n, { gender, apocope })` | objeto de opciones |

#### Opciones

| Opción | Tipo | Por defecto | Descripción |
|--------|------|-------------|-------------|
| `gender` | `'m'` \| `'f'` | `'m'` | Género del ordinal |
| `apocope` | `boolean` | `false` | Aplica apócope (`primero` → `primer`, `tercero` → `tercer`) |

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
import type { OrdinalGender, OrdinalOptions } from 'ordinales-js'

const opciones: OrdinalOptions = { gender: 'f', apocope: true }
toOrdinal(21, opciones)   // 'vigésima primera'

const genero: OrdinalGender = 'f'
toOrdinal(3, genero)      // 'tercera'
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
