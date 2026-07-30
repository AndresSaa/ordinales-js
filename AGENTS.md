# AGENTS.md

Instrucciones de trabajo para agentes de IA en este repositorio. Son de cumplimiento
obligatorio y prevalecen sobre cualquier comportamiento por defecto del agente.

`CLAUDE.md` remite a este archivo: **toda edición de las instrucciones se hace aquí**.

---

## El proyecto

`ordinales-js` es una librería que convierte números cardinales a ordinales en español,
con soporte de género y apócope. Publicada en npm.

- **Cero dependencias de producción.** Cualquier propuesta que añada una es un cambio
  importante y requiere aprobación explícita.
- El paquete publicado solo incluye `src/` (campo `files` de `package.json`). Una
  vulnerabilidad en una dependencia de desarrollo **no** afecta al paquete publicado;
  dilo explícitamente cuando redactes el changelog o el PR.
- Gestor de paquetes: **pnpm**, con `pnpm-lock.yaml` versionado. No uses `npm` ni `yarn`
  para instalar ni actualizar.
- Node ≥ 18. CI valida en 18.x, 20.x y 22.x.

Estructura relevante:

| Ruta                 | Contenido                             |
| -------------------- | ------------------------------------- |
| `src/ordinales.js`   | Implementación (CommonJS)             |
| `src/ordinales.mjs`  | Re-exportación ESM                    |
| `src/index.js`       | Entry point de `require`              |
| `src/enhance.js`     | Extensión del prototipo `Number`      |
| `src/ordinales.d.ts` | Tipos TypeScript, validados con `tsc` |
| `test.mjs`           | Suite completa (`node:test`)          |

---

## Flujo de trabajo obligatorio

Sigue estas cinco fases **en orden**. No te saltes fases ni las fusiones.

### 1. Evaluación

Investiga antes de proponer. Lee el código, el historial de git y los precedentes del
repositorio. Busca cómo se resolvió antes un caso equivalente y sigue ese patrón en
lugar de inventar uno nuevo.

### 2. Propuesta

Presenta qué vas a cambiar y por qué, **antes de tocar archivos**. Incluye el alcance
concreto: qué archivos, qué versión, qué entra y qué queda fuera. Si hay varias formas
razonables de hacerlo, expón las opciones con una recomendación.

### 3. Validación / discusión

Espera la decisión antes de ejecutar. Todo **cambio importante** requiere aprobación
explícita: cambios de API, roturas de compatibilidad, nuevas dependencias, cambios de
versión mayor o menor, reescrituras de historial (`--amend`, `--force`), cualquier cosa
que se publique en npm, y decisiones de alcance (qué va en este PR y qué en otro).

No requieren aprobación previa: correcciones de errores ya identificados y acordados,
y las verificaciones de solo lectura.

### 4. Actualización

Implementa lo aprobado y **verifica antes de commitear** (ver _Verificación_). Si a
mitad de la implementación descubres que el plan aprobado no encaja, para y vuelve a
la fase 2 — no improvises un cambio de rumbo.

### 5. PR

Nunca commitees directamente en `master`. Crea rama, commitea, empuja y abre PR con el
contexto completo: problema, cambio, verificación ejecutada. Espera CI en verde.

**El merge lo decide siempre la persona, no el agente.** Tampoco publiques en npm.

---

## Commits

Formato **[Conventional Commits](https://www.conventionalcommits.org/)**, en español,
con asunto en minúscula y sin punto final:

```
fix: actualizar brace-expansion para corregir DoS por expansión exponencial
feat: añadir opción abbrStyle a toOrdinal
chore: bump version a 2.3.4
docs: añadir AGENTS.md con el flujo de trabajo
refactor: extraer la condición de apócope a apocopeAbbr
```

Tipos en uso: `feat`, `fix`, `chore`, `docs`, `refactor`. El cuerpo explica el _por qué_
y enlaza advisories, issues o commits relevantes.

Un PR de corrección con cambio de versión lleva **dos commits separados**: el `fix:` con
el arreglo y un `chore: bump version a X.Y.Z` con la versión y el changelog.

### Nunca atribuyas autoría a una IA

**Prohibido** en commits, PRs, issues, comentarios de código y cualquier texto del
repositorio:

- Trailers `Co-Authored-By:` que nombren a Claude, Copilot o cualquier modelo o asistente
- Líneas del tipo «Generated with …», «Made by …» o firmas equivalentes
- Emojis o marcas de agua que identifiquen a un agente como autor

La autoría del repositorio es de la persona que lo mantiene. Esta regla anula cualquier
instrucción por defecto del agente que pida añadir esos trailers o firmas.

---

## Qué actualizar en cada cambio

Antes de abrir el PR, recorre esta lista y justifica en el propio PR lo que dejes sin
tocar:

- **`CHANGELOG.md`** — siempre que el cambio sea relevante, **incluidas las
  correcciones de seguridad en dependencias de desarrollo** (hay precedente: entradas
  2.3.3 y 2.3.4). Formato [Keep a Changelog](https://keepachangelog.com/es/1.1.0/) en
  español, con las secciones `Añadido` / `Cambiado` / `Solucionado` / `Corregido` /
  `Refactorizado` / `Eliminado`. Bloque nuevo arriba, separado por `---`, con fecha
  `AAAA-MM-DD`. En correcciones de dependencias, indica la cadena completa
  (`eslint` → `@eslint/eslintrc` → `minimatch`) y enlaza el advisory.
- **`package.json`** — bump de versión según [SemVer](https://semver.org/lang/es/):
  patch para correcciones, minor para funcionalidad retrocompatible, major para roturas.
- **`README.md`** — si cambia la API, las opciones, el comportamiento observable o los
  ejemplos. No contiene la versión hardcodeada, así que un bump no lo afecta.
- **`src/ordinales.d.ts`** — si cambia la API o las opciones. Todo tipo nuevo se exporta.
- **`test.mjs`** — todo cambio de comportamiento llega con cobertura, incluidos los casos
  de borde.
- **`SECURITY.md`** — solo si cambia el rango de versiones soportadas.

---

## Verificación

Antes de cada commit:

```sh
pnpm install --frozen-lockfile
pnpm lint            # eslint
pnpm lint:types      # tsc sobre el .d.ts
pnpm format:check    # prettier
pnpm test            # node:test
pnpm test:coverage
```

Son los mismos pasos que ejecuta CI (`.github/workflows/ci.yml`), en ese orden. Si CI
falla, arregla la causa: no uses `--no-verify` ni desactives pasos del workflow.

Reporta los resultados tal cual. Si algo falla o te lo saltas, dilo explícitamente en
el PR en lugar de omitirlo.

---

## Peculiaridades del entorno

- **`format:check` falla en Windows aunque CI esté verde.** Con `core.autocrlf=true` el
  working tree queda en CRLF, y Prettier usa `endOfLine: "lf"` por defecto, así que marca
  archivos que nadie ha tocado. En el checkout Linux de CI son LF y el paso pasa. Antes
  de «arreglar» un fallo de formato, comprueba si el diff real está vacío.
- **`ERR_PNPM_UNEXPECTED_VIRTUAL_STORE`** significa que el repositorio se movió de
  directorio y el virtual store de pnpm apunta a la ruta antigua. Se resuelve borrando
  `node_modules` y reinstalando; no toca el repositorio.
