# Changelog

Todos los cambios relevantes de este proyecto están documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/),
y este proyecto sigue [Versionado Semántico](https://semver.org/lang/es/).

---

## [2.3.5] - 2026-10-28

### Solucionado
- Vulnerabilidades de denegación de servicio (DoS) por consumo cuadrático de CPU en `js-yaml` (resolución de `!!omap` y fuentes de fusión vacías con `maxTotalMergeKeys`), dependencia transitiva de desarrollo vía `eslint` → `@eslint/eslintrc` — actualizado `@eslint/eslintrc` a `3.3.7`, que sube `js-yaml` a la versión parcheada `4.3.2` ([GHSA-5p4m-2wfm-xmqj](https://github.com/advisories/GHSA-5p4m-2wfm-xmqj), [GHSA-2883-xcg3-v3hh](https://github.com/advisories/GHSA-2883-xcg3-v3hh)). No afecta al paquete publicado en npm
- Vulnerabilidades de denegación de servicio (DoS) por recursión no controlada y expansión cuadrática en `brace-expansion` (`parseCommaParts`, grupos de llaves anidados y reescritura `{a},b}`), dependencia transitiva de desarrollo vía `eslint` → `@eslint/eslintrc` → `minimatch`, `eslint` → `@eslint/config-array` → `minimatch` y `eslint` → `minimatch` — actualizado `brace-expansion` a la versión parcheada `1.1.21` ([GHSA-6j4f-fj2g-mc7p](https://github.com/advisories/GHSA-6j4f-fj2g-mc7p), [GHSA-qhr7-859c-m2p7](https://github.com/advisories/GHSA-qhr7-859c-m2p7), [GHSA-q2hr-2g5m-vwhr](https://github.com/advisories/GHSA-q2hr-2g5m-vwhr)). No afecta al paquete publicado en npm

### Cambiado
- Dependencias de desarrollo actualizadas: `eslint` a `9.39.5`, `prettier` a `3.9.10` y rango de `typescript` alineado a `^5.9.3`

---

## [2.3.4] - 2026-07-30

### Solucionado
- Vulnerabilidad de denegación de servicio (DoS) por expansión de tiempo exponencial en `brace-expansion`, dependencia transitiva de desarrollo vía `eslint` → `@eslint/eslintrc` → `minimatch`, explotable con grupos `{}` consecutivos no expansibles — actualizado `brace-expansion` a `1.1.18`, por encima de la versión parcheada `1.1.16` ([GHSA-3jxr-9vmj-r5cp](https://github.com/advisories/GHSA-3jxr-9vmj-r5cp))

---

## [2.3.3] - 2026-07-18

### Solucionado
- Vulnerabilidad de denegación de servicio (DoS) por complejidad cuadrática en `js-yaml`, dependencia transitiva de desarrollo vía `eslint` → `@eslint/eslintrc`, explotable con alias repetidos en claves de fusión YAML — actualizado `@eslint/eslintrc` a `3.3.6`, que sube `js-yaml` a la versión parcheada `4.3.0` ([GHSA-h67p-54hq-rp68](https://github.com/advisories/GHSA-h67p-54hq-rp68))

---

## [2.3.2] - 2026-05-25

### Solucionado
- `enhance`: corregido error de tipo al invocar `.toOrdinal()` sobre objetos `Number` envoltura (`new Number(x)`) gracias a la extracción del valor primitivo con `.valueOf()` en el enlace del prototipo

### Cambiado
- `ordinales.mjs`: simplificada la re-exportación ESM usando exportación directa estática para evitar el uso dinámico de `createRequire`, mejorando la compatibilidad con empaquetadores modernos (Vite, Rollup, Webpack)
- Flujo de CI: actualizado el workflow de GitHub Actions para usar `pnpm` con su archivo de bloqueo congelado (`pnpm-lock.yaml`) y ejecutar las validaciones de calidad de forma automática

### Añadido
- Suite de pruebas de extensión: cobertura unitaria robusta para la extensión del prototipo `Number` con `enhance()`, incluyendo asertos de compatibilidad con objetos Number envoltura
- Infraestructura de calidad: integración formal de ESLint v9 Flat Config, formateo estricto con Prettier e ignores personalizados, y verificación estática automatizada del archivo de tipos `.d.ts` con TypeScript (`tsc`)

### Eliminado
- Archivos obsoletos `eslint.config.cjs` y `.eslintignore`, reemplazados formalmente por la configuración nativa Flat Config de ESLint v9

---

## [2.3.1] - 2026-05-18

### Añadido
- `SECURITY.md`: política de seguridad con versiones soportadas y canal de reporte
  de vulnerabilidades

### Cambiado
- Sección "Uso" del README reorganizada: importación y ejemplos separados,
  bloques por runtime (ESM / CommonJS / TypeScript), ejemplos rápidos reducidos
  a los casos más representativos y agrupados por tipo (completos / abreviados)
- Imagen de cabecera del README actualizada

### Refactorizado
- `toOrdinal`: check `n <= 0` unificado al inicio de la función, eliminando
  el duplicado en el bloque `abbr`
- Condición de apócope en `abbr` extraída a `apocopeAbbr` para evitar repetición

---

## [2.3.0] - 2026-05-17

### Añadido
- Opción `abbrStyle: 'super' | 'plain'` en `toOrdinal` (por defecto `'super'`)
- `'plain'` devuelve la abreviatura en ASCII sin superíndices unicode: `1o`, `1a`, `1er`, `3er`
- Nuevo tipo exportado `OrdinalAbbrStyle` en `src/ordinales.d.ts`
- `abbrStyle` añadido a la interfaz `OrdinalOptions`

### Cambiado
- `format: 'abbr'` ahora usa modifier letters (`ᵒ` U+1D52, `ᵃ` U+1D43) en lugar de los
  indicadores ordinales (`º` U+00BA, `ª` U+00AA), consistentes con `ᵉʳ` ya existente
  y sin el subrayado que algunos navegadores aplican a los indicadores ordinales
- El apócope en `format: 'abbr'` ahora aplica a todos los ordinales cuyo último
  componente es primero o tercero (`21.ᵉʳ`, `23.ᵉʳ`, `101.ᵉʳ`…), no solo a 1 y 3

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
