# ordinales-js
[![Build Status](https://travis-ci.org/AndresSaa/ordinales-js.svg?branch=master)](https://travis-ci.org/AndresSaa/ordinales-js)
[![Version](https://img.shields.io/npm/v/ordinales-js.svg)](https://www.npmjs.com/package/ordinales-js)
[![License](https://img.shields.io/npm/l/ordinales-js.svg)](https://www.npmjs.com/package/ordinales-js)
[![Downloads](https://img.shields.io/npm/dm/ordinales-js.svg)](https://npmcharts.com/compare/ordinales-js?minimal=true)
---
Librería para convertir números cardinales a ordinales en español.

## Instalación
```
npm install ordinal-js --save
```
o si prefieres utilizar `yarn`
```
yarn add ordinal-js
```

## API
#### Métodos:
##### Convertir a ordinal
Convierte un número cardinal a su ordinal en español
```javascript
ordinales.toOrdinal(numero, genero)
```
##### Extender "Number"
Extiende el tipo "Number" para que pueda utilizar la conversión a cardinal
```javascript
ordinales.enhance()
```

## Uso
Esta librería sólo soporta la conversión a números ordinales en español.

Convertir un número cardinal en ordinal es tan sencillo como:
```javascript
const ordinales = require("ordinales-js");
ordinales.toOrdinal(1) // primero
ordinales.toOrdinal(63, 'f') // sexagésima tercera
ordinales.toOrdinal(829) // octingentésimo vigésimo noveno
ordinales.toOrdinal(917, 'f') // noningentésima décima septima
```

Extender "Number" y utlizar el método sobre una variable número
```javascript
const ordinales = require("ordinales-js");
ordinales.enhance()
const numero = 256
numero.toOrdinal() // ducentésimo quincuagésimo sexto
```