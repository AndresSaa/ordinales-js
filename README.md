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

toOrdinal(1)             // 'primero'
toOrdinal(1, 'f')        // 'primera'
toOrdinal(1, 'm', true)  // 'primer'
toOrdinal(21)            // 'vigésimo primero'
toOrdinal(63, 'f')       // 'sexagésima tercera'
toOrdinal(829)           // 'octingentésimo vigésimo noveno'
```

**CommonJS**

```js
const { toOrdinal } = require('ordinales-js')

toOrdinal(1)             // 'primero'
toOrdinal(1, 'f')        // 'primera'
toOrdinal(1, 'm', true)  // 'primer'
```

## API

### `toOrdinal(numero, genero?, apocope?)`

| Parámetro | Tipo | Por defecto | Descripción |
|-----------|------|-------------|-------------|
| `numero` | `number` | `0` | Número cardinal a convertir |
| `genero` | `'m'` \| `'f'` | `'m'` | Género del ordinal |
| `apocope` | `boolean` | `false` | Aplica apócope al resultado (`primero` → `primer`, `tercero` → `tercer`) |

#### Género

```js
toOrdinal(1, 'm')  // 'primero'
toOrdinal(1, 'f')  // 'primera'
```

#### Apócope

Se utiliza cuando el ordinal precede a un sustantivo masculino.

```js
toOrdinal(1, 'm', true)   // 'primer'
toOrdinal(3, 'm', true)   // 'tercer'
toOrdinal(21, 'm', true)  // 'vigésimo primer'

// El apócope no afecta al femenino
toOrdinal(1, 'f', true)   // 'primera'
```

#### Números grandes

```js
toOrdinal(10000)             // 'décimo milésimo'
toOrdinal(21000)             // 'vigésimo primer milésimo'
toOrdinal(21000, 'f')        // 'vigésima primera milésima'
toOrdinal(123456)            // 'centésimo vigésimo tercer milésimo cuadrigentésimo quincuagésimo sexto'
toOrdinal(1000000)           // 'millonésimo'
toOrdinal(2000000)           // 'dosmillonésimo'
toOrdinal(21000000, 'm', true) // 'vigésimo primer millonésimo'
```

### `enhance()`

Extiende el prototipo de `Number` para usar `toOrdinal` directamente sobre cualquier número.

```js
// ESM
import { enhance } from 'ordinales-js'
// CJS
const { enhance } = require('ordinales-js')

enhance()

const numero = 256
numero.toOrdinal()        // 'ducentésimo quincuagésimo sexto'
numero.toOrdinal('f')     // 'ducentésima quincuagésima sexta'
```

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

## Licencia

[ISC](./LICENSE)
