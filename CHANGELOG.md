# Changelog

Todos los cambios relevantes de este proyecto están documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/),
y este proyecto sigue [Versionado Semántico](https://semver.org/lang/es/).

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
