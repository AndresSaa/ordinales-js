# Changelog

Todos los cambios relevantes de este proyecto están documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/),
y este proyecto sigue [Versionado Semántico](https://semver.org/lang/es/).

---

## [2.2.1] - 2026-05-16

### Añadido
- JSDoc completo en las funciones exportadas (`toOrdinal`, `enhance`) con descripción
  bilingüe, `@param`, `@returns`, `@throws` y `@example`
- Sección "Casos de uso" en el README con ejemplos reales de uso de la librería

### Cambiado
- Subtítulo del README: descripción en español con tagline en inglés en cursiva
- Badge de tipos TypeScript: se añade badge dinámico de npm junto al estático
- `keywords` y `description` en `package.json` optimizados para indexación en npm y GitHub

---

## [2.2.0] - 2026-05-16

### Añadido
- Opción `format: 'full' | 'abbr'` en `toOrdinal` (por defecto `'full'`)
- `'abbr'` devuelve la abreviatura tipográfica oficial RAE con superíndices unicode:
  `1.º`, `1.ª`, `1.ᵉʳ`, `3.ᵉʳ`
- Opción `abbrDot: boolean` (por defecto `true`) para omitir el punto separador en `'abbr'`:
  `1º`, `1ª`, `3ᵉʳ`
- Nuevo tipo exportado `OrdinalFormat` en `src/ordinales.d.ts`
- `abbrDot` añadido a la interfaz `OrdinalOptions`

---

## [2.1.0] - 2026-05-15

### Añadido
- Tipos TypeScript (`src/ordinales.d.ts`): `OrdinalGender`, `OrdinalOptions`, `toOrdinal`, `enhance`
- Campos `types` y `exports.types` en `package.json` apuntando al `.d.ts`
- Manejo explícito de casos de borde en `toOrdinal`:
  - `0` y negativos devuelven `''`
  - Floats se truncan con `Math.trunc` (`1.9` → `'primero'`)
  - Tipos inválidos (`NaN`, `string`, `null`, `undefined`, objetos, arrays) lanzan `TypeError`
- Nuevos tests: tres bloques de casos de borde (valores sin ordinal, floats, tipos inválidos)
- Sección "Casos de borde" en el README con tabla de comportamiento

### Cambiado
- Entry point movido a `src/index.js` (reexporta `ordinales.js`); `main` y `exports.require` actualizados
- `.travis.yml` eliminado (CI cubierto por GitHub Actions)

---

## [2.0.0] - 2026-05-14

### Añadido
- **API de opciones**: el segundo parámetro acepta un objeto `{ gender, apocope }`
  además del string de género (`'m'` / `'f'`), permitiendo combinar género y apócope
  en una sola llamada: `toOrdinal(21, { gender: 'f', apocope: true })`
- Composición recursiva de ordinales: soporta números hasta millones y más
  (`décimo milésimo`, `vigésimo primer milésimo`, `dosmillonésimo`…)
- Apócope interno automático al componer escalas en masculino
  (`vigésimo primer milésimo`, no `vigésimo primero milésimo`)
- Género femenino correcto en números grandes (`vigésima primera milésima`)
- Compatibilidad dual: `require('ordinales-js')` y `import { toOrdinal } from 'ordinales-js'`
  funcionan sin pasos de build adicionales
- Workflow de CI con GitHub Actions (Node 18, 20 y 22)
- Campos `exports`, `engines` y `files` en `package.json`
- Script `prepublishOnly` para validar tests antes de cada publicación en npm

### Cambiado
- **ROTURA**: Requiere Node ≥ 18
- Tests migrados a `node:test` (integrado en Node, sin dependencias extra)
- ESLint migrado a flat config (`eslint.config.cjs`)
- Gestor de paquetes cambiado de yarn a npm
- Lockfiles excluidos del repositorio (práctica recomendada para librerías públicas)

### Eliminado
- Dependencias de producción: cero (se elimina `core-js`)
- Dependencias de desarrollo: `@babel/cli`, `@babel/core`, `@babel/preset-env`, `babel-eslint`
- Archivos obsoletos: `index.js`, `.babelrc`, `.eslintrc.js`, `yarn.lock`, `dist/`
- Referencia al por el autor original:
  licencia cambiada de ISC a **MIT**, titular Andrés Saá Narváez

---

## [1.1.0] - 2025

### Añadido
- Soporte de apócope: formas `primer` y `tercer` cuando el ordinal precede
  a un sustantivo masculino singular
- Script `demo` simplificado, ejecutable directamente desde `src/`

### Corregido
- El campo `main` de `package.json` apunta ahora a `src/ordinales.js`,
  lo que permite instalar la librería directamente desde el repositorio de Git

---

## [1.0.15] - 2019–2023

Versión inicial publicada en npm. Incluye todas las versiones de la serie `1.0.x` (1.0.2 → 1.0.15).

### Añadido
- Conversión de números cardinales a ordinales en español
- Soporte de género masculino (`'m'`) y femenino (`'f'`)
- Soporte de unidades, decenas, centenas y unidades de millar (1–9.999)
- Método `enhance()` para extender el prototipo de `Number`
- Tests básicos con `assert`
- Integración continua con Travis CI
- Múltiples actualizaciones de seguridad en dependencias (dependabot)
