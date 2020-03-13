<h1 align="center"> ordinales-js </h1> <br>

<p align="center">
    <img alt="ordinales-js" title="ordinales-js" src="https://i.imgur.com/c6m87z4.png" max-width="600">
</p>

[![Build Status](https://travis-ci.org/AndresSaa/ordinales-js.svg?branch=master)](https://travis-ci.org/AndresSaa/ordinales-js)
[![Version](https://img.shields.io/npm/v/ordinales-js.svg)](https://www.npmjs.com/package/ordinales-js)
[![License](https://img.shields.io/npm/l/ordinales-js.svg)](https://www.npmjs.com/package/ordinales-js)
[![Downloads](https://img.shields.io/npm/dm/ordinales-js.svg)](https://npmcharts.com/compare/ordinales-js?minimal=true)
[![devDependencies Status](https://david-dm.org/AndresSaa/ordinales-js/dev-status.svg)](https://david-dm.org/AndresSaa/ordinales-js?type=dev)
[![Try ordinales-js on RunKit](https://badge.runkitcdn.com/ordinales-js.svg)](https://npm.runkit.com/ordinales-js)
---
Librería para convertir números cardinales a ordinales en español.

## Instalación
```
npm install ordinales-js --save
```
o si prefieres utilizar `yarn`
```
yarn add ordinales-js
```

## API
### Métodos:
#### Convertir a ordinal
Convierte un número cardinal a su ordinal en español.
```javascript
ordinales.toOrdinal(numero, genero)
```
#### Extender "Number"
Extiende el tipo "Number" para que pueda utilizar la conversión a cardinal.
```javascript
ordinales.enhance()
```

## Uso
Esta librería sólo soporta la conversión a números ordinales en español.

Convertir un número cardinal en ordinal es tan sencillo como:
```javascript
const ordinales = require('ordinales-js');
ordinales.toOrdinal(1) // primero
ordinales.toOrdinal(63, 'f') // sexagésima tercera
ordinales.toOrdinal(829) // octingentésimo vigésimo noveno
ordinales.toOrdinal(917, 'f') // noningentésima décima septima
ordinales.toOrdinal(6170) // seismilésimo centésimo septuagésimo
```

Extender "Number" y utlizar el método sobre una variable número
```javascript
const ordinales = require('ordinales-js');
ordinales.enhance()
const numero = 256
numero.toOrdinal() // ducentésimo quincuagésimo sexto
```

## Demo
Puedes probar a ejecutar el script demo y ver cómo funciona la librería
```
npm run demo
```
