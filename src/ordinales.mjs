import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { toOrdinal, enhance } = require('./ordinales.js')
export { toOrdinal, enhance }
