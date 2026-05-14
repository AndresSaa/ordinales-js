# Changelog

Todos los cambios relevantes de este proyecto están documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/),
y este proyecto sigue [Versionado Semántico](https://semver.org/lang/es/).

---

## [2.0.0] - 2026-05-14

### Añadido
- Composición recursiva de ordinales: soporta números hasta millones y más
  (`décimo milésimo`, `vigésimo primer milésimo`, `dosmillonésimo`…)
- Apócope interno automático al componer escalas en masculino
  (`vigésimo primer milésimo`, no `vigésimo primero milésimo`)
- Género femenino correcto en números grandes (`vigésima primera milésima`)
- Workflow de CI con GitHub Actions (Node 18, 20 y 22)
- Campo `exports` y `engines` en `package.json`

### Cambiado
- **ROTURA**: La librería ahora usa ES Modules (`import/export`). Requiere Node ≥ 18
- **ROTURA**: `require('ordinales-js')` ya no funciona; usar `import { toOrdinal } from 'ordinales-js'`
- Tests migrados a `node:test` (integrado en Node, sin dependencias extra)
- ESLint migrado a flat config (`eslint.config.js`)
- Gestor de paquetes cambiado de yarn a npm
- Versión mínima de Node establecida en 18

### Eliminado
- Dependencias de producción: cero (se elimina `core-js`)
- Dependencias de desarrollo: `@babel/cli`, `@babel/core`, `@babel/preset-env`, `babel-eslint`
- Archivos obsoletos: `index.js`, `.babelrc`, `.eslintrc.js`, `yarn.lock`, `dist/`

---

## [1.1.0] - 2025

### Añadido
- Parámetro `apocope` (tercero en `toOrdinal`) para obtener las formas apocopadas
  `primer` y `tercer` cuando el ordinal precede a un sustantivo masculino singular
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
